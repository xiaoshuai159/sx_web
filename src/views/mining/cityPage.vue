<template>
    <div>
        <div class="map-header-text">
            <span @click="textlink1()" style="cursor:pointer;">山西省</span><span v-html="'\u00a0'"></span>
          >
          <span v-html="'\u00a0'"></span><span style="cursor:pointer;">{{useMiningStore().city}}</span><span v-html="'\u00a0'"></span></div>
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
                        涉及区县数量：{{ area_num }}<br />
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
          ">{{useMiningStore().city}}挖矿IP概览</el-header>
          <el-row>
        <el-col :span="24">
          <div>
            <xiangqing3></xiangqing3>
          </div>
        </el-col>
      </el-row>
        
    </div>
</template>

<script setup lang="ts" name="cityPage">
import { onMounted, ref, onBeforeUnmount } from "vue"
import axios from "axios";
import xiangqing3 from "../../components/mining/xiangqing3.vue";
import * as echarts from 'echarts'
import {useMiningStore} from '../../store'
import router from "../../router";
const query = ref("涉及IP数量")
const area_num = ref(58)
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
async function initChart() {
    type EChartsOption = echarts.EChartsOption;
    mapChart = echarts.init(document.getElementById('map_ref'));
    const ret = await axios.get(`../../map/省级/市级/${useMiningStore().city}.json`);
    echarts.registerMap(`${useMiningStore().city}`, ret.data)
    const initOption = {
        geo: [
            {
                type: "map",
                map: `${useMiningStore().city}`,
                roam: false,
                zoom: 1.2,
            },
        ],

        series: {
            data: [],
            geoIndex: 0, //将数据与第0个geo配置关联在一起
            type: "map",
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
    mapChart.on("click",(arg)=>{
        const store = useMiningStore()
        store.$patch({
            area:arg.name
        })
        console.log(store.area);
        router.push({
            name:'areaPage',
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
.content {
    width: auto;
    height: 100%;
    padding: 10px;
    box-sizing: border-box;
    background-color: white;
}
.map-header-text {
    display: inline-block;
    margin-left: 15px;
    width: 58%;
    font-size: 20px;
    text-align: left;
    cursor: pointer;
}

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