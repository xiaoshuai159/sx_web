<template>
    <div class="container">
        <!-- 搜索条件div -->
        <div style="overflow: hidden;">
			<div class="handle-box" style="position: relative;">
				<el-date-picker
				type="datetimerange"
				v-model="timerange"
				range-separator="To"
				start-placeholder="Start date"
				end-placeholder="End date"
			/>
			<!-- 后续可修改为输入关键字搜索下拉的数据 -->
			<!-- <el-input v-model="multSearch" placeholder="可模糊搜索，例如：事件名称:'僵尸'" style="position: absolute;  margin-left: 5px; height: 100%; width: 40%;"></el-input> -->
			<el-cascader
				placeholder="请选择筛选条件"
				style="position: absolute;  margin-left: 5px; width: 30%;"
				v-model="multSearch"
				:options="options"
				:props="{ multiple: true }"
				collapse-tags
				collapse-tags-tooltip
				/>
			<el-button type="success" style="float: right; margin: 1px 0;">重置</el-button>
			<el-button type="primary" style="float: right; margin: 1px 5px;">查询</el-button>
			</div>
        </div>
		<el-card shadow="never" style="font-size: 14px; position: relative;">
			<div style="display: flex; align-items: center; margin-bottom: 6px;margin-left: 2.4px;">
				<span>web事件：</span>
				<div style="display: inline-block;">
					<el-checkbox-group v-model="web" size="small">
					<el-checkbox-button v-for="web in webs" :key="web" :label="web">{{
						web
					}}</el-checkbox-button>
					</el-checkbox-group>
				</div>
			</div>
			<div style="display: flex; align-items: center;margin-bottom: 6px;">
				<span>内网攻击：</span>
				<div style="display: inline-block; ">
					<el-checkbox-group v-model="attack" size="small">
					<el-checkbox-button v-for="attack in attacks" :key="attack" :label="attack">{{
						attack
					}}</el-checkbox-button>
					</el-checkbox-group>
				</div>
			</div>
			<div style="display: flex; align-items: center;margin-bottom: 6px;">
				<span>企业舆情：</span>
				<div style="display: inline-block;">
					<el-checkbox-group v-model="publicVoice" size="small">
					<el-checkbox-button v-for="publicVoice in publicVoices" :key="publicVoice" :label="publicVoice">{{
						publicVoice
					}}</el-checkbox-button>
					</el-checkbox-group>
				</div>
			</div>
			<div style="display: flex; align-items: center;margin-bottom: 6px;margin-left: 28px;">
				<span>其他：</span>
				<div style="display: inline-block;">
					<el-checkbox-group v-model="other" size="small">
					<el-checkbox-button v-for="other in others" :key="other" :label="other">{{
						other
					}}</el-checkbox-button>
					</el-checkbox-group>
				</div>
			</div>
			<div style="display: flex; align-items: center;">
				<span>聚合变量：</span>
				<div style="display: inline-block;">
					<el-checkbox-group v-model="variate" size="small">
					<el-checkbox-button v-for="variate in variates" :key="variate" :label="variate">{{
						variate
					}}</el-checkbox-button>
					</el-checkbox-group>
				</div>
			</div>
		</el-card>
		<div id="myChart" :style="{ width: '100%', height: '140px'}"></div>
		<div style="margin: 10px 0;">
			<vxe-table 
            :data="tableData" 
            class="mytable-style"
            :row-config="{isHover: true}" 
            :tooltip-config="{}"
            @cell-mouseenter="handleCellMouseEnter"
            @cell-mouseleave="cellMouseleaveEvent"
		>
		<vxe-column type="expand" width="80" :fixed="expandFixed">
			<template #content="{ row, rowIndex }">
				<div class="expand-wrapper">
					<div class="my-first-row">
						<div class="left-icon">
							<svg t="1687229267237" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="21638" width="100" height="100"><path d="M523.2 329.472a38.4 38.4 0 0 1 44.864-30.613c24.405 4.608 57.941 18.901 84.544 47.509 27.797 29.888 46.165 73.472 40.683 131.328a38.4 38.4 0 1 1-76.459-7.253c3.435-36.224-7.723-58.091-20.459-71.766-13.909-14.933-31.893-22.336-42.56-24.341a38.4 38.4 0 0 1-30.613-44.864zM364.16 832a149.376 149.376 0 0 0 295.68 0h-87.467a64.021 64.021 0 0 1-120.746 0H364.16z m190.507-725.333a42.667 42.667 0 1 0-85.334 0v45.482a322.987 322.987 0 0 1 85.334 0v-45.482z" p-id="21639" fill="#d81e06"></path><path d="M800.597 746.667H223.403l5.589-11.158c5.547-11.093 9.45-18.922 13.035-26.965a405.333 405.333 0 0 0 34.922-147.904c0.384-8.79 0.384-17.536 0.384-29.93v-61.377c0-129.6 105.067-234.666 234.667-234.666s234.667 105.066 234.667 234.666v61.376c0 12.416 0 21.163 0.384 29.931a405.333 405.333 0 0 0 34.901 147.904c3.605 8.043 7.51 15.85 13.056 26.965l5.59 11.158zM512 149.333c-176.725 0-320 143.275-320 320v59.691c0 14.016 0 21.013-0.299 27.947a320 320 0 0 1-27.562 116.757c-2.838 6.315-5.974 12.587-12.224 25.11l-4.907 9.813c-13.504 26.986-20.245 40.469-21.61 51.285a64 64 0 0 0 42.303 68.459C177.984 832 193.067 832 223.232 832h577.515c30.186 0 45.269 0 55.552-3.627a64 64 0 0 0 42.304-68.416c-1.366-10.837-8.107-24.32-21.611-51.306l-4.907-9.814c-6.272-12.522-9.386-18.794-12.224-25.109A319.936 319.936 0 0 1 832.3 556.971C832 550.037 832 543.04 832 529.024v-59.69c0-176.726-143.275-320-320-320z" p-id="21640" fill="#d81e06"></path></svg>
						</div>
						<div class="top-text">
							<p>{{ row.eventName }}</p>
							<p>检测到攻击者：[{{ row.sourceIP }}]对[{{ row.destIP }}]发起针对web业务系统的{{ row.alarmSubType }}攻击。攻击URL:/arcgis/rest/services，服务器响应:200。</p>
							<p v-if="row.alarmSubType=='越权访问'">{{ row.alarmSubType }}是指攻击者使用地权限或无需访问权限的情况下，利用漏洞或配置错误绕过权限检查，访问或操作到原本无权访问的功能。</p>
							<p>2023-01-18 11:41:07</p>
						</div>
						<div class="right-button">
							<el-button type="primary" plain size="small">上下文</el-button>
							<el-button type="primary" plain size="small">标记</el-button>
							<el-button type="primary" plain size="small">生成事件</el-button>
							<el-button type="primary" plain size="small">生成风险</el-button>
						</div>
					</div>
					<div class="my-second-row">
						<div class="my-col">
							<div class="my-box-header">来源</div>
							<div class="my-box-body">
								<div class="box-text">
									<p style="margin-left: 25px;">资产名称：<span>重庆市规划和自然资源局</span></p> <br>
									<p style="margin-left: 40.5px;">来源IP：<span>{{ row.sourceIP }}</span></p><br>
									<p style="margin-left: 52.6px;">端口：<span>55867</span></p><br>
									<p style="margin-left: 39px;">安全域：<span>未分配</span></p><br>
									<p style="margin-left: 25px;">地理位置：<span>中国 - 重庆 - 重庆</span></p>
								</div>
							</div>
						</div>
						<div class="my-col">
							<div class="my-box-header">手段</div>
							<div class="my-box-body">
								<div class="box-text">
									<p style="margin-left: 52.6px;">协议：<span>TCP / http</span></p> <br>
									<p style="margin-left: 39px;">状态码：<span>200</span></p><br>
									<p style="margin-left: 25px;">告警分类：<span>web攻击</span></p><br>
									<p style="margin-left: 25px;">告警类型：<span>越权访问</span></p>
								</div>
							</div>
						</div>
						<div class="my-col">
							<div class="my-box-header">目的</div>		
							<div class="my-box-body">
								<div class="box-text">									
									<p style="margin-left: 40.5px;">目的IP：<span>{{ row.destIP }}</span></p><br>
									<p style="margin-left: 52.6px;">端口：<span>6080</span></p><br>
									<p style="margin-left: 39px;">安全域：<span>未分配</span></p><br>
									<p style="margin-left: 25px;">地理位置：<span>中国 - 北京 - 北京</span></p><br>
									<p style="margin-left: 25px;">站点名称：<span>{{ row.destIP }}:6080</span></p>
									
								</div>
							</div>					
						</div>
						<div class="my-col">
							<div class="my-box-header">模型</div>
							<div class="my-box-body">
								<div class="box-text">
									<p style="margin-left: 25px;">模型名称：<span style="color: #759ef1;">web攻击 AHAPT</span></p> <br>
									<p style="margin-left: 25px;">模型类型：<span>规则模型</span></p><br>
									<p style="margin-left: 25px;">告警等级：<span>高</span></p><br>
									<p style="margin-left: 40.5px;">事件ID：<span>6101514928399105450</span></p><br>
									<p style="margin-left: 25px;">告警结果：<span style="color: red;">攻击成功</span></p>
								</div>
							</div>
						</div>
					</div>
					<div class="my-third-row">
						<div class="my-box-header">举证</div>
						<div class="my-box-body">
							<p style="font-weight: 600;font-size: 16px;color: black;">基本信息</p>
							<p style="font-weight: 600;color: black;margin: 15px 0;">攻击者：<span style="margin-right: 100px;font-weight: 400;">{{ row.sourceIP }}</span> 
								 受害者：<span style="margin-right: 100px;font-weight: 400;">{{ row.destIP }}</span> 
								  原始流ID：<span style="margin-right: 100px;font-weight: 400;color: #759ef1;">2301181147590969251</span> 
								  原始ID列表：<span style="margin-right: 100px;font-weight: 400;color: #759ef1;">230118114802000004702</span></p>
							<p style="display: flex; font-weight: 600;font-size: 16px;color: black;margin-top: 25px; align-items: center;"><span>请求页面</span><span style="margin-left: 10px; flex: 1;border-bottom: 1px solid #d3d8e5;"></span> </p>
							<p style="color: #759ef1;margin-top: 15px;">{{ row.destIP }}:6080/arcgis/rest/services</p>
						</div>
					</div>
				</div>
			</template>
		</vxe-column>
			<vxe-column title="来源IP" field="sourceIP" min-width="160"></vxe-column>
			<vxe-column title="目的IP" field="destIP" min-width="160"></vxe-column>
			<vxe-column title="告警子类型" field="alarmSubType" min-width="140"></vxe-column>
			<vxe-column title="事件名称" field="eventName" min-width="240" show-overflow></vxe-column>
			<vxe-column title="目的端口" field="distPort" min-width="80"></vxe-column>
			<vxe-column title="安全告警威胁等级" field="threatLevel" min-width="140"></vxe-column>
			<vxe-column title="告警结果" field="alarmResult" min-width="120"></vxe-column>
			<vxe-column title="起始时间" field="startTime" min-width="190"></vxe-column>
			<vxe-column title="处置状态" field="state" min-width="130"></vxe-column>
			<vxe-column title="告警名称" field="alarmName" min-width="240" show-overflow></vxe-column>
			<vxe-column title="请求头" field="reqHeader" min-width="140"></vxe-column>
			<vxe-column title="单位名称" field="unitName" min-width="140"></vxe-column>
		</vxe-table>
		</div>
		
    </div>

