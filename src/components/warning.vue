<template>
        <dv-border-box-12 class="warningChild">
             <div class="title">边坡地址灾害预警</div>
             <ul>
                <li>
                    <span>雨量：</span>
                    <span>中雨</span>
                </li>
                <li>
                    <span>风俗：</span>
                    <span>无风</span>
                </li>
                <li>
                    <span>pm：</span>
                    <span>空气质量优</span>
                </li>
                <li>
                    <span>噪声：</span>
                    <span>当前环境嘈杂</span>
                </li>
                <li>
                    <span>光照：</span>
                    <span>弱光</span>
                </li>
             </ul>
        </dv-border-box-12>
</template>

<script>
export default {
    data () {
        return {
            
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
.warningChild{

    width: 38%;
    height: 100%;
    /* background-color: red; */
}
.title {
    width: 100%;
    height: 15%;
    color: antiquewhite;
    display: flex;
    justify-content: center;
    align-items: center;
    /* background-color: red; */
}
ul{
    width: 70%;
    height: 80%;
    color: white;
    font-size: 16px;
    li{
        height: 20%;
    }
}
</style>