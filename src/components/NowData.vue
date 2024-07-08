
<template>
    <div class="childComponent">
        <div class="title">当前数据</div>
        <dv-scroll-board v-if="showState" :config="config" style="width:100%;height:90%;margin-top: 3%;" />
    </div>
</template>

<script>
export default {
    props: {
        nowData: {
            type: Object,
        }
    },
    watch: {
        nowData(newVal, oldVal) {
            this.config.data = []
            this.showState = false
            this.items.forEach((item) => {
                item.value = newVal[item.key]
                this.config.data.push([`${item.name}：${newVal[item.key]}${item.unit}`])
            })
            setTimeout(()=>{
                this.showState = true
            },16.7)
        }
    },
    data() {
        return {
            items: [
                { name: '温度', value: '', key: "temperature", unit: '℃' },
                { name: '湿度', value: '', key: "thumidity", unit: '%' },
                { name: '土壤温度', value: '', key: "ttemperature", unit: '℃' },
                { name: '土壤湿度', value: '', key: "tthumidity", unit: '%' },
                { name: '噪声', value: '', key: "noise", unit: 'dB' },
                // 
                { name: '颗粒物', value: '', key: "pm", unit: 'mm' },
                { name: '细颗粒物', value: '', key: "pmM", unit: 'pm' },
                { name: '光照', value: '', key: "illumination", unit: 'lx' },
                { name: '当日雨量', value: '', key: "trainfall", unit: 'mm' },
                { name: '瞬时雨量', value: '', key: "irainfall", unit: 'mm' },
                // 
                { name: '累计雨量', value: '', key: "crainfall", unit: 'mm' },
                { name: '二氧化硫', value: '', key: "sulfurDioxide", unit: '%' },
                { name: '二氧化碳', value: '', key: "nitrogenDioxide", unit: 'ppm' },
            ],
            config: {
                data: [],
                align:['center'],
                oddRowBGC:'transparent',
                evenRowBGC:'transparent'
            },
            showState:false,
        };
    },
    components: {

    },
    created() {

    },
    mounted() {

    },
    methods: {

    },
};
</script>

<style lang='less' scoped>
ul {
    padding: 0;
    width: 100%;
    height: 80%;

    li {
        width: 100%;
        height: 10%;
        color: aliceblue;
        list-style: none;
        margin: 10px auto 15px 15%;

        .name {
            color: #51d1fe;
        }

        .value {
            color: white;
        }
    }
}

/deep/.el-carousel__indicators--horizontal {
    display: none;
}

/deep/.el-carousel__container {
    height: 10vw;
}

.title {
    width: 100%;
    height: 10px;
    color: antiquewhite;
    text-align: center;
}
</style>