</template>

<script setup lang="ts" name="jiangPage" >
import { dayjs } from 'element-plus';
import { reactive,ref, onMounted,onUnmounted, nextTick } from 'vue';
import { VxeColumnPropTypes } from 'vxe-table'
import * as echarts from 'echarts'
let multSearch:any = ref([])
const options = ref([
  {
    value: '来源IP',
    label: '来源IP',
    children: [
      {
        value: '等于',
        label: '等于',
        children: [
          { value: '221.176.46.3', label: '221.176.46.3' },
          { value: '113.207.121.288', label: '113.207.121.288' },
        ],
      },
      {
        value: '不等于',
        label: '不等于',
        children: [
		  { value: '221.176.46.3', label: '221.176.46.3' },
          { value: '113.207.121.288', label: '113.207.121.288' },
        ],
      }
    ],
  },
  {
    value: '目的IP',
    label: '目的IP',
    children: [
      {
        value: '等于',
        label: '等于',
        children: [
          { value: '212.24.139.164', label: '212.24.139.164' },
          { value: '114.114.114.114', label: '114.114.114.114' },
        ],
      },
      {
        value: '不等于',
        label: '不等于',
        children: [
		  { value: '212.24.139.164', label: '212.24.139.164' },
          { value: '114.114.114.114', label: '114.114.114.114' },
        ],
      }
    ],
  },
  {
    value: '告警子类型',
    label: '告警子类型',
    children: [
      {
        value: '等于',
        label: '等于',
        children: [
          { value: '越权访问', label: '越权访问' },
          { value: '恶意域名', label: '恶意域名' },
        ],
      },
      {
        value: '不等于',
        label: '不等于',
        children: [
		  { value: '越权访问', label: '越权访问' },
          { value: '恶意域名', label: '恶意域名' },
        ],
      }
    ],
  },
  {
    value: '事件名称',
    label: '事件名称',
    children: [
      {
        value: '等于',
        label: '等于',
        children: [
          { value: 'WEB攻击->越权访问', label: 'WEB攻击->越权访问' },
          { value: '挖矿->回连域名', label: '挖矿->回连域名' },
        ],
      },
      {
        value: '不等于',
        label: '不等于',
        children: [
		  { value: 'WEB攻击->越权访问', label: 'WEB攻击->越权访问' },
          { value: '挖矿->回连域名', label: '挖矿->回连域名' },
        ],
      }
    ],
  },
  {
    value: '目的端口',
    label: '目的端口',
    children: [
      {
        value: '等于',
        label: '等于',
        children: [
          { value: 873, label: '873' },
          { value: 53, label: '53' },
        ],
      },
      {
        value: '不等于',
        label: '不等于',
        children: [
		  { value: 873, label: '873' },
          { value: 53, label: '53' },
        ],
      }
    ],
  },
  {
    value: '安全告警威胁等级',
    label: '安全告警威胁等级',
    children: [
      {
        value: '等于',
        label: '等于',
        children: [
          { value: '高', label: '高' },
          { value: '中', label: '中' },
        ],
      },
      {
        value: '不等于',
        label: '不等于',
        children: [
		  { value: '高', label: '高' },
          { value: '中', label: '中' },
        ],
      }
    ],
  },
  {
    value: '告警结果',
    label: '告警结果',
    children: [
      {
        value: '等于',
        label: '等于',
        children: [
          { value: '攻击成功', label: '攻击成功' }
        ],
      },
      {
        value: '不等于',
        label: '不等于',
        children: [
		{ value: '攻击成功', label: '攻击成功' }
        ],
      }
    ],
  },
  {
    value: '起始时间',
    label: '起始时间',
    children: [
      {
        value: '等于',
        label: '等于',
        children: [
          { value: '2023-01-26 23:18:03', label: '2023-01-26 23:18:03' },
		  { value: '2023-01-29 09:52:16', label: '2023-01-29 09:52:16' }
        ],
      },
      {
        value: '不等于',
        label: '不等于',
        children: [
			{ value: '2023-01-26 23:18:03', label: '2023-01-26 23:18:03' },
		  	{ value: '2023-01-29 09:52:16', label: '2023-01-29 09:52:16' }
        ],
      }
    ],
  },
  {
    value: '处置状态',
    label: '处置状态',
    children: [
      {
        value: '等于',
        label: '等于',
        children: [
          { value: '未处理', label: '未处理' }
        ],
      },
      {
        value: '不等于',
        label: '不等于',
        children: [
			{ value: '未处理', label: '未处理' }
        ],
      }
    ],
  },
  {
    value: '告警名称',
    label: '告警名称',
    children: [
      {
        value: '等于',
        label: '等于',
        children: [
          { value: 'WEB攻击->越权访问', label: 'WEB攻击->越权访问' },
          { value: '挖矿->回连域名', label: '挖矿->回连域名' },
        ],
      },
      {
        value: '不等于',
        label: '不等于',
        children: [
		  { value: 'WEB攻击->越权访问', label: 'WEB攻击->越权访问' },
          { value: '挖矿->回连域名', label: '挖矿->回连域名' },
        ],
      }
    ],
  },
  {
    value: '请求头',
    label: '请求头',
    children: [
      {
        value: '等于',
        label: '等于',
        children: [
          { value: '未知', label: '未知' }
        ],
      },
      {
        value: '不等于',
        label: '不等于',
        children: [
			{ value: '未知', label: '未知' }
        ],
      }
    ],
  },
  {
    value: '单位名称',
    label: '单位名称',
    children: [
      {
        value: '等于',
        label: '等于',
        children: [
          { value: '未知', label: '未知' }
        ],
      },
      {
        value: '不等于',
        label: '不等于',
        children: [
			{ value: '未知', label: '未知' }
        ],
      }
    ],
  }
])
const timerange = ref<[Date, Date]>([
  dayjs().subtract(1, 'day').toDate(),
  dayjs().toDate()
])
const expandFixed = ref<VxeColumnPropTypes.Fixed>()
const web = ref([])
const webs = ['弱口令', '信息明文传输风险']
const attack = ref([])
const attacks = ['挖矿活动', '站点存在webshell后门','钓鱼邮件']
const publicVoice = ref([])
const publicVoices = ['企业形象不良影响']
const other = ref([])
const others = ['自由检索', '外部攻击者','CVE漏洞利用成功','勒索病毒','威胁情报','高危事件','配置风险']
const variate = ref([])
const variates = ['事件名称', '攻击者','受害者','目的端口','告警子类型','应用协议','攻击链']
let myChart1:any = null
function initOption1(){
	// type EChartsOption = echarts.EChartsOption;
	myChart1 = echarts.init(document.getElementById('myChart')!);
        let option = {
        //   tooltip: {
        //     trigger: 'axis',
        //     axisPointer: {
        //       type: 'shadow'
        //     }
        //   },
          legend: {},
          grid: {
            left: '3%',
            top:'15%',
			bottom:'1%',
			right:'1%',
            containLabel: true
          },
          xAxis: {
			type: 'category',
			axisTick: { show: false },
            data: ['2023-6-15 00:00:00','','','','','','2023-6-15 04:00:00','','','','','','2023-6-15 08:00:00','','','','','','2023-6-15 12:00:00','','','','','','2023-6-15 16:00:00','','','','','','2023-6-15 24:00:00','','','']
          },
          yAxis: {
			type: 'value',
            boundaryGap: [0, 0.01]
          },
          series: [
            {              
              type: 'bar',
              data: [85,65,50,44,32,10,2,128,96,85,65,50,44,32,10,42,156,128,96,85,65,50,44,32,10,156,128,96,85,65,50,44,32,10]
            }
          ]
        }
        option && myChart1.setOption(option);
        // myChart1.resize();
		window.addEventListener('resize', myChart1Resize);
}
function myChart1Resize(){
	if (myChart1) {
		myChart1.resize();
	}
}
onMounted(()=>{
	nextTick(()=>{
		initOption1()
	})	
})
onUnmounted(() => {
	myChart1.dispose();
	window.removeEventListener('resize',myChart1Resize)
});
// vex table
const tableData =ref([
		{ sourceIP:'221.176.46.3',destIP:'212.24.139.164',alarmSubType:'越权访问',eventName:'WEB攻击->越权访问',distPort:873,threatLevel:'高',alarmResult:'攻击成功',startTime:'2023-01-26 23:18:03',state:'未处理',alarmName:'WEB攻击->越权访问',reqHeader:'未知',unitName:'未知' },
		{ sourceIP:'113.207.121.288',destIP:'114.114.114.114',alarmSubType:'恶意域名',eventName:'挖矿->回连域名',distPort:53,threatLevel:'中',alarmResult:'攻击成功',startTime:'2023-01-29 09:52:16',state:'未处理',alarmName:'挖矿->回连域名',reqHeader:'未知',unitName:'未知' },
      ])
