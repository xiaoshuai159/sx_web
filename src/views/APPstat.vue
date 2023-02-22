<template>
	<div>
		<el-row :gutter="10">
            <el-col :span="16">
                <el-card style="height:395px">
                    <div style="display:flex;align-content: space-between;">
                        <div style="width:33%">
                            <span class="top-text">APP监测总量 : 1056</span><br/>
                            <span class="bottom-text">同比上周 +1.5%</span><br/>
                            <span class="top-text">已备案APP数量 : 1001</span><br/>
                            <span class="bottom-text">同比上周 +0.9%</span><br/>
                            <span class="top-text">未备案APP数量 : 55</span><br/>
                            <span class="bottom-text">同比上周 +1.8%</span><br/>
                            <span class="top-text">APP下载量 : 987102</span><br/>
                            <span class="bottom-text">同比上周 +3.5%</span><br/>
                        </div>
                        <div id="lineChart" :style="{ width: '95%'}"></div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card style="height:395px">
                    <div id="pieChart" :style="{ width: '99%',height:'345px'}"></div>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="10" style="margin-top: 10px;">
            <el-col :span="12">
                <el-card>
                    <span style="display: block; margin:0 0 20px 0;font-size: 18px;">下架信息</span>
                    <el-table :data="tableData" style="width: 100%" max-height="290">
                        <el-table-column prop="time" label="Time" width="180" />
                        <el-table-column prop="name" label="Name" width="90" />
                        <el-table-column prop="type" label="Type" width="90"/>
                        <el-table-column prop="because" label="Because"/>
                    </el-table>
                </el-card>
                
            </el-col>
            <el-col :span="12">
                <el-card>
                    <div id="barChart" :style="{ width: '99%',height:'323px'}"></div>
                </el-card>               
            </el-col>
        </el-row>
	</div>
</template>

<script setup lang="ts" name="APPstat">
import * as echarts from 'echarts'
import { onMounted, reactive,ref } from 'vue';
function initOption1(){
	type EChartsOption = echarts.EChartsOption;
	const myLineChart = echarts.init(document.getElementById('lineChart'));
        let option:EChartsOption = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
                }
            },
            legend: {
                data: ['下载量', '监测量']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                type: 'category',
                boundaryGap: false,
                data: ['06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00', '24:00']
                }
            ],
            yAxis: [
                {
                type: 'value'
                }
            ],
            series: [
                {
                color: '#8e9dff',
                name: '下载量',
                type: 'line',
                smooth: true,
                stack: 'Total',
                areaStyle: {
                    color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                        {
                        offset: 0.25,
                        color: '#8e9dff'
                        },
                        {
                        offset: 1,
                        color: '#fff'
                        }
                    ]
                    }
                },
                emphasis: {
                    focus: 'series'
                },
                data: [4623, 6145, 6268, 6411, 1890, 4251, 2978, 3880, 3606, 4311]
                },
                {
                color: '#26deca',
                name: '监测量',
                type: 'line',
                smooth: true,
                stack: 'Total',
                areaStyle: {
                    color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                        {
                        offset: 0.25,
                        color: '#26deca'
                        },
                        {
                        offset: 1,
                        color: '#fff'
                        }
                    ]
                    }
                },
                emphasis: {
                    focus: 'series'
                },
                data: [2208, 2016, 2916, 4512, 8281, 2008, 1963, 2367, 2956, 678]
                }
            ]
            }
        option && myLineChart.setOption(option);
        myLineChart.resize();
}

function initOption2(){
	type EChartsOption = echarts.EChartsOption;
	const myPieChart = echarts.init(document.getElementById('pieChart'));
        let option:EChartsOption = {
            title:{
                text:'应用商店分布'
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                bottom: '1%',
                left: 'center',
                itemStyle: {
                borderWidth: 0
                }
            },
            series: [
                {
                color: ['#5da8ff', '#8e9dff', '#fedc69', '#26deca','#b955a4'],
                name: '数量',
                type: 'pie',
                center: ['50%', '45%'], 
                radius: ['35%', '60%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 1
                },
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                    show: true,
                    fontSize: '12'
                    }
                },
                labelLine: {
                    show: false
                },
                data: [
                    { value: 20, name: 'APPLE应用商店' },
                    { value: 10, name: 'XIAOMI应用商店' },
                    { value: 30, name: 'OPPO应用商店' },
                    { value: 40, name: 'HUAWEI应用商店' },
                    { value: 25, name: '其他' },
                ]
                }
            ]
        }
        option && myPieChart.setOption(option);
        myPieChart.resize()
}
function initOption3(){
	type EChartsOption = echarts.EChartsOption;
	const myBarChart = echarts.init(document.getElementById('barChart'));
        let option:EChartsOption = {
            title:{
				text:'下载量分布',
				x:'2%',
				y:'2%',
				textStyle:{
					color:'#666666'
				}
			},
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {},
          grid: {
            top:'15%',
            left: '3%',
            right: '4%',
            bottom:'1%',
            containLabel: true
          },
          xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01]
          },
          yAxis: {
            type: 'category',
            data: ['实用','医疗','体育','学习','图书','影音','社交','游戏']
          },
          series: [
            {              
              type: 'bar',
              data: [242,156,128,396,285,165,250,144].reverse()
            }
          ]
        }
        option && myBarChart.setOption(option);
        myBarChart.resize();
}
onMounted(()=>{
	initOption1()
    initOption2()
    initOption3()
})
const tableData = [
  {
    time: '2023-02-14 10:12:15',
    name: 'APP1',
    type: '金融',
    because:'涉嫌诈骗'
  },
  {
    time: '2023-02-14 10:12:15',
    name: 'APP2',
    type: '医疗',
    because:'信息泄露'
  },
  {
    time: '2023-02-14 10:12:15',
    name: 'APP3',
    type: '游戏',
    because:'大量投诉'
  },
  {
    time: '2023-02-14 10:12:15',
    name: 'APP4',
    type: '社交',
    because:'评分过低'
  },
  {
    time: '2023-02-14 10:12:15',
    name: 'APP5',
    type: '金融',
    because:'大量举报'
  },
  {
    time: '2023-02-14 10:12:15',
    name: 'APP6',
    type: '社交',
    because:'评分过低'
  },
]
</script>

<style scoped>
.top-text{
    font-size: 16px;
    font-weight: 600;
}
.bottom-text{
    display: block;
    font-size: 14px;
    color: #aaaaaa;
    margin: 6px 0 20px 0;
}
</style>