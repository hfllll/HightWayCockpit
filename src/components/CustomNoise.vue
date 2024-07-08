<template>
    <div class="childComponent">
        <div class="title">风速与噪声</div>
        <div class="content">
            <dv-decoration-9 class="custom"><dv-digital-flop :config="customConfig"
                    style="width:200px;height:50px;" /></dv-decoration-9>
            <dv-decoration-9 class="custom"><dv-digital-flop :config="noiseConfig"
                    style="width:200px;height:50px;" /></dv-decoration-9>
        </div>
        <div class="bottom">
            <span>风速</span>
            <span>噪声</span>
        </div>

    </div>
</template>
  
<script>
export default {
    props: {
        noise: {
            type: Number
        },
        custom: {
            type: Number
        }
    },
    watch: {
        custom(val, oldval) {
            this.customConfig = {
                number: [val],
                toFixed: 1,
                content: '{nt}m/s',
                style: {
                    fontSize: 24,
                }
            }

        },
        noise(val, oldval) {
            this.noiseConfig = {
                number: [val],
                toFixed: 1,
                content: '{nt}dB',
                style: {
                    fontSize: 24,
                }
            }

        }
    },
    data() {
        return {
            customConfig: {
                number: [0],
                toFixed: 1,
                content: '{nt}m/s',
                style: {
                    fontSize: 24,
                }
            },
            noiseConfig: {
                number: [0],
                toFixed: 1,
                content: '{nt}dB',
                style: {
                    fontSize: 24,
                }
            },
        }
    },
    mounted() {
    },
    methods: {

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

.content {
    width: 100%;
    height: 80%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    color: white;
    font-size: 18px;

    .custom {
        width: 120px;
        height: 120px;
    }
}

.bottom {
    width: 100%;
    height: 10%;
    display: flex;
    color: white;
    justify-content: space-around;
    font-size: 18px;
}
</style>