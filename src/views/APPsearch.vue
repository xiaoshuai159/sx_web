<template>
	<div class="container">
		<span class="spanText">APP应用名：</span><el-input placeholder="请输入内容"
			style="width:13%;margin-right: 20px;"></el-input>
		<span class="spanText">APP包名：</span><el-input placeholder="请输入内容" 
			style="width:13%;margin-right: 20px;"></el-input>
		<span class="spanText">APP运营商：</span><el-input placeholder="请输入内容" 
			style="width:13%;margin-right: 20px;"></el-input>
		<span class="spanText">APP在架状态：</span>
		<el-select v-model="value" class="m-2" placeholder="Select" style="width:13%;">
			<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
		</el-select>
		<el-row class="mb-4" style="margin: 15px 0;">
			<el-button type="primary" @click="handleSearch">查询</el-button>
			<el-button type="success" @click="handleAdd">新增</el-button>
			<el-button type="danger" @click="handleDel">删除</el-button>
		</el-row>
		<el-table ref="multipleTableRef" :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
			<el-table-column type="selection" min-width="55" />
			<el-table-column prop="num" label="序号" min-width="80" />
			<el-table-column prop="name" label="APP应用名" min-width="120" show-overflow-tooltip/>
			<el-table-column prop="pcapName" label="包名" min-width="120" show-overflow-tooltip/>
			<el-table-column prop="operator" label="APP运营商" min-width="120" show-overflow-tooltip/>
			<el-table-column prop="developer" label="开发者" min-width="90" show-overflow-tooltip/>
			<el-table-column prop="version" label="版本" min-width="80" show-overflow-tooltip/>
			<el-table-column prop="info" label="APP简介" min-width="120" show-overflow-tooltip/>
			<el-table-column prop="condition" label="在架状态/下架时间(不在架)" min-width="120" show-overflow-tooltip/>
			<el-table-column prop="isRecord" label="是否备案" min-width="80" show-overflow-tooltip/>
			<el-table-column prop="recordTel" label="备案号码" min-width="100" show-overflow-tooltip/>
			<el-table-column prop="premissInfo" label="应用权限信息" min-width="110" show-overflow-tooltip/>
			<el-table-column prop="operate" label="操作" fixed="right" min-width="90">
				<template #default="scope">
					<el-button link type="primary" size="small" @click="handleEdit(scope.$index, scope.row)" v-permiss="15">编辑</el-button>
					
				</template>
			</el-table-column>
		</el-table>
		<el-dialog v-model="dialogTableVisible" title="APP信息填写" :append-to-body='true' width="30%" top="1%">
			<el-form :model="form">
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
			</el-form>
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
</template>

<script setup lang="ts" name="APPsearch" >
import { ref, reactive } from 'vue'
import { ElTable } from 'element-plus'
import { ElMessage, ElMessageBox } from 'element-plus';
import { Delete, Plus, Search } from '@element-plus/icons-vue'
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
const tableData = ref<appTableData[]>([
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
		{
			num: 13,
			name: 'name2',
			pcapName: 'pcapName2',
			operator: 'operator2',
			developer: 'dev2',
			version: '12.3.2',
			info: 'info2',
			condition: '未下架',
			isRecord: '未备案',
			recordTel: '9759632',
			premissInfo: 'permissInfo',

		},
		{
			num: 14,
			name: 'name3',
			pcapName: 'pcapName3',
			operator: 'operator3',
			developer: 'dev3',
			version: '12.3.3',
			info: 'info3',
			condition: '未下架',
			isRecord: '未备案',
			recordTel: '9759632',
			premissInfo: 'permissInfo',

		}
	]
}
const handleSearch = () => {
	getData()
}
let editOrAdd:string
const handleEdit = (a:number,b:any) => {
	idx = a
	editOrAdd = 'edit'
	form.num = tableData.value[idx].num
	form.name = tableData.value[idx].name
	form.pcapName = tableData.value[idx].pcapName
	form.operator = tableData.value[idx].operator
	form.developer = tableData.value[idx].developer
	form.version = tableData.value[idx].version
	form.info = tableData.value[idx].info
	form.condition = tableData.value[idx].condition
	form.isRecord = tableData.value[idx].isRecord
	form.recordTel = tableData.value[idx].recordTel
	form.premissInfo = tableData.value[idx].premissInfo
	dialogTableVisible.value = true
}

const saveEdit = () => {
	if(editOrAdd == 'edit'){
		dialogTableVisible.value = false;
		tableData.value[idx].num = form.num
		tableData.value[idx].name = form.name
		tableData.value[idx].pcapName = form.pcapName
		tableData.value[idx].operator = form.operator
		tableData.value[idx].developer = form.developer
		tableData.value[idx].version = form.version
		tableData.value[idx].info = form.info
		tableData.value[idx].condition = form.condition
		tableData.value[idx].isRecord = form.isRecord
		tableData.value[idx].recordTel = form.recordTel
		tableData.value[idx].premissInfo = form.premissInfo
		ElMessage.success(`修改成功`);
	}else{
		dialogTableVisible.value = false;
		tableData.value.push({
			num: form.num,
			name: form.name,
			pcapName: form.pcapName,
			operator: form.operator,
			developer: form.developer,
			version: form.version,
			info: form.info,
			condition: form.condition,
			isRecord: form.isRecord,
			recordTel: form.recordTel,
			premissInfo: form.premissInfo,	
		})
		ElMessage.success(`添加成功`);
	}
	
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
</script>

<style scoped>
.spanText {
	font-size: 16px
}
</style>