<template>
  <div class="container">
    <el-tabs type="border-card">
      <el-tab-pane label="未备案APP录入">
        <el-button type="primary" @click="dialogTableVisible = true">手动填写录入信息</el-button>&nbsp;&nbsp;
        <el-dialog v-model="dialogTableVisible" title="APP信息填写" :append-to-body='true' width="38%">
          <el-form :model="appForm">
            <el-form-item label="APP名称" :label-width="formLabelWidth">
              <el-input v-model="appForm.appName" autocomplete="off" />
            </el-form-item>
            <el-form-item label="APP包名" :label-width="formLabelWidth">
              <el-input v-model="appForm.appPcapName" autocomplete="off" />
            </el-form-item>
            <el-form-item label="下载链接" :label-width="formLabelWidth">
              <el-input v-model="appForm.appLink" autocomplete="off" />
            </el-form-item>
            <el-form-item label="APP类型" :label-width="formLabelWidth">
              <el-select v-model="appForm.appType" placeholder="请选择">
                <el-option label="type1" value="type1" />
                <el-option label="type2" value="type2" />
              </el-select>
            </el-form-item>
            <el-form-item label="备注信息" :label-width="formLabelWidth">
              <el-input v-model="appForm.appLink" autocomplete="off" :rows="2" type="textarea" />
            </el-form-item>
          </el-form>
          <template #footer>
            <span class="dialog-footer">
              <el-button type="primary" @click="dialogTableVisible = false">录入信息</el-button>
              <el-button @click="dialogTableVisible = false">
                取消
              </el-button>
            </span>
          </template>
        </el-dialog>
        <el-upload ref="upload" class="upload-demo" action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
          :limit="1" :on-exceed="handleExceed">
          <template #trigger>
            <el-button type="primary">上传文件录入信息</el-button>&nbsp;&nbsp;
          </template>
        </el-upload>
      </el-tab-pane>
      <el-tab-pane label="下载量查询">
        <span class="spanText">APP名称：</span><el-input placeholder="请输入内容" size="small"
          style="width:13%;margin-right: 20px;"></el-input>
        <span class="spanText">APP下载链接：</span><el-input placeholder="请输入内容" size="small"
          style="width:13%;margin-right: 20px;"></el-input>
        <span class="spanText">包名：</span><el-input placeholder="请输入内容" size="small"
          style="width:13%;margin-right: 20px;"></el-input>
        <span class="spanText">APP类型：</span><el-input placeholder="请输入内容" size="small"
          style="width:13%;margin-right: 20px;"></el-input>
        <el-button size="small" :icon="Search" type="primary">查询</el-button>
        <div style="margin:15px 0">
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="date" label="时间" min-width="120" />
            <el-table-column prop="sourceIP" label="源IP" min-width="120" />
            <el-table-column prop="sourcePort" label="源端口" min-width="80" />
            <el-table-column prop="destIP" label="目的IP" min-width="120" />
            <el-table-column prop="destPort" label="目的端口" min-width="80" />
            <el-table-column prop="appName" label="APP名称" min-width="100" />
            <el-table-column prop="appLink" label="APP下载链接" min-width="110" />
            <el-table-column prop="appPcapName" label="APP包名" min-width="100" />
            <el-table-column prop="appType" label="APP类型" min-width="100" />
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="跨网查询">
        <span class="spanText">APP名称：</span><el-input placeholder="请输入内容" size="small"
          style="width:13%;margin-right: 20px;"></el-input>
        <span class="spanText">APP下载链接：</span><el-input placeholder="请输入内容" size="small"
          style="width:13%;margin-right: 20px;"></el-input>
        <span class="spanText">包名：</span><el-input placeholder="请输入内容" size="small"
          style="width:13%;margin-right: 20px;"></el-input>
        <span class="spanText">APP类型：</span><el-input placeholder="请输入内容" size="small"
          style="width:13%;margin-right: 20px;"></el-input>
        <el-button size="small" :icon="Search" type="primary">查询</el-button>
        <div style="margin:15px 0">
          <el-table :data="tableData2" border style="width: 100%">
            <el-table-column prop="date" label="时间" min-width="120" />
            <el-table-column prop="sourceIP" label="源IP" min-width="120" />
            <el-table-column prop="sourcePort" label="源端口" min-width="80" />
            <el-table-column prop="destIP" label="目的IP" min-width="120" />
            <el-table-column prop="destPort" label="目的端口" min-width="80" />
            <el-table-column prop="appName" label="APP名称" min-width="100" />
            <el-table-column prop="appLink" label="APP下载链接" min-width="110" />
            <el-table-column prop="appPcapName" label="APP包名" min-width="100" />
            <el-table-column prop="appType" label="APP类型" min-width="100" />
          </el-table>
        </div>
      </el-tab-pane>
    </el-tabs>


  </div>
</template>

<script setup lang="ts" name="noRecordApp">
import { reactive, ref } from 'vue'
import { genFileId } from 'element-plus'
import type { UploadInstance, UploadProps, UploadRawFile } from 'element-plus'
import { Search } from '@element-plus/icons-vue'
const upload = ref<UploadInstance>()
const dialogTableVisible = ref(false)
const formLabelWidth = '80px'
const appForm = reactive({
  appName: '',
  appPcapName: '',
  appLink: '',
  appType: '',
  appNote: ''
})
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
  appLink: string
  appPcapName: string
  appType: string
}

const tableData: appInfo[] = [
  {
    date: '2023-01-03',
    sourceIP: '176.56.2.128',
    sourcePort: '63',
    destIP: '61.32.46.101',
    destPort: '235',
    appName: 'name1',
    appLink:'www.twtigapp.com',
    appPcapName:'twiterpcap',
    appType:'社交'
  }
]
const tableData2: appInfo[] = [
  {
    date: '2023-02-03',
    sourceIP: '126.5.23.28',
    sourcePort: '633',
    destIP: '161.132.46.11',
    destPort: '23',
    appName: 'name1',
    appLink:'www.twtigapp.com',
    appPcapName:'twiterpcap',
    appType:'社交'
  }
]
const inputInfo = () => {

}
</script>

<style scoped lang="less">
.upload-demo {
  display: inline;
  margin: 10px 0
}

.el-divider--horizontal {
  display: block;
  height: 1px;
  width: 100%;
  margin: 15px 0;
  border-top: 1px var(--el-border-color) var(--el-border-style);
}

:deep(.el-upload-list) {
  margin: 0;
  padding: 0;
  list-style: none;
  position: relative;
}

.spanText {
  font-size: 14px
}</style>