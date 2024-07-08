<template>
    <div class="main">
        <!-- <van-nav-bar :title="title" left-arrow @click-left="onClickLeft" /> -->
        <div id="playWind"></div>
    </div>
</template>
  
<script>
import "@/assets/js/ezuikit";
import axios from "axios";
export default {
    name: "",
    props:{
        itemPointsData:{
            type:Object,
            default:()=>{}
        },
    },
    data() {
        return {
            title: `${this.$route.query.id}号位监控`,
        };
    },
    created() { },
    mounted() {
        this.$nextTick(() => {
            this.getAccessToken()

        });
    },
    methods: {
        async getAccessToken() {
            let reqdata = {
                appKey: "af9230aa4c6b49f58c0446163cd71ad4",
                appSecret: "f406c4a602502368c721034c74764d29",
            };
            // const res = await accessToken(reqdata);
            const res = await axios.post(`https://open.ys7.com/api/lapp/token/get?appKey=${reqdata.appKey}&appSecret=${reqdata.appSecret}`);
            if (res.data.code == 200) {
                this.$store.commit("setAccessToken", res.data.data.accessToken);
                if(this.itemPointsData!={}){
                    this.ezopenInit();
                }
                
            }

        },
        ezopenInit() {
            var domain = "https://open.ys7.com";
            var EZOPENDemo;
            window.EZOPENDemo = EZOPENDemo;
            var width = document.getElementById("playWind").clientWidth - 5;
            var height = (document.getElementById("playWind").clientWidth * 9) / 16 - 37;
            EZOPENDemo = new EZUIKit.EZUIKitPlayer({
                id: "playWind",
                width: width,
                height: height,
                template: "mobileLive",
                url: `ezopen://open.ys7.com/${this.itemPointsData.itemPointsList[this.itemPointsData.count].serialNumber}/${this.itemPointsData.itemPointsList[this.itemPointsData.count].numberChannels}.live`,
                // accessToken:"ra.4wjvdsmr89so9dc65skq9a4587ccq2qo-6t6q50pu6m-1jlxzfm-kcjmxurrh",
                accessToken: this.$store.state.user.accessToken,
            });
        },
        onClickLeft() {
            window.history.go(-1);
        },
    },
};
</script>
<style scoped lang="less">
html,
body {
    padding: 0;
    margin: 0;
    text-align: center;
    background: #ffffff;
    overflow: hidden;
}

.main {
    width: 100%;
    height: 100%;
}
</style>
  