<template>
	<div class="container">
		<span class="spanText">APP应用名：</span><el-input placeholder="请输入内容" size="small" style="width:13%;margin-right: 20px;"></el-input>
		<span class="spanText">APP包名：</span><el-input placeholder="请输入内容" size="small" style="width:13%;margin-right: 20px;"></el-input>
		<span class="spanText">APP运营商：</span><el-input placeholder="请输入内容" size="small" style="width:13%;margin-right: 20px;"></el-input>
		<span class="spanText">APP在架状态：</span>
		<el-select v-model="value" class="m-2" placeholder="Select" size="small" style="width:13%;">
			<el-option
			v-for="item in options"
			:key="item.value"
			:label="item.label"
			:value="item.value"
			/>
		</el-select>
		<el-row class="mb-4" style="margin: 15px 0;">
			<el-button type="primary" :icon="Search">查询</el-button>
			<el-button type="success" :icon="Plus">新增</el-button>
			<el-button type="danger" :icon="Delete">删除</el-button>
		</el-row>
		<el-table
			ref="multipleTableRef"
			:data="tableData"
			style="width: 100%"
			@selection-change="handleSelectionChange"
		>
			<el-table-column type="selection" width="55" />
			<el-table-column prop="num" label="序号" width="80" />
			<el-table-column prop="name" label="APP应用名" width="120" />
			<el-table-column prop="pcapName" label="包名" width="120" />
			<el-table-column prop="operator" label="APP运营商" width="120" />
			<el-table-column prop="developer" label="开发者" width="90" />
			<el-table-column prop="version" label="版本" width="80" />
			<el-table-column prop="info" label="APP简介" />
			<el-table-column prop="condition" label="在架状态/下架时间(不在架)" width="120" />
			<el-table-column prop="isRecord" label="是否备案" width="80" />
			<el-table-column prop="recordTel" label="备案号码" width="100" />
			<el-table-column prop="premissInfo" label="应用权限信息" width="100"/>
			<el-table-column prop="operate" label="操作" fixed="right" width="90">
				<template #default>
					<el-button link type="primary" size="small" @click="handleClick">编辑</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script setup lang="ts" name="APPsearch">
import { ref } from 'vue'
import { ElTable } from 'element-plus'
import { Delete, Plus, Search } from '@element-plus/icons-vue'
const value = ref('yes')
interface appTableData {
  num: number
  name: string
  pcapName: string
  operator: string
  developer: string
  version: string
  info: string
  condition: string
  isRecord: string
  recordTel: string
  premissInfo: string
  operate: string
}

const multipleTableRef = ref<InstanceType<typeof ElTable>>()
const multipleSelection = ref<appTableData[]>([])
const handleSelectionChange = (val: appTableData[]) => {
  multipleSelection.value = val
}
const tableData: appTableData[] = [
  ]
const options = [
  {
    value: 'yes',
    label: '已下架',
  },
  {
    value: 'no',
    label: '未下架',
  },]
const handleClick = () => {
  console.log('click')
}
</script>

<style scoped>
.spanText{
	font-size:14px
}
</style>