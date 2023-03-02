<template>
    <div>
        <el-tabs type="border-card" @tab-change="tabChange">
            <el-tab-pane label="节点管理">
                <div>
                    <ul>
                        <li v-for="(value,key,index) in liDatas" :key="index">
                            <span class="top-text">{{key}}</span><br/>
                            <span class="bottom-text">{{value}}</span>
                        </li>
                    </ul>
                </div>
            </el-tab-pane>
            <el-tab-pane label="配置分发">
                <el-input
                class="w-50 m-2"
                placeholder="请输入查询条件"
                :suffix-icon="Search"
                style="width: 200px;margin-right: 10px;"
                /><el-button type="primary" @click="handleAdd()">添加配置</el-button>
                <el-table :data="tableData2" style="width: 100%;margin-top: 15px;">
                    <el-table-column prop="name" label="配置名称" min-width="100" />
                    <el-table-column prop="type" label="配置类型" min-width="100" />
                    <el-table-column prop="range" label="配置范围" min-width="100"/>
                    <el-table-column prop="time" label="下发时间" min-width="110" />
                    <el-table-column prop="master" label="发起人" min-width="100"/>
                    <el-table-column prop="status" label="当前状态" min-width="100" />
                    <el-table-column prop="管理" label="操作" min-width="100" align="center">
                        <template #default="scope">
                            <el-button link type="primary" size="small" @click="handleEdit2(scope.$index, scope.row)">编辑</el-button>
                            <el-button link type="danger" size="small" @click="handleDelete(scope.$index)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-dialog v-model="dialogTableVisible2" title="配置分发" :append-to-body='true' width="30%" top="1%">
                <el-form :model="form2">
                    <el-form-item label="配置名称" :label-width="formLabelWidth">
                        <el-input v-model="form2.name" autocomplete="off" />
                    </el-form-item>
                    <el-form-item label="配置类型" :label-width="formLabelWidth">
                        <el-input v-model="form2.type" autocomplete="off" />
                    </el-form-item>
                    <el-form-item label="配置范围" :label-width="formLabelWidth">
                        <el-input v-model="form2.range" autocomplete="off" />
                    </el-form-item>
                    <el-form-item label="下发时间" :label-width="formLabelWidth">
                        <el-input v-model="form2.time" autocomplete="off" />
                    </el-form-item>
                    <el-form-item label="发起人" :label-width="formLabelWidth">
                        <el-input v-model="form2.master" autocomplete="off" />
                    </el-form-item>
                    <el-form-item label="当前状态" :label-width="formLabelWidth">
                        <el-input v-model="form2.status" autocomplete="off" />
                    </el-form-item>

                </el-form>
                <template #footer>
                    <span class="dialog-footer">
                        <el-button type="primary" @click="saveEdit2">确定</el-button>
                        <el-button @click="dialogTableVisible2 = false">
                            取消
                        </el-button>
                    </span>
                </template>
            </el-dialog>
        </el-tabs>
        <el-card shadow="never" style="margin-top:10px;border-radius: 0" v-if="showCard">
            <el-input
                class="w-50 m-2"
                placeholder="筛选节点......"
                :prefix-icon="Search"
            />
            <el-table :data="tableData" style="width: 100%;margin-top: 15px;">
                <el-table-column prop="name" label="名称" min-width="100">
                    <template #default="scope">
                        <div>
                            <el-icon style="display:inline-block; margin-right: 5px;"><Star /></el-icon>
                            <span>{{ scope.row.name }}</span>
                            <span style="display:block;color:#aaaaaa;">{{ scope.row.ip }}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="alarm" label="告警" min-width="100" />
                <el-table-column prop="status" label="状态" min-width="100"/>
                <el-table-column prop="burst" label="分片" min-width="100" />
                <el-table-column label="CPU使用率" min-width="100" >
                    <template #default="scope">
                        <div style="display: flex; align-items: center">
                            <el-icon><Top /></el-icon>
                            <span style="margin-left: 10px">{{ scope.row.CPU }}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="负载平均值" min-width="100">
                    <template #default="scope">
                        <div style="display: flex; align-items: center">
                            <el-icon><Top /></el-icon>
                            <span style="margin-left: 10px">{{ scope.row.load }}</span>
                        </div>
                    </template>
                </el-table-column>
                
                <el-table-column prop="JVM" label="JVM堆" min-width="100">
                    <template #default="scope">
                        <div style="display: flex; align-items: center">
                            <el-icon><Bottom /></el-icon>
                            <span style="margin-left: 10px">{{ scope.row.JVM }}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="磁盘可用空间" min-width="100">
                    <template #default="scope">
                        <div style="display: flex; align-items: center">
                            <el-icon><Bottom /></el-icon>
                            <span style="margin-left: 10px">{{ scope.row.disk }}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="管理" label="管理" min-width="100">
                    <template #default="scope">
                        <el-button link type="primary" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-dialog v-model="dialogTableVisible" title="节点管理" :append-to-body='true' width="30%" top="1%">
                <el-form :model="form">
                    <el-form-item label="名称" :label-width="formLabelWidth">
                        <el-input v-model="form.name" autocomplete="off" />
                    </el-form-item>
                    <el-form-item label="IP" :label-width="formLabelWidth">
                        <el-input v-model="form.ip" autocomplete="off" />
                    </el-form-item>
                    <el-form-item label="告警" :label-width="formLabelWidth">
                        <el-input v-model="form.alarm" autocomplete="off" />
                    </el-form-item>
                    <el-form-item label="状态" :label-width="formLabelWidth">
                        <el-input v-model="form.status" autocomplete="off" />
                    </el-form-item>
                    <el-form-item label="分片" :label-width="formLabelWidth">
                        <el-input v-model="form.burst" autocomplete="off" />
                    </el-form-item>
                    <el-form-item label="CPU利用率" :label-width="formLabelWidth">
                        <el-input v-model="form.CPU" autocomplete="off" />
                    </el-form-item>
                    <el-form-item label="负载平均值" :label-width="formLabelWidth">
                        <el-input v-model="form.load" autocomplete="off" />
                    </el-form-item>
                    <el-form-item label="JVM堆" :label-width="formLabelWidth">
                        <el-input v-model="form.JVM" autocomplete="off" />
                    </el-form-item>
                    <el-form-item label="磁盘可用空间" :label-width="formLabelWidth">
                        <el-input v-model="form.disk" autocomplete="off" />
                    </el-form-item>
                </el-form>
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
<script setup lang="ts" name="domainSetting">
import { reactive,ref } from 'vue'
import { Search } from '@element-plus/icons-vue';
import { ElMessage, ElMessageBox } from 'element-plus';
let showCard = ref(true)
let editOrAdd:string
const formLabelWidth = '100px'
const liDatas:object = reactive({
    状态:'Yellow',
    告警:0,
    节点:1,
    索引:34,
    JVM堆:'591.5MB/1.9GB',
    分片合计:35,
    未分配分片:1,
    文档:953514,
    数据:'533.6MB'
})
let dialogTableVisible = ref(false)
let dialogTableVisible2 = ref(false)
const tableData = ref<any[]>([{
    name:'node1',
    ip:'192.168.136.136：9300',
    alarm:'Clear',
    status:'联机',
    burst: 34,
    CPU: '7%',
    load: '1.73',
    JVM: '29%',
    disk:'32.4GB'
}])
let idx: number = -1;
let idx2: number = -1;
let form:any = reactive({})
let form2:any = reactive({})
const tableData2 = ref<any[]>([{
    name:'Configuration1',
    type:'资产管理',
    range:'range1',
    time:'2023-2-28 15:29:00',
    master: 'admin',
    status: '等待回复',
}])
const tabChange = (a:any) => {
    if(a == 0){
        showCard.value = true
    }
    else if(a == 1){
        showCard.value = false
    }
}
const handleEdit = (a:any,b:any) => {
    idx = a
	form.name = tableData.value[idx].name
	form.ip = tableData.value[idx].ip
	form.alarm = tableData.value[idx].alarm
	form.status = tableData.value[idx].status
	form.burst = tableData.value[idx].burst
	form.CPU = tableData.value[idx].CPU
    form.load = tableData.value[idx].load
	form.JVM = tableData.value[idx].JVM
	form.disk = tableData.value[idx].disk
	dialogTableVisible.value = true
	
}
const handleEdit2 = (a:any,b:any) => {
    idx2 = a
    editOrAdd = "edit"
	form2.name = tableData2.value[idx2].name
	form2.type = tableData2.value[idx2].type
	form2.range = tableData2.value[idx2].range
	form2.time = tableData2.value[idx2].time
	form2.master = tableData2.value[idx2].master
	form2.status = tableData2.value[idx2].status
	dialogTableVisible2.value = true
}
const saveEdit = () => {
    dialogTableVisible.value = false;
    tableData.value[idx].name = form.name
	tableData.value[idx].ip = form.ip
	tableData.value[idx].alarm = form.alarm
	tableData.value[idx].status = form.status
	tableData.value[idx].burst = form.burst
	tableData.value[idx].CPU = form.CPU
	tableData.value[idx].load = form.load
	tableData.value[idx].JVM = form.JVM
	tableData.value[idx].disk = form.disk
    ElMessage.success(`修改成功`);
}
const saveEdit2 = () => {
    if(editOrAdd == "edit"){
        
        tableData2.value[idx2].name = form2.name
        tableData2.value[idx2].type = form2.type
        tableData2.value[idx2].range = form2.range
        tableData2.value[idx2].time = form2.time
        tableData2.value[idx2].master = form2.master
        tableData2.value[idx2].status = form2.status
        dialogTableVisible2.value = false;
        ElMessage.success(`修改成功`);
    }else{
        tableData2.value.push({
            name: form2.name,
            type: form2.type,
            range: form2.range,
            time: form2.time,
            master: form2.master,
            status: form2.status
        })
        dialogTableVisible2.value = false;
        ElMessage.success(`添加成功`);
    }
    
}
const handleAdd = ()=>{
    editOrAdd = "add"
    form2.name = ''
	form2.type = ''
	form2.range = ''
	form2.time = ''
	form2.master = ''
	form2.status = ''
	dialogTableVisible2.value = true
}
const handleDelete = (index: number) => {
	// 二次确认删除
    console.log("删除前"+tableData2);
    
	ElMessageBox.confirm('确定要删除吗？', '提示', {
		type: 'warning'
	})
		.then(() => {
			ElMessage.success('删除成功');
			tableData2.value.splice(index, 1);
            console.log("删除后"+tableData2);
		})
		.catch((e) => {
            console.log(e);
            
        });
};
</script>
<style scoped>
ul{
    display: flex;
    justify-content: space-between;
    /* background-color: pink; */
}
ul>li{
    display: inline-block;

}
.top-text {   
    display: block;
    font-size: 14px;
    color: #616161;
    /* margin: 6px 0 1px 10px; */
}

.bottom-text {
    font-size: 14px;
    font-weight: 600;
    /* margin: 1px 0 6px 10px; */
}
</style>