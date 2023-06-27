<template>
    <div >
        <el-tabs type="border-card" @tab-change="changeTab">
            <el-tab-pane label="APP事件统计" style="width:100%">
                <el-row :gutter="10">
            <el-col :span="16">
                <el-card style="height:395px">
                    <div style="display:flex;align-content: space-between;">
                        <div style="width:33%">
                            <span class="top-text">APP监测总量 : 1056</span><br />
                            <span class="bottom-text">同比上周 +1.5%</span><br />
                            <span class="top-text">已备案APP数量 : 1001</span><br />
                            <span class="bottom-text">同比上周 +0.9%</span><br />
                            <span class="top-text">未备案APP数量 : 55</span><br />
                            <span class="bottom-text">同比上周 +1.8%</span><br />
                            <span class="top-text">APP下载量 : 987102</span><br />
                            <span class="bottom-text">同比上周 +3.5%</span><br />
                        </div>
                        <div id="lineChart" :style="{  width: '92%', height: '323px' }"></div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card style="height:395px;" :body-style="{ padding: '0px' }">
                    <div class="card-body-title">
                        <span class="start-png"></span>
                        <span class="card-title-text">应用商店分布</span> 
                        <p class="dashed-bottom"></p>
                        <p class="end-png"></p>
                    </div>
                    <div id="pieChart" :style="{ width: '92%', height: '345px' }"></div>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="10" style="margin-top: 10px;">
            <el-col :span="8">
                <el-card>
                    <div class="card-body-title" style="margin: -20px -20px 0 -20px;">
                        <span class="start-png"></span>
                        <span class="card-title-text">下架信息</span> 
                        <p class="dashed-bottom"></p>
                        <p class="end-png"></p>
                    </div>
                    <el-table :data="tableData2" style="width: 100%" max-height="290" stripe>
                        <el-table-column prop="time" label="Time" min-width="160" />
                        <el-table-column prop="name" label="Name" min-width="90" />
                        <el-table-column prop="type" label="Type" min-width="90" />
                        <el-table-column prop="because" label="Because" min-width="90" />
                    </el-table>
                </el-card>

            </el-col>
            <el-col :span="8">
                <el-card>
                    <div class="card-body-title" style="margin: -20px -20px 0 -20px;">
                        <span class="start-png"></span>
                        <span class="card-title-text">应用类型分布</span> 
                        <p class="dashed-bottom"></p>
                        <p class="end-png"></p>
                    </div>
                    <div id="pieChart2" :style="{  width: '92%', height: '273px' }"></div>
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card>
                    <div class="card-body-title" style="margin: -20px -20px 0 -20px;">
                        <span class="start-png"></span>
                        <span class="card-title-text">下载量分布</span> 
                        <p class="dashed-bottom"></p>
                        <p class="end-png"></p>
                    </div>
                    <div id="barChart" :style="{ width: '92%', height: '273px' }"></div>
                </el-card>
            </el-col>
            
        </el-row>
            </el-tab-pane>
            <el-tab-pane label="APP综合查询">
                <div class="container ">
                    <div class="handle-box"> 
                        <span class="spanText">APP名称：</span><el-input placeholder="请输入内容"
                            style="width:13%;margin-right: 20px;"></el-input>
                        <span class="spanText">应用商店：</span>
                        <el-select v-model="value" class="m-2" placeholder="Select" style="width:13%; margin-right: 20px;">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                        </el-select>
                        <span class="spanText">开发者：</span><el-input placeholder="请输入内容" 
                            style="width:13%;margin-right: 20px;"></el-input>
                        <span class="spanText">简介关键字：</span><el-input placeholder="请输入内容" 
                            style="width:13%;margin-right: 20px;"></el-input> <br><br>
                        <span class="spanText">下载量：</span><el-input placeholder="请输入" 
                            style="width:8%;margin-right: 10px;"></el-input>至：<el-input placeholder="请输入" 
                            style="width:8%;margin-right: 20px;"></el-input>
                        <span class="spanText">包名：</span><el-input placeholder="请输入内容" 
                            style="width:13%;margin-right: 20px;"></el-input>
                        <el-button @click="handleSearch">查询</el-button>
                        <el-button>导出</el-button>
                            <!-- <el-button type="success" @click="handleAdd">新增</el-button>
                            <el-button type="danger" @click="handleDel">删除</el-button> -->
                    </div>
		
		<el-table ref="multipleTableRef" :data="tableData" class="tableStyle" style="width: 100%" @selection-change="handleSelectionChange" stripe>
			<el-table-column type="selection" min-width="55" />
			<el-table-column prop="num" label="序号" min-width="80" />
			<el-table-column prop="name" label="APP名称" min-width="120" show-overflow-tooltip/>
            <el-table-column prop="developer" label="开发者" min-width="90" show-overflow-tooltip/>
            <el-table-column prop="sha1" label="sha1" min-width="90" show-overflow-tooltip/>
            <el-table-column prop="shopName" label="商店名称" min-width="90" show-overflow-tooltip/>
			<el-table-column prop="pcapName" label="包名" min-width="120" show-overflow-tooltip/>
			<!-- <el-table-column prop="operator" label="APP运营商" min-width="120" show-overflow-tooltip/> -->
			
			<el-table-column prop="version" label="版本" min-width="80" show-overflow-tooltip/>
            <el-table-column prop="downloadNum" label="下载量" min-width="80" show-overflow-tooltip/>
			<!-- <el-table-column prop="info" label="APP简介" min-width="120" show-overflow-tooltip/>
			<el-table-column prop="condition" label="在架状态/下架时间(不在架)" min-width="120" show-overflow-tooltip/>
			<el-table-column prop="isRecord" label="是否备案" min-width="80" show-overflow-tooltip/>
			<el-table-column prop="recordTel" label="备案号码" min-width="100" show-overflow-tooltip/>
			<el-table-column prop="premissInfo" label="应用权限信息" min-width="110" show-overflow-tooltip/> -->
			<el-table-column prop="operate" label="操作" min-width="90">
				<template #default="scope">
					<el-button text type="primary" size="small" @click="handleEdit(scope.$index, scope.row)" v-permiss="15">详情</el-button>
					
				</template>
			</el-table-column>
		</el-table>
		<el-dialog v-model="dialogTableVisible" title="APP信息详情" :append-to-body='true' >
			<!-- <el-form :model="form">
				<el-form-item label="序号" :label-width="formLabelWidth">
					<el-input v-model="form.num" autocomplete="off" />
				</el-form-item>
				<el-form-item label="应用名" :label-width="formLabelWidth">
					<el-input v-model="form.name" autocomplete="off" />
				</el-form-item>
				<el-form-item label="包名" :label-width="formLabelWidth">
					<el-input v-model="form.pcapName" autocomplete="off" />
				</el-form-item>
				<el-form-item label="运营商" :label-width="formLabelWidth">
					<el-input v-model="form.operator" autocomplete="off" />
				</el-form-item>
				<el-form-item label="开发者" :label-width="formLabelWidth">
					<el-input v-model="form.developer" autocomplete="off" />
				</el-form-item>
				<el-form-item label="版本" :label-width="formLabelWidth">
					<el-input v-model="form.version" autocomplete="off" />
				</el-form-item>
				<el-form-item label="简介" :label-width="formLabelWidth">
					<el-input v-model="form.info" autocomplete="off" />
				</el-form-item>
				<el-form-item label="在架状态" :label-width="formLabelWidth">
					<el-input v-model="form.condition" autocomplete="off" />
				</el-form-item>
				<el-form-item label="是否备案" :label-width="formLabelWidth">
					<el-input v-model="form.isRecord" autocomplete="off" />
				</el-form-item>
				<el-form-item label="备案号码" :label-width="formLabelWidth">
					<el-input v-model="form.recordTel" autocomplete="off" />
				</el-form-item>
				<el-form-item label="权限信息" :label-width="formLabelWidth">
					<el-input v-model="form.premissInfo" autocomplete="off" :rows="2" type="textarea" />
				</el-form-item>
			</el-form> -->
            <div class="dialog-body">
						<div class="dialog-body-title">
							<span class="start-png"></span>
							基础信息
							<p class="dashed-bottom"></p>
							<p class="end-png"></p>
						</div>
                        <div class="my-el-row">
                            <div><span class="dialog-body-left">APP名称：</span><span class="dialog-body-right">TikTok</span></div>
                            <div><span class="dialog-body-left">应用商店：</span><span class="dialog-body-right">小米应用商店</span></div> 
                            <div><span class="dialog-body-left">版本号：</span><span class="dialog-body-right">12.3.1</span></div>
                        </div>
                        <div class="my-el-row">
                            <div><span class="dialog-body-left">下载量：</span><span class="dialog-body-right">12333</span></div>
                            <div><span class="dialog-body-left">包名：</span><span class="dialog-body-right">com.ss.android.trill</span></div>
                            <div><span class="dialog-body-left">apk文件大小：</span><span class="dialog-body-right">15351</span></div>
                        </div>
                        <div class="my-el-row">
                            <div><span class="dialog-body-left">版本名称：</span><span class="dialog-body-right">01.05.0071</span></div>
                            <div><span class="dialog-body-left">主办单位：</span><span class="dialog-body-right">-</span></div>
                        </div>
                        <div style="margin-top: 6px;">
                            <div style="margin-bottom: 6px;"><span class="dialog-body-left">下载地址：</span><span class="dialog-body-right">http://d7.xiaotongqq.com/ttdl.apk</span></div>
							<div style="margin-bottom: 6px;"><span class="dialog-body-left">APP描述：</span><span class="dialog-body-right">TikTok 是一款全球流行的短视频社交应用，用户可以通过拍摄、剪辑和分享短视频来展示自己的才华和创意。</span></div>
                        </div>
						<!-- <br>
						<div class="dialog-body-title">
							<span class="start-png"></span>
							告警信息
							<p class="dashed-bottom"></p>
							<p class="end-png"></p>
						</div>
						<div class="dialog-body-content">
							<div><span class="dialog-body-left">告警类型：</span><span class="dialog-body-right">数据库密码爆破</span></div>
							<div><span class="dialog-body-left">告警等级：</span><span class="dialog-body-right">高级</span></div>
							<div><span class="dialog-body-left">告警载荷：</span><span class="dialog-body-right">/x0qrvdngfe</span></div>	
						</div>
						<br>
						<div class="dialog-body-title">
							<span class="start-png"></span>
							威胁情报
							<p class="dashed-bottom"></p>
							<p class="end-png"></p>
						</div>
						<div style="margin-top: 6px;margin-left: 5px; font-size: 18px;font-weight: 600;">pool.use-138.com</div>
						<div class="dialog-body-content">							
							<div><span class="dialog-body-left">情报标签</span> <span class="dialog-body-right">暂无</span></div>
							<div><span class="dialog-body-left">运营商</span> <span class="dialog-body-right">暂无</span></div>
							<div><span class="dialog-body-left">置信度</span> <span class="dialog-body-right">暂无</span></div>
							<div><span class="dialog-body-left">相关链接</span> <span class="dialog-body-right" style="cursor: pointer; color:rgb(0, 119, 255)">下载</span></div>							
						</div>
						<br>
						<div class="dialog-body-title">
							<span class="start-png"></span>
							处置建议
							<p class="dashed-bottom"></p>
							<p class="end-png"></p>
						</div>
						<div style="font-size: 10px; margin: 5px;">
							1、确认告警出现的频率、数量及时间等指标，大致判断是否为手动误访问导致
							 <br>
							2、排查是否存在其他受影响终端
						</div> -->
					</div>
			<template #footer>
				<span class="dialog-footer">
					<el-button type="primary" @click="saveEdit">确定</el-button>
					<el-button @click="dialogTableVisible = false">
						取消
					</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
            </el-tab-pane>
        </el-tabs>
        
    </div>
