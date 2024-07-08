<template>
    <div class="childComponent">
        <div class="title">光照</div>
        <div id="newCharts2" style="width: 100%;height: 100%;"></div>
    </div>
</template>
  
<script>
export default {
    props:{
        IlluminationData:{
            type:Array
        },
        time:{
            type:Array
        }
    },
    watch:{
        time(newVal,oldVal){
            this.showCharts()
        } 
    },
    mounted() {
        // this.showCharts()
    },
    methods: {
        showCharts() {
            let myChart = this.$echarts.init(document.getElementById("newCharts2"));
            let option = {
                grid: {
                    top: "15%",
                    left: "5%",
                    right: "5%",
                    bottom: "5%",
                    containLabel: true, //刻度是否显示
                },
                xAxis: {
                    type: 'category',
                    data: this.time,
                    axisTick: {
                        alignWithLabel: true, //为true时，可以让刻度跟底部的标签内容对齐
                    },
                    axisLine: {
                        show: true,
                        // 如果想要设置单独的线条样式
                        lineStyle: {
                            color: "#fff",
                            width: 1,
                            type: "solid"
                        }
                    },
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        show: true, //是否显示刻度
                        color: "#fff",
                        fontSize: "12px",
                        formatter: "{value} lx", //刻度标签的内容格式器，支持字符串模板和回调函数两种形式。简单讲就是可以自己格式化标签的内容。
                    },
                    axisLine: {
                        show: true, //是否显示坐标轴线
                        lineStyle: {
                            color: "#fff",
                            width: 1,
                            type: "solid",
                        },
                    },
                    // y轴分割线
                    splitLine: { lineStyle: { color: "rgba(255,255,255,.1)" } },
                },
                series: [
                    {
                        data: this.IlluminationData,
                        type: 'line',
                        smooth: true
                    }
                ]
            };
            myChart.setOption(option)
        }
    },
};
</script>
<style lang="less" scoped>
.title {
    width: 100%;
    height: 10px;
    color: antiquewhite;
    text-align: center;
}
</style>