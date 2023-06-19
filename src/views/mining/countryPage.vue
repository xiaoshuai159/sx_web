<template>
    <div class="container" style="padding:12px">
        <div class="map-header-text"> 全国 </div>
        <el-divider></el-divider>
        <div>
            <el-row style="height: 30px; text-align: left;">
                <el-col>
                    <el-select v-model="query" class="sel" style="width: 140px;margin-left: 15%">
                        <el-option v-for="item in options" :key="item.value" :value="item.value" :label="item.label">
                        </el-option>
                    </el-select>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="4">
                    <div style="color: transparent;"> 占位</div>
                </el-col>
                <el-col :span="13">
                    <div>
                        <div id="map_ref" style="height: 400px"></div>
                    </div>
                </el-col>
                <el-col :span="4">
                    <div style="text-align: left; line-height: 40px;width:200px;">
                        涉及省份数量：{{ area_num }}<br />
                        涉及矿池数量：{{ unit_num }}<br />
                        涉及IP数量：{{ ip_num }}
                    </div>
                </el-col>
            </el-row>
        </div>
        <el-divider></el-divider>
        <el-header style="
           text-align: left;
            font-size: 20px;
            height: 30px;
            margin-top: 15px;
            margin-bottom: 7px;
          ">全国挖矿IP概览</el-header>
          <el-row>
        <el-col :span="24">
          <div>
            <xiangqing></xiangqing>
          </div>
        </el-col>
      </el-row>
    </div>
</template>

<script setup lang="ts" name="countryPage">
import { onMounted, ref, onBeforeUnmount,onBeforeMount } from "vue"
import axios from "axios";
import xiangqing from "../../components/mining/xiangqing.vue";
import * as echarts from 'echarts'
import {useMiningStore} from '../../store'
import router from "../../router";
import chinaGeoJSON from '../../../public/map/china.json'
const query = ref("涉及IP数量")
const area_num = ref(12)
const unit_num = ref(38)
const ip_num = ref(128)
const options = [
    {
        value: "涉及IP数量",
        label: "涉及IP数量",
    },
    {
        value: "涉及矿池数量",
        label: "涉及矿池数量",
    },
]
let mapChart:any = '' 
const store = useMiningStore()
async function initChart() {
    const excludedRegions = ['南沙群岛', '西沙群岛', '中沙群岛', '三沙市'];
const filteredGeoJSON = chinaGeoJSON;
filteredGeoJSON.features = filteredGeoJSON.features.filter((feature) => !excludedRegions.includes(feature.properties.name));
    mapChart = echarts.init(document.getElementById('map_ref')!);
    const ret = await axios.get(`../../map/china.json`);
    echarts.registerMap("china", ret.data)
    const initOption = {
        geo: [
            // {
            //     type: "map",
            //     map: "china",
            //     roam: false,
            //     zoom: 1.2,
            // },
            {
                map: 'china',
                zlevel:5,
                zoom: 1.2,
                label: {
                    show: true,
                    color: '#6a6a70'
                },
                itemStyle: {
                    color: '#dde5ff', // 背景
                    borderWidth: '1', // 边框宽度
                    borderColor: '#b6caf6', // 边框颜色
                }
            },
            {
                map: 'china',
                top:'11%',
                zlevel:4,
                zoom: 1.2,
                itemStyle: {
                    color: '#879bc7', // 背景
                    borderWidth: '1', // 边框宽度
                    borderColor: '#879bc7', // 边框颜色
                }
            },
            {
                map: 'china',
                top:'12%',
                zlevel:3,
                zoom: 1.2,
                itemStyle: {
                    color: '#879bc7', // 背景
                    borderWidth: '1', // 边框宽度
                    borderColor: '#879bc7', // 边框颜色
                }
            },
        ],

        series: {
            data: [
                // {name: '大同市',value: 25},
                // {name:'太原市',value: 75},
            ],
            geoIndex: 0, //将数据与第0个geo配置关联在一起
            type: "map",
            geoJson:filteredGeoJSON
        },

        tooltip: {
            show: true,
            trigger: "item",
            triggerOn: "mousemove",
            padding: 10,
            // formatter: function (params) {
            //   if (params.data == undefined) {
            //     return `${params.name}</br>数量：0`;
            //   } else {
            //     return `${params.data.name}</br>数量：${params.data.value}`;
            //   }
            //   // if(params.data.name) { }
            //   // else { return }
            // },
        },
    };
    mapChart.setOption(initOption, true)
    mapChart.on("click",(arg:any)=>{
        
        store.updateprovince(arg.name)
        // console.log(store.city);
        router.push({
            name:'provincePage',
            // params:{
            //     arg: arg,
            // }
        })
    })
}
onMounted(() => {
    initChart()
})
onBeforeUnmount(() => {
    mapChart.dispose()
})
</script>

<style lang="less" scoped>
.el-divider--horizontal {
    display: block;
    height: 1px;
    width: 100%;
    margin: 10px 0;
}

:deep(.el-input__wrapper) {
    background-color: transparent;
}
</style>
<style>
.map-header-text {
    display: inline-block;
    margin-left: 15px;
    width: 58%;
    font-size: 20px;
    text-align: left;
    cursor: pointer;
}
/* .map-header-text:hover {
    cursor: pointer;
    color:blue
} */
.map-header-time {
    display: inline-block;
    width: 40%;
    text-align: right;
}

.app-main {
    padding: 8px 50px
}

.sel {
    position: absolute;
    clip: rect(5px 130px 30px 10px);
    width: 120px;
    height: 24px;
    line-height: 24px;
    font-size: 15px;
}
</style>