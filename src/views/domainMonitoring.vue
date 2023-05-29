<template>
	<div class="container">
		<div class="handle-box">
			<span>时间：</span>
			<el-date-picker v-model="value1" type="datetimerange" range-separator="To" start-placeholder="Start date"
				end-placeholder="End date" style="width:37%"/>&nbsp;&nbsp;
			<span>异常类型：</span>
			<el-select v-model="query.address" placeholder="异常类型" style="width:17%">
				<el-option key="域名仿冒" label="域名仿冒" value="域名仿冒"></el-option>
				<el-option key="域名劫持" label="域名劫持" value="域名劫持"></el-option>
			</el-select>
			<span style="margin-left: 15px;">IP：</span>
			<el-input v-model="query.name" placeholder="IP" class="handle-input mr10"></el-input>
			<div style="margin:10px 0">
				<span style="margin-left: 0px;">异常域名：</span>
				<el-input v-model="query.name" placeholder="异常域名" class="handle-input mr10"></el-input>
				<el-button type="primary" style="margin-left: 10px;">搜索</el-button>
			</div>
		</div>
		<el-row :gutter="10">
			<el-col :span="24">
				<el-card class="card" shadow="hover" :body-style="{ padding: '0px', height: '280px' }">
					<!-- <el-divider>
						<template #left>左侧内容</template>
      					<template #right>右侧内容</template>
					</el-divider> -->
					<span class="warningTop">异常域名情况</span>
					<el-table ref="eventRef" :data="eventData" height="250" stripe>
						<el-table-column prop="time" label="时间" min-width="105" show-overflow-tooltip/>
						<el-table-column prop="s_ip" label="IP" min-width="85" show-overflow-tooltip/>
						<el-table-column prop="domain" label="域名" min-width="85" show-overflow-tooltip/>
						<el-table-column prop="type" label="异常类型" min-width="85" show-overflow-tooltip/>
						<el-table-column prop="tag" label="危险等级" min-width="85" show-overflow-tooltip>
							<template #default="scope">
								<el-tag :type="scope.row.tag === '中' ? '' : 'danger'">{{ scope.row.tag }}</el-tag>
							</template>
						</el-table-column>
						<el-table-column prop="change" label="详情" min-width="85" show-overflow-tooltip>
							<template #default="scope">
								<el-button text @click="getDetail()" v-permiss="15" style="color:dodgerblue;">
									详情
								</el-button>
							</template>
						</el-table-column>
					</el-table>
				</el-card>
			</el-col>
		</el-row>

		<el-row :gutter="10">
			<el-col :span="12">
				<el-card shadow="hover" :body-style="{ padding: '0px', height: '285px' }">
					<!-- <span class="normalText">被攻击数据库ip排行</span> -->
					<div id="myChart" :style="{ width: '92%', height: '277px' }"></div>
				</el-card>
			</el-col>
			<el-col :span="12">
				<el-card shadow="hover" :body-style="{ padding: '0px', height: '285px' }">
					<div id="myChart3" :style="{ width: '92%', height: '277px' }"></div>
				</el-card>
			</el-col>
			
		</el-row>
		<el-row :gutter="10">
			<el-col :span="24">
				<el-card shadow="hover" :body-style="{ padding: '0px', height: '285px' }">
					<div id="myChart2" :style="{ width: '98%', height: '277px' }"></div>
				</el-card>
			</el-col>
		</el-row>
		<!-- 编辑弹出框 -->
		<el-dialog title="详情" :data="eventData" v-model="editVisible" width="30%">
			<el-form-item label="IP" prop="taskType">
				192.168.1.1
			</el-form-item>
			<el-form-item label="详情" prop="cyclical">
				XXXXXXXXXXXXXXXXXX
			</el-form-item>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="editVisible = false">取 消</el-button>
					<el-button type="primary" @click="editVisible = false">确 定</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup lang="ts" name="dashboard">
import { ElMessage } from 'element-plus';
import { onMounted, reactive, ref, Ref,onUnmounted,nextTick } from 'vue';
import imgurl from '../assets/img/img.jpg';
import { sample } from 'lodash';
import * as echarts from 'echarts'

// const tableRef: Ref<HTMLElement | any> = ref(null)
const eventRef = ref();
const bugRef = ref();
const rateRef = ref();
const rateRef2 = ref();
const rateRef3 = ref();
const rateRef4 = ref();

