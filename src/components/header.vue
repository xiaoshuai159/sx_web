<template>
	<div class="header">
		<!-- 折叠按钮 -->
		<div class="collapse-btn" @click="collapseChage">
			<el-icon v-if="sidebar.collapse"><Expand /></el-icon>
			<el-icon v-else><Fold /></el-icon>
		</div>
		<div class="logo">网络安全协调指挥平台</div>
		<div class="header-right">
			<div class="header-user-con" @click="toMenuIndex">
				<span style="line-height: 14px; align-self: center;margin-right: 7px;"><svg t="1685582666850" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3347" width="20" height="20"><path d="M468.1 320.3V158.7c0.9-8.1-1.3-16.4-7.5-22.7-10.9-10.8-28.4-10.8-39.3 0L147.6 436.1c-5.8 5.7-8.3 13.4-7.9 20.9-0.4 7.5 2.1 15.1 7.9 20.9l272.2 298.4c10.2 8.7 28.8 13.6 40.8 1.6 6.2-6.2 8.9-11.4 8-19.5V594c180.8 0 344.4 130.2 376.8 301.6 21.9-50.2 34.1-105.6 34.1-163.9 0.1-227.2-184.1-411.4-411.4-411.4z" fill="#ffffff" p-id="3348"></path></svg></span>
				<span style="font-size: 14px;">返回</span>
				<!-- 消息中心 -->
				<!-- <div class="btn-bell">
					<el-tooltip
						effect="dark"
						:content="message ? `有${message}条未读消息` : `消息中心`"
						placement="bottom"
					>
						<i class="el-icon-lx-notice"></i>
					</el-tooltip>
					<span class="btn-bell-badge" v-if="message"></span>
				</div> -->
				<!-- 用户头像 -->
				<!-- <el-avatar class="user-avator" :size="30" :src="imgurl" /> -->
				<!-- 用户名下拉菜单 -->
				<!-- <el-dropdown class="user-name" trigger="click" @command="handleCommand">
					<span class="el-dropdown-link">
						{{ username }}
						<el-icon class="el-icon--right">
							<arrow-down />
						</el-icon>
					</span>
					<template #dropdown>
						<el-dropdown-menu>
							<a href="https://github.com/lin-xin/vue-manage-system" target="_blank">
								<el-dropdown-item>项目仓库</el-dropdown-item>
							</a> 
							<el-dropdown-item command="user">个人中心</el-dropdown-item>
							<el-dropdown-item command="loginout">退出登录</el-dropdown-item>
						</el-dropdown-menu>
					</template>
				</el-dropdown> -->
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue';
import { useSidebarStore } from '../store/sidebar';
import { useRouter } from 'vue-router';
import imgurl from '../assets/img/img.jpg';

const username: string | null = localStorage.getItem('ms_username');
const message: number = 2;

const sidebar = useSidebarStore();
// 侧边栏折叠
const collapseChage = () => {
	sidebar.handleCollapse();
};

onMounted(() => {
	if (document.body.clientWidth < 1500) {
		collapseChage();
	}
});
const toMenuIndex = ()=>{
	window.location.href = "http://172.17.18.1:9998/#/menuIndex"
}
// 用户名下拉菜单选择事件
const router = useRouter();
const handleCommand = (command: string) => {
	if (command == 'loginout') {
		localStorage.removeItem('ms_username');
		router.push('/login');
	} else if (command == 'user') {
		router.push('/user');
	}
};
</script>
<style scoped>
.header {
	position: relative;
	box-sizing: border-box;
	/* display:flex; */
	/* align-items: center; */
	width: 100%;
	/* height: 48px; */
	height: 56px;
	font-size: 19px;
	background: url(../assets/img/headerbg.png) 100% 100% no-repeat;
	background-size: cover;
	background-color: #0f4e8a;
	color: #fff;
}
.collapse-btn {
	display: flex;
	/* justify-content: center; */
	align-items: center;
	height: 100%;
	float: left;
	padding: 0 21px;
	cursor: pointer;
}
.header .logo {
	float: left;
	/* width: 220px;
	line-height: 48px; */
	font-family: 'YouShe';
	width: 520px;
	font-weight: 600;
	letter-spacing: 1.5px;
	font-size: 28px;
	line-height: 56px;
	/* 文字倾斜 */
	transform: skew(-7deg); 
}
.header-right {
	float: right;
	padding-right: 50px;
}
.header-user-con {
	display: flex;
	/* height: 48px; */
	cursor: pointer;
	height: 56px;
	align-items: center;
}
.btn-fullscreen {
	transform: rotate(45deg);
	margin-right: 5px;
	font-size: 24px;
}
.btn-bell,
.btn-fullscreen {
	position: relative;
	width: 30px;
	height: 30px;
	text-align: center;
	border-radius: 15px;
	cursor: pointer;
	display: flex;
	align-items: center;
}
.btn-bell-badge {
	position: absolute;
	right: 4px;
	top: 0px;
	width: 8px;
	height: 8px;
	border-radius: 4px;
	background: #f56c6c;
	color: #fff;
}
.btn-bell .el-icon-lx-notice {
	color: #fff;
}
.user-name {
	margin-left: 10px;
}
.user-avator {
	margin-left: 20px;
}
.el-dropdown-link {
	color: #fff;
	cursor: pointer;
	display: flex;
	align-items: center;
}
.el-dropdown-menu__item {
	text-align: center;
}
</style>
