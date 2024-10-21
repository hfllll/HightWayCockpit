<template>
  <div class="sagem" id="sagem">
    <!--header-->
    <div class="header">
      <div class="bg_header">
        <div class="header_nav flt_title">高速公路边坡监控驾驶舱</div>
      </div>
      <div class="block">
        <el-date-picker
          v-model="selectedDate"
          type="date"
          placeholder="选择日期"
          size="mini"
          @change="handleDateChange">
        </el-date-picker>
      </div>
      <!-- 顶部动画 -->
      <div class="header-animations-one"></div>
      <div class="header-animations-two"></div>
      <div class="time">
        {{ nowtime }}
      </div>
    </div>
    <!-- main -->
    <main>
      <div class="box-left">
        <!-- 当前数据 -->
        <dv-border-box-12 class="box">
          <NowData :nowData="nowData"></NowData>
        </dv-border-box-12>
        <!-- Pm -->
        <dv-border-box-12 class="box">
          <Pm :pm="pm" :pmM="pmM"></Pm>
        </dv-border-box-12>
        <!-- 风速与噪声 -->
        <dv-border-box-12 class="box">
          <CustomNoise :custom="custom" :noise="noise"></CustomNoise>
        </dv-border-box-12>
        <!-- 二氧化碳 -->
        <dv-border-box-12 class="box">
          <Co2 :co2="co2"></Co2>
        </dv-border-box-12>
      </div>
      <div class="box-middle">
        <!-- 地图 -->
        <dv-border-box-7 class="box1">
          <Map @countObj="countObj"></Map>
        </dv-border-box-7>
        <!-- 站点详情 -->
        <div class="box">
          <Site :siteData="siteData"></Site>
          <warning></warning>
        </div>
      </div>
      <div class="box-right">
        <!-- 摄像头 -->
        <Camera
          v-if="showState"
          class="box"
          :itemPointsData="itemPointsData"
        ></Camera>
        <dv-border-box-12 v-else="showState" class="box boxFontStyle">
          <span>请在地图上选择点位</span>
        </dv-border-box-12>
        <!-- 温湿度 -->
        <dv-border-box-12 class="box">
          <TAndH
            :temperatureData="temperatureData"
            :humidityData="humidityData"
            :time="time"
          ></TAndH>
        </dv-border-box-12>
        <!-- 雨量 -->
        <dv-border-box-12 class="box">
          <Rain :rainData="rainData" :time="time"></Rain>
        </dv-border-box-12>
        <!-- 光照 -->
        <dv-border-box-12 class="box">
          <Illumination
            :IlluminationData="IlluminationData"
            :time="time"
          ></Illumination>
        </dv-border-box-12>
      </div>
    </main>
  </div>
</template>

<script>
import * as echarts from "echarts";
import NowData from "../../components/NowData.vue";
import TAndH from "../../components//TAndH.vue";
import Rain from "../../components/Rain.vue";
import Illumination from "../../components/Illumination.vue";
import Camera from "../../components//Camera.vue";
import Map from "../../components/Map.vue";
import Pm from "../../components//Pm";
import CustomNoise from "../../components/CustomNoise.vue";
import Co2 from "../../components/Co2.vue";
import Site from "../../components/Site.vue";
import { getAllList } from "../../api/Data";
import { getNowDate } from "../../api/Date"
import warning from "../../components/warning.vue";
export default {
  components: {
    NowData,
    TAndH,
    Rain,
    Illumination,
    Camera,
    Map,
    Pm,
    CustomNoise,
    Co2,
    Site,
    warning,
  },
  data() {
    return {
      siteData:'',
      nowtime: "",
      nowData: {},
      noise: null,
      custom: null,
      co2: null,
      pm: null,
      pmM: null,
      temperatureData: [],
      humidityData: [],
      time: [],
      rainData: [],
      IlluminationData: [],
      itemPointsData: {},
      showState: false,
      selectedDate: ''
    };
  },
  watch: {},
  mounted() {
    this.getList(2);
    setInterval(()=>{
        this.nowtime=this.getTime()
    },1000)
  },
  methods: {
    async getList(e,time) {
      let reqdata={
        num:0,
        id:e,
        time:null
      }
      if(time){
        reqdata.time=time
      }
      const res = await getAllList(reqdata);
      if (res.code == 200) {
        let length = res.data[0].length - 1;
        this.nowData = res.data[0][length];
        this.noise = res.data[0][length].noise;
        this.custom = res.data[0][length].sulfurDioxide;
        this.co2 = res.data[0][length].nitrogenDioxide;
        this.pm = res.data[0][length].pm;
        this.pmM = res.data[0][length].pmM;
        this.temperatureData = [];
        this.humidityData = [];
        this.rainData = [];
        this.IlluminationData = [];
        this.time = [];
        res.data[0].forEach((item) => {
          //   温度数据

          this.temperatureData.push(item.temperature);
          // 湿度数据

          this.humidityData.push(item.thumidity);
          // 雨量数据

          this.rainData.push(item.trainfall);
          // 光照数据

          this.IlluminationData.push(item.illumination);
          // 时间数据

          this.time.push(item.createTime);
        });
      }
    },
    countObj(e) {
      this.siteData=e.itemPointsList[e.count].note //站名
      console.log(e.itemPointsList[e.count],999);
      this.getList(e.itemPointsList[e.count].dataId);
      this.itemPointsData = e;
      this.showState = false;
      setTimeout(() => {
        this.showState = true;
      }, 16.8);
    },

    getTime() {
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth() + 1;
      const day = now.getDate();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();

      const formattedTime = `${year}年${month}月${day}日 ${hours}:${minutes}:${seconds}`;
return formattedTime
      
    },
    async handleDateChange(val) {
      this.selectedDate = val
      this.getList(2,this.selectedDate)
    //   const res = await getNowDate({id:3,time:this.selectedDate})
    //   if(res.code ==200) {
    //     let length = res.data[0].length - 1;
    //     this.nowData = res.data[0][length];
    //     this.noise = res.data[0][length].noise;
    //     this.custom = res.data[0][length].sulfurDioxide;
    //     this.co2 = res.data[0][length].nitrogenDioxide;
    //     this.pm = res.data[0][length].pm;
    //     this.pmM = res.data[0][length].pmM;
    //     this.temperatureData = [];
    //     this.humidityData = [];
    //     this.rainData = [];
    //     this.IlluminationData = [];
    //     this.time = [];
    //     res.data[0].forEach((item) => {
    //       //   温度数据

    //       this.temperatureData.push(item.temperature);
    //       // 湿度数据

    //       this.humidityData.push(item.thumidity);
    //       // 雨量数据

    //       this.rainData.push(item.trainfall);
    //       // 光照数据

    //       this.IlluminationData.push(item.illumination);
    //       // 时间数据

    //       this.time.push(item.createTime);
    //   })
    // }
  },
}
}
</script>

