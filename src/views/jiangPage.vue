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
                <el-option key="1" label="柠檬鸭组织木马" value="柠檬鸭组织木马"></el-option>
                <el-option key="2" label="blackmoon木马" value="blackmoon木马"></el-option>
            </el-select>
            <span>事件id：</span>
            <el-input v-model="query.name" placeholder="事件id" class="eventid-input mr10" style="width:16%"></el-input><br/><br/>
            <span>受害者IP：</span>
            <el-input v-model="query.name" placeholder="受害者IP" class="handle-input mr10"></el-input>
            
            <span>攻击者IP：</span>
            <el-input v-model="query.name" placeholder="攻击者IP" class="handle-input mr10"></el-input>
            <el-button type="primary">搜索</el-button>
            <el-button>导出</el-button>
            <!-- <el-button type="primary" @click="handleAdd">新增</el-button> -->
        </div>
        <el-table :data="curtableData2" class="tableStyle" ref="multipleTable" header-cell-class-name="table-header" stripe>
            <el-table-column prop="id" label="事件id" min-width="70" align="center"></el-table-column>
            <el-table-column prop="time" label="时间" min-width="158" show-overflow-tooltip></el-table-column>
            <el-table-column prop="harmIP" label="受害者IP" min-width="115" show-overflow-tooltip></el-table-column>
            <el-table-column prop="attackIP" label="攻击者IP" min-width="115" show-overflow-tooltip></el-table-column>
            <el-table-column prop="warnType" label="类型" min-width="140"  show-overflow-tooltip ></el-table-column>
            <el-table-column prop="harmPort" label="目的端口" min-width="100" show-overflow-tooltip></el-table-column>
            <el-table-column prop="level" label="告警等级" min-width="100" align="center">
                <template #default="scope">
                    <el-tag
                        :type="scope.row.level === '低' ? '' : scope.row.level === '高' ? 'danger' : ''"
                    >
                        {{ scope.row.level }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="90" align="center" >
                <template #default="scope">
                    <el-button text class="blue" @click="handleEdit(scope.$index, scope.row)" v-permiss="15">
                        详情
                    </el-button>
                </template>
            </el-table-column>            
        </el-table>
        <div class="pagination">
            <el-pagination background layout="total, prev, pager, next" v-model:current-page="query.pageIndex"
							:page-size="query.pageSize" :total="query.total"
							@current-change="handlePageChange"></el-pagination>
        </div>

    </div>

            <!-- 编辑弹出框 -->
    <el-dialog title="僵木蠕事件详情" v-model="editVisible">
		<div class="dialog-body">
						<div class="dialog-body-title">
							<span class="start-png"></span>
							基础信息
							<p class="dashed-bottom"></p>
							<p class="end-png"></p>
						</div>
						<div class="dialog-body-content">
							<div><span class="dialog-body-left">事件id：</span><span class="dialog-body-right">01</span></div>
							<div><span class="dialog-body-left">时间：</span><span class="dialog-body-right">2023-05-29</span></div>
							<div><span class="dialog-body-left">事件名称：</span><span class="dialog-body-right">柠檬鸭组织木马</span></div>	
							<div><span class="dialog-body-left">源IP：</span><span class="dialog-body-right">63.56.123.55</span></div>
							<div><span class="dialog-body-left">源端口：</span><span class="dialog-body-right">124</span></div>
							<div><span class="dialog-body-left">地域：</span><span class="dialog-body-right">广东</span></div> 
							<div><span class="dialog-body-left">目的IP：</span><span class="dialog-body-right">13.5.12.55</span></div>
							<div><span class="dialog-body-left">目的端口：</span><span class="dialog-body-right">24</span></div>
							<div><span class="dialog-body-left">地域：</span><span class="dialog-body-right">北京昌平</span></div>
						</div>
						<br>
						<div class="dialog-body-title">
							<span class="start-png"></span>
							告警信息
							<p class="dashed-bottom"></p>
							<p class="end-png"></p>
						</div>
						<div class="dialog-body-content">
							<div><span class="dialog-body-left">告警类型：</span><span class="dialog-body-right">柠檬鸭组织木马</span></div>
							<div><span class="dialog-body-left">告警等级：</span><span class="dialog-body-right">高级</span></div>
							<div><span class="dialog-body-left">告警载荷：</span><span class="dialog-body-right">/x0qrvdngfe</span></div>	
						</div>
						<br>
						<div class="dialog-body-title">
							<span class="start-png"></span>
							威胁情报
							<p class="dashed-bottom"></p>
							<p class="end-png"></p>
						</div>
						<div style="margin-top: 6px;margin-left: 5px; font-size: 18px;font-weight: 600;">pool.use-138.com</div>
						<div class="dialog-body-content">							
							<div><span class="dialog-body-left">情报标签</span> <span class="dialog-body-right">暂无</span></div>
							<div><span class="dialog-body-left">运营商</span> <span class="dialog-body-right">暂无</span></div>
							<div><span class="dialog-body-left">置信度</span> <span class="dialog-body-right">暂无</span></div>
							<div><span class="dialog-body-left">相关链接</span> <span class="dialog-body-right" style="cursor: pointer; color:rgb(0, 119, 255)">下载</span></div>							
						</div>
						<br>
						<div class="dialog-body-title">
							<span class="start-png"></span>
							处置建议
							<p class="dashed-bottom"></p>
							<p class="end-png"></p>
						</div>
						<div style="font-size: 10px; margin: 5px;">
							1、确认告警出现的频率、数量及时间等指标，大致判断是否为手动误访问导致
							 <br>
							2、排查是否存在其他受影响终端
						</div>
					</div>
        <template #footer>
            <span class="dialog-footer">
                <el-button type="primary" @click="saveEdit()">确 定</el-button>
                <el-button @click="editVisible = false">取 消</el-button>
                
            </span>
        </template>
    </el-dialog>
    </div>

</template>

<script setup lang="ts" name="jiangPage" >
import { reactive,ref,onMounted } from 'vue'
import { dayjs } from 'element-plus'
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
const curtableData2 = ref<FormAndTable[] | undefined>([])
const query = reactive({
	address: '',
	name: '',
	pageIndex: 1,
	pageSize: 10,
	total:16
});
onMounted(()=>{
	handlePageChange(1)
})
 const handlePageChange = (value: number) => {
	query.pageIndex = value;
	console.log("当前页码"+value);
   if (value > 1) {

		curtableData2.value = tableData2.value&&tableData2.value.slice(10,16)
	} else { 
		curtableData2.value = tableData2.value&&tableData2.value.slice(0,10);  
   }

};
const formLabelWidth = '90px'
const editVisible = ref(false);
const pageTotal = ref(0);
const handleSearch = () => {
	query.pageIndex = 1;
	getData();
};
// const handlePageChange = (val: number) => {
// 	query.pageIndex = val;
// 	getData();
// };
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
	dayjs().subtract(1, 'day').toDate(),
    dayjs().toDate()
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
},{
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
},{
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
},{
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
},{
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
},{
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
},{
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
},{
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
},{
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
},{
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
},{
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
},{
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
},{
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
},{
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
},{
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
},{
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
// const query = reactive({
// 	address: '',
// 	name: '',
// 	pageIndex: 1,
// 	pageSize: 10
// });
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
	editVisible.value = true;
};
function saveEdit() {
	editVisible.value = false;
};
</script>

<style scoped lang="less">
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
	// width: 100%;
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
// p{
// 	line-height: 32px;
// }
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
	width: 220px;
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