
<template>
    <div class="childComponent">
        <div class="title">二氧化碳</div>
        <div class="Co2Content">
            <img src="../../src//assets//images//二氧化碳.png" alt="">
            <div class="concentration">
                <span><dv-digital-flop :config="config" style="width: 100px;height: 40px;"/></span>
                <span><i>(ppm)</i></span>
            </div>
        </div>
      
    </div>
</template>

<script>
export default {
    props:{
        co2:{
            type:Number,
        }  
    },
    watch:{
        co2(val,oldval){
            this.config={
                number:[val],
                toFixed:0,
                style:{
                    fontsize:'28px',
                    fill:'#fff'
                }
            }
        }
    },
    data () {
        return {
            config:{
                number:[0],
                toFixed:0,
                style:{
                    fontsize:'28px',
                    fill:'#fff'
                }
            }
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
.title {
    width: 100%;
    height: 10px;
    color: antiquewhite;
    text-align: center;
}
.Co2Content{
    width: 100%;
    height: 90%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    img{
        width: 120px;
    }
    .concentration{
        display: flex;
        justify-content: center;
        align-items: center;
        
        span:nth-child(2){
            height: 40px;
            line-height: 30px;
            font-size: 40px;
            color: white;
            margin-right: 10px;
        }
    }
}
</style>