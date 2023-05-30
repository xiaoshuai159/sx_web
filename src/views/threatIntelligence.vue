<template>
	<div class="handle-box">
        <el-tabs type="border-card" @tab-change="changeTab">
            <el-tab-pane label="IOC检索">
                <el-input placeholder="请输入域名、IP、URL" v-model="input1" style="width:390px"></el-input>&nbsp;&nbsp;
                <el-button type="primary"  @click="getIOCinfo">查询</el-button><br/>
                <div style="margin:10px 4px 0 4px">
                    <span class="left-text">查询示例</span><span class="right-text">hot.tenchier.com &nbsp;  121.37.189.177 &nbsp;  https://www.hot.tenchier.com</span>
                </div>
            </el-tab-pane>
            <el-tab-pane label="样本检索">
                <el-upload
                    class="upload-demo"
                    drag
                    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                    multiple
                    :on-success="successFn"
                >
                
                    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                    <div class="el-upload__text">
                    拖曳上传或 <em>点击文件上传</em>
                    </div>
                    
                    <template #tip>
                        <div style="margin:10px 4px 0 4px">
                            <span class="left-text">查询示例</span><span class="right-text">010f28643897e5a87f4edc9d05cc289a</span>
                        </div>
                    </template>
                </el-upload>
            </el-tab-pane>
        </el-tabs>
        <div>
        <el-card v-if="isHave==1" shadow="never" style="margin-top:10px;border-radius: 0" ><el-empty :image-size="200"></el-empty></el-card>
        
        <el-card shadow="never" style="margin-top:10px; border-radius: 0" v-else-if="isHave==2">
            <!-- <div v-for="(item,value) in repeatData" :key="value" style="margin:15px 5px">
            {{item}}
            </div> -->
            <el-row>
                <el-col :span="4">
                    <div style="margin:0 30px;"><svg t="1677231278532" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3435" width="200" height="200"><path d="M264 801.25H68.41v-674.9h541.07v148.39a16.7 16.7 0 0 0 33.4 0V109.66A16.7 16.7 0 0 0 626.18 93H51.71A16.7 16.7 0 0 0 35 109.66V818a16.7 16.7 0 0 0 16.69 16.69H264a16.7 16.7 0 0 0 0-33.39zM984.09 292.49a16.69 16.69 0 0 0-23.61 0l-52.27 52.28c-1.37-62.16-25-191.2-197.24-191.2a16.7 16.7 0 0 0 0 33.4c131.72 0 162.25 84.26 163.85 157.66l-52.14-52.14a16.69 16.69 0 1 0-23.61 23.61l80.71 80.71a16.67 16.67 0 0 0 23.61 0l80.7-80.71a16.69 16.69 0 0 0 0-23.61z" fill="#d81e06" p-id="3436"></path><path d="M583.51 328h-1.07c-166 0.29-301 135.45-301 301.54C281.42 795.77 416.7 931 583 931s301.51-135.23 301.51-301.5c0-166.09-134.98-301.25-301-301.5z m215.16 142.38H717c-19-46.49-44.76-78.92-68.19-100.86a268.93 268.93 0 0 1 149.86 100.86z m21.08 284.85h-91.14c9.1-31 15.19-67.11 16.48-109h105.49a266.08 266.08 0 0 1-30.83 109z m-504.4-109h105.5c1.29 41.92 7.38 78 16.48 109h-91.15a266.24 266.24 0 0 1-30.83-109.03z m30.82-142.42h91.16c-9.1 31-15.19 67.11-16.48 109h-105.5a266.18 266.18 0 0 1 30.82-109.03z m253.5-33.4v-97.28c22 15 55.65 44.72 80.37 97.25z m93.67 33.4c10 30.18 16.9 66.22 18.34 109h-112v-109zM566.27 372.85v97.53h-80.78c24.72-53.05 58.56-82.67 80.78-97.53z m0 130.93v109h-112c1.41-42.85 8.2-78.87 18.07-109z m-112 142.42h112v109H472.6c-10-30.2-16.9-66.2-18.34-109z m112 142.42v97.25c-22-15-55.65-44.72-80.37-97.25z m33.4 97.53v-97.53h80.79c-24.74 53.07-58.58 82.68-80.79 97.53z m0-130.92v-109h112c-1.42 42.85-8.21 78.88-18.08 109zM745.09 612.8c-1.29-41.91-7.38-78-16.48-109h91.15a266.18 266.18 0 0 1 30.82 109z m-227.9-243.28C493.76 391.46 468 423.89 449 470.38h-81.74a268.89 268.89 0 0 1 149.93-100.86z m-149.92 419.1H449c19 46.49 44.76 78.91 68.19 100.85a268.91 268.91 0 0 1-149.92-100.85z m281.49 100.85c23.43-21.94 49.17-54.36 68.19-100.85h81.71a268.85 268.85 0 0 1-149.9 100.85zM540.34 224.32a16.7 16.7 0 0 0-16.7-16.7H154.25a16.7 16.7 0 0 0 0 33.39h369.39a16.7 16.7 0 0 0 16.7-16.69zM361.74 342.25a8.35 8.35 0 0 0-8.35-8.35H154.25a8.35 8.35 0 1 0 0 16.69h199.14a8.34 8.34 0 0 0 8.35-8.34zM304.61 405.37a8.35 8.35 0 0 0-8.35-8.35h-142a8.35 8.35 0 1 0 0 16.7h142a8.35 8.35 0 0 0 8.35-8.35zM258 468.48a8.35 8.35 0 0 0-8.35-8.35h-95.4a8.35 8.35 0 1 0 0 16.7h95.38a8.35 8.35 0 0 0 8.37-8.35zM226.31 523.26h-72.06a8.35 8.35 0 1 0 0 16.69h72.06a8.35 8.35 0 1 0 0-16.69zM226.31 586.37h-72.06a8.35 8.35 0 1 0 0 16.69h72.06a8.35 8.35 0 1 0 0-16.69zM226.31 649.49h-72.06a8.35 8.35 0 1 0 0 16.7h72.06a8.35 8.35 0 0 0 0-16.7zM226.31 712.6h-72.06a8.35 8.35 0 0 0 0 16.7h72.06a8.35 8.35 0 1 0 0-16.7z" fill="#d81e06" p-id="3437"></path></svg></div>
                </el-col>
                <el-col :span="20">
                    <div class="right-body">
                    <div style="font-size: 28px; font-weight: 600;margin-bottom: 15px;">hot.tenchier.com</div>
                    <span><el-tag
                        v-for="item in items"
                        :key="item.label"
                        :type="item.type"
                        class="mx-1"
                        style="margin: 0 3px;"
                        effect="dark"
                        round
                        >
                        {{ item.label }}
                        </el-tag></span>
                    <div style="margin:15px 0">
                        <!-- <span class="right-text">注册人:</span><span class="left-text">Redacted for Privacy</span>
                        <span class="right-text">组织:</span><span class="left-text">Privacy service provided</span> -->
                        <span class="right-text">地域:</span><span class="left-text">美国 · 威诺森通信</span>
                        <!-- <span class="right-text">备案单位:</span><span class="left-text">-</span> -->
                    </div>
                    <!-- <div class="right-text">
                        流行度
                    </div> -->
                    <!-- <div class="inline-div" style="margin-right:20px"><span class="right-text">动态域名</span><br/><span class="left-text">否</span></div>
                    <div class="inline-div" style="margin-right:20px"><span class="right-text">隐私保护</span><br/><span class="left-text">是</span></div>
                    <div class="inline-div" style="margin-right:20px"><span class="right-text">白名单</span><br/><span class="left-text">否</span></div> -->
                    <div class="inline-div"><span class="right-text">注册日期</span><br/><span class="left-text">2019-03-17</span></div>
                    <div class="inline-div"><span class="right-text">过期日期</span><br/><span class="left-text">2029-03-17</span></div>
                    <div class="inline-div"><span class="right-text">更新日期</span><br/><span class="left-text">2022-03-22</span></div>
                    <div class="inline-div"><span class="right-text">最近看到</span><br/><span class="left-text">2022-02-21</span></div>
                    
                </div>
                </el-col>
            </el-row>
            <div class="IOCdiv">
                <span class="IOClogo"></span>
                <span class="IOCtitle">情报IOC</span>
                <span style="color:#7a7a7a;font-size: 10px;">2 条情报，1 条 CDN服务器 相关。</span>
            </div>
            <div>
                <el-table :data="tableData2" class="tableStyle" ref="multipleTable" header-cell-class-name="table-header" stripe style="width:70%">
                    <el-table-column prop="id" label="id" min-width="70" align="center"></el-table-column>  
                    <el-table-column prop="time" label="发现时间" min-width="158" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="updateTime" label="更新时间" min-width="158" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="type" label="类型" min-width="158" show-overflow-tooltip>
                        <template #default="scope">
                            <el-tag type="info">
                                {{ scope.row.type }}
                            </el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="status" label="状态" min-width="100" align="center">
                        <template #default="scope">
                            <span v-if="scope.row.status=='有效'" style="color:rgb(47, 255, 64)">
                                {{ scope.row.status }}
                            </span>
                            <span v-else-if="scope.row.status=='过期'" style="color:#4D4D4D">
                                {{ scope.row.status }}
                            </span>
                        </template>
                    </el-table-column>
                    
                </el-table>
            </div> 
        </el-card>
        <el-card shadow="never" style="margin-top:10px; border-radius: 0" v-else-if="isHave==3">
            <div>
                <div style="float: left; margin:10px 30px;"><svg t="1685357027154" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10341" width="200" height="200"><path d="M461.35296 114.4832c6.61504-11.20256 18.6368-18.06336 31.6416-18.08384l45.54752 0.14336c13.1072 0.04096 25.21088 7.0656 31.72352 18.432l86.99904 152.14592 83.61984-47.69792L626.13504 18.80064a36.61824 36.61824 0 0 0-31.6416-18.432L436.98176 0c-13.04576 0-25.10848 6.8608-31.72352 18.06336L282.8288 226.67264l83.84512 48.9472 94.67904-161.15712zM1024 362.55744l-102.23616-64.73728-5.40672-121.11872L674.38592 439.7056 1024 362.57792zM108.31872 175.104l-5.34528 121.99936L0 362.20928l351.9488 78.336L108.3392 175.104zM415.88736 1024l96.01024-50.03264L608.41984 1024l-96.52224-305.74592L415.88736 1024zM808.7552 537.3952l93.0816 161.9968c6.47168 11.264 6.47168 25.14944 0 36.43392l-22.71232 39.424c-6.5536 11.34592-18.65728 18.35008-31.78496 18.35008h-175.45216v96.17408H903.168c13.1072 0 25.1904-7.00416 31.70304-18.35008l78.52032-136.3968a36.39296 36.39296 0 0 0 0-36.4544l-120.48384-209.69472-84.13184 48.49664zM143.60576 775.8848l-33.1776-58.30656 103.54688-178.60608L129.8432 490.496 9.29792 699.392a36.53632 36.53632 0 0 0 0 36.49536l78.4384 136.33536c6.5536 11.3664 18.65728 18.37056 31.78496 18.37056h234.496v-96.19456H175.37024a36.47488 36.47488 0 0 1-31.78496-18.49344z" fill="#D9001B" p-id="10342"></path><path d="M417.71008 397.1072c0 33.28 17.77664 64.02048 46.61248 80.65024a93.32736 93.32736 0 0 0 93.22496 0 93.0816 93.0816 0 0 0-46.61248-173.75232 93.184 93.184 0 0 0-93.22496 93.10208z m-91.5456 296.42752h373.71904c-3.01056-100.72064-85.25824-181.61664-186.81856-181.61664-101.5808 0-183.808 80.896-186.90048 181.61664z" fill="#EC808D" p-id="10343"></path></svg></div>
                <div style="margin:0 30px;">
                    <div style="font-size: 26px; font-weight: 600;margin-top: 10px;margin-bottom: 40px;">26c46fdf058abdf2d4cad1d8bcca0d68</div>
                    <div style="margin-bottom: 25px;"><span class="right-text">首次提交：</span><span class="left-text">2019/08/26</span><span class="right-text">末次提交：</span><span class="left-text">2023/03/14</span><span class="right-text">末次分析：</span><span class="left-text">2023/03/14 10:15:56</span></div>
                    <div><span class="right-text">文件类型：</span><span class="left-text">PE32 executable </span><span class="right-text">文件大小：</span><span class="left-text">596.52 KB</span><span class="right-text">威胁类型：</span><span class="left-text"><el-tag type='danger'>木马</el-tag></span></div>
                </div>
                
                <div class="IOCdiv">
                    <span class="IOClogo"></span>
                    <span class="IOCtitle">情报IOC</span>
                    <!-- <span style="color:#7a7a7a;font-size: 10px;">2 条情报，1 条 CDN服务器 相关。</span> -->
                </div>
                <div>
                    <el-table :data="tableData3" class="tableStyle" ref="multipleTable" header-cell-class-name="table-header" stripe style="width:80%">
                        <el-table-column prop="ioc" label="情报IOC" min-width="260"></el-table-column>  
                        <el-table-column prop="iocType" label="IOC类型" min-width="158" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="pandingType" label="判定类型" min-width="158" show-overflow-tooltip>
                            <template #default="scope">
                                <span v-if="scope.row.pandingType=='恶意'" style="color:rgb(255, 0, 0)">
                                    {{ scope.row.pandingType }}
                                </span>
                                <span v-else-if="scope.row.pandingType=='良性'" style="color:#00ff08">
                                    {{ scope.row.pandingType }}
                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="content" label="情报内容" min-width="158" show-overflow-tooltip>
                            <template #default="scope">
                                <el-tag
                                    :type="scope.row.content === '远控' ? 'danger' : scope.row.content === '木马' ? 'warning' : ''"
                                >
                                    {{ scope.row.content }}
                                </el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column prop="huanjing" label="发现IOC环境" min-width="100" align="center">
                            
                        </el-table-column>                        
                    </el-table>
                </div>
                <div class="IOCdiv">
                    <span class="IOClogo"></span>
                    <span class="IOCtitle">行为检测</span>
                    <!-- <span style="color:#7a7a7a;font-size: 10px;">2 条情报，1 条 CDN服务器 相关。</span> -->
                </div>
                <div style="margin-left: 20px;">
                   <span class="left-text">MITRE ATT&CK矩阵（技术）检测到<strong> 11 </strong>条技术指标。</span> 
                   <div style="background-color: #fceded; height: 40px;line-height: 40px; width:79%; color:red;font-weight: 600;padding: 0 15px;margin: 10px 0;">高危行为（2）</div>
                   <div><span class="redSpan">反检测技术</span> <span class="left-text">启动了一个具有隐藏界面的进程</span></div>
                   <el-divider></el-divider>
                   <div><span class="redSpan">静态文件特征</span> <span class="left-text">缓冲区中发现一个PE文件</span>
                   </div>
                </div>
            </div>   
        </el-card>
        </div>
    </div>
