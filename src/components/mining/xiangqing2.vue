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
              <div align="left" style="height: 58px;">
                <el-button>查询</el-button
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
                class="tableClass"
                stripe
                border
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
                <el-table-column label="时间" width="110" sortable>
                </el-table-column>
                <el-table-column
                  prop="district"
                  label="涉及地址"
                  min-width="100"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column label="操作" width="90" align="center" >
                  <template #default="scope">
                    <el-button text v-permiss="15">
                      详情
                    </el-button>
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
                layout="total, sizes, prev, pager, next, jumper"
                :total="tableData.length"
              >
              </el-pagination>
            </div>
          </el-col>
        </el-row>
      </el-main>
    </el-card>
  </div>
</template>

<script setup lang="ts" name="xiangqing2">
const searchValue = {
    value: "",
    value2: "",
    value3: "",
    input1: "",
    input2: "",
}
const options:any = []
const options2:any = []
const options3:any = []
const tableData:any = []
let pagesize:number = 10
let currentPage:number = 1
function handleSizeChange(val:number) {
    pagesize = val;
}
function handleCurrentChange(val:number) {
    currentPage = val;
}
</script>

<style scoped lang="less">
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
:deep(.el-button) {
  line-height: 0.1;
  border-radius: 5px;
  letter-spacing: 10px;
  margin: 15px 30px -8px 0;
  padding: 12px 21px 12px 28px;
}
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