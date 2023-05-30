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
                style="width:38%"
                />&nbsp;&nbsp;
            <span>类型：</span>
            <el-select v-model="query.address" placeholder="类型" class="handle-select mr10" style="width:16%">
                <el-option key="1" label="黄" value="黄"></el-option>
                <el-option key="2" label="赌" value="赌"></el-option>
                <el-option key="3" label="毒" value="毒"></el-option>
                <el-option key="4" label="枪" value="枪"></el-option>
                <el-option key="5" label="诈" value="诈"></el-option>
            </el-select>
            <span>域名：</span>
            <el-input v-model="query.name" placeholder="域名" class="eventid-input mr10" style="width:16%"></el-input><br/><br/>
            <span>IP：</span>
            <el-input v-model="query.name" placeholder="IP" class="handle-input mr10"></el-input>
            
            <!-- <span>攻击者IP：</span>
            <el-input v-model="query.name" placeholder="攻击者IP" class="handle-input mr10"></el-input> -->
            <el-button type="primary" @click="handleSearch">搜索</el-button>
            <el-button>导出</el-button>
            <!-- <el-button type="primary" @click="handleAdd">新增</el-button> -->
        </div>
        <el-table :data="tableData2" class="tableStyle" ref="multipleTable" header-cell-class-name="table-header" stripe>
            <el-table-column prop="id" label="事件id" min-width="50" align="center"></el-table-column>
            <el-table-column prop="time" label="时间" min-width="160" show-overflow-tooltip></el-table-column>
            <el-table-column prop="domain" label="域名" min-width="115" show-overflow-tooltip></el-table-column>
            <el-table-column prop="IP" label="IP" min-width="115" show-overflow-tooltip></el-table-column>
            
            <!-- <el-table-column prop="databaseType" label="数据库类型" show-overflow-tooltip min-width="95"></el-table-column> -->
             <el-table-column prop="warnType" label="类型" min-width="80"  show-overflow-tooltip ></el-table-column>
            <el-table-column prop="inOrOut" label="境内外" min-width="100" align="center">
                <template #default="scope">
                    <el-tag
                        :type="scope.row.inOrOut === '境内' ? '' : scope.row.inOrOut === '境外' ? 'danger' : ''"
                    >
                        {{ scope.row.inOrOut }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="visitNum" label="访问量" min-width="60" show-overflow-tooltip></el-table-column>
            <!-- <el-table-column label="操作" width="90" align="center" >
                <template #default="scope">
                    <el-button text class="blue" @click="handleEdit(scope.$index, scope.row)" v-permiss="15">
                        详情
                    </el-button>
                </template>
            </el-table-column> -->
            
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
    <!-- <el-dialog title="数据安全事件详情" v-model="editVisible" width="30%" top="1%">
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
    </el-dialog> -->
    </div>

</template>

<script setup lang="ts" name="harmEvent" >
import { reactive,ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
interface FormAndTable {
	id: number|undefined
	time: string
	IP: string
	domain: string
	warnType: string
	// warnContent: string
	// attackPort: number|undefined
	inOrOut: string
	visitNum: number|undefined
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
	time:'2023-05-29 10:10:00',
	IP: '172.53.45.62',
    domain:'dailysync.zapto.org',
	warnType:'黄',
    inOrOut:'境内',
	visitNum:22
},
{
	id: 2,
	time:'2023-05-29 18:40:00',
	IP: '188.241.68.127',
    domain:'plansecure.org',
	warnType:'黄',
    inOrOut:'境内',
	visitNum:13
},
{
	id: 3,
	time:'2023-05-29 19:20:00',
	IP: '91.211.88.71',
    domain:'davidjone.net',
	warnType:'毒',
    inOrOut:'境内',
	visitNum:5
}]
}
const value1 = ref<[Date,Date]>([
	new Date(2023, 4, 29, 10, 10),
  new Date(2023, 4, 30, 10, 10),
])
const tableData2 = ref<FormAndTable[]>([{
	id: 1,
	time:'2023-05-29 10:10:00',
	IP: '172.53.45.62',
    domain:'dailysync.zapto.org',
	warnType:'黄',
    inOrOut:'境内',
	visitNum:22
}]);
const query = reactive({
	address: '',
	name: '',
	pageIndex: 1,
	pageSize: 10
});
// let form = reactive<FormAndTable>({
// 	id: undefined,
// 	time: '',
// 	harmIP:'',
// 	harmPort:undefined,
// 	databaseType:'',
// 	warnType:'',
// 	warnContent:'',
// 	attackNum:undefined,
// 	attackIP:'',
// 	attackPort:undefined,
// 	level:'',
// 	state:''
// });
let idx: number = -1;
let editOrAdd:any
const handleEdit = (index: number, row: any) => {
	ElMessage('正在开发中...')
	// idx = index
	// // const proxyForm = JSON.parse(JSON.stringify(tableData.value[currentRow]))
	// // form = proxyForm
	// form.id = tableData2.value[idx].id
	// form.time = tableData2.value[idx].time
	// form.harmIP = tableData2.value[idx].harmIP
	// form.harmPort = tableData2.value[idx].harmPort
	// form.databaseType = tableData2.value[idx].databaseType
	// form.warnType = tableData2.value[idx].warnType
	// form.warnContent = tableData2.value[idx].warnContent
	// form.attackNum = tableData2.value[idx].attackNum
	// form.attackIP = tableData2.value[idx].attackIP
	// form.attackPort = tableData2.value[idx].attackPort
	// form.level = tableData2.value[idx].level
	// form.state = tableData2.value[idx].state
	// editOrAdd = 'edit'
	// editVisible.value = true;
};
// function saveEdit() {
// 	// console.log(tableData.value[currentRow]);	
// 	editVisible.value = false;
// 	if(editOrAdd=='edit'){
// 		tableData2.value[idx].id = form.id
// 		tableData2.value[idx].time = form.time
// 		tableData2.value[idx].harmIP = form.harmIP
// 		tableData2.value[idx].harmPort = form.harmPort
// 		tableData2.value[idx].databaseType = form.databaseType
// 		tableData2.value[idx].warnType = form.warnType
// 		tableData2.value[idx].warnContent = form.warnContent
// 		tableData2.value[idx].attackNum = form.attackNum
// 		tableData2.value[idx].attackIP = form.attackIP
// 		tableData2.value[idx].attackPort = form.attackPort
// 		tableData2.value[idx].level = form.level
// 		tableData2.value[idx].state = form.state
// 		ElMessage.success(`修改成功`);		
// 	}else{
// 		tableData2.value.push({
// 			id:form.id,
// 			time:form.time,
// 			harmIP: form.harmIP,
// 			harmPort:form.harmPort,
// 			databaseType:form.databaseType,
// 			warnType:form.warnType,
// 			warnContent:form.warnContent,
// 			attackNum: form.attackNum,
// 			attackIP: form.attackIP,
// 			attackPort:form.attackPort,
// 			state:form.state,
// 			level:form.level
// 		});
// 		ElMessage.success(`添加成功`);	
// 	}
	
// };
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
// :deep(.el-table__row:hover){
// 	background-color: blue !important;
// }
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
.blue{
	color:#409eff;
	font-size: 1px;
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