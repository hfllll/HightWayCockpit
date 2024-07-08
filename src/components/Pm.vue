<template>
    <div class="childComponent">
        <div class="title">颗粒物</div>
        <div id="newCharts3" style="width: 100%;height: 100%;"></div>
    </div>
</template>
  
<script>
export default {
    props:{
        pm:{
            type:Number
        },
        pmM:{
            type:Number
        }
    },
    watch:{
        pm(newVal,oldVal){
            this.showCharts()
        
        } 
    },
    mounted() {
        // this.showCharts()
    },
    methods: {
        showCharts() {
            let myChart = this.$echarts.init(document.getElementById("newCharts3"));
            let option = {
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    top: '5%',
                    left: 'left',
                    textStyle: {
                        color: 'white'
                    }
                },
                series: [
                    {
                        name: '详细数据',
                        type: 'pie',
                        radius: ['40%', '70%'],
                        avoidLabelOverlap: false,
                        label: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: 40,
                                fontWeight: 'bold'
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        data: [
                            { value: this.pm, name: 'Pm' },
                            { value: this.pmM, name: 'Pm2.5' },

                        ]
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