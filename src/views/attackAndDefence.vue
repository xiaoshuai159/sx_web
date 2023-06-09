<template>
	<div class="handle-box">
        <!-- <el-tabs type="border-card">
            <el-tab-pane label="组织维度检索">
                <span class="spanText">攻击组织代码：</span><el-input placeholder="请输入内容" size="small"
                    style="width:13%;margin-right: 20px;"></el-input>
                <span class="spanText">组织特征：</span><el-input placeholder="请输入内容" size="small"
                    style="width:13%;margin-right: 20px;"></el-input>
                <span class="spanText">行为特征：</span><el-input placeholder="请输入内容" size="small"
                    style="width:13%;margin-right: 20px;"></el-input>
			    <el-button type="primary" size="small" @click="handleClick">查询</el-button>
            </el-tab-pane>
            <el-tab-pane label="被攻击对象维度检索">
                <span class="spanText">被攻击IP：</span><el-input placeholder="请输入内容" size="small"
                    style="width:13%;margin-right: 20px;"></el-input>
                <span class="spanText">被攻击单位：</span><el-input placeholder="请输入内容" size="small"
                    style="width:13%;margin-right: 20px;"></el-input>
                <span class="spanText">被攻击业务：</span><el-input placeholder="请输入内容" size="small"
                    style="width:13%;margin-right: 20px;"></el-input>
			    <el-button type="primary" size="small">查询</el-button>
            </el-tab-pane>
        </el-tabs> -->
        <el-card>
            <el-input placeholder="请输入溯源域名、IP、URL" v-model="input1" style="width:390px"></el-input>&nbsp;&nbsp;
            <el-button type="primary"  @click="getYuaninfo">查询</el-button>
            <el-button type="primary">导出</el-button>
            <div style="margin:10px 4px 0 4px">
                        <span class="left-text">查询示例</span><span class="right-text">191.13.34.222</span>
                    </div>
            <el-card v-if="!isHave" shadow="never" style="margin-top:10px;border-radius: 0" ><el-empty :image-size="200"></el-empty></el-card>
            
            <el-card shadow="never" :body-style="{ padding: '0px', height: '400px' }" style="margin-top:10px; border-radius: 0" v-else>
                <div id="myChart" :style="{ marginLeft:'50px', width: '92%', height: '375px' }"></div>
                <!-- <el-table :data="tableData" class="tableStyle" ref="multipleTable" header-cell-class-name="table-header" stripe style="width:80%" :span-method="objectSpanMethod">
                    <el-table-column prop="sourceIP" label="溯源IP" min-width="130"></el-table-column>  
                    <el-table-column prop="domain" label="相关域名" min-width="158" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="URL" label="相关URL" min-width="158" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="zhengshu" label="相关证书标识" min-width="158" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="yangben" label="相关样本" min-width="158" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="lianjie" label="下载链接" min-width="158" show-overflow-tooltip>
                        <template #default="scope">
                            <span text class="blue">
                                {{ scope.row.lianjie }}
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="time" label="发现时间" min-width="100" show-overflow-tooltip>                        
                    </el-table-column>                        
                </el-table> -->
            </el-card>
        </el-card>
        
    </div>
</template>

<script setup lang="ts" name="attackAndDefence">
import { ref,onMounted,nextTick } from 'vue'
import { ElMessage } from 'element-plus';
import * as echarts from 'echarts'
// import type { TableColumnCtx } from 'element-plus'
let isHave = ref(false)
const handleClick = () =>{
    isHave.value = true
}
const input1 = ref('')
// 点击搜索按钮
const getYuaninfo = () =>{
    if(input1.value == '191.13.34.222'){
        isHave.value = true
        nextTick(()=>{
            initOption()
        })
        
    }else{
        isHave.value = false
        ElMessage.error('未查询到相关IOC')
    }
}
// 表格数据
const tableData:any = [
{
	sourceIP: '191.13.34.222',
    domain:'defenderstatus.com',
    time:'2023-05-29'
},{
	sourceIP: '191.13.34.222',
    URL:'hxxp://defenderstatus.com',
    time:'2023-05-29'
},{
    zhengshu:'0464acc5f3ea3d907ab9592cf5af2ff4',
    time:'2023-05-29'
},{
    yangben:'astype.exe',
    lianjie:'下载',
    time:'2023-05-29'
},{
    yangben:'ccopy.exe',
    lianjie:'下载',
    time:'2023-05-29'
},{
    URL:'hxxp://dnsstatus.com',
    time:'2023-05-29'
},];
// 表格栏目跨级
const objectSpanMethod = ({
  row,
  column,
  rowIndex,
  columnIndex,
}:any) => {
if (columnIndex === 0) {
    if (rowIndex % 6 === 0) {
      return {
        rowspan: 6,
        colspan: 1,
      }
    } else {
      return {
        rowspan: 0,
        colspan: 0,
      }
    }
}
}
let myChart1:any
// echarts initOption
const initOption = () =>{
    myChart1 = echarts.init(document.getElementById('myChart')!); 
    const data = {
  name: '191.13.34.222',
  children: [
    {
      name: 'k8s_kube-flanneld',
      children: [
        {
          name: 'bb.txt',
        },
        {
          name: 'flanneld',
          children:[
            {
                name:'containerd-shim',
                children:[
                    {
                        name:'containerd-shim',
                        children:[
                            {
                                name:'6'
                            }
                        ]
                    }
                ]
            },{
                name:'containerd-shim',
                children:[
                    {
                        name:'containerd-shim',
                        children:[
                            {
                                name:'6'
                            }
                        ]
                    }
                ]
            }
          ]
        },
        {
          name: 'cc.txt',
        },
        {
            name:'flanneld',
            children:[
            {
                name:'flanneld',
                children:[
                    {
                        name:'run-parts',
                        children:[
                            {
                                name:'0anacron',
                                children:[
                                    {
                                        name:'cat',
                                        value:'66'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }]
        }
      ]
    }
  ]
};

let option = {
//   tooltip: {
//     trigger: 'item',
//     triggerOn: 'mousemove'
//   },
  series: [
    {
      type: 'tree',
      id: 0,
      name: 'tree1',
      data: [data],

      top: '10%',
      left: '8%',
      bottom: '22%',
      right: '20%',

      symbolSize: 7,

      edgeShape: 'polyline',
      edgeForkPosition: '63%',
      initialTreeDepth: 3,

      lineStyle: {
        width: 2
      },

      label: {
        backgroundColor: '#fff',
        position: 'left',
        verticalAlign: 'middle',
        align: 'right'
      },

      leaves: {
        label: {
          position: 'right',
          verticalAlign: 'middle',
          align: 'left'
        }
      },

      emphasis: {
        focus: 'descendant'
      },

      expandAndCollapse: true,
      animationDuration: 550,
      animationDurationUpdate: 750
    }
  ]
};

option && myChart1.setOption(option);
}
// onMounted(()=>{
//     nextTick(() => {
//         initOption()
//     })
// })
</script>

<style scoped lang="less">
.left-text {
    font-size: 14px;
    font-weight: 500;
    margin-right: 38px;
}

.right-text {
    font-size: 14px;
    color: #aaaaaa;
    margin: 6px 10px 20px 0;
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
.blue{
	color:#409eff;
	font-size: 1px;
    cursor: pointer;
}
.spanText {
	font-size: 14px
}
// 表格样式
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
:deep(.el-popper__arrow){
	display: none!important;
}
:deep(.tableClass .cell) {

  height: 20px;
  line-height: 20px !important;
}
</style>
