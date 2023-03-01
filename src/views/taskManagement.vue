<template>
	<div>
		<div class="container">
			<div class="handle-box">
				<span>时间：</span>
				<el-date-picker v-model="value1" type="datetimerange" range-separator="To" start-placeholder="Start date"
					end-placeholder="End date" />&nbsp;&nbsp;
				<span>任务类型：</span>
				<el-select v-model="query.taskType" placeholder="任务类型" class="handle-select mr10">
					<el-option key="可用性监测" label="可用性监测" value="可用性监测"></el-option>
					<el-option key="系统漏洞扫描" label="系统漏洞扫描" value="系统漏洞扫描"></el-option>
					<el-option key="网页变更监测" label="网页变更监测" value="网页变更监测"></el-option>
					<el-option key="网页钓鱼监测" label="网页钓鱼监测" value="网页钓鱼监测"></el-option>
					<el-option key="网页敏感信息监测" label="网页敏感信息监测" value="网页敏感信息监测"></el-option>
					<el-option key="网页木马监测" label="网页木马监测" value="网页木马监测"></el-option>
					<el-option key="网页恶意链接监测" label="网页恶意链接监测" value="网页恶意链接监测"></el-option>
					<el-option key="弱口令检查" label="弱口令检查" value="弱口令检查"></el-option>
					<el-option key="web漏洞扫描监测" label="web漏洞扫描监测" value="web漏洞扫描监测"></el-option>
					<el-option key="webshell扫描检测" label="webshell扫描检测" value="webshell扫描检测"></el-option>
					<el-option key="全部" label="全部" value="全部"></el-option>
				</el-select>
				<span>任务id：</span>
				<el-input v-model="query.name" placeholder="任务id" class="eventid-input mr10"></el-input><br /><br />
				<span>目标IP：</span>
				<el-input v-model="query.name" placeholder="目标IP" class="handle-input mr10"></el-input>
				<el-button type="primary" :icon="Search" @click="handleSearch">搜索</el-button>
				<!-- <el-table-column>
					<template #default="scope">
						<span>{{ scope.row["state"] == 1 ? "未使用" : "已使用" }}</span>
					</template>
				</el-table-column> -->
				<el-button type="primary" :icon="Plus" @click="addTask()" v-permiss="15">新增</el-button>
			</div>
			<el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
				<el-table-column prop="id" label="任务id" width="80" align="center"></el-table-column>
				<el-table-column prop="taskTime" label="时间" width="180"></el-table-column>
				<el-table-column prop="harmIP" label="目标IP"></el-table-column>
				<el-table-column prop="harmPort" label="端口" width="80"></el-table-column>
				<el-table-column prop="databaseType" label="任务类型" align="center"></el-table-column>
				<el-table-column prop="cyclical" label="检测周期"></el-table-column>
				<el-table-column label="状态" align="center">
					<template #default="scope">
						<el-tag :type="scope.row.state === '已启用' ? 'success' : scope.row.state === '未启用' ? 'danger' : ''">
							{{ scope.row.state }}
						</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="excute" label="执行结果" width="200px"></el-table-column>
				<el-table-column label="操作" width="220" align="center">
					<template #default="scope">
						<el-button text :icon="Edit" @click="handleEdit(scope.$index, scope.row)" v-permiss="15">
							启动
						</el-button>
						<el-button text :icon="Edit" @click="handleEdit(scope.$index, scope.row)" v-permiss="15">
							停止
						</el-button>
						<el-button text :icon="Edit" @click="handleEdit(scope.$index, scope.row)" v-permiss="15">
							修改
						</el-button>
						<el-button text :icon="Delete" class="red" @click="handleDelete(scope.$index)" v-permiss="16">
							删除
						</el-button>
					</template>
				</el-table-column>

			</el-table>
			<div class="pagination">
				<el-pagination background layout="total, prev, pager, next" :current-page="query.pageIndex"
					:page-size="query.pageSize" :total="pageTotal" @current-change="handlePageChange"></el-pagination>
			</div>
		</div>

		<!-- 编辑弹出框 -->
		<el-dialog :title="state.addTitle" v-model="editVisible" width="30%">
			<el-form-item label="任务类型" prop="taskType">
				<el-select v-model="form.taskType" placeholder="请选择">
					<el-option key="可用性监测" label="可用性监测" value="可用性监测"></el-option>
					<el-option key="系统漏洞扫描" label="系统漏洞扫描" value="系统漏洞扫描"></el-option>
					<el-option key="网页变更监测" label="网页变更监测" value="网页变更监测"></el-option>
					<el-option key="网页钓鱼监测" label="网页钓鱼监测" value="网页钓鱼监测"></el-option>
					<el-option key="网页敏感信息监测" label="网页敏感信息监测" value="网页敏感信息监测"></el-option>
					<el-option key="网页木马监测" label="网页木马监测" value="网页木马监测"></el-option>
					<el-option key="网页恶意链接监测" label="网页恶意链接监测" value="网页恶意链接监测"></el-option>
					<el-option key="弱口令检查" label="弱口令检查" value="弱口令检查"></el-option>
					<el-option key="web漏洞扫描监测" label="web漏洞扫描监测" value="web漏洞扫描监测"></el-option>
					<el-option key="webshell扫描检测" label="webshell扫描检测" value="webshell扫描检测"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="检测周期" prop="cyclical">
				<el-radio-group v-model="form.cyclical">
					<el-radio label="天"></el-radio>
					<el-radio label="小时"></el-radio>
					<el-radio label="分"></el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form label-width="70px">
				<el-form-item label="周期设置">
					<el-input v-model="form.cyclicalNum"></el-input>
				</el-form-item>
				<el-form-item label="目标配置">
					<el-upload action="#" :limit="1" accept=".xlsx, .xls" :show-file-list="false"
						:before-upload="beforeUpload" :http-request="handleMany">
						<el-button class="mr10" type="success">批量导入</el-button>
					</el-upload>
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="editVisible = false">取 消</el-button>
					<el-button type="primary" @click="saveEdit()">确 定</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup lang="ts" name="basetable">
