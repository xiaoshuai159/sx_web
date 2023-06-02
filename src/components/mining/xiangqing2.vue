<template>
    <div class="content" ref="xiangqing_ref">
    <el-card shadow="never">
      <el-main style="background-color: white;padding: 5px;">
        <el-row >
            <div class="grid-content bg-purple handle-box">
              <div align="left">
                城市 <span v-html="'\u00a0\u00a0\u00a0\u00a0'"></span>
                <el-select
                  v-model="searchValue.value"
                  clearable
                  filterable
                  placeholder="请选择"
                  ref="selectLable1"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option> </el-select
                ><span v-html="'\u00a0\u00a0\u00a0\u00a0\u00a0'"></span> 矿池名称
                <span v-html="'\u00a0\u00a0'"></span><el-select
                  v-model="searchValue.value2"
                  clearable
                  placeholder="请选择"
                  ref="selectLable2"
                >
                  <el-option
                    v-for="item in options2"
                    :key="'new1' + item.value2"
                    :label="item.label2"
                    :value="item.value2"
                  >
                  </el-option> </el-select
                ><span v-html="'\u00a0\u00a0\u00a0\u00a0\u00a0'"></span> 活跃次数
                <span v-html="'\u00a0\u00a0\u00a0'"></span><el-input
                  v-model="searchValue.input2"
                  placeholder="单行输入"
                  style="width: 15%"
                ></el-input>
                <span v-html="'\u00a0\u00a0\u00a0\u00a0\u00a0'"></span> 矿池IP <span v-html="'\u00a0\u00a0\u00a0'"></span><el-input
                  v-model="searchValue.input1"
                  placeholder="单行输入"
                  style="width: 15%"
                ></el-input>
              </div>
              <div align="left" style="height:45px; margin-top: 15px;">
                <el-button @click="handleSearch">查询</el-button
                ><el-button 
                  >导出</el-button
                ><el-button
                  class="newButton"
                  >最近记录导出</el-button
                >
              </div>
            </div>

        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="block">
              <el-table
                :data="tableData"
                class="tableClass"
                stripe
                ref="multipleTable"
                tooltip-effect="dark"
                style="width: 100%"
              >
                <el-table-column type="selection" width="50" fixed>
                </el-table-column>
                <el-table-column label="受害者IP" prop="_id" min-width="130">
                </el-table-column>
                <el-table-column label="矿池IP" prop="_ip" min-width="130">
                </el-table-column>
                <el-table-column label="目的端口" prop="_port" min-width="80">
                </el-table-column>
                <el-table-column label="时间" prop="_time" width="110" sortable>
                </el-table-column>
                <el-table-column prop="district" label="涉及地址" min-width="100" show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="操作" width="100" align="center">
                  <template #default="scope">
                    <el-button text type="primary" size="small" @click="handleEdit(scope.$index, scope.row)" style="margin: 0; letter-spacing: 0px;" v-permiss="15">详情</el-button>
                    
                  </template>
                </el-table-column>
                <!-- <el-table-column
                  prop="unit_type"
                  label="活跃次数"
                  min-width="105"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                  prop="unit_name"
                  label="矿池名称"
                  min-width="200"
                  show-overflow-tooltip
                >
                </el-table-column> -->
              </el-table>
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-size="pagesize"
                layout="total, sizes"
                :total="tableData.length"
              >
              <!-- , prev, pager, next, jumper -->
              </el-pagination>
            </div>
          </el-col>
        </el-row>
      </el-main>
      <el-dialog v-model="dialogTableVisible" title="挖矿信息详情" :append-to-body='true' >
        <div class="dialog-body">
						<div class="dialog-body-title">
							<span class="start-png"></span>
							基础信息
							<p class="dashed-bottom"></p>
							<p class="end-png"></p>
						</div>
              <!-- <div class="my-el-row">
                  <div><span class="dialog-body-left">APP名称：</span><span class="dialog-body-right">TikTok</span></div>
                  <div><span class="dialog-body-left">应用商店：</span><span class="dialog-body-right">小米应用商店</span></div> 
                  <div><span class="dialog-body-left">版本号：</span><span class="dialog-body-right">12.3.1</span></div>
              </div>
              <div class="my-el-row">
                  <div><span class="dialog-body-left">下载量：</span><span class="dialog-body-right">12333</span></div>
                  <div><span class="dialog-body-left">包名：</span><span class="dialog-body-right">com.ss.android.trill</span></div>
                  <div><span class="dialog-body-left">apk文件大小：</span><span class="dialog-body-right">15351</span></div>
              </div>
              <div class="my-el-row">
                  <div><span class="dialog-body-left">版本名称：</span><span class="dialog-body-right">01.05.0071</span></div>
                  <div><span class="dialog-body-left">主办单位：</span><span class="dialog-body-right">-</span></div>
              </div>
              <div style="margin-top: 6px;">
                  <div style="margin-bottom: 6px;"><span class="dialog-body-left">下载地址：</span><span class="dialog-body-right">http://d7.xiaotongqq.com/ttdl.apk</span></div>
							    <div style="margin-bottom: 6px;"><span class="dialog-body-left">APP描述：</span><span class="dialog-body-right">TikTok 是一款全球流行的短视频社交应用，用户可以通过拍摄、剪辑和分享短视频来展示自己的才华和创意。</span></div>
              </div> -->
					</div>
			<template #footer>
				<span class="dialog-footer">
					<el-button type="primary" @click="saveEdit">确定</el-button>
					<el-button @click="dialogTableVisible = false">
						取消
					</el-button>
				</span>
			</template>
      </el-dialog>
    </el-card>
  </div>