const eventData = ref<any[]>([])
const bugData = ref<any[]>([])
const rateData = ref<any[]>([])

onMounted(() => {
	eventData.value = getEventData() //表格数据赋值
	bugData.value = getBugData() //表格数据赋值
	rateData.value = getBugData()
	// eventData.value = getEventData()
	nextTick(() => {
		initOption1()
		initOption2()
		initOption3()
		scroll(eventRef.value.$refs.bodyWrapper); //设置滚动
		scroll(bugRef.value.$refs.bodyWrapper); //设置滚动
		scroll(rateRef.value.$refs.bodyWrapper) //设置滚动
		scroll(rateRef2.value.$refs.bodyWrapper) //设置滚动
		scroll(rateRef3.value.$refs.bodyWrapper) //设置滚动
		scroll(rateRef4.value.$refs.bodyWrapper) //设置滚动
	})
})

const name = localStorage.getItem('ms_username');
const role: string = name === 'admin' ? '超级管理员' : '普通用户';
const value1 = ref<[Date, Date]>([
	new Date(2023, 4, 29, 10, 10),
  	new Date(2023, 4, 30, 10, 10),
])

const query = reactive({
	address: '',
	name: '',
	pageIndex: 1,
	pageSize: 10
});

const getEventData = (): any => {
	let eventData = [
		{
			eventID: '1645',
			time: '2023-05-29 12:10:00',
			s_ip: '5.135.199.25',
			s_port: '22',
			d_ip: '192.168.0.2',
			d_port: '21',
			domain: 'dailysync.zapto.org',
			type: '域名仿冒',
			tag: '高',
			detail: '详情',
			content: '',
			malice_url: 'http://www.xxx.com',
			crawl_result: '正常',
		},
		{
			eventID: '1645',
			time: '2023-05-29 12:10:00',
			s_ip: '31.7.62.48',
			s_port: '22',
			d_ip: '192.168.0.2',
			d_port: '21',
			domain: 'abtprinting.com',
			type: '域名劫持',
			tag: '高',
			detail: '详情',
			content: '',
			malice_url: 'http://www.xxx.com',
			crawl_result: '正常',
		},
		{
			eventID: '1645',
			time: '2023-05-29 12:10:00',
			s_ip: '88.150.221.107',
			s_port: '22',
			d_ip: '192.168.0.2',
			d_port: '21',
			domain: 'adworks.webhop.me',
			type: '域名仿冒',
			tag: '高',
			detail: '详情',
			content: '',
			malice_url: 'http://www.xxx.com',
			crawl_result: '失败',
		},
		{
			eventID: '1645',
			time: '2023-05-29 12:10:00',
			s_ip: '109.169.89.103',
			s_port: '22',
			d_ip: '192.168.0.2',
			d_port: '21',
			domain: 'ichoose.zapto.org',
			type: '域名劫持',
			tag: '高',
			detail: '详情',
			content: '',
			malice_url: 'http://www.xxx.com',
			crawl_result: '失败',
		},
		{
			eventID: '1645',
			time: '2023-05-29 12:10:00',
			s_ip: '109.200.24.114',
			s_port: '22',
			d_ip: '192.168.0.2',
			d_port: '21',
			domain: 'timpisstoo.hol.es',
			type: '域名仿冒',
			tag: '高',
			detail: '详情',
			content: '',
			malice_url: 'http://www.xxx.com',
			crawl_result: '正常',
		},
		{
			eventID: '1645',
			time: '2023-05-29 12:10:00',
			s_ip: '137.74.157.84',
			s_port: '22',
			d_ip: '192.168.0.2',
			d_port: '21',
			domain: 'burningforests.com',
			type: '域名劫持',
			tag: '高',
			detail: '详情',
			content: '',
			malice_url: 'http://www.xxx.com',
			crawl_result: '正常',
		},
		{
			eventID: '1645',
			time: '2023-05-29 12:10:00',
			s_ip: '193.70.71.112',
			s_port: '22',
			d_ip: '192.168.0.2',
			d_port: '21',
			domain: 'account-support.site',
			type: '域名仿冒',
			tag: '高',
			detail: '详情',
			content: '',
			malice_url: 'http://www.xxx.com',
			crawl_result: '失败',
		},
		{
			eventID: '1645',
			time: '2023-05-29 12:10:00',
			s_ip: '216.244.93.137',
			s_port: '22',
			d_ip: '192.168.0.2',
			d_port: '21',
			domain: 'useraccount.co',
			type: '域名劫持',
			tag: '高',
			detail: '详情',
			content: '',
			malice_url: 'http://www.xxx.com',
			crawl_result: '失败',
		},
		{
			eventID: '1648',
			time: '2023-05-29 12:10:00',
			s_ip: '213.32.113.159',
			s_port: '22',
			d_ip: '192.168.0.2',
			d_port: '21',
			domain: 'nakamini.ddns.net',
			type: '域名仿冒',
			tag: '中',
			detail: '详情',
			content: '',
			malice_url: 'http://www.xxx.com',
			crawl_result: '正常',
		},
		{
			eventID: '1648',
			time: '2023-05-29 12:10:00',
			s_ip: '195.154.41.72',
			s_port: '22',
			d_ip: '192.168.0.2',
			d_port: '21',
			domain: 'adrev22.ddns.net',
			type: '域名劫持',
			tag: '中',
			detail: '详情',
			content: '',
			malice_url: 'http://www.xxx.com',
			crawl_result: '正常',
		},
		{
			eventID: '1645',
			time: '2023-05-29 12:10:00',
			s_ip: '188.165.119.138',
			s_port: '22',
			d_ip: '192.168.0.2',
			d_port: '21',
			domain: 'waterlily.ddns.net',
			type: '域名仿冒',
			tag: '高',
			detail: '详情',
			content: '',
			malice_url: 'http://www.xxx.com',
			crawl_result: '正常',
		},
		{
			eventID: '1645',
			time: '2023-05-29 12:10:00',
			s_ip: '185.175.138.173',
			s_port: '22',
			d_ip: '192.168.0.2',
			d_port: '21',
			domain: 'pressnorth.net',
			type: '域名劫持',
			tag: '高',
			detail: '详情',
			content: '',
			malice_url: 'http://www.xxx.com',
			crawl_result: '正常',
		},
		{
			eventID: '1645',
			time: '2023-05-29 12:10:00',
			s_ip: '185.125.204.57',
			s_port: '22',
			d_ip: '192.168.0.2',
			d_port: '21',
			domain: 'officeopenxml.co',
			type: '域名仿冒',
			tag: '高',
			detail: '详情',
			content: '',
			malice_url: 'http://www.xxx.com',
			crawl_result: '失败',
		}
	]
	return eventData
}

