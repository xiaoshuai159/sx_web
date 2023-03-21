<template>
	<div>
		<div class="container">
			<div class="handle-box">
				<span>时间：</span>
				<el-date-picker
					v-model="value1"
					type="datetimerange"
					range-separator="To"
					start-placeholder="Start date"
					end-placeholder="End date"
					/>&nbsp;&nbsp;
				<span>攻击类型：</span>
				<el-select v-model="query.address" placeholder="攻击类型" class="handle-select mr10" style="width:16%">
					<el-option key="1" label="数据库密码爆破" value="数据库密码爆破"></el-option>
					<el-option key="2" label="数据库勒索攻击" value="数据库勒索攻击"></el-option>
				</el-select>
				<span>事件id：</span>
				<el-input v-model="query.name" placeholder="事件id" class="eventid-input mr10" style="width:16%"></el-input><br/><br/>
				<span>受害数据库IP：</span>
				<el-input v-model="query.name" placeholder="受害数据库IP" class="handle-input mr10"></el-input>
				
				<span>攻击者IP：</span>
				<el-input v-model="query.name" placeholder="攻击者IP" class="handle-input mr10"></el-input>
				<el-button type="primary" :icon="Search" @click="handleSearch">搜索</el-button>
				<el-button type="primary" :icon="Plus" @click="handleAdd">新增</el-button>
			</div>
			<el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
				<el-table-column prop="id" label="事件id" min-width="70" align="center"></el-table-column>
				<el-table-column prop="time" label="时间" min-width="158" show-overflow-tooltip></el-table-column>
				<el-table-column prop="harmIP" label="受害数据库IP" min-width="115" show-overflow-tooltip></el-table-column>
				<el-table-column prop="harmPort" label="端口" min-width="55" show-overflow-tooltip></el-table-column>
				<el-table-column prop="databaseType" label="数据库类型" show-overflow-tooltip min-width="95"></el-table-column>
				<el-table-column prop="warnType" label="预警类型" min-width="140"  show-overflow-tooltip ></el-table-column>
				<el-table-column prop="warnContent" label="告警内容" min-width="100" show-overflow-tooltip></el-table-column>
				<el-table-column prop="attackNum" label="攻击次数" min-width="83" show-overflow-tooltip></el-table-column>
				<el-table-column prop="attackIP" label="攻击者IP" min-width="115" show-overflow-tooltip></el-table-column>
				<el-table-column prop="attackPort" label="攻击者端口" min-width="75"></el-table-column>
				<el-table-column prop="level" label="优先级" min-width="75" align="center">
					<template #default="scope">
						<el-tag
							:type="scope.row.level === '低' ? '' : scope.row.level === '高' ? 'danger' : ''"
						>
							{{ scope.row.level }}
						</el-tag>
					</template>
				</el-table-column>
				<el-table-column label="验证状态" align="center" min-width="90">
					<template #default="scope">
						<el-tag
							:type="scope.row.state === '已验证' ? 'success' : scope.row.state === '未验证' ? 'danger' : ''"
						>
							{{ scope.row.state }}
						</el-tag>
					</template>
				</el-table-column>
				<el-table-column label="操作" width="200" align="center" fixed="right">
					<template #default="scope">
						<el-button text :icon="Edit" @click="handleEdit(scope.$index, scope.row)" v-permiss="15">
							编辑
						</el-button>
						<el-button text :icon="Delete" class="red" @click="handleDelete(scope.$index)" v-permiss="16">
							删除
						</el-button>
					</template>
				</el-table-column>
				
			</el-table>
			<div class="pagination">
				<el-pagination
					background
					layout="total, prev, pager, next"
					:current-page="query.pageIndex"
					:page-size="query.pageSize"
					:total="pageTotal"
					@current-change="handlePageChange"
				></el-pagination>
			</div>
		</div>

		<!-- 编辑弹出框 -->
		<el-dialog title="数据安全事件详情" v-model="editVisible" width="30%" top="1%">
				<el-form :model="form">
					<el-form-item label="事件id" :label-width="formLabelWidth">
						<el-input v-model="form.id" autocomplete="off" />
					</el-form-item>
					<el-form-item label="时间" :label-width="formLabelWidth">
						<el-input v-model="form.time" autocomplete="off" />
					</el-form-item>
					<el-form-item label="受害数据IP" :label-width="formLabelWidth">
						<el-input v-model="form.harmIP" autocomplete="off" />
					</el-form-item>
					<el-form-item label="受害端口" :label-width="formLabelWidth">
						<el-input v-model="form.harmPort" autocomplete="off" />
					</el-form-item>
					<el-form-item label="数据库类型" :label-width="formLabelWidth">
						<el-input v-model="form.databaseType" autocomplete="off" />
					</el-form-item>
					<el-form-item label="预警类型" :label-width="formLabelWidth">
						<el-input v-model="form.warnType" autocomplete="off" />
					</el-form-item>
					<el-form-item label="告警内容" :label-width="formLabelWidth">
						<el-input v-model="form.warnContent" autocomplete="off" />
					</el-form-item>
					<el-form-item label="攻击次数" :label-width="formLabelWidth">
						<el-input v-model="form.attackNum" autocomplete="off" />
					</el-form-item>
					<el-form-item label="攻击IP" :label-width="formLabelWidth">
						<el-input v-model="form.attackIP" autocomplete="off" />
					</el-form-item>
					<el-form-item label="攻击端口" :label-width="formLabelWidth">
						<el-input v-model="form.attackPort" autocomplete="off" />
					</el-form-item>
					<el-form-item label="优先级" :label-width="formLabelWidth">
						<el-input v-model="form.level" autocomplete="off" />
					</el-form-item>
					<el-form-item label="验证状态" :label-width="formLabelWidth">
						<el-input v-model="form.state" autocomplete="off" />
					</el-form-item>
				</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button type="primary" @click="saveEdit()">确 定</el-button>
					<el-button @click="editVisible = false">取 消</el-button>
					
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup lang="ts" name="basetable">
import { ref, reactive } from 'vue';
import { ElMessage, ElMessageBox, rowContextKey } from 'element-plus';
import { Delete, Edit, Search, Plus } from '@element-plus/icons-vue';
// import { fetchData } from '../api/index';
const formLabelWidth = '90px'

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
const query = reactive({
	address: '',
	name: '',
	pageIndex: 1,
	pageSize: 10
});
const value1 = ref<[Date,Date]>([
  new Date(2023, 1, 21, 10, 10),
  new Date(2023, 1, 22, 10, 10),
])
const tableData = ref<FormAndTable[]>([{
	id: 1,
	time:'2023-02-22 10:10:00',
	harmIP: '172.53.45.62',
	harmPort: 45,
	databaseType:'mysql',
	warnType:'数据库密码爆破',
	warnContent:'...',
	attackNum: 9,
	attackIP: '192.168.55.4',
	attackPort: 68,
	state:'已验证',
	level:'高'
}]);
const pageTotal = ref(0);
// 获取表格数据
// const getData = () => {
// 	fetchData().then(res => {
// 		tableData.value = res.data.list;
// 		pageTotal.value = res.data.pageTotal || 50;
// 	});
// };
// getData();
const getData = () =>{
	tableData.value = [{
	id: 1,
	time:'2023-02-22 10:10:00',
	harmIP: '172.5.45.62',
	harmPort: 45,
	databaseType:'mysql',
	warnType:'数据库密码爆破',
	warnContent:'...',
	attackNum: 9,
	attackIP: '192.168.55.4',
	attackPort: 68,
	state:'已验证',
	level:'高'
},
{
	id: 2,
	time:'2023-02-22 10:10:00',
	harmIP: '172.53.45.6',
	harmPort: 75,
	databaseType:'mysql',
	warnType:'数据库密码爆破',
	warnContent:'...',
	attackNum: 9,
	attackIP: '192.168.55.4',
	attackPort: 68,
	state:'未验证',
	level:'中'
},
{
	id: 3,
	time:'2023-02-22 10:10:00',
	harmIP: '172.53.5.62',
	harmPort: 40,
	databaseType:'mysql',
	warnType:'数据库密码爆破',
	warnContent:'...',
	attackNum: 9,
	attackIP: '192.168.55.4',
	attackPort: 68,
	state:'已验证',
	level:'高'
}]
}
// 查询操作
const handleSearch = () => {
	query.pageIndex = 1;
	getData();
};
// 分页导航
const handlePageChange = (val: number) => {
	query.pageIndex = val;
	getData();
};

