<template>
	<div>
        <el-tabs type="border-card">
            <el-tab-pane label="C&C维度检索">
                <el-input placeholder="请输入C&C域名、C&C IP、C&C URL" v-model="input1" style="width:390px"></el-input>&nbsp;&nbsp;
                <el-button type="primary" :icon="Search" @click="isHave = !isHave">查询</el-button><br/>
                <div style="margin:10px 4px 0 4px">
                    <span class="left-text">查询示例</span><span class="right-text">hot.tenchier.com &nbsp;  121.37.189.177 &nbsp;  https://www.hot.tenchier.com</span>
                </div>
            </el-tab-pane>
            <el-tab-pane label="攻击维度检索">
                <el-input placeholder="请输入攻击域名、攻击IP、攻击URL" v-model="input1" style="width:390px"></el-input>&nbsp;&nbsp;
                <el-button type="primary" :icon="Search" @click="isHave = !isHave">查询</el-button><br/>
                <div style="margin:10px 4px 0 4px">
                    <span class="left-text">查询示例</span><span class="right-text">hot.tenchier.com &nbsp;  121.37.189.177 &nbsp;  https://www.hot.tenchier.com</span>
                </div>
            </el-tab-pane>
            <el-tab-pane label="样本维度检索">
                <el-upload
                    class="upload-demo"
                    drag
                    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                    multiple
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
        <el-card v-if="!isHave" shadow="never" style="margin-top:10px;border-radius: 0" ><el-empty :image-size="200"></el-empty></el-card>
        
        <el-card shadow="never" style="margin-top:10px; border-radius: 0" v-else>
            <!-- <div v-for="(item,value) in repeatData" :key="value" style="margin:15px 5px">
            {{item}}
            </div> -->
            <el-row>
                <el-col :span="4">
                    <div><svg t="1677231278532" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3435" width="200" height="200"><path d="M264 801.25H68.41v-674.9h541.07v148.39a16.7 16.7 0 0 0 33.4 0V109.66A16.7 16.7 0 0 0 626.18 93H51.71A16.7 16.7 0 0 0 35 109.66V818a16.7 16.7 0 0 0 16.69 16.69H264a16.7 16.7 0 0 0 0-33.39zM984.09 292.49a16.69 16.69 0 0 0-23.61 0l-52.27 52.28c-1.37-62.16-25-191.2-197.24-191.2a16.7 16.7 0 0 0 0 33.4c131.72 0 162.25 84.26 163.85 157.66l-52.14-52.14a16.69 16.69 0 1 0-23.61 23.61l80.71 80.71a16.67 16.67 0 0 0 23.61 0l80.7-80.71a16.69 16.69 0 0 0 0-23.61z" fill="#d81e06" p-id="3436"></path><path d="M583.51 328h-1.07c-166 0.29-301 135.45-301 301.54C281.42 795.77 416.7 931 583 931s301.51-135.23 301.51-301.5c0-166.09-134.98-301.25-301-301.5z m215.16 142.38H717c-19-46.49-44.76-78.92-68.19-100.86a268.93 268.93 0 0 1 149.86 100.86z m21.08 284.85h-91.14c9.1-31 15.19-67.11 16.48-109h105.49a266.08 266.08 0 0 1-30.83 109z m-504.4-109h105.5c1.29 41.92 7.38 78 16.48 109h-91.15a266.24 266.24 0 0 1-30.83-109.03z m30.82-142.42h91.16c-9.1 31-15.19 67.11-16.48 109h-105.5a266.18 266.18 0 0 1 30.82-109.03z m253.5-33.4v-97.28c22 15 55.65 44.72 80.37 97.25z m93.67 33.4c10 30.18 16.9 66.22 18.34 109h-112v-109zM566.27 372.85v97.53h-80.78c24.72-53.05 58.56-82.67 80.78-97.53z m0 130.93v109h-112c1.41-42.85 8.2-78.87 18.07-109z m-112 142.42h112v109H472.6c-10-30.2-16.9-66.2-18.34-109z m112 142.42v97.25c-22-15-55.65-44.72-80.37-97.25z m33.4 97.53v-97.53h80.79c-24.74 53.07-58.58 82.68-80.79 97.53z m0-130.92v-109h112c-1.42 42.85-8.21 78.88-18.08 109zM745.09 612.8c-1.29-41.91-7.38-78-16.48-109h91.15a266.18 266.18 0 0 1 30.82 109z m-227.9-243.28C493.76 391.46 468 423.89 449 470.38h-81.74a268.89 268.89 0 0 1 149.93-100.86z m-149.92 419.1H449c19 46.49 44.76 78.91 68.19 100.85a268.91 268.91 0 0 1-149.92-100.85z m281.49 100.85c23.43-21.94 49.17-54.36 68.19-100.85h81.71a268.85 268.85 0 0 1-149.9 100.85zM540.34 224.32a16.7 16.7 0 0 0-16.7-16.7H154.25a16.7 16.7 0 0 0 0 33.39h369.39a16.7 16.7 0 0 0 16.7-16.69zM361.74 342.25a8.35 8.35 0 0 0-8.35-8.35H154.25a8.35 8.35 0 1 0 0 16.69h199.14a8.34 8.34 0 0 0 8.35-8.34zM304.61 405.37a8.35 8.35 0 0 0-8.35-8.35h-142a8.35 8.35 0 1 0 0 16.7h142a8.35 8.35 0 0 0 8.35-8.35zM258 468.48a8.35 8.35 0 0 0-8.35-8.35h-95.4a8.35 8.35 0 1 0 0 16.7h95.38a8.35 8.35 0 0 0 8.37-8.35zM226.31 523.26h-72.06a8.35 8.35 0 1 0 0 16.69h72.06a8.35 8.35 0 1 0 0-16.69zM226.31 586.37h-72.06a8.35 8.35 0 1 0 0 16.69h72.06a8.35 8.35 0 1 0 0-16.69zM226.31 649.49h-72.06a8.35 8.35 0 1 0 0 16.7h72.06a8.35 8.35 0 0 0 0-16.7zM226.31 712.6h-72.06a8.35 8.35 0 0 0 0 16.7h72.06a8.35 8.35 0 1 0 0-16.7z" fill="#d81e06" p-id="3437"></path></svg></div>
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
                    <div style="margin:15px 0"><span class="right-text">注册人:</span><span class="left-text">Redacted for Privacy</span>
                        <span class="right-text">组织:</span><span class="left-text">Privacy service provided</span>
                        <span class="right-text">备案单位:</span><span class="left-text">-</span>
                    </div>
                    <!-- <div class="right-text">
                        流行度
                    </div> -->
                    <div class="inline-div" style="margin-right:20px"><span class="right-text">动态域名</span><br/><span class="left-text">否</span></div>
                    <div class="inline-div" style="margin-right:20px"><span class="right-text">隐私保护</span><br/><span class="left-text">是</span></div>
                    <div class="inline-div" style="margin-right:20px"><span class="right-text">白名单</span><br/><span class="left-text">否</span></div>
                    <div class="inline-div"><span class="right-text">注册日期</span><br/><span class="left-text">2019-03-17</span></div>
                    <div class="inline-div"><span class="right-text">过期日期</span><br/><span class="left-text">2029-03-17</span></div>
                    <div class="inline-div"><span class="right-text">更新日期</span><br/><span class="left-text">2022-03-22</span></div>
                    <div class="inline-div"><span class="right-text">最近看到</span><br/><span class="left-text">2022-02-21</span></div>
                    
                </div>
                </el-col>
            </el-row>           
        </el-card>
        </div>
    </div>
</template>

<script setup lang="ts" name="threatIntelligence">
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue';
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
let isHave = ref(false)
</script>

<style scoped>
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
</style>