<style lang="less" scoped>
.sagem {
  width: 100%;
  height: 100vh;
  background: url(../../assets/images/nybj.png) no-repeat;
  background-size: 100% 100%;
  position: relative;

  main {
    width: 100%;
    height: 93vh;
    display: flex;
    justify-content: space-between;
    margin-top: 1vh;

    .box-left,
    .box-right {
      width: 24.8%;
      display: flex;
      justify-content: space-between;
      flex-direction: column;

      .box {
        width: 100%;
        height: 33%;
      }

      .boxFontStyle {
        /deep/.border-box-content {
          font-size: 20px;
          color: #fff;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }

    .box-middle {
      display: flex;
      width: 50%;
      justify-content: space-between;
      flex-direction: column;

      .box1 {
        width: 99%;
        height: 74.5%;
        margin: 0 auto 0 auto;
      }

      .box {
        display: flex;
        width: 100%;
        height: 25%;
        justify-content: space-between;
        /* background-color: red; */
        align-items: center;
      }
    }
  }
}

/*header开始*/
.header {
  width: 100%;
  overflow: hidden;
  position: relative;
  .time{
    width: 300px;
    position: absolute;
    /* background-color: aqua; */
    right: 0px;
    bottom: 0;
    font-size: 18px;
    color: white;
  }
  .block {
    margin-left: 1280px;
    /deep/ .el-date-picker__editor {
      background-color: red;
      opacity: 0.9;
    }
  }
  
  .bg_header {
    width: 100%;
    height: 6vh;
    background: url(../../assets/images/title.png) no-repeat;
    background-size: 100% 100%;
    text-align: center;
    line-height: 80px;
    font-size: 30px;
    color: #fff;
  }

  .header-animations-one {
    width: 5vw;
    height: 2px;
    position: absolute;
    background: repeating-linear-gradient(
      to left,
      #fff 0%,
      transparent 50%,
      transparent 100%
    );
    bottom: 1.6vh;
    left: 0;
    animation: move-right 6s infinite;
    border-radius: 15px;
  }

  @keyframes move-right {
    0% {
      left: -5vw;
    }

    50% {
      width: 5vw;
      left: 28vw;
      transform: rotate(0deg);
      background: repeating-linear-gradient(
        to left,
        #fff 0%,
        transparent 50%,
        transparent 100%
      );
    }

    60% {
      width: 0vw;
      left: 33vw;
      background: repeating-linear-gradient(
        to left,
        #ffffff73 0%,
        transparent 50%,
        transparent 100%
      );
    }

    100% {
      width: 0vw;
      left: 28vw;
      display: none;
    }
  }

  .header-animations-two {
    width: 5vw;
    height: 2px;
    position: absolute;
    background: repeating-linear-gradient(
      to right,
      #fff 0%,
      transparent 50%,
      transparent 100%
    );
    bottom: 1.6vh;
    right: 0;
    animation: move-left 6s infinite;
    border-radius: 15px;
  }

  @keyframes move-left {
    0% {
      width: 5vw;
      right: -5vw;
    }

    50% {
      width: 5vw;
      right: 28vw;
      transform: rotate(0deg);
      background: repeating-linear-gradient(
        to right,
        #fff 0%,
        transparent 50%,
        transparent 100%
      );
    }

    60% {
      width: 0vw;
      right: 33vw;
      background: repeating-linear-gradient(
        to right,
        #ffffff73 0%,
        transparent 50%,
        transparent 100%
      );
    }

    100% {
      width: 0vw;
      right: 28vw;
      display: none;
    }
  }
}
</style>
