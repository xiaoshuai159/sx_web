<template>
	<div class="tags" v-if="tags.show">
		
		<ul><div class="collapse-btn" @click="collapseChage">
			<el-icon v-if="sidebar.collapse"><Expand /></el-icon>
			<el-icon v-else><Fold /></el-icon>
		</div>
			<li
				class="tags-li"
				v-for="(item, index) in tags.list"
				:class="{ active: isActive(item.path) }"
				:key="index"
			>
				<router-link :to="item.path" class="tags-li-title">{{ item.title }}</router-link>
				<el-icon @click="closeTags(index)"><Close /></el-icon>
			</li>
		</ul>
		<div>
			<span>当前位置：</span>
			<span>{{ preTagName }}</span> >
			<span>{{ route.meta.title }}</span>
		</div>
		<!-- <div class="tags-close-box">
			<el-select v-model="value" class="m-2" placeholder="Select" size="small" style="height: 28px;">
				<el-option
				v-for="item in options"
				:key="item.value"
				:label="item.label"
				:value="item.value"
				/>
			</el-select>
		</div> -->
	</div>
</template>

<script setup lang="ts">
import { useSidebarStore } from '../store/sidebar';
import { useTagsStore } from '../store/tags';
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';
import { ref } from 'vue'
const value = ref('day')
const sidebar = useSidebarStore();
const collapseChage = () => {
	sidebar.handleCollapse();
};

const options = [
  {
    value: 'day',
    label: '近一天',
  },
  {
    value: 'week',
    label: '近一周',
  },
  {
    value: 'month',
    label: '近一个月',
  },
  {
    value: 'year',
    label: '近一年',
  },
]

const route = useRoute();
const router = useRouter();
const isActive = (path: string) => {
	return path === route.fullPath;
};
const tags = useTagsStore();
// 关闭单个标签
const closeTags = (index: number) => {
	const delItem = tags.list[index];
	tags.delTagsItem(index);
	const item = tags.list[index] ? tags.list[index] : tags.list[index - 1];
	// if(route.name==='provincePage'||route.name==='cityPage'||route.name==='areaPage'){return}
	if(route.name==='cityPage'||route.name==='areaPage'){return}  // 没有全国地图的时候，仅有省级地图使用这个，最大使用provincePage做tag标签
	else{
		if (item) {
		delItem.path === route.fullPath && router.push(item.path);
		} else {
			router.push('/');
		}
	}
	
};
let preTagName = ref<string>() // 设置当前位置的位置1
const getPreTagName = (tagName:string) =>{
	if(tagName=="数据库安全事件"||tagName=="APP检测分析"){
		preTagName.value = "数据安全"
	}else if(tagName=="挖矿行为监测"||tagName=="漏洞监测"||tagName=="僵木蠕事件监测"||tagName=="域名异常监测"){
		preTagName.value = "网络安全"
	}else if(tagName=="威胁情报库"||tagName=="追踪溯源分析"||tagName=="公共危害事件"||tagName=="攻击搜索"){
		preTagName.value = "分析研判"
	}else if(tagName=="用户管理"){
		preTagName.value = "系统管理"
	}
}
// 设置标签
const setTags = (route: any) => {
	const isExist = tags.list.some(item => {
		return item.path === route.fullPath;
	});
	getPreTagName(route.meta.title)
	if (!isExist) {
		if (tags.list.length >= 8) tags.delTagsItem(0);
		
		// console.log(route.meta.title);
		// if(route.name==='provincePage'||route.name==='cityPage'||route.name==='areaPage'){return}
		if(route.name==='cityPage'||route.name==='areaPage'){return}  // 没有全国地图的时候，仅有省级地图使用这个，最大使用provincePage做tag标签
		else{
			tags.setTagsItem({
				name: route.name,
				title: route.meta.title,
				path: route.fullPath
			});
		}
		
	}
};
setTags(route);
onBeforeRouteUpdate(to => {	
	setTags(to);
});

// 关闭全部标签
const closeAll = () => {
	tags.clearTags();
	router.push('/');
};
// 关闭其他标签
const closeOther = () => {
	const curItem = tags.list.filter(item => {
		return item.path === route.fullPath;
	});
	tags.closeTagsOther(curItem);
};
const handleTags = (command: string) => {
	command === 'other' ? closeOther() : closeAll();
};

// 关闭当前页面的标签页
// tags.closeCurrentTag({
//     $router: router,
//     $route: route
// });
</script>

<style scoped lang="less">
.collapse-btn {
	display: flex;
	/* justify-content: center; */
	align-items: center;
	height: 100%;
	float: left;
	padding-right: 7px;
	transition: transform 0.2s;
	transform: scale(1.2);
	cursor: pointer;
}
.collapse-btn:hover{
	transform: scale(1.4);
}
:deep(.el-input__wrapper){
	height: 26px!important
}
</style>
<style lang="less">
.tags {
	position: relative;
	/* height: 30px; */
	height: 60px;
	overflow: hidden;
	// background: #fff;
	padding-right: 120px;
	// box-shadow: 0 5px 10px #ddd;
	div {
		margin-left: 12px;
		line-height: 40px;
		font-size: 13px;
		color: #5e5f5f;
	}
}

.tags ul {
	box-sizing: border-box;
	width: 100%;
	/* height: 100%; */
	height: 50%;
}
.tags-li {
	display: flex;
	align-items: center;
	float: left;
	margin: 3px 5px 2px 3px;
	border-radius: 3px;
	font-size: 12px;
	overflow: hidden;
	cursor: pointer;
	height: 23px;
	border: 1px solid #e9eaec;
	background: #fff;
	padding: 0 5px 0 12px;
	color: #666;
	-webkit-transition: all 0.3s ease-in;
	-moz-transition: all 0.3s ease-in;
	transition: all 0.3s ease-in;
}

.tags-li:not(.active):hover {
	background: #f8f8f8;
}

.tags-li.active {
	color: #fff;
}

.tags-li-title {
	float: left;
	max-width: 80px;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	margin-right: 5px;
	color: #666;
}

.tags-li.active .tags-li-title {
	color: #fff;
}

.tags-close-box {
	position: absolute;
	right: 0;
	top: 0;
	box-sizing: border-box;
	padding-top: 1px;
	text-align: center;
	width: 110px;
	height: 30px;
	background: #fff;
	box-shadow: -3px 0 15px 3px rgba(0, 0, 0, 0.1);
	z-index: 10;
}
</style>