</template>

<script setup lang="ts" name="xiangqing2">
import {reactive, ref} from 'vue';
const dialogTableVisible = ref(false)
const saveEdit = () => {
  dialogTableVisible.value = false;
}
const searchValue = {
    value: "",
    value2: "",
    value3: "",
    input1: "",
    input2: "",
}
interface appTableData {
  _id: string
  _ip: string
  _port: string
  _time:string
  district: string

}
const options:any = []
const options2:any = []
const options3:any = []
const tableData = ref<appTableData[]>([
    {
        _id: '182.16.14.234',
        _ip: '216.118.242.12',
        _port: '37',
        _time:'2023-05-29',
        district: '普兰店'
    }
])
const handleSearch = () => {
	getData()
}
const getData = () => {
	tableData.value = [
      {
        _id: '182.16.14.234',
        _ip: '216.118.242.12',
        _port: '37',
        _time:'2023-05-29',
        district: '普兰店'
    },{
        _id: '172.16.14.234',
        _ip: '16.118.42.122',
        _port: '11',
        _time:'2023-05-29',
        district: '普兰店'
    },{
        _id: '12.168.114.23',
        _ip: '21.18.24.12',
        _port: '96',
        _time:'2023-05-29',
        district: '普兰店'
    }
	]
  
}
let pagesize:number = 10
let currentPage:number = 1
const handleEdit = (index:any,row:any) =>{
  dialogTableVisible.value = true
  
}
function handleSizeChange(val:number) {
    pagesize = val;
}
function handleCurrentChange(val:number) {
    currentPage = val;
}
</script>

<style scoped lang="less">
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
	background: url(../../assets/img/data_image_base1.png) no-repeat 50%;
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
	background: url(../../assets/img/data_image_base2.png) no-repeat 50%;
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
.my-el-row{
    margin-top: 8px;
}
.my-el-row div{
    float: left;
    width: 33%;
}
.my-el-row::after{
    content:'';
    display:block;
    clear: both;
}

:deep(.el-select) {
  width: 15%;
}
:deep(.el-input__inner) {
  height: 23px;
}
:deep(.el-input__suffix) {
  top: -1px;
}
:deep(.el-input__icon) {
  line-height: inherit;
}
// :deep(.el-button) {
//   line-height: 0.1;
//   border-radius: 5px;
//   letter-spacing: 10px;
//   margin: 15px 30px -8px 0;
//   padding: 12px 21px 12px 28px;
// }
:deep(.el-icon-loading) {
  width: 14px;
  height: 14px;
  margin-top: 14px;
}
:deep(.tableClass .cell) {
  // padding-bottom: 12px;
  height: 20px;
  line-height: 20px !important;
}
:deep(.el-table .caret-wrapper) {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  vertical-align: middle;
  cursor: pointer;
  overflow: initial;
  position: relative;
  margin: 6px auto;
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
</style>
<style>
.newButton {
  letter-spacing: 1px !important;
  padding: 12px 21px 12px 20px !important;
}
.el-pagination{
  text-align: center;
}
</style>