const handleCellMouseEnter:any = ({row, column, cell, columnIndex}:any, event:any)=> {	
	if(columnIndex === 0) return	
	const iElement = document.createElement('i');  // 减号图标
	iElement.setAttribute('class', 'el-icon');
	iElement.style.fontSize = '15px';
	iElement.style.marginLeft = '5px';
	iElement.setAttribute('title', '排除');  // 添加鼠标悬浮文字
	const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
	svgElement.setAttribute('viewBox', '0 0 1024 1024');
	const pathElement = document.createElementNS('http://www.w3.org/2000/svg', 'path');
	pathElement.setAttribute('fill', 'currentColor');
	pathElement.setAttribute('d', 'm795.904 750.72 124.992 124.928a32 32 0 0 1-45.248 45.248L750.656 795.904a416 416 0 1 1 45.248-45.248zM480 832a352 352 0 1 0 0-704 352 352 0 0 0 0 704zM352 448h256a32 32 0 0 1 0 64H352a32 32 0 0 1 0-64');
	svgElement.appendChild(pathElement);
	iElement.appendChild(svgElement);

	const iElement2 = document.createElement('i');  // 加号图标
	iElement2.setAttribute('class', 'el-icon');
	iElement2.style.fontSize = '15px';
	iElement2.setAttribute('title', '筛选');  // 添加鼠标悬浮文字
	const svgElement2 = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
	svgElement2.setAttribute('viewBox', '0 0 1024 1024');
	const pathElement2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
	pathElement2.setAttribute('fill', 'currentColor');
	pathElement2.setAttribute('d', "m795.904 750.72 124.992 124.928a32 32 0 0 1-45.248 45.248L750.656 795.904a416 416 0 1 1 45.248-45.248zM480 832a352 352 0 1 0 0-704 352 352 0 0 0 0 704zm-32-384v-96a32 32 0 0 1 64 0v96h96a32 32 0 0 1 0 64h-96v96a32 32 0 0 1-64 0v-96h-96a32 32 0 0 1 0-64h96z");
	svgElement2.appendChild(pathElement2);
	iElement2.appendChild(svgElement2);

	const newElement = document.createElement('div');  // 加号+减号图标
	newElement.style.cursor = 'pointer';
	newElement.style.display = 'inline-block';
	newElement.style.position = 'absolute';
	newElement.style.top = '15px';
	newElement.style.right = '10px';
	newElement.appendChild(iElement2)
	newElement.appendChild(iElement)
	// const app = createApp({
	// 	render() {
	// 		// return h('div',{ style:{ cursor:'pointer',display:'inline-block', position:'absolute',top:'11px',color:'red',right:'0px' } },'test');
	// 	}
	// });
	iElement.addEventListener('click', function() {
		// console.log('你点了下'+row.name+'的'+column.field+'列的'+'减号');
		// multSearch.value += `${column.title} 不等于 ${row[column.field]};`
		multSearch.value.push([column.title,'不等于',row[column.field]])
		// console.log(column.title +" 不等于 "+ row[column.field]);
		
	});
	iElement2.addEventListener('click', function() {
		// console.log('你点了下'+row.name+'的'+column.field+'列的'+'加号');
		// multSearch.value += `${column.title} 等于 ${row[column.field]};`
		multSearch.value.push([column.title,'等于',row[column.field]])
		// console.log(column.title +" 等于 "+ row[column.field]);
	});
	cell.__customElement = newElement;
	cell.appendChild(newElement);
}
const cellMouseleaveEvent:any = ({row, column, cell}:any, event:any)=> {
	if (cell.__customElement) {
        cell.removeChild(cell.__customElement);
        cell.__customElement = null;
      }
    }