// 删除操作
const handleDelete = (index: number) => {
	// 二次确认删除
	ElMessageBox.confirm('确定要删除吗？', '提示', {
		type: 'warning'
	})
		.then(() => {
			ElMessage.success('删除成功');
			tableData.value.splice(index, 1);
		})
		.catch(() => {});
};

// 表格编辑时弹窗和保存
const editVisible = ref(false);
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
const handleEdit = (index: number, row: any) => {
	idx = index
	// const proxyForm = JSON.parse(JSON.stringify(tableData.value[currentRow]))
	// form = proxyForm
	form.id = tableData.value[idx].id
	form.time = tableData.value[idx].time
	form.harmIP = tableData.value[idx].harmIP
	form.harmPort = tableData.value[idx].harmPort
	form.databaseType = tableData.value[idx].databaseType
	form.warnType = tableData.value[idx].warnType
	form.warnContent = tableData.value[idx].warnContent
	form.attackNum = tableData.value[idx].attackNum
	form.attackIP = tableData.value[idx].attackIP
	form.attackPort = tableData.value[idx].attackPort
	form.level = tableData.value[idx].level
	form.state = tableData.value[idx].state
	editOrAdd = 'edit'
	editVisible.value = true;
};
const handleAdd = () => {
	form.id = undefined,
	form.time = '',
	form.harmIP = '',
	form.harmPort = undefined,
	form.databaseType = '',
	form.warnType = '',
	form.warnContent = '',
	form.attackNum = undefined,
	form.attackIP = '',
	form.attackPort = undefined,
	form.level = '',
	form.state = '',
	editOrAdd = 'add'
	editVisible.value = true;
}
function saveEdit() {
	// console.log(tableData.value[currentRow]);	
	editVisible.value = false;
	if(editOrAdd=='edit'){
		tableData.value[idx].id = form.id
		tableData.value[idx].time = form.time
		tableData.value[idx].harmIP = form.harmIP
		tableData.value[idx].harmPort = form.harmPort
		tableData.value[idx].databaseType = form.databaseType
		tableData.value[idx].warnType = form.warnType
		tableData.value[idx].warnContent = form.warnContent
		tableData.value[idx].attackNum = form.attackNum
		tableData.value[idx].attackIP = form.attackIP
		tableData.value[idx].attackPort = form.attackPort
		tableData.value[idx].level = form.level
		tableData.value[idx].state = form.state
		ElMessage.success(`修改成功`);		
	}else{
		tableData.value.push({
			id:form.id,
			time:form.time,
			harmIP: form.harmIP,
			harmPort:form.harmPort,
			databaseType:form.databaseType,
			warnType:form.warnType,
			warnContent:form.warnContent,
			attackNum: form.attackNum,
			attackIP: form.attackIP,
			attackPort:form.attackPort,
			state:form.state,
			level:form.level
		});
		ElMessage.success(`添加成功`);	
	}
	
};
</script>

<style scoped lang="less">
:deep(.tableClass .cell) {
  // padding-bottom: 12px;
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
	width: 210px;
}
.eventid-input {
	width: 16%;
}

.table {
	width: 100%;
	font-size: 14px;
}
.red {
	color: #F56C6C;
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
    // padding: calc(var(--el-dialog-padding-primary) + 10px) var(--el-dialog-padding-primary);
	padding: 15px 30px;
    color: var(--el-text-color-regular);
    font-size: var(--el-dialog-content-font-size);
    word-break: break-all;
}
</style>
