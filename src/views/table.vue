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
				<el-table-column prop="id" label="事件id" width="80" align="center"></el-table-column>
				<el-table-column prop="harmIP" label="受害数据库IP"></el-table-column>
				<el-table-column prop="harmPort" label="端口"></el-table-column>
				<el-table-column prop="databaseType" label="数据库类型" align="center"></el-table-column>
				<el-table-column prop="attackNum" label="攻击次数"></el-table-column>
				<el-table-column prop="attackIP" label="攻击者IP"></el-table-column>
				<el-table-column prop="attackPort" label="攻击者端口"></el-table-column>
				<el-table-column label="验证状态" align="center">
					<template #default="scope">
						<el-tag
							:type="scope.row.state === '已验证' ? 'success' : scope.row.state === '未验证' ? 'danger' : ''"
						>
							{{ scope.row.state }}
						</el-tag>
					</template>
				</el-table-column>
				<el-table-column label="操作" width="220" align="center">
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
		<el-dialog title="编辑" v-model="editVisible" width="30%">
			<el-form label-width="70px">
				<el-form-item label="用户名">
					<el-input v-model="form.name"></el-input>
				</el-form-item>
				<el-form-item label="地址">
					<el-input v-model="form.address"></el-input>
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
import { ElMessage, ElMessageBox } from 'element-plus';
import { Delete, Edit, Search, Plus } from '@element-plus/icons-vue';
import { fetchData } from '../api/index';

interface TableItem {
	id: number;
	harmIP: string;
	harmPort: number;
	attackNum: number;
	attackIP: string;
	attackPort: number;
	state:string;
	databaseType:string
}

const query = reactive({
	address: '',
	name: '',
	pageIndex: 1,
	pageSize: 10
});
const value1 = ref<[Date,Date]>([
  new Date(2023, 1, 14, 10, 10),
  new Date(2023, 1, 15, 10, 10),
])
const tableData = ref<TableItem[]>([{
	id: 1,
	harmIP: '172.53.45.62',
	harmPort: 45,
	attackNum: 9,
	attackIP: '192.168.55.4',
	attackPort: 68,
	state:'已验证',
	databaseType:'mysql'
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
	name: '',
	address: ''
});
let idx: number = -1;
const handleEdit = (index: number, row: any) => {
	idx = index;
	form.name = row.name;
	form.address = row.address;
	editVisible.value = true;
};
const saveEdit = () => {
	editVisible.value = false;
	ElMessage.success(`修改第 ${idx + 1} 行成功`);
};
</script>

<style scoped>
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
</style>