import { ref, reactive } from 'vue';
import { dialogEmits, ElMessage, ElMessageBox } from 'element-plus';
import { Delete, Edit, Search, Plus } from '@element-plus/icons-vue';
import { fetchData } from '../api/index';
import type { FormInstance, FormRules } from 'element-plus';
import { UploadProps } from 'element-plus';
import * as XLSX from 'xlsx';
import { fromPairs } from 'lodash';

const state = reactive({
	addTitle: '新增'
	// dialogTitle: {
	// 	type: String,
	// 	default: "新增",
	// },
	// icons: {
	// 	type: String,
	// 	default: "",
	// },
});
// const emit = defineEmits(['click', 'delete']);
// export default {
// 	name: "DialogComponent",
// 	props: {
// 		dialogTitle: {
// 			type: String,
// 			default: "添加人员"
// 		},
// 		itemInfo: {
// 			type: Object,
// 			default: function () {
// 				return {};
// 			}
// 		}
// 	},
// 	data() {
// 		return {
// 			rules: {
// 				assetName: [
// 					{ required: true, message: '请输入资产名称', trigger: 'change' }
// 				],
// 				assetClassifyId: [
// 					{ required: true, message: '请选择资产分类', trigger: 'change' }
// 				],
// 				assetCount: [
// 					{ required: true, message: '请输入资产数量', trigger: 'change' }
// 				],
// 			},
// 			options: [],
// 			showDialog: false,
// 			formInfo: JSON.parse(JSON.stringify(this.itemInfo))
// 		};
// 	},
// 	mounted() {
// 		this.getOpt();
// 	},
// 	methods: {
// 		//   获取下拉框
// 		getOpt() {
// 			// this.getRequest("/asset/getTypeList", {}).then(res => {
// 			// 	this.options = res.obj
// 			// });
// 		},
// 		// 保存操作
// 		submitForm() {
// 			// const that = this;
// 			// //   const params = Object.assign(that.formInfo, {});
// 			// that.$refs[formName].validate(valid => {
// 			// 	if (valid) {
// 			// 		that.postRequest("/asset/setAsset", that.formInfo).then(res => {
// 			// 			that.$message({
// 			// 				message: "操作成功！",
// 			// 				type: "success"
// 			// 			});
// 			// 			that.closeDialog(1);
// 			// 		});
// 			// 		// 走保存请求
// 			// 	} else {
// 			// 		return false;
// 			// 	}
// 			// });
// 		},
// 		// 关闭弹框
// 		closeDialog() {
// 			// this.$refs["formInfo"].resetFields();
// 			// this.showDialog = false;
// 			// this.$emit("closeDialog", flag);
// 		}
// 	}
// };