const getBugData = (): any => {
	let bugData = [
		{
			eventID: '1645',
			time: '2023-05-29 12:10:00',
			ip: '192.168.0.1',
			type: 'XSS漏洞',
			url: '192.168.0.1',
			result: '正常',
			rate: '10',
			num: '10',
			change: '违规',
			detail: '详情',
			malice_url: '含有恶意链接',
			crawl_result: '失败',
			tag: '高',
		},
		{
			eventID: '1648',
			time: '2023-05-29 12:10:00',
			ip: '192.168.0.1',
			type: '未授权访问',
			url: '192.168.0.1',
			result: '正常',
			rate: '10',
			num: '10',
			change: '违规',
			detail: '详情',
			malice_url: '含有恶意链接',
			crawl_result: '成功',
			tag: '中',
		},
		{
			eventID: '1648',
			time: '2023-05-29 12:10:00',
			ip: '192.168.0.1',
			type: 'CSRF漏洞',
			url: '192.168.0.1',
			result: 'PING 异常',
			rate: '10',
			num: '10',
			change: '违规',
			detail: '详情',
			malice_url: '含有恶意链接',
			crawl_result: '失败',
			tag: '中',
		},
		{
			eventID: '1645',
			time: '2023-05-29 12:10:00',
			ip: '192.168.0.1',
			type: 'SSRF漏洞',
			url: '192.168.0.1',
			result: 'DNS 异常',
			rate: '10',
			num: '10',
			change: '违规',
			detail: '详情',
			malice_url: '含有恶意链接',
			crawl_result: '成功',
			tag: '高',
		},
		{
			eventID: '1648',
			time: '2023-05-29 12:10:00',
			ip: '192.168.0.1',
			type: '未授权访问',
			url: '192.168.0.1',
			result: 'HTTPS 异常',
			rate: '10',
			num: '10',
			change: '违规',
			detail: '详情',
			malice_url: '含有恶意链接',
			crawl_result: '失败',
			tag: '中',
		},
		{
			eventID: '1648',
			time: '2023-05-29 12:10:00',
			ip: '192.168.0.1',
			type: 'CSRF漏洞',
			url: '192.168.0.1',
			result: '正常',
			rate: '10',
			num: '10',
			change: '违规',
			detail: '详情',
			malice_url: '含有恶意链接',
			crawl_result: '成功',
			tag: '中',
		},
		{
			eventID: '1648',
			time: '2023-05-29 12:10:00',
			ip: '192.168.0.1',
			type: '未授权访问',
			url: '192.168.0.1',
			result: 'PING 异常',
			rate: '10',
			num: '10',
			change: '违规',
			detail: '详情',
			malice_url: '含有恶意链接',
			crawl_result: '失败',
			tag: '中',
		},
		{
			eventID: '1648',
			time: '2023-05-29 12:10:00',
			ip: '192.168.0.1',
			type: '未授权访问',
			url: '192.168.0.1',
			result: 'PING 异常',
			rate: '10',
			num: '10',
			change: '违规',
			detail: '详情',
			malice_url: '含有恶意链接',
			crawl_result: '成功',
			tag: '中',
		},
		{
			eventID: '1648',
			time: '2023-05-29 12:10:00',
			ip: '192.168.0.1',
			type: '未授权访问',
			url: '192.168.0.1',
			result: '正常',
			rate: '10',
			num: '10',
			change: '违规',
			detail: '详情',
			malice_url: '含有恶意链接',
			crawl_result: '失败',
			tag: '中',
		},
		{
			eventID: '1648',
			time: '2023-05-29 12:10:00',
			ip: '192.168.0.1',
			type: '未授权访问',
			url: '192.168.0.1',
			result: '正常',
			rate: '10',
			num: '10',
			change: '违规',
			detail: '详情',
			malice_url: '含有恶意链接',
			crawl_result: '失败',
			tag: '中',
		},
		{
			eventID: '1648',
			time: '2023-05-29 12:10:00',
			ip: '192.168.0.1',
			type: 'CSRF漏洞',
			url: '192.168.0.1',
			result: 'PING 异常',
			rate: '10',
			num: '10',
			change: '违规',
			detail: '详情',
			malice_url: '含有恶意链接',
			crawl_result: '成功',
			tag: '中',
		},
		{
			eventID: '1648',
			time: '2023-05-29 12:10:00',
			ip: '192.168.0.1',
			type: 'CSRF漏洞',
			url: '192.168.0.1',
			result: '正常',
			rate: '10',
			num: '10',
			change: '违规',
			detail: '详情',
			malice_url: '含有恶意链接',
			crawl_result: '失败',
			tag: '中',
		},
		{
			eventID: '1645',
			time: '2023-05-29 12:10:00',
			ip: '192.168.0.1',
			type: '文件上传漏洞',
			url: '192.168.0.1',
			result: '正常',
			rate: '10',
			num: '10',
			change: '违规',
			detail: '详情',
			malice_url: '含有恶意链接',
			crawl_result: '失败',
			tag: '高',
		},
		{
			eventID: '1645',
			time: '2023-05-29 12:10:00',
			ip: '192.168.0.1',
			type: '暴力破解',
			url: '192.168.0.1',
			result: '正常',
			rate: '10',
			num: '10',
			change: '违规',
			detail: '详情',
			malice_url: '含有恶意链接',
			crawl_result: '失败',
			tag: '高'
		}
	]
	return bugData
}

