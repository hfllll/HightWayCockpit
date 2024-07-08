<template>
    <div class="childComponent">
        <div class="title">温度与湿度</div>
        <div id="newCharts" style="width: 100%;height: 100%;"></div>
        <div class="selectBox">
            <span class="btn" @click="clickBtn">点击切换：</span>
            <span>今日{{ state }}</span>
        </div>
    </div>
</template>
  
<script>
export default {
    props: {
        temperatureData: {
            type: Array
        },

        humidityData: {
            type: Array
        },
        time: {
            type: Array
        },
    },
    watch: {
        time(newVal, oldVal) {
            this.showData = this.temperatureData
            console.log(this.temperatureData, this.time, 999999);
            this.showCharts()
        }
    },
    data() {
        return {
            showData: [],
            state: '温度',
            unit: '℃',
            alertScale: [[0, 30], 75],  // 警戒刻度 [温度,湿度]
        }
    },
    mounted() {
    },
    methods: {
        showCharts() {
            let myChart = this.$echarts.init(document.getElementById("newCharts"));
            let option = {
                grid: {
                    top: "15%",
                    left: "2%",
                    right: "8%",
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
                        formatter: "{value} " + this.unit, //刻度标签的内容格式器，支持字符串模板和回调函数两种形式。简单讲就是可以自己格式化标签的内容。
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
                        data: this.showData,
                        type: 'line',
                        smooth: true,
                        itemStyle: {
                            color: '#c37d7d'  // 设置数据点的颜色为红色
                        },
                        // 设置警戒线
                        markLine: {
                            data: this.state == '湿度' ? [{
                                yAxis: this.alertScale[1],
                                lineStyle: {
                                    color: '#ed4014',
                                    type: 'dashed'
                                },
                                label: {
                                    position: 'insideStartTop',
                                    formatter: '湿度警戒线',
                                    fontSize:'12px'
                                }
                            }] : [{
                                yAxis: this.alertScale[0][1],
                                lineStyle: {
                                    color: '#ed4014',
                                    type: 'dashed'
                                },
                                label: {
                                    position: 'insideStartTop',
                                    formatter: '温度警戒线',
                                    fontSize:'12px'
                                }
                            }, {
                                yAxis: this.alertScale[0][0],
                                lineStyle: {
                                    color: '#2b85e4',
                                    type: 'dashed'
                                },
                                label: {
                                    position: 'insideStartTop',
                                    formatter: '温度警戒线',
                                    fontSize:'12px'
                                }
                            }]
                        }
                    },

                ],

            };
            myChart.setOption(option)
        },
        clickBtn() {
            if (this.state == '温度') {
                this.state = '湿度'
                this.unit = '%'
                this.showData = this.humidityData
                this.showCharts()

            } else {
                this.state = '温度'
                this.unit = '℃'
                this.showData = this.temperatureData
                this.showCharts()
            }
        }
    },
};
</script>
<style lang="less" scoped>
.childComponent {
    width: 94%;
    height: 90%;
    position: relative;
    transform: translate(3%, 5%);

    .title {
        width: 100%;
        height: 10px;
        color: white;
        text-align: center;
    }

    .selectBox {
        position: absolute;
        top: 0px;
        right: -10px;
        width: 33%;
        font-size: 14px;
        color: antiquewhite;
        display: flex;
        align-items: center;

        .btn:hover {
            color: rgb(131, 167, 167);
            cursor: pointer;
        }

        span:nth-child(1) {
            color: rgb(138, 138, 199);
        }
    }

}
</style>