</template>

<script setup lang="ts" name="threatIntelligence">
import { ref } from 'vue'
import { ElMessage } from 'element-plus';
import { UploadFilled } from '@element-plus/icons-vue'
import type { TagProps } from 'element-plus'
type Item = { type: TagProps['type']; label: string }

const items = ref<Array<Item>>([
  { type: '', label: 'MiningPool' },
  { type: 'success', label: '网络蠕虫' },
  { type: 'danger', label: 'C&C' },
  { type: '', label: 'LifeCalendarWorm' },
  { type: 'warning', label: '挖矿病毒' },
])
const input1 = ref('')
let isHave = ref(1)
const changeTab = (a:number) => {
    isHave.value = 1
}
const tableData2:any = [
{
	id: 1,
    time:'2022-03-17',
    updateTime:'2022-03-22',
    type:'CDN服务器',
    status:'有效'
},{
	id: 2,
    time:'2019-03-17',
    updateTime:'2019-08-17',
    type:'IDC服务器',
    status:'过期'
}];
const tableData3:any = [
{
	ioc: 'boyonnem.ddns.net',
    iocType:'Domain',
    pandingType:'恶意',
    content:'远控',
    huanjing:'2 个分析环境'
},
{
	ioc: '26c46fdf058abdf2d4cad1d8bcca0d68',
    iocType:'Hash',
    pandingType:'恶意',
    content:'木马',
    huanjing:'2 个分析环境'
}
]
const successFn = () => {
    isHave.value = 3
}
const getIOCinfo = () =>{
    if(input1.value == 'hot.tenchier.com'||input1.value == '121.37.189.177'||input1.value == 'https://www.hot.tenchier.com'){
        isHave.value = 2
    }else{
        isHave.value = 1
        ElMessage.error('未查询到相关IOC')
    }
}
</script>

<style scoped lang="less">
:deep(.el-divider--horizontal){
    margin: 5px 0;
    width: 81%;
}
.redSpan{
    display: inline-block;
    background-color: #db1414;
    color:aliceblue;
    width: 120px;
    height: 34px;
    line-height: 34px;
    text-align: center;
    margin: 5px 15px;
}
.IOCdiv{
    // background-color: #f2f4f7;
    position: relative;
    padding:10px 3px;
    margin:15px 0 8px 0;
    font-size: 14px;
}
.IOClogo{
    display: inline-block;
    position: absolute;
    top:13px;
    width: 5px;
    height: 14px;
    background-color: #7a7a7a;
    border-radius: 5px;
}
.IOCtitle{
    color:black; 
    margin:0 20px 0 15px;
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
// 按钮样式
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
.icon{
    width: 130px;
    height: 130px;
    display: inline-block;
}
.inline-div{
    display: inline-block;
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