const scroll = (tableBody: any) => {
	let isScroll = true //滚动
	const tableDom = tableBody.getElementsByClassName('el-scrollbar__wrap')[0]
	//鼠标放上去，停止滚动；移开，继续滚动
	tableDom.addEventListener('mouseover', () => {
		isScroll = false
	})
	tableDom.addEventListener('mouseout', () => {
		isScroll = true
	})

	setInterval(() => {
		if (isScroll) {
			tableDom.scrollTop += 3 //设置滚动速度
			if (tableDom.clientHeight + tableDom.scrollTop == tableDom.scrollHeight) {
				tableDom.scrollTop = 0
			}
		}
	}, 100)
}

const shortcuts = [
	{
		text: 'Last week',
		value: () => {
			const end = new Date()
			const start = new Date()
			start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
			return [start, end]
		},
	},
	{
		text: 'Last month',
		value: () => {
			const end = new Date()
			const start = new Date()
			start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
			return [start, end]
		},
	},
	{
		text: 'Last 3 months',
		value: () => {
			const end = new Date()
			const start = new Date()
			start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
			return [start, end]
		},
	},
]
const options = {
	type: 'pie',
	title: {
		text: '域名异常分类'
	},
	legend: {
		position: 'left'
	},
	// bgColor: '#fbfbfb',
	labels: ['未注册', '域名假冒劫持', '黑名单', '白名单', '其他'],
	datasets: [
		{
			data: [334, 278, 190, 235, 90]
		}
	]
};
let myChart1:any = null
function initOption1() {
	myChart1 = echarts.init(document.getElementById('myChart')!); 
	let option= {
		title: {
			text: '域名异常排行',
			x: '2%',
			y: '2%',
			textStyle: {
				color: '#666666'
			}
		},
		tooltip: {
			// trigger: 'axis',
			// axisPointer: {
			// 	type: 'shadow'
			// }
		},
		legend: {},
		grid: {
			top: '15%',
			left: '3%',
			right: '4%',
			bottom: '1%',
			containLabel: true
		},
		xAxis: {
			type: 'value',
			max: 250,
			splitLine: {
				show: false
			}
		},
		yAxis: {
			type: 'category',
			axisLabel: {
				interval: 0,
				rotate: 30
			},
			data: ['openl.co', 'pressnorth.net', 'waterlily.ddns.net', 'adrev22.ddns.net', 'nakamini.ddns.net', 'abtprinting.com', 'useraccount.co', 'account-support.site', 'burningforests.com', 'abtprinting.com']
		},
		series: [
			{
				type: 'bar',
				stack: 'chart',
				label: {
					position: 'right',
					show: true
				},
				data: [242, 156, 128, 96, 85, 65, 50, 44, 32, 10].reverse()
			},
			{
				type: 'bar',
				stack: 'chart',
				silent: true,
				itemStyle: {
					color: '#eee'
				},
				data: [28,114,142,174,185,205,220,226,238,260].reverse()
			},
		]
	}
	option && myChart1.setOption(option);
	window.addEventListener('resize',myChart1Resize)
}
let myChart2:any = null
function initOption2() {
	// type EChartsOption = echarts.EChartsOption;
	myChart2 = echarts.init(document.getElementById('myChart2')!);
	let option= {
		title: {
			text: '事件趋势分析',
			x: '2%',
			y: '2%',
			textStyle: {
				color: '#666666'
			}
		},
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
			data: ['恶意未注册', '域名仿冒', '“8220”组织木马', '白名单', '黑名单'],
			top: '13%'
		},
		grid: {
			top: '30%',
			left: '3%',
			right: '4%',
			bottom: '3%',
			containLabel: true
		},
		xAxis: [
			{
				type: 'category',
				boundaryGap: false,
				data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
			}
		],
		yAxis: [
			{
				type: 'value'
			}
		],
		series: [
			{
				name: '恶意未注册',
				type: 'line',
				stack: 'Total',

				data: [120, 132, 101, 134, 90, 230, 210]
			},
			{
				name: '域名仿冒',
				type: 'line',
				stack: 'Total',

				data: [220, 182, 191, 234, 290, 330, 310]
			},
			{
				name: '白名单',
				type: 'line',
				stack: 'Total',
	
				data: [150, 232, 201, 154, 190, 330, 410]
			},
			{
				name: '黑名单',
				type: 'line',
				stack: 'Total',

				data: [320, 332, 301, 334, 390, 330, 320]
			},
			{
				name: '“8220”组织木马',
				type: 'line',
				stack: 'Total',
				data: [220, 132, 201, 134, 190, 330, 320]
			}
		]
	}
	option && myChart2.setOption(option);
	window.addEventListener('resize',myChart2Resize)
}
let myChart3:any = null
function initOption3() {
	// type EChartsOption = echarts.EChartsOption;
	myChart3 = echarts.init(document.getElementById('myChart3')!);
	let option = {
		title:{
			text: '域名异常分类',
			x: '2%',
			y: '2%',
			textStyle: {
				color: '#666666'
			}
		},
		legend: {
			top: 'bottom'
		},
		// toolbox: {
		// 	show: true,
		// 	feature: {
		// 	mark: { show: true },
		// 	dataView: { show: true, readOnly: false },
		// 	restore: { show: true },
		// 	saveAsImage: { show: true }
		// 	}
		// },
		series: [
			{
			name: 'Nightingale Chart',
			type: 'pie',
			radius: [20, 100],
			center: ['50%', '50%'],
			roseType: 'area',
			itemStyle: {
				borderRadius: 8
			},
			data: [
				{ value: 334, name: '未注册' },
				{ value: 278, name: '域名假冒劫持' },
				{ value: 238, name: '白名单' },
				{ value: 190, name: '黑名单' },				
				{ value: 90, name: '其他' },
			]
			}
		]
	}
	option && myChart3.setOption(option);
	window.addEventListener('resize',myChart3Resize)
}
// 
function myChart1Resize(){
	if (myChart1) {
		myChart1.resize();
	}
}
function myChart2Resize(){
	if (myChart2) {
		myChart2.resize();
	}
}
function myChart3Resize(){
	if (myChart3) {
		myChart3.resize();
	}
}

