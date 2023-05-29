<template>
	<div class="handle-box">
        <el-tabs type="border-card">
            <el-tab-pane label="组织维度检索">
                <span class="spanText">攻击组织代码：</span><el-input placeholder="请输入内容" size="small"
                    style="width:13%;margin-right: 20px;"></el-input>
                <span class="spanText">组织特征：</span><el-input placeholder="请输入内容" size="small"
                    style="width:13%;margin-right: 20px;"></el-input>
                <span class="spanText">行为特征：</span><el-input placeholder="请输入内容" size="small"
                    style="width:13%;margin-right: 20px;"></el-input>
			    <el-button type="primary" size="small">查询</el-button>
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

<style scoped lang="less">
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
	height: 28px;
	padding: 0 16px;
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
.spanText {
	font-size: 14px
}
</style>
