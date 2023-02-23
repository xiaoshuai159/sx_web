<template>
    <div>
        <div class="map-header-text"> 山西省 </div>
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
                        涉及城市数量：{{ area_num }}<br />
                        涉及单位数量：{{ unit_num }}<br />
                        涉及IP数量：{{ ip_num }}
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script setup lang="ts" name="provincePage">
import { onMounted, ref } from "vue"
import axios from "axios";
import * as echarts from 'echarts'
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
        value: "涉及单位数量",
        label: "涉及单位数量",
    },
]
async function initChart() {
    type EChartsOption = echarts.EChartsOption;
    const mapChart = echarts.init(document.getElementById('map_ref'));
    const ret = await axios.get(`../../map/省级/山西省.json`);
    echarts.registerMap("山西省", ret.data)
    const initOption = {
        geo: [
            {
                type: "map",
                map: "山西省",
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
}
onMounted(() => {
    initChart()
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