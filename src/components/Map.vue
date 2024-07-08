<template>
    <div :id="idHash" class="container" @mouseover="handleMouseOver" @mouseout="handleMouseOut" style="z-index: 1;">
        <div class="point_btn">
            <li v-for="(item, index) in pointsList" :key="index" @click="pointsClick(item, index)"
                :class="count === index ? 'point_btn_liStyle' : ''">{{ item.note }}</li>
        </div>
    </div>
</template>
<script>
import { CellGroup } from 'view-design';
import { getDeviceList } from '@/api/Data'
export default {
    name: "MapChart",
    props: {},
    data: () => ({
        loading: false,
        idHash: "MapContainer" + new Date().getTime(),
        disProvinces: "",
        map: {}, //地图对象
        depFeatures: ["bg", "road", "building", "point"], //地图标注内容
        lineArr: [],
        lineArr1: [],
        satelliteLayer: null,
        pointsList: [],
        count: null,
        timerId: null,
    }),
    watch: {
    },
    mounted() {
        // eslint-disable-next-line no-undefined
        this.getPointsList()
        if (window.AMap == undefined) {
            const script = document.createElement("script");
            script.src =
                "https://webapi.amap.com/maps?v=2.0&plugin=AMap.MarkerClusterer,Map3D,AMap.DistrictLayer,AMap.DistrictSearch,AMap.TileLayer.Satellite&callback=initAMap&key=de45c1a0e7ea44bea49388cea9cca2f7";
            document.head.appendChild(script);
            window.initAMap = () => {
                this.refresh();
            };
            this.zoomChange();

        } else {
            this.refresh();
        }
        // this.timerFun()
    },
    methods: {
        refresh() {
            const lineArr = [
                [118.029733, 27.696976],
                [118.022974, 27.679077],
                [118.021858, 27.672483],
                [118.01364, 27.658059],
                [118.010765, 27.648137],
                [118.007718, 27.643138],
                [118.005057, 27.636238],
                [118.002589, 27.632588],
                [117.992418, 27.623615],
                [117.99141, 27.619489],
                [117.99244, 27.616466],
                [117.996667, 27.610306],
                [117.996517, 27.60173],
                [117.993169, 27.595493],
                [117.992504, 27.589921],
                [117.99038, 27.583017],
                [117.992783, 27.573831],
                [117.986453, 27.560744],
                [117.986281, 27.548702],
                [117.985123, 27.539931],
                [117.988792, 27.53232],
                [117.991925, 27.525813],
                [117.992332, 27.523548],
                [117.990809, 27.522007],
                [117.984221, 27.518163],
                [117.980445, 27.510684],
                [117.969931, 27.503699],
                [117.963987, 27.504194],
                [117.963751, 27.504308],
                [117.957549, 27.503185],
                [117.950769, 27.503946],
                [117.944632, 27.503642],
                [117.937422, 27.505088],
                [117.922938, 27.501225],
                [117.918132, 27.498141],
                [117.913325, 27.495781],
                [117.911308, 27.493269],
                [117.906287, 27.482304],
                [117.898906, 27.477545],
                [117.893391, 27.471168],
                [117.883799, 27.466636],
                [117.881353, 27.46359],
                [117.87807, 27.455003],
                [117.875259, 27.451157],
                [117.873564, 27.441407],
                [117.867749, 27.433999],
                [117.865668, 27.430571],
                [117.861226, 27.426038],
                [117.859745, 27.419772],
                [117.853952, 27.410552],
                [117.847429, 27.398646],
                [117.843373, 27.395503],
                [117.832086, 27.391902],
                [117.827366, 27.391578],
                [117.822152, 27.38834],
                [117.818439, 27.3835],
                [117.814641, 27.380737],
                [117.811423, 27.37767],
                [117.806487, 27.375193],
                [117.801917, 27.372734],
                [117.791896, 27.377422],
                [117.785244, 27.376336],
                [117.785244, 27.376336],
                [117.76928, 27.37826],
                [117.769645, 27.378375],
                [117.7528, 27.378356],
                [117.749603, 27.37727],
                [117.744925, 27.37443],
                [117.739046, 27.372696],
                [117.73042, 27.368047],
                [117.723768, 27.36778],
                [117.715528, 27.369705],
                [117.709391, 27.369171],
                [117.702461, 27.368961],
                [117.699435, 27.367285],
                [117.690874, 27.360862],
                [117.684243, 27.358175],
                [117.683996, 27.35802],
                [117.675499, 27.350092],
                [117.672924, 27.34872],
                [117.666916, 27.346814],
                [117.667345, 27.346738],
                [117.662452, 27.343612],
                [117.65962, 27.337894],
                [117.650608, 27.322415],
                [117.643999, 27.318755],
                [117.639106, 27.316391],
                [117.639106, 27.316391],
                [117.639364, 27.316238],
                [117.635759, 27.315628],
                [117.624687, 27.313569],
                [117.617134, 27.309298],
                [117.611812, 27.303502],
                [117.60898, 27.302205],
                [117.606233, 27.3019],
                [117.603744, 27.301748],
                [117.59765, 27.29885],
                [117.593187, 27.29946],
                [117.590011, 27.301595],
                [117.587951, 27.305637],
                [117.586063, 27.307163],
                [117.581257, 27.309222],
                [117.571214, 27.311815],
                [117.556709, 27.320203],
                [117.547954, 27.320203],
                [117.533792, 27.313188],
                [117.531475, 27.310518],
                [117.529672, 27.307544],
                [117.525123, 27.303006],
                [117.523406, 27.300718],
                [117.521689, 27.297086],
                [117.5192, 27.293196],
                [117.510016, 27.281143],
                [117.503922, 27.275041],
                [117.499974, 27.272829],
                [117.494138, 27.267107],
                [117.484181, 27.26375],
                [117.479718, 27.259859],
                [117.476628, 27.25467],
                [117.46547, 27.242537],
                [117.464955, 27.237119],
                [117.461178, 27.230937],
                [117.456886, 27.224297],
                [117.442638, 27.214756],
                [117.430278, 27.203535],
                [117.421867, 27.197962],
                [117.41912, 27.19384],
                [117.417575, 27.185518],
                [117.412254, 27.178799],
                [117.406589, 27.176279],
                [117.398349, 27.17605],
                [117.389423, 27.172156],
                [117.385303, 27.166429],
                [117.379295, 27.164062],
                [117.372429, 27.164749],
                [117.367451, 27.164214],
                [117.359898, 27.15757],
                [117.343419, 27.157188],
                [117.339986, 27.155279],
                [117.335523, 27.15062],
                [117.326425, 27.14703],
                [117.322477, 27.143746],
                [117.316469, 27.136337],
            ];
            const lineArr1 = [
                [117.609167, 27.302561],
                [117.606753, 27.30202],
                [117.605927, 27.301924],
                [117.604935, 27.301919],
                [117.604114, 27.301978],
                [117.603717, 27.301945],
                [117.603096, 27.3017],
                [117.602686, 27.301202],
                [117.602578, 27.300797],
                [117.602643, 27.300425],
                [117.603125, 27.299781],
                [117.603839, 27.299529],
                [117.606221, 27.299102],
                [117.60667, 27.298947],
                [117.607791, 27.298103],
                [117.611257, 27.294404],
                [117.61174, 27.293651],
                [117.612307, 27.292272],
                [117.612463, 27.291538],
                [117.612565, 27.29078],
                [117.612592, 27.290065],
                [117.61249, 27.288816],
                [117.612313, 27.286566],
                [117.612173, 27.284921],
                [117.612138, 27.284248],
                [117.612138, 27.283437],
                [117.612208, 27.282193],
                [117.612411, 27.2803],
                [117.612647, 27.279008],
                [117.612706, 27.278574],
                [117.612706, 27.278574],
                [117.612765, 27.276891],
                [117.612669, 27.27589],
                [117.612406, 27.274468],
                [117.611268, 27.271894],
                [117.609831, 27.269624],
                [117.609294, 27.268327],
                [117.609294, 27.268327],
                [117.607299, 27.258962],
                [117.607578, 27.256253],
                [117.607299, 27.254212],
                [117.60702, 27.25343],
                [117.604716, 27.248567],
                [117.604459, 27.247575],
                [117.604351, 27.246431],
                [117.604287, 27.244923],
                [117.604931, 27.237731],
                [117.607227, 27.230252],
                [117.61169, 27.201915],
                [117.611754, 27.200866],
                [117.611626, 27.199682],
                [117.611304, 27.198156],
                [117.610188, 27.195598],
                [117.609909, 27.194167],
                [117.610424, 27.18428],
                [117.610896, 27.182295],
                [117.61169, 27.180558],
                [117.612591, 27.179279],
                [117.613128, 27.178611],
                [117.614823, 27.177141],
                [117.62523, 27.172521],
                [117.628448, 27.17193],
                [117.632761, 27.171395],
                [117.636195, 27.170994],
                [117.638255, 27.170288],
                [117.640379, 27.168608],
                [117.642396, 27.163893],
                [117.642439, 27.163988],
                [117.644456, 27.16122],
                [117.650464, 27.156962],
                [117.654369, 27.152017],
                [117.655678, 27.151196],
                [117.659862, 27.149249],
                [117.66351, 27.143712],
                [117.664991, 27.142241],
                [117.666943, 27.141077],
                [117.676664, 27.137811],
                [117.678295, 27.136723],
                [117.679046, 27.136016],
                [117.679646, 27.135291],
                [117.68014, 27.133734],
                [117.680247, 27.132884],
                [117.680097, 27.131433],
                [117.679239, 27.129199],
                [117.678681, 27.127155],
                [117.677436, 27.113576],
                [117.677114, 27.112602],
                [117.674282, 27.108782],
                [117.673738, 27.107368],
                [117.673609, 27.105668],
                [117.673802, 27.104808],
                [117.674811, 27.101618],
                [117.675025, 27.100434],
                [117.674575, 27.097072],
                [117.673867, 27.095448],
                [117.671935, 27.093099],
                [117.666163, 27.087979],
                [117.664511, 27.084808],
                [117.664254, 27.083757],
                [117.663787, 27.080328],
                [117.665418, 27.068692],
                [117.665117, 27.06296],
                [117.666555, 27.059558],
                [117.668422, 27.057456],
                [117.673142, 27.054112],
                [117.675889, 27.051265],
                [117.677198, 27.048303],
                [117.677627, 27.044958],
                [117.675932, 27.0389],
                [117.676061, 27.036301],
                [117.677734, 27.032134],
                [117.678142, 27.030165],
                [117.678163, 27.029821],
                [117.677477, 27.023934],
                [117.679108, 27.009864],
                [117.68179, 27.003384],
                [117.68179, 27.003384],
                [117.690695, 26.991453],
                [117.69284, 26.989159],
                [117.698312, 26.98631],
                [117.701896, 26.983231],
                [117.705071, 26.979311],
                [117.708977, 26.977418],
                [117.711852, 26.975391],
                [117.721122, 26.961468],
                [117.722023, 26.959307],
                [117.722667, 26.954698],
                [117.724383, 26.94938],
                [117.724448, 26.947755],
                [117.723525, 26.943623],
                [117.724018, 26.940352],
                [117.725671, 26.93775],
                [117.730542, 26.934154]
            ]
            const firstArr = [118.029733, 27.696976];
            let that = this;
            if (!window.AMap) {
                return;
            }
            const opts = {
                subdistrict: 0,
                extensions: "all",
                level: "city",
            };
            //直接通过经纬度构建mask路径
            // eslint-disable-next-line no-undef
            const district = new AMap.DistrictSearch(opts);
            this.satelliteLayer = new AMap.TileLayer.Satellite()
            district.search("南平市", function (status, result) {
                const bounds = result.districtList[0].boundaries;
                const mask = [];
                for (let i = 0; i < bounds.length; i += 1) {
                    mask.push([bounds[i]]);
                }

                // eslint-disable-next-line no-undef
                const Map = new AMap.Map(that.idHash, {
                    mask: mask, //只显示包裹起来的区域
                    resizeEnable: false, //是否监控地图容器尺寸变化
                    showIndoorMap: false, //关闭室内地图
                    center: [117.99, 27.55],
                    viewMode: "3D",
                    dragEnable: false, //初始状态下不可移动
                    // pitch: 0,
                    zoom: 11.6,
                    zooms: [8, 13.87],
                    features: that.depFeatures, //初始色块模式下，不显示标注等信息

                    // mapStyle: "amap://styles/54555a5s5as4d5as4d5a154s", //设置地图的显示样式
                });
                Map.add(that.satelliteLayer)
                that.map = Map; //把这里面创建的地图对象存起来，让这个指针指向它，后续要使用

                //青海省描边--（原因是黄南中间有块地方，是属于海南自治区的。）
                for (let i = 0; i < bounds.length; i += 1) {
                    // eslint-disable-next-line no-undef
                    new AMap.Polyline({
                        path: bounds[i],
                        strokeColor: "#1a77aa",
                        strokeWeight: 5,
                        map: Map,
                    });
                }
                //监听地图的缩放事件
                Map.on("zoomstart", function () {
                    console.log("放大级别：", Map.getZoom());
                    if (Map.getZoom() >= 7) {
                        that.zoomChange();
                    } else {
                        //重新显示行政区色块
                        that.disProvinces.show();
                        //且需要关闭街景模式
                        that.depFeatures = [];
                        that.setFeature(that.map);
                        //重新显示描边
                        for (let i = 0; i < that.lineArr.length; i++) {
                            that.lineArr[i].show();
                        }
                        for (let i = 0; i < that.lineArr1.length; i++) {
                            that.lineArr1[i].show();
                        }
                    }
                });
                that.map.setStatus({
                    dragEnable: true, //切换成街景模式需要开启可拖拽模式
                });
                that.pointsList.forEach((item, index) => {
                    const marker = new AMap.Marker({
                        map: Map,
                        position: [Number(item.longitude), Number(item.latitude)],
                        icon: new AMap.Icon({
                            image: require("../assets/images/1qiangxingshexiangtou.png"),
                            size: new AMap.Size(26, 26), //图标所处区域大小
                            imageSize: new AMap.Size(26, 26), //图标大小
                        }),
                        offset: new AMap.Pixel(-18, -10), // 调整图片偏移
                        autoRotation: true, // 自动旋转
                        angle: 0, // 图片旋转角度
                        content: '<img class="marker" src="https://niuqi-kj.oss-cn-shanghai.aliyuncs.com/gaosu/6d9c730c8c0ae96ecc96c06397c3b48.png" />',
                    });
                    marker.on("click", (e) => {
                        that.count = index
                        Map.setZoom(12)
                        Map.setCenter([Number(item.longitude), Number(item.latitude)])
                        that.$emit('countObj',{'count':that.count,'itemPointsList':that.pointsList})
                    });
                    const markerStyle = document.createElement('style');
                    markerStyle.textContent = `
                    .marker {
                        width: 30px;
                        height: 30px;
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        animation: bounce 1.5s infinite alternate;
                    }

                    @keyframes bounce {
                        0% {
                        transform: translate(-50%, -50%);
                        }
                        50% {
                        transform: translate(-50%, -70%);
                        }
                        100% {
                        transform: translate(-50%, -50%);
                        }
                    }
                    `;
                    document.head.appendChild(markerStyle);
                })
                that.polyline = new AMap.Polyline({
                    map: Map,
                    path: lineArr,
                    showDir: true,
                    strokeColor: "#3264ed", // 线颜色--浅蓝色
                    strokeOpacity: 1, //线透明度
                    strokeWeight: 6, // 线宽
                    // strokeStyle: "solid"  //线样式
                    lineJoin: "round", // 折线拐点的绘制样式
                });
                that.polyline1 = new AMap.Polyline({
                    map: Map,
                    path: lineArr1,
                    showDir: true,
                    strokeColor: "#3264ed", // 线颜色--浅蓝色
                    strokeOpacity: 1, //线透明度
                    strokeWeight: 6, // 线宽
                    // strokeStyle: "solid"  //线样式
                    lineJoin: "round", // 折线拐点的绘制样式
                });
                that.map.setFitView();
            });
        },
        //监听鼠标滚轮事件，一旦用户放大地图则切换成街景模式
        zoomChange() {
            if (this.depFeatures.length > 0) {
                console.log("已经开启街景地图，不做处理");
                return;
            } else {
                this.depFeatures = ["bg", "road", "building", "point"];
                this.map.setStatus({
                    dragEnable: true, //切换成街景模式需要开启可拖拽模式
                });
                this.setFeature(this.map);
                // this.map.clearMap(); //清除所有覆盖物
                // this.removePoly("polygon"); //清除选定的覆盖物
                // this.removePoly("polyline"); //清除选定的行政区边界
                this.disProvinces.hide(); //隐藏行政区色块图层
                for (let i = 0; i < this.lineArr.length; i++) {
                    //也可以不清除，而是采用隐藏，因为后续要重新显示
                    this.lineArr[i].hide();
                }
            }
        },
        async getPointsList() {
            const res = await getDeviceList()
            if (res.code == 200) {
                this.pointsList = []
                res.data.forEach((item, index) => {
                    // type=1 高速公路边坡 type=0 茶园
                    if (item.type == 1) {
                        this.pointsList.push(item)
                    }
                })
            }
        },
        // 点击地图
        pointsClick(e, ind) {
            this.count = ind
            this.map.setZoom(12)
            this.map.setCenter([Number(e.longitude), Number(e.latitude)])
            this.$emit('countObj',{'count':this.count,'itemPointsList':this.pointsList})
        },
        // 点位自动切换
        timerFun() {
            this.timerId = window.setInterval(() => {
                if (this.count == null) {
                    this.count = 0
                } else {
                    if (this.count + 1 == this.pointsList.length) {
                        this.count = 0
                    } else {
                        this.count = this.count + 1
                    }
                }
                this.map.setZoom(12)
                this.map.setCenter([Number(this.pointsList[this.count].longitude), Number(this.pointsList[this.count].latitude)])
            }, 5000)
        },
        // 监听鼠标移入地图区域
        handleMouseOver() {
            window.clearInterval(this.timerId);
        },
        // 监听鼠标移出地图
        handleMouseOut() {
            // this.timerFun()
        }
    },
    // 组件销毁时清楚定时器
    beforeDestroy() {
        window.clearInterval(this.timerId);
    }
};
</script>
<style lang="less" scoped>
.container {
    height: 100%;
    width: 100%;
    background-color: transparent !important;
    background-image: none !important;
    position: relative;

    .point_btn {
        width: calc(100% - 100px);
        position: absolute;
        bottom: 30px;
        z-index: 99;
        display: flex;
        justify-content: space-between;
        padding: 0 50px;

        >li {
            cursor: pointer;
            border: 2px solid #fff;
            border-radius: 5px;
            padding: 5px 5px;
            font-size: 12px;
            color: #fff;
            font-weight: 700;
            box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.4);
        }

        .point_btn_liStyle {
            background-color: #2d8cf0;
            border: 2px solid #2d8cf0;
            animation: li-style 2s infinite;
        }

        @keyframes li-style {
            0% {
                box-shadow: 0px 0px 3px 1px rgba(255, 255, 255, 0.0);
            }

            50% {
                box-shadow: 0px 0px 3px 1px rgba(255, 255, 255, 1);
            }

            100% {
                box-shadow: 0px 0px 3px 1px rgba(255, 255, 255, 0.0);
            }
        }

    }
}

/deep/.amap-logo {
    display: none !important;
}

/deep/.amap-copyright {
    opacity: 0;
}
</style>
  