interface FormAndTable {
	id: number|undefined
	time: string
	harmIP: string
	harmPort: number|undefined
	databaseType: string
	warnType: string
	warnContent: string
	attackNum: number|undefined
	attackIP: string
	attackPort: number|undefined
	level: string
	state: string
}
const formLabelWidth = '90px'
const editVisible = ref(false);
const pageTotal = ref(0);
const handleSearch = () => {
	query.pageIndex = 1;
	getData();
};
const handlePageChange = (val: number) => {
	query.pageIndex = val;
	getData();
};
const getData = () =>{
	tableData2.value = [{
	id: 1,
	time:dayjs().format("YYYY-MM-DD  HH:mm:ss"),
	harmIP: '172.5.45.62',
	harmPort: 45,
	databaseType:'mysql',
	warnType:'柠檬鸭组织木马',
	warnContent:'...',
	attackNum: 9,
	attackIP: '192.168.55.4',
	attackPort: 68,
	state:'已验证',
	level:'高'
},
{
	id: 2,
	time:dayjs().format("YYYY-MM-DD  HH:mm:ss"),
	harmIP: '172.53.45.6',
	harmPort: 75,
	databaseType:'mysql',
	warnType:'柠檬鸭组织木马',
	warnContent:'...',
	attackNum: 9,
	attackIP: '192.168.55.4',
	attackPort: 68,
	state:'未验证',
	level:'中'
},
{
	id: 3,
	time:dayjs().format("YYYY-MM-DD  HH:mm:ss"),
	harmIP: '172.53.5.62',
	harmPort: 40,
	databaseType:'mysql',
	warnType:'柠檬鸭组织木马',
	warnContent:'...',
	attackNum: 9,
	attackIP: '192.168.55.4',
	attackPort: 68,
	state:'已验证',
	level:'高'
}]
}
const value1 = ref<[Date,Date]>([
	new Date(2023, 4, 29, 10, 10),
    new Date(2023, 4, 30, 10, 10),
])
const tableData2 = ref<FormAndTable[]>([{
	id: 1,
	time:dayjs().format("YYYY-MM-DD  HH:mm:ss"),
	harmIP: '172.53.45.62',
	harmPort: 45,
	databaseType:'mysql',
	warnType:'柠檬鸭组织木马',
	warnContent:'...',
	attackNum: 9,
	attackIP: '192.168.55.4',
	attackPort: 68,
	state:'已验证',
	level:'高'
}]);
const query = reactive({
	address: '',
	name: '',
	pageIndex: 1,
	pageSize: 10
});
let form = reactive<FormAndTable>({
	id: undefined,
	time: '',
	harmIP:'',
	harmPort:undefined,
	databaseType:'',
	warnType:'',
	warnContent:'',
	attackNum:undefined,
	attackIP:'',
	attackPort:undefined,
	level:'',
	state:''
});
let idx: number = -1;
let editOrAdd:any
</script>

