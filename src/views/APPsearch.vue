<template>
	<div class="container">
		<span class="spanText">APP应用名：</span><el-input placeholder="请输入内容" size="small"
			style="width:13%;margin-right: 20px;"></el-input>
		<span class="spanText">APP包名：</span><el-input placeholder="请输入内容" size="small"
			style="width:13%;margin-right: 20px;"></el-input>
		<span class="spanText">APP运营商：</span><el-input placeholder="请输入内容" size="small"
			style="width:13%;margin-right: 20px;"></el-input>
		<span class="spanText">APP在架状态：</span>
		<el-select v-model="value" class="m-2" placeholder="Select" size="small" style="width:13%;">
			<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
		</el-select>
		<el-row class="mb-4" style="margin: 15px 0;">
			<el-button type="primary" :icon="Search">查询</el-button>
			<el-button type="success" :icon="Plus">新增</el-button>
			<el-button type="danger" :icon="Delete">删除</el-button>
		</el-row>
		<el-table ref="multipleTableRef" :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
			<el-table-column type="selection" min-width="55" />
			<el-table-column prop="num" label="序号" min-width="80" />
			<el-table-column prop="name" label="APP应用名" min-width="120" />
			<el-table-column prop="pcapName" label="包名" min-width="120" />
			<el-table-column prop="operator" label="APP运营商" min-width="120" />
			<el-table-column prop="developer" label="开发者" min-width="90" />
			<el-table-column prop="version" label="版本" min-width="80" />
			<el-table-column prop="info" label="APP简介" min-width="120" />
			<el-table-column prop="condition" label="在架状态/下架时间(不在架)" min-width="120" />
			<el-table-column prop="isRecord" label="是否备案" min-width="80" />
			<el-table-column prop="recordTel" label="备案号码" min-width="100" />
			<el-table-column prop="premissInfo" label="应用权限信息" min-width="100" />
			<el-table-column prop="operate" label="操作" fixed="right" min-width="90">
				<template #default>
					<el-button link type="primary" size="small" @click="dialogTableVisible = true">编辑</el-button>
					<el-dialog v-model="dialogTableVisible" title="APP信息填写" :append-to-body='true' width="38%" top="1%" >
						<el-form :model="appForm">
							<el-form-item label="序号" :label-width="formLabelWidth">
								<el-input v-model="appForm.num" autocomplete="off" />
							</el-form-item>
							<el-form-item label="应用名" :label-width="formLabelWidth">
								<el-input v-model="appForm.name" autocomplete="off" />
							</el-form-item>
							<el-form-item label="包名" :label-width="formLabelWidth">
								<el-input v-model="appForm.pcapName" autocomplete="off" />
							</el-form-item>
							<el-form-item label="运营商" :label-width="formLabelWidth">
								<el-input v-model="appForm.operator" autocomplete="off" />
							</el-form-item>
							<el-form-item label="开发者" :label-width="formLabelWidth">
								<el-input v-model="appForm.developer" autocomplete="off" />
							</el-form-item>
							<el-form-item label="版本" :label-width="formLabelWidth">
								<el-input v-model="appForm.version" autocomplete="off" />
							</el-form-item>
							<el-form-item label="简介" :label-width="formLabelWidth">
								<el-input v-model="appForm.info" autocomplete="off" />
							</el-form-item>
							<el-form-item label="在架状态" :label-width="formLabelWidth">
								<el-input v-model="appForm.condition" autocomplete="off" />
							</el-form-item>
							<el-form-item label="是否备案" :label-width="formLabelWidth">
								<el-input v-model="appForm.isRecord" autocomplete="off" />
							</el-form-item>
							<el-form-item label="备案号码" :label-width="formLabelWidth">
								<el-input v-model="appForm.recordTel" autocomplete="off" />
							</el-form-item>
							<el-form-item label="权限信息" :label-width="formLabelWidth">
								<el-input v-model="appForm.premissInfo" autocomplete="off" :rows="2" type="textarea" />
							</el-form-item>
						</el-form>
						<template #footer>
							<span class="dialog-footer">
								<el-button type="primary" @click="dialogTableVisible = false">确定</el-button>
								<el-button @click="dialogTableVisible = false">
									取消
								</el-button>
							</span>
						</template>
					</el-dialog>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script setup lang="ts" name="APPsearch" >
import { ref, reactive } from 'vue'
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

}

const multipleTableRef = ref<InstanceType<typeof ElTable>>()
const multipleSelection = ref<appTableData[]>([])
const handleSelectionChange = (val: appTableData[]) => {
	multipleSelection.value = val
}
const dialogTableVisible = ref(false)
const formLabelWidth = '80px'
const appForm:appTableData = reactive({
	num: 12,
	name: 'name1',
	pcapName: 'pcapName1',
	operator: 'operator1',
	developer: 'dev1',
	version: '12.3.1',
	info: 'info',
	condition: '未下架',
	isRecord: '未备案',
	recordTel: '9759632',
	premissInfo: 'permissInfo',
})
const tableData: appTableData[] = [
	{
		num: 12,
		name: 'name1',
		pcapName: 'pcapName1',
		operator: 'operator1',
		developer: 'dev1',
		version: '12.3.1',
		info: 'info',
		condition: '未下架',
		isRecord: '未备案',
		recordTel: '9759632',
		premissInfo: 'permissInfo',

	},
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
.spanText {
	font-size: 14px
}
</style>