const rules: FormRules = {
	name: [{ required: true, message: '请输入表单名称', trigger: 'blur' }],
};

const importList = ref<any>([]);
const beforeUpload: UploadProps['beforeUpload'] = async (rawFile) => {
	importList.value = await analysisExcel(rawFile);
	return true;
};
const analysisExcel = (file: any) => {
	return new Promise(function (resolve, reject) {
		const reader = new FileReader();
		reader.onload = function (e: any) {
			const data = e.target.result;
			let datajson = XLSX.read(data, {
				type: 'binary',
			});

			const sheetName = datajson.SheetNames[0];
			const result = XLSX.utils.sheet_to_json(datajson.Sheets[sheetName]);
			resolve(result);
		};
		reader.readAsBinaryString(file);
	});
};

const handleMany = async () => {
	// 把数据传给服务器后获取最新列表，这里只是示例，不做请求
	const list = importList.value.map((item: any, index: number) => {
		return {
			id: index,
			name: item['姓名'],
			sno: item['学号'],
			class: item['班级'],
			age: item['年龄'],
			sex: item['性别'],
		};
	});
	tableData.value.push(...list);
};

interface TableItem {
	id: number;
	taskTime: string;
	harmIP: string;
	harmPort: number;
	attackNum: number;
	attackIP: string;
	attackPort: number;
	state: string;
	excute: string;
	databaseType: string,
	cyclical: string,
	title: string
}

const query = reactive({
	taskType: '',
	name: '',
	pageIndex: 1,
	pageSize: 10
});
const value1 = ref<[Date, Date]>([
	new Date(2023, 1, 14, 10, 10),
	new Date(2023, 1, 15, 10, 10),
])
let tableData = ref<TableItem[]>([{
	id: 1,
	taskTime: '2023-03-01 18:00:00',
	harmIP: '172.53.45.62',
	harmPort: 22,
	attackNum: 9,
	attackIP: '192.168.55.4',
	attackPort: 68,
	state: '已启用',
	excute: '成功 1 次  失败 1 次',
	databaseType: '可用性检测',
	cyclical: '每天1次',
	title: '新增'
},]);
const pageTotal = ref(0);
// 获取表格数据
const getData = () => {
	tableData.value = [{
		id: 1,
		taskTime: '2023-03-01 18:00:00',
		harmIP: '172.53.45.62',
		harmPort: 22,
		attackNum: 9,
		attackIP: '192.168.55.4',
		attackPort: 68,
		state: '已启用',
		excute: '成功 1 次  失败 1 次',
		databaseType: '可用性检测',
		cyclical: '每天1次',
		title: '新增'
	},{
		id: 2,
		taskTime: '2023-03-01 18:00:00',
		harmIP: '172.53.4.62',
		harmPort: 29,
		attackNum: 10,
		attackIP: '192.168.5.4',
		attackPort: 6,
		state: '已启用',
		excute: '成功 1 次  失败 1 次',
		databaseType: '可用性检测',
		cyclical: '每天1次',
		title: '新增'
	},]
};
// getData();

// 查询操作
const handleSearch = () => {
	query.pageIndex = 1;
	getData();
};
// 新增操作

const addTask = () => {
	// form.name = row.name;
	// form.address = row.address;
	editVisible.value = true;
	state.addTitle = '新增';
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
		.catch(() => { });
};

// 表格编辑时弹窗和保存
const editVisible = ref(false);
let form = reactive({
	cyclical: '',
	taskType: '',
	cyclicalNum: ''
});
let idx: number = -1;
const handleEdit = (index: number, row: any) => {
	idx = index;
	form.taskType = row.databaseType
	form.cyclical = row.cyclical.substr(1,1)
	form.cyclicalNum = row.cyclical.substr(2,1);
	editVisible.value = true;
	state.addTitle = '编辑';
};
const saveEdit = () => {
	editVisible.value = false;
	ElMessage.success(`修改第 ${idx + 1} 行成功`);
	tableData.value.push({
		id: 2,
		taskTime: '2023-03-01 18:00:00',
		harmIP: '172.53.45.62',
		harmPort: 22,
		attackNum: 9,
		attackIP: '192.168.55.4',
		attackPort: 68,
		state: '已关闭',
		excute: '',
		databaseType: form.taskType,
		cyclical: "每" + form.cyclical + form.cyclicalNum + "次",
		title: '新增'
	})
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
