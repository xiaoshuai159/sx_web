<template>
	<div>
        <el-tabs type="border-card">
            <el-tab-pane label="C&C维度检索">
                <el-input placeholder="请输入C&C域名、C&C IP、C&C URL" v-model="input1" style="width:390px"></el-input>&nbsp;&nbsp;
                <el-button type="primary" :icon="Search">查询</el-button><br/>
                <div style="margin:10px 4px 0 4px">
                    <span class="left-text">查询示例</span><span class="right-text">hot.tenchier.com &nbsp;  121.37.189.177 &nbsp;  https://www.hot.tenchier.com</span>
                </div>
            </el-tab-pane>
            <el-tab-pane label="攻击维度检索">
                <el-input placeholder="请输入攻击域名、攻击IP、攻击URL" v-model="input1" style="width:390px"></el-input>&nbsp;&nbsp;
                <el-button type="primary" :icon="Search">查询</el-button><br/>
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
            haha
        </el-card>
        </div>
    </div>
</template>

<script setup lang="ts" name="threatIntelligence">
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue';
import { UploadFilled } from '@element-plus/icons-vue'
const input1 = ref('')
const isHave = ref(false)
</script>

<style scoped>
.left-text {
    font-size: 14px;
    font-weight: 500;
    margin-right: 16px;
}

.right-text {
    font-size: 14px;
    color: #aaaaaa;
    margin: 6px 0 20px 0;
}
</style>
