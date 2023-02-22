<template>
	<div class="container">
    <el-tabs type="border-card">
      <el-tab-pane label="未备案APP录入">
          <el-button type="primary">手动填写录入信息</el-button>&nbsp;&nbsp;
          <el-upload
              ref="upload"
              class="upload-demo"
              action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
              :limit="1"
              :on-exceed="handleExceed"
          >
              <template #trigger>                
                  <el-button type="primary">上传文件录入信息</el-button>&nbsp;&nbsp;
              </template>
          </el-upload>     
      </el-tab-pane>
      <el-tab-pane label="下载量查询">
        <span class="spanText">APP名称：</span><el-input placeholder="请输入内容" size="small" style="width:13%;margin-right: 20px;"></el-input>
        <span class="spanText">APP下载链接：</span><el-input placeholder="请输入内容" size="small" style="width:13%;margin-right: 20px;"></el-input>
        <span class="spanText">包名：</span><el-input placeholder="请输入内容" size="small" style="width:13%;margin-right: 20px;"></el-input>
        <span class="spanText">APP类型：</span><el-input placeholder="请输入内容" size="small" style="width:13%;margin-right: 20px;"></el-input>
        <el-button size="small" :icon="Search" type="primary">查询</el-button>
        <div style="margin:15px 0">
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column prop="date" label="时间" min-width="180" />
              <el-table-column prop="sourceIP" label="源IP" min-width="180" />
              <el-table-column prop="sourcePort" label="源端口" min-width="100" />
              <el-table-column prop="destIP" label="目的IP" min-width="180" />
              <el-table-column prop="destPort" label="目的端口" min-width="100" />
              <el-table-column prop="appName" label="APP名称" min-width="180"/>
            </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="跨网查询">
        <span class="spanText">APP名称：</span><el-input placeholder="请输入内容" size="small" style="width:13%;margin-right: 20px;"></el-input>
        <span class="spanText">APP下载链接：</span><el-input placeholder="请输入内容" size="small" style="width:13%;margin-right: 20px;"></el-input>
        <span class="spanText">包名：</span><el-input placeholder="请输入内容" size="small" style="width:13%;margin-right: 20px;"></el-input>
        <span class="spanText">APP类型：</span><el-input placeholder="请输入内容" size="small" style="width:13%;margin-right: 20px;"></el-input>
        <el-button size="small" :icon="Search" type="primary">查询</el-button>
        <div style="margin:15px 0">
            <el-table :data="tableData2" border style="width: 100%">
              <el-table-column prop="date" label="时间" min-width="180" />
              <el-table-column prop="sourceIP" label="源IP" min-width="180" />
              <el-table-column prop="sourcePort" label="源端口" min-width="100" />
              <el-table-column prop="destIP" label="目的IP" min-width="180" />
              <el-table-column prop="destPort" label="目的端口" min-width="100" />
              <el-table-column prop="appName" label="APP名称" min-width="180"/>
            </el-table>
        </div>
      </el-tab-pane>
    </el-tabs>
        
        
	</div>
</template>

<script setup lang="ts" name="noRecordApp">
import { ref } from 'vue'
import { genFileId } from 'element-plus'
import type { UploadInstance, UploadProps, UploadRawFile } from 'element-plus'
import { inline } from '@floating-ui/core';
import { Timer } from '@element-plus/icons-vue'
import { Search } from '@element-plus/icons-vue'
const upload = ref<UploadInstance>()

const handleExceed: UploadProps['onExceed'] = (files) => {
  upload.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  upload.value!.handleStart(file)
}

const submitUpload = () => {
  upload.value!.submit()
}
interface appInfo {
  date: string
  sourceIP: string
  sourcePort: string
  destIP: string 
  destPort: string
  appName: string
}

const tableData: appInfo[] = [
  {
    date: '2023-01-03',
    sourceIP: '176.56.2.128',
    sourcePort: '63',
    destIP: '61.32.46.101' ,
    destPort: '235',
    appName: 'name1',
  }
]
const tableData2: appInfo[] = [
  {
    date: '2023-02-03',
    sourceIP: '126.5.23.28',
    sourcePort: '633',
    destIP: '161.132.46.11' ,
    destPort: '23',
    appName: 'name1',
  }
]
</script>

<style scoped lang="less">
.upload-demo{
		display: inline;
    margin:10px 0
	}
.el-divider--horizontal {
    display: block;
    height: 1px;
    width: 100%;
    margin: 15px 0;
    border-top: 1px var(--el-border-color) var(--el-border-style);
}
/deep/.el-upload-list {
    margin: 0;
    padding: 0;
    list-style: none;
    position: relative;
}
.spanText{
	font-size:14px
}
</style>