onUnmounted(() => {
	myChart1.dispose();
	myChart2.dispose();
	myChart3.dispose();
	window.removeEventListener('resize',myChart1Resize)
	window.removeEventListener('resize',myChart2Resize)
	window.removeEventListener('resize',myChart3Resize)
    });
// onUnmounted(() => {
// 	myChart1.dispose();
//     });
// 表格编辑时弹窗和保存
const editVisible = ref(false);
let form = reactive({
	cyclical: '',
	taskType: '',
	cyclicalNum: ''
});
const getDetail = () => {
	ElMessage('正在开发中...')
	// form.name = row.name;
	// form.address = row.address;
	// debugger
	// editVisible.value = true;
	// state.addTitle = '新增';
};

</script>

<style scoped lang="less">

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
.el-row {
	margin-bottom: 10px;
}

.handle-box {
	margin-bottom: 10px;
}

.handle-input {
	width: 18%;
}


.eventid-input {
	width: 16%;
}

.grid-content {
	display: flex;
	align-items: center;
	height: 80px;
}

.grid-cont-right {
	flex: 1;
	text-align: center;
	font-size: 14px;
	color: #999;
}

.grid-num {
	font-size: 26px;
	font-weight: bold;
}

.grid-con-icon {
	font-size: 50px;
	width: 80px;
	height: 80px;
	text-align: center;
	line-height: 100px;
	color: #fff;
}

