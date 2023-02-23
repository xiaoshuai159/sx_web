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
				<el-select v-model="query.address" placeholder="攻击类型" class="handle-select mr10">
					<el-option key="1" label="数据库密码爆破" value="数据库密码爆破"></el-option>
					<el-option key="2" label="数据库勒索攻击" value="数据库勒索攻击"></el-option>
				</el-select>
				<span>事件id：</span>
				<el-input v-model="query.name" placeholder="事件id" class="eventid-input mr10"></el-input><br/><br/>
				<span>受害数据库IP：</span>
				<el-input v-model="query.name" placeholder="受害数据库IP" class="handle-input mr10"></el-input>
				
				<span>攻击者IP：</span>
				<el-input v-model="query.name" placeholder="攻击者IP" class="handle-input mr10"></el-input>
				<el-button type="primary" :icon="Search" @click="handleSearch">搜索</el-button>
				<el-button type="primary" :icon="Plus">新增</el-button>
			</div>
			<el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
				<el-table-column prop="id" label="事件id" min-width="60" align="center"></el-table-column>
				<el-table-column prop="time" label="时间" min-width="105"></el-table-column>
				<el-table-column prop="harmIP" label="受害数据库IP" min-width="105"></el-table-column>
				<el-table-column prop="harmPort" label="端口" min-width="60"></el-table-column>
				<el-table-column prop="databaseType" label="数据库类型" align="center" min-width="90"></el-table-column>
				<el-table-column prop="warnType" label="预警类型" min-width="70"></el-table-column>
				<el-table-column prop="warnContent" label="告警内容" min-width="100"></el-table-column>
				<el-table-column prop="attackNum" label="攻击次数" min-width="70"></el-table-column>
				<el-table-column prop="attackIP" label="攻击者IP" min-width="105"></el-table-column>
				<el-table-column prop="attackPort" label="攻击者端口" min-width="75"></el-table-column>
				<el-table-column prop="level" label="优先级" min-width="75">
					<template #default="scope">
						<el-tag
							:type="scope.row.level === '低' ? '' : scope.row.level === '高' ? 'danger' : ''"
						>
							{{ scope.row.level }}
						</el-tag>
					</template>
				</el-table-column>
				<el-table-column label="验证状态" align="center" min-width="70">
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
								<el-input v-model="form.num" autocomplete="off" />
							</el-form-item>
							<el-form-item label="时间" :label-width="formLabelWidth">
								<el-input v-model="form.time" autocomplete="off" />
							</el-form-item>
							<el-form-item label="受害数据IP" :label-width="formLabelWidth">
								<el-input v-model="form.harmIP" autocomplete="off" />
							</el-form-item>
							<el-form-item label="受害端口" :label-width="formLabelWidth">
								<el-input v-model="form.port" autocomplete="off" />
							</el-form-item>
							<el-form-item label="数据库类型" :label-width="formLabelWidth">
								<el-input v-model="form.databaseType" autocomplete="off" />
							</el-form-item>
							<el-form-item label="预警类型" :label-width="formLabelWidth">
								<el-input v-model="form.sosType" autocomplete="off" />
							</el-form-item>
							<el-form-item label="告警内容" :label-width="formLabelWidth">
								<el-input v-model="form.sosContent" autocomplete="off" />
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
								<el-input v-model="form.status" autocomplete="off" />
							</el-form-item>
						</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="editVisible = false">取 消</el-button>
					<el-button type="primary" @click="saveEdit">确 定</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup lang="ts" name="basetable">
import { ref, reactive } from 'vue';
import { ElMessage, ElMessageBox, rowContextKey } from 'element-plus';
import { Delete, Edit, Search, Plus } from '@element-plus/icons-vue';
import { fetchData } from '../api/index';
import { Row } from 'element-plus/es/components/table-v2/src/components';

interface TableItem {
	id: number;
	time: string;
	harmIP: string;
	harmPort: number;
	databaseType: string;
	warnType: string;
	warnContent: string;
	attackNum: number;
	attackIP: string;
	attackPort: number;
	state:string;
	level:string
}
const dialogTableVisible = ref(false)
const formLabelWidth = '90px'
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
const tableData = ref<TableItem[]>([{
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
},]);
const pageTotal = ref(0);
// 获取表格数据
const getData = () => {
	fetchData().then(res => {
		tableData.value = res.data.list;
		pageTotal.value = res.data.pageTotal || 50;
	});
};
// getData();

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
let form = reactive({
	num: '',
	time: '',
	harmIP:'',
	port:'',
	databaseType:'',
	sosType:'',
	sosContent:'',
	attackNum:'',
	attackIP:'',
	attackPort:'',
	level:'',
	status:''
});
let idx: number = -1;
const handleEdit = (index: number, row: any) => {
	form.num = row.id;
	form.time = row.time;
	form.harmIP = row.harmIP;
	form.port = row.harmPort;
	form.databaseType = row.databaseType;
	form.sosType = row.warnType;
	form.sosContent = row.warnContent;
	form.attackNum = row.attackNum;
	form.attackIP = row.attackIP;
	form.attackPort = row.attackPort;
	form.level = row.level;
	form.status = row.state;
	editVisible.value = true;
};
const saveEdit = () => {
	editVisible.value = false;
	ElMessage.success(`修改第 ${idx + 1} 行成功`);
};
</script>

<style scoped lang="less">
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
