
<template>
   
    <dv-border-box-12 class="siteChild">
        <div class="title">当前数据</div>
        <div class="contentSite">
            <div class="imgAndData">
                <img src="../../src/assets//images/OIP-C.jpg" alt="">
                <ul>
                    <li class="list" v-for="(item, index) in items" :key="index">
                        <span class="name">{{ item.name }}：</span>
                        <span class="value">{{ item.value }}</span>
                    </li>
                </ul>
            </div>

        </div>
    </dv-border-box-12>
</template>

<script>
export default {
    props: {
        siteData: {
            type: String,
            default:''
        }
    },
    watch: {
        siteData(newVal, oldVal) {
         this.items.forEach((e)=>{
            if(e.name=='站名'){
                e.value=newVal
            }
         })
        }
    },
    data() {
        return {
            items: [
                { name: '站名', value: '观测站一' },
                { name: '编号', value: 'G001' },
                { name: '地址', value: 'G202高速公路' },
                { name: '观测状态', value: '正常' },



            ],
            items1: [
                { name: '站名', value: '观测站一' },
                { name: '编号', value: 'G001' },
                { name: '地址', value: 'G202高速公路' },
                { name: '观测状态', value: '正常' },

            ]

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
    .siteChild{
        width: 60%;
        height: 100%;
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
.contentSite {
    width: 95%;
    height: 80%;
    margin: 0 auto 0 auto;

    .imgAndData {
        width: 100%;
        height: 100%;
        display: flex;
        img {
            width: 40%;
            height: 80%;
            border-radius: 5px;
        }
    }
}

ul {
    padding: 0;
    width: 45%;
    height: 100%;
    margin-left: 60px;

    li {
        width: 100%;
        height: 15%;
        font-size: 18px;
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



</style>