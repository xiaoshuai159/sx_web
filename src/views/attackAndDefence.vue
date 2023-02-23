<template>
	<div>
        <el-tabs type="border-card">
            <el-tab-pane label="组织维度检索">
                <span class="spanText">攻击组织代码：</span><el-input placeholder="请输入内容" size="small"
                    style="width:13%;margin-right: 20px;"></el-input>
                <span class="spanText">组织特征：</span><el-input placeholder="请输入内容" size="small"
                    style="width:13%;margin-right: 20px;"></el-input>
                <span class="spanText">行为特征：</span><el-input placeholder="请输入内容" size="small"
                    style="width:13%;margin-right: 20px;"></el-input>
			    <el-button type="primary" :icon="Search" size="small">查询</el-button>
            </el-tab-pane>
            <el-tab-pane label="被攻击对象维度检索">
                <span class="spanText">被攻击IP：</span><el-input placeholder="请输入内容" size="small"
                    style="width:13%;margin-right: 20px;"></el-input>
                <span class="spanText">被攻击单位：</span><el-input placeholder="请输入内容" size="small"
                    style="width:13%;margin-right: 20px;"></el-input>
                <span class="spanText">被攻击业务：</span><el-input placeholder="请输入内容" size="small"
                    style="width:13%;margin-right: 20px;"></el-input>
			    <el-button type="primary" :icon="Search" size="small">查询</el-button>
            </el-tab-pane>
        </el-tabs>
        <el-card v-if="!isHave" shadow="never" style="margin-top:10px;border-radius: 0" ><el-empty :image-size="200"></el-empty></el-card>
        
        <el-card shadow="never" style="margin-top:10px; border-radius: 0" v-else>
            <!-- <div v-for="(item,value) in repeatData" :key="value" style="margin:15px 5px">
            {{item}}
            </div> -->
            haha
        </el-card>
    </div>
</template>

<script setup lang="ts" name="attackAndDefence">
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
const isHave = ref(false)
</script>

<style scoped>
.spanText {
	font-size: 14px
}
</style>