</template>

<script setup lang="ts" name="APPstat">
import * as echarts from 'echarts'
import { onMounted, reactive, ref,onUnmounted, nextTick } from 'vue';
import { ElTable } from 'element-plus'
import { ElMessage, ElMessageBox } from 'element-plus';
let isHave = ref(false)
let myLineChart:any = null
function initOption1() {
    myLineChart = echarts.init(document.getElementById('lineChart')!);
    let option = {
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
    // myLineChart.resize();
    window.addEventListener('resize',myChart1Resize)
}
let myPieChart:any = null
function initOption2() {
    myPieChart = echarts.init(document.getElementById('pieChart')!);
    let option = {
        
        tooltip: {
            trigger: 'item'
        },
        legend: {
            bottom: '5%',
            left: 'center',
            itemStyle: {
                borderWidth: 0
            }
        },
        series: [
            {
                color: ['#5da8ff', '#8e9dff', '#fedc69', '#26deca', '#b955a4'],
                name: '数量',
                type: 'pie',
                center: ['50%', '38%'],
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
    // myPieChart.resize()
    window.addEventListener('resize',myChart4Resize)
}
let myBarChart:any = null
function initOption3() {
    // type EChartsOption = echarts.EChartsOption;
    myBarChart = echarts.init(document.getElementById('barChart')!);
    let option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {},
        grid: {
            top: '1%',
            left: '3%',
            right: '4%',
            bottom: '1%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01]
        },
        yAxis: {
            type: 'category',
            data: ['实用', '医疗', '体育', '学习', '图书', '影音', '社交', '游戏']
        },
        series: [
            {
                type: 'bar',
                data: [242, 156, 128, 396, 285, 165, 250, 144].reverse()
            }
        ]
    }
    option && myBarChart.setOption(option);
    // myBarChart.resize();
    window.addEventListener('resize',myChart2Resize)
}
let myBarChart2:any = null
function initOption4() {
    myBarChart2 = echarts.init(document.getElementById('pieChart2')!);
    let option = {
        
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
                name: '数量',
                type: 'pie',
                center:['50%', '35%'],
                radius: '55%',
                avoidLabelOverlap: false,
     
                label: {
                    show: false,
                    position: 'center'
                },
                // emphasis: {
                //     label: {
                //         show: true,
                //         fontSize: '12'
                //     }
                // },
                labelLine: {
                    show: false
                },
                data: [
                    { value: 20, name: '金融' },
                    { value: 10, name: '实用' },
                    { value: 30, name: '游戏' },
                    { value: 40, name: '医疗' },
                    { value: 25, name: '体育' },
                    { value: 15, name: '学习' },
                    { value: 16, name: '图书' },
                    { value: 12, name: '影音' },
                    { value: 22, name: '社交' },
                ],
                // emphasis: {
                //     itemStyle: {
                //         shadowBlur: 10,
                //         shadowOffsetX: 0,
                //         shadowColor: 'rgba(0, 0, 0, 0.5)'
                //     }
                // }
            }
        ]
    };
    option && myBarChart2.setOption(option);
    window.addEventListener('resize',myChart3Resize)
}
const changeTab = (a:number) => {
    isHave.value = false
}
// onMounted(() => {
//     nextTick(()=>{
//         initOption1()
//         initOption2()
//         initOption3()
//         initOption4()
//     })
    
// })
const tableData2 = [
    {
        time: '2023-05-29 10:12:15',
        name: '天天汇率',
        type: '金融',
        because: '涉嫌诈骗'
    },
    {
        time: '2023-05-29 10:12:15',
        name: '口袋战舰',
        type: '游戏',
        because: '信息泄露'
    },
    {
        time: '2023-05-29 10:12:15',
        name: '灵剑奇缘',
        type: '游戏',
        because: '大量投诉'
    },
    {
        time: '2023-05-29 10:12:15',
        name: '小红蚁',
        type: '社交',
        because: '评分过低'
    },
    {
        time: '2023-05-29 10:12:15',
        name: '云村宝',
        type: '金融',
        because: '大量举报'
    },
    {
        time: '2023-05-29 10:12:15',
        name: '小圈子',
        type: '社交',
        because: '评分过低'
    },
]

const value = ref('yes')
let idx: number = -1;
interface appTableData {
	num: number|undefined
	name: string
	pcapName: string
	operator: string
	developer: string
	version: string
	info: string
    sha1: string
    shopName: string
    downloadNum: number
	condition: string
	isRecord: string
	recordTel: string
	premissInfo: string

}
const multipleTableRef = ref<InstanceType<typeof ElTable>>()
const multipleSelection = ref<appTableData[]>([])
const handleSelectionChange = (val: appTableData[]) => {
	multipleSelection.value = val
	console.log(val);
	
}
const dialogTableVisible = ref(false)
const formLabelWidth = '80px'
let form = reactive<appTableData>({
	num: 12,
	name: 'TikTok',
	pcapName: 'com.ss.android.ugc.trill',
	operator: 'ByteDance',
	developer: 'ByteDance',
	version: '12.3.1',
    sha1:'ce03a420dce72d092f7a048774608e478c6d5d97',
    shopName:'小米应用商店',
    downloadNum:12333,
    info: 'TikTok 是一款全球流行的短视频社交应用，用户可以通过拍摄、剪辑和分享短视频来展示自己的才华和创意。',
    condition: '未下架',
    isRecord: '未备案',
    recordTel: '9759632',
    premissInfo: '读取设备状态和身份：用于获取设备信息和身份验证。',
})
const tableData = ref<appTableData[]>([
	{
		num: 12,
		name: 'TikTok',
        pcapName: 'com.ss.android.ugc.trill',
        operator: 'ByteDance',
        developer: 'ByteDance',
		version: '12.3.1',
        sha1:'ce03a420dce72d092f7a048774608e478c6d5d97',
        shopName:'小米应用商店',
        downloadNum:12333,
		info: 'TikTok 是一款全球流行的短视频社交应用，用户可以通过拍摄、剪辑和分享短视频来展示自己的才华和创意。',
		condition: '未下架',
		isRecord: '未备案',
		recordTel: '9759632',
		premissInfo: '读取设备状态和身份：用于获取设备信息和身份验证。',

	},
])
const options = [
	{
		value: 'yes',
		label: '已下架',
	},
	{
		value: 'no',
		label: '未下架',
	},]
const getData = () => {
	tableData.value = [
		{
			num: 12,
            name: 'TikTok',
            pcapName: 'com.ss.android.ugc.trill',
            operator: 'ByteDance',
            developer: 'ByteDance',
			version: '12.3.1',
            sha1:'ce03a420dce72d092f7a048774608e478c6d5d97',
            shopName:'小米应用商店',
            downloadNum:12333,
			info: 'TikTok 是一款全球流行的短视频社交应用，用户可以通过拍摄、剪辑和分享短视频来展示自己的才华和创意。',
            condition: '未下架',
            isRecord: '未备案',
            recordTel: '9759632',
            premissInfo: '读取设备状态和身份：用于获取设备信息和身份验证。',

		},
		{
			num: 13,
			name: '微信',
			pcapName: 'com.tencent.mm',
			operator: 'Tencent',
			developer: 'Tencent',
			version: '12.3.2',
            sha1:'ce72d092f7a0487748c6d5d976ce03a420d08e47',
            shopName:'苹果应用商店',
            downloadNum:2333,
			info: '微信是一款全球流行的社交应用，用户可以通过文字、语音、图片、视频等方式与朋友和家人保持联系，并使用微信支付进行线上支付。',
			condition: '未下架',
			isRecord: '未备案',
			recordTel: '9759632',
			premissInfo: '读取设备状态和身份：用于获取设备信息和身份验证。',

		},
		{
			num: 14,
			name: '抖音短视频',
			pcapName: 'com.ss.android.ugc.aweme',
			operator: 'ByteDance',
			developer: 'ByteDance',
			version: '12.3.3',
            sha1:'8774608e478c6d5d97ce03a420dce72d092f7a04',
            shopName:'苹果应用商店',
            downloadNum:123,
			info: '抖音是一款全球流行的短视频社交应用，用户可以通过拍摄、剪辑和分享短视频来展示自己的才华和创意。',
			condition: '未下架',
			isRecord: '未备案',
			recordTel: '9759632',
			premissInfo: '读取设备状态和身份：用于获取设备信息和身份验证。',

		}
	]
    console.log(tableData);
    
}
const handleSearch = () => {
	getData()
}
let editOrAdd:string
const handleEdit = (a:number,b:any) => {
    // ElMessage('正在开发中...')
	// idx = a
	// editOrAdd = 'edit'
	// form.num = tableData.value[idx].num
	// form.name = tableData.value[idx].name
	// form.pcapName = tableData.value[idx].pcapName
	// form.operator = tableData.value[idx].operator
	// form.developer = tableData.value[idx].developer
	// form.version = tableData.value[idx].version
	// form.info = tableData.value[idx].info
	// form.condition = tableData.value[idx].condition
	// form.isRecord = tableData.value[idx].isRecord
	// form.recordTel = tableData.value[idx].recordTel
	// form.premissInfo = tableData.value[idx].premissInfo
	dialogTableVisible.value = true
}

const saveEdit = () => {
	// if(editOrAdd == 'edit'){
	// 	dialogTableVisible.value = false;
	// 	tableData.value[idx].num = form.num
	// 	tableData.value[idx].name = form.name
	// 	tableData.value[idx].pcapName = form.pcapName
	// 	tableData.value[idx].operator = form.operator
	// 	tableData.value[idx].developer = form.developer
	// 	tableData.value[idx].version = form.version
	// 	tableData.value[idx].info = form.info
	// 	tableData.value[idx].condition = form.condition
	// 	tableData.value[idx].isRecord = form.isRecord
	// 	tableData.value[idx].recordTel = form.recordTel
	// 	tableData.value[idx].premissInfo = form.premissInfo
	// 	ElMessage.success(`修改成功`);
	// }else{
	// 	dialogTableVisible.value = false;
	// 	tableData.value.push({
	// 		num: form.num,
	// 		name: form.name,
	// 		pcapName: form.pcapName,
	// 		operator: form.operator,
	// 		developer: form.developer,
	// 		version: form.version,
    //         sha1:form.sha1,
    //         shopName:form.shopName,
    //         downloadNum:form.downloadNum,
	// 		info: form.info,
	// 		condition: form.condition,
	// 		isRecord: form.isRecord,
	// 		recordTel: form.recordTel,
	// 		premissInfo: form.premissInfo,	
	// 	})
	// 	ElMessage.success(`添加成功`);
	// }
	dialogTableVisible.value = false;
}
const handleAdd = () => {
	editOrAdd = 'add'
	form.num= undefined
	form.name= ''
	form.pcapName= ''
	form.operator= ''
	form.developer= ''
	form.version= ''
	form.info= ''
	form.condition= ''
	form.isRecord= ''
	form.recordTel= ''
	form.premissInfo= ''
	dialogTableVisible.value = true;
}
const handleDel = () => {
	tableData.value = tableData.value.filter((item, index)=>{		
		let arrlist = multipleSelection.value;
        return !arrlist.includes(item);
	})
}
function myChart1Resize(){
	if (myLineChart) {
		myLineChart.resize();
	}
}
function myChart2Resize(){
	if (myBarChart) {
		myBarChart.resize();
	}
}
function myChart3Resize(){
	if (myBarChart2) {
		myBarChart2.resize();
	}
}
function myChart4Resize(){
	if (myPieChart) {
		myPieChart.resize();
	}
}
onMounted(()=>{
	nextTick(()=>{
		initOption1()
		initOption2()
		initOption3()
        initOption4()
	})	
})


onUnmounted(() => {
	myLineChart.dispose();
	myBarChart.dispose();
	myBarChart2.dispose();
    myPieChart.dispose()
	window.removeEventListener('resize',myChart1Resize)
	window.removeEventListener('resize',myChart2Resize)
	window.removeEventListener('resize',myChart3Resize)
    window.removeEventListener('resize',myChart4Resize)
    });
</script>

<style scoped lang="less">
// dialog样式
:deep(.el-dialog__header){
	height: 46px;
	line-height: 46px;
	padding:0 16px;
	border-bottom: 1px solid #e6e6e6;
	margin-right:0px
}
:deep(.el-dialog__title) {
    line-height: 16px;
    font-size: 16px;
    color: #303133;
}
:deep(.el-dialog__headerbtn) {
	top:0;
	height: 50px;
	width: 50px;
}
:deep(.el-dialog__body){
	padding:15px 20px!important
}
.card-body-title {
	padding: 15px;
	font-size: 17px;
	font-weight: 700;
	display: flex;
	align-items: center;
}
.card-title-text {
	// font-family: '思源黑体';
	font-size: 18px;
	color:#666666
}
.dialog-body{
	// width: 100%;
    font-size: 14px;
    border: 1px solid #d6d6d6;
    padding: 20px;
    overflow: auto;
}
.dialog-body-title{
	padding: 5px 0;
    font-size: 17px;
    color: #333;
    font-weight: 700;
    display: flex;
    // -webkit-box-align: center;
    // -ms-flex-align: center;
    align-items: center;
}
.start-png{
	width: 20px;
    height: 20px;
    margin-right: 0;
	background: url(../assets/img/data_image_base1.png) no-repeat 50%;
	// background-size: contain;
}
// p{
// 	line-height: 32px;
// }
.dashed-bottom{
	flex: 1;  // flex剩余空间都分给dashed-bottom  flex-grow：1 伸
	// flex:auto;
	// position: relative;
	margin: 0;
	margin-left:11px;
	border-bottom:1px dashed rgb(144, 202, 229)
}
.end-png{
	width: 60px;
    height: 5px;
    margin: 0 auto;
	background: url(../assets/img/data_image_base2.png) no-repeat 50%;
}
.dialog-body-content{
	
	columns: 3;
	margin-top: 8px;
	// display: flex;
	// flex-wrap: wrap;
	// justify-content: space-between;
}
.dialog-body-content div{
	margin-bottom:6px
}
.dialog-body-left{
	margin-left:6px;
	margin-bottom: 10px;
	font-size: 14px;
	color: #aaaaaa;
}
.dialog-body-right{
	font-size: 14px;
    font-weight: 500;
}
.my-el-row{
    margin-top: 8px;
}
.my-el-row div{
    float: left;
    width: 33%;
}
.my-el-row::after{
    content:'';
    display:block;
    clear: both;
}
:deep(.el-table__header th){
	background-color: rgba(51, 121, 255,0.2)!important;
  	color: #333333;
	font-weight: 400;
	font-size: 15px;
	border: transparent solid 0px
}
:deep(.el-table__row--striped td){
	background-color: rgba(51, 121, 255,0.05) !important;
	color:#4D4D4D;
}
:deep(.el-table__row td){
	border: transparent solid 0px
}
.handle-box :deep(.el-input__wrapper){
	border: solid #b3b3b3 1px;
	padding:1px 12px;
	border-radius: 0px;
	box-shadow:0 0 0 0 !important;
}
.handle-box :deep(.el-input__wrapper:hover){
	border: solid #6f9ffd 1px;
	padding:1px 12px;
	border-radius: 0px;
	box-shadow:0 0 0 0 !important;
}
:deep(.el-input__inner::placeholder) {

	color:#808080!important
}
:deep(.el-input__inner:focus::-webkit-input-placeholder){
	opacity: 0;

}
.handle-box .el-button{
	height: 34px;
	padding: 0 24px;
	letter-spacing: 2px;
	color: #cdeaf9;
	background: linear-gradient(to right, #177ad9, #00a3e5);
	border: transparent;
	border-radius: 3px;
}
.handle-box .el-button:hover{
	color: white;
	background: #3ba3e4;
}
:deep(.tableClass .cell) {

  height: 20px;
  line-height: 20px !important;
}
.handle-box {
	margin-bottom: 20px;
}

.top-text {
    font-size: 16px;
    font-weight: 600;
}

.bottom-text {
    display: block;
    font-size: 14px;
    color: #aaaaaa;
    margin: 6px 0 20px 0;
}
.spanText {
	font-size: 16px
}
</style>