<style scoped lang="less">
// 展开行样式
.expand-wrapper{
	.my-first-row{
		display: flex;
		.left-icon{
			margin: 15px 20px;
		}
		.top-text{
			p:first-child{
				margin-top: 15px;
				font-size: 18px;
				font-weight: 600;
				color:black
			}
			p{
				// font-size: 12px;
				margin: 6px 0;
			}
		}
		.right-button{
			margin-top: 15px;
			margin-left: 50px;
		}
	}
	.my-second-row{
		display: flex;
		.my-col{
			border:#ebeced 1px solid;
			height: 190px;
			width: 300px;
			margin:5px;
			.my-box-header{
				background-color: #f4f5f8;
				border-bottom:#ebeced 1px solid;
				color: #444444;
				font-weight: 600;
				height: 30px;
				line-height: 30px;
				padding-left: 8px;
			}
			.my-box-body{
				padding:8px;
				.box-text{
					display: inline-block;
					font-weight: 600;
					color:black;
					p{
						display: inline-block;
						margin: 5px 0;
						span{
							font-weight: 400;
						}
					}
				}
			}
		}
	}
	.my-third-row{
		border:#ebeced 1px solid;
		width: 1236.5px;
		margin:5px;
		.my-box-header{
				background-color: #f4f5f8;
				border-bottom:#ebeced 1px solid;
				color: #444444;
				font-weight: 600;
				height: 30px;
				line-height: 30px;
				padding-left: 8px;
			}
		.my-box-body{
			padding:16px;
		}
	}

}
.mytable-style ::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
.mytable-style ::-webkit-scrollbar-thumb {
  background-color: #bfbfbf;
  border-radius: 5px;
  border: 1px solid #F1F1F1;
  box-shadow: inset 0 0 6px rgba(0,0,0,.3);
}
.mytable-style ::-webkit-scrollbar-thumb:hover {
  background-color: #A8A8A8;
}
.mytable-style ::-webkit-scrollbar-thumb:active {
  background-color: #787878;
}
/*边角，即两个滚动条的交汇处*/
.mytable-style ::-webkit-scrollbar-corner {
  background-color: #FFFFFF;
}
.el-checkbox-button{
	margin: 0 5px;
}
:deep(.el-card__body){
	padding: 15px 20px
}
:deep(.el-checkbox-button--small .el-checkbox-button__inner) {
    border-radius: 0;
	border:1px solid #ddd
}
:deep(.el-checkbox-button--small.is-checked .el-checkbox-button__inner){
	background-color: #409eff;
	border:1px solid #409eff
}
:deep(.vxe-cell){
	position: relative;
}
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
.dialog-body{
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
.dialog-body .start-png{
	width: 20px;
    height: 20px;
    margin-right: 0;
	background: url(../assets/img/data_image_base1.png) no-repeat 50%;
	// background-size: contain;
}
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
.el-row {
	margin-bottom: 10px;
}

:deep(.el-popper__arrow){
	display: none!important;
}
.handle-box :deep(.el-input__wrapper){
	border: solid #b3b3b3 1px;
	padding:1px 12px;
	border-radius: 0px;
	height: 32px;
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

.handle-select {
	width: 15%;
}

.handle-input {
	width: 220px;
}
.eventid-input {
	width: 16%;
}

.table {
	width: 100%;
	font-size: 14px;
}

.mr10 {
	margin-right: 10px;
}
.table-td-thumb {
	display: block;
	margin: auto;
	width: 40px;
	height: 40px;
}
:deep(.el-dialog__body) {
	padding: 15px 30px;
    color: var(--el-text-color-regular);
    font-size: var(--el-dialog-content-font-size);
    word-break: break-all;
}
</style>