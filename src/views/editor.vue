<template>
	<div>
		<el-row :gutter="20">
			<el-col :span="8">
				<el-card shadow="hover" class="mgb20" style="height: 252px">
					<el-form :model="form" label-width="75px">
						<el-form-item label="预警类型">
							<el-select v-model="form.type" placeholder="please select your type">
								<el-option label="Zone one" value="shanghai" />
								<el-option label="Zone two" value="beijing" />
							</el-select>
						</el-form-item>
						<el-form-item label="状态">
							<el-select v-model="form.status" placeholder="please select your status">
								<el-option label="Zone one" value="已验证" />
								<el-option label="Zone two" value="未验证" />
							</el-select>
						</el-form-item>
						<el-form-item label="内容">
							<el-input v-model="form.content" />
						</el-form-item>
						<el-form-item label="优先级">
							<el-checkbox-group v-model="form.priority">
								<el-checkbox-button label="高" name="type" />
								<el-checkbox-button label="中" name="type" />
								<el-checkbox-button label="低" name="type" />
							</el-checkbox-group>
						</el-form-item>
					</el-form>
					
				</el-card>
				<el-card shadow="hover" style="height: 252px">
					<template #header>
						<div class="clearfix">
							<span>预警信息情况</span>
						</div>
					</template>
					数据库勒索攻击
					<el-progress :percentage="79.4" color="#f56c6c"></el-progress>
					数据库密码爆破
					<el-progress :percentage="14" color="#f1e05a"></el-progress>
					数据库植入后门攻击
					<el-progress :percentage="5.6"></el-progress>
					数据库拖库攻击
					<el-progress :percentage="1" color="#42b983"></el-progress>
				</el-card>
			</el-col>
			<el-col :span="16">

				<el-card shadow="hover" style="height: 403px">
					<template #header>
						<div class="clearfix">
							<span>预警事件列表</span>
						</div>
					</template>

					<el-table :data="todoList" style="width: 100%">
						<el-table-column prop="eventId" label="事件id" sortable width="110" />
						<el-table-column prop="time" label="时间"/>
						<el-table-column prop="type" label="预警类型"/>
						<el-table-column prop="content" label="告警内容"/>
						<el-table-column prop="status" label="状态"/>
						<el-table-column prop="priority" label="优先级">
							<template #default="scope">
								<el-tag :type="scope.row.priority === '高' ? 'danger' : ''">
									{{ scope.row.priority }}
								</el-tag>
							</template>
						</el-table-column>
						<el-table-column prop="address" label="操作">
							<template #default>
								<el-button
									link
									type="primary"
									size="small"
									@click="dialogFormVisible = true">
									编辑
								</el-button>
								<el-dialog v-model="dialogFormVisible" title="事件预警详情" :append-to-body='true' width="38%">
									<el-form :model="form">
									<el-form-item label="事件id" :label-width="formLabelWidth">
										<el-input v-model="editContent.eventId" autocomplete="off" />
									</el-form-item>
									<el-form-item label="时间" :label-width="formLabelWidth">
										<el-input v-model="editContent.time"/>
									</el-form-item>
									<el-form-item label="预警类型" :label-width="formLabelWidth">
										<el-input v-model="editContent.eventType"/>
									</el-form-item>
									<el-form-item label="告警内容" :label-width="formLabelWidth">
										<el-input v-model="editContent.content"/>
									</el-form-item>
									<el-form-item label="优先级" :label-width="formLabelWidth">
										<el-input v-model="editContent.priority"/>
									</el-form-item>
									<el-form-item label="备注" :label-width="formLabelWidth">
										<el-input v-model="editContent.remarks"/>
									</el-form-item>
									</el-form>
									<template #footer>
									<span class="dialog-footer">
										<el-button type="primary" @click="dialogFormVisible = false">确定</el-button>
										<el-button @click="dialogFormVisible = false">
										取消
										</el-button>
									</span>
									</template>
								</el-dialog>
							</template>
						</el-table-column>
					</el-table>
				</el-card>
			</el-col>
		</el-row>
	</div>
</template>

<script setup lang="ts" name="editor">
import { ref,reactive } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus'
const form = reactive({
	type:'',
	status:'',
	content:'',
	priority:''
})
const formLabelWidth = '80px'
const value1 = ref<[Date, Date]>([
  new Date(2023, 2, 14, 10, 10),
  new Date(2023, 2, 15, 10, 10),
])
const todoList = reactive([
	{
		eventId:1523,
		time:'2023-05-29',
		type:'数据库密码爆破',
		content:'...',
		status:'未处理',
		priority:'高',
	},
]);
const dialogFormVisible = ref(false)
const editContent = {
	eventId:1523,
	time:'2023.2.13 12:00:00',
	eventType:'数据库密码爆破',
	content:'...',
	priority:'高',
	remarks:''
}
</script>

<style scoped>
.el-row {
	margin-bottom: 20px;
}
.grid-content {
	display: flex;
	align-items: center;
	height: 100px;
}
.grid-cont-right {
	flex: 1;
	text-align: center;
	font-size: 14px;
	color: #999;
}
.grid-num {
	font-size: 30px;
	font-weight: bold;
}
.grid-con-icon {
	font-size: 50px;
	width: 100px;
	height: 100px;
	text-align: center;
	line-height: 100px;
	color: #fff;
}

</style>