.grid-con-1 .grid-con-icon {
	background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
	color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
	background: rgb(238, 38, 2);
}

.grid-con-2 .grid-num {
	color: rgb(238, 38, 2);
}

.grid-con-3 .grid-con-icon {
	background: rgb(71, 175, 235);
}

.grid-con-3 .grid-num {
	color: rgb(71, 175, 235);
}

.grid-con-4 .grid-con-icon {
	background: rgb(235, 111, 89);
}

.grid-con-4 .grid-num {
	color: rgb(235, 111, 89);
}

.grid-con-5 .grid-con-icon {
	background: rgb(242, 172, 67);
}

.grid-con-5 .grid-num {
	color: rgb(242, 172, 67);
}

.grid-con-6 .grid-con-icon {
	background: rgb(118, 123, 124);
}

.grid-con-6 .grid-num {
	color: rgb(118, 123, 124);
}

.user-info {
	display: flex;
	align-items: center;
	padding-bottom: 20px;
	border-bottom: 2px solid #ccc;
	margin-bottom: 20px;
}

.user-info-cont {
	padding-left: 50px;
	flex: 1;
	font-size: 14px;
	color: #999;
}

.user-info-cont div:first-child {
	font-size: 30px;
	color: #222;
}

.user-info-list {
	font-size: 14px;
	color: #999;
	line-height: 25px;
}

.user-info-list span {
	margin-left: 70px;
}

.mgb20 {
	margin-bottom: 20px;
}

.todo-item {
	font-size: 14px;
}

.todo-item-del {
	text-decoration: line-through;
	color: #999;
}

.warningTop {
	display: inline-block;
	color: red;
	font-size: 22px;
	width: 100%;
	margin: 8px 15px;
	text-align: center;
}

.operator {
	display: inline-block;
	font-size: 18px;
	margin: 8px 15px;
}

.normalText {
	display: inline-block;
	font-size: 18px;
	margin-top: 3px;
	margin-left: 15px;
}
</style>
