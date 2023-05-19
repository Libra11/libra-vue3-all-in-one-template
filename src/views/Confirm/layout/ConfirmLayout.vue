<!--
 * @Author: Libra
 * @Date: 2023-04-13 09:43:21
 * @LastEditTime: 2023-04-20 11:45:53
 * @LastEditors: Libra
 * @Description: confirm layout
-->
<template>
	<div class="flex h-full flex-col">
		<span class="py-10 text-2xl font-bold text-black"
			>{{ confirmTitle }} <span class="text-base font-normal text-secondary">{{ scenario }}</span></span
		>
		<el-row class="flex w-full flex-1">
			<el-col :span="4" class="flex-c animate__animated animate__fadeIn h-[26rem]">
				<el-steps direction="vertical" :active="active">
					<el-step :title="item.title" v-for="(item, index) in stepsList" :key="index"></el-step>
				</el-steps>
			</el-col>
			<el-col :span="20" class="flex items-start justify-center">
				<div class="animate__animated animate__fadeIn w-[42rem] rounded bg-white p-5 opacity-80 shadow-md">
					<div v-for="(item, index) in components" :key="index">
						<component :is="item.layout" v-if="item.name === currentLayout" />
					</div>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script setup lang="ts">
import { useInfoStore } from '@/store/modules/info'
import { computed, defineAsyncComponent, onMounted, ref, watch, provide } from 'vue'
import ls from '@/utils/localStorage'

// provide next and prev
provide('confirm', {
	next: () => {
		next()
	},
	prev: () => {
		prev()
	},
})

onMounted(() => {
	initLayout()
})
const infoStore = useInfoStore()
const examInfo = infoStore.getExamInfo
const jobInfo = infoStore.getJobInfo

/**
 * 初始化标题
 */
const confirmTitle = computed(() => {
	return examInfo.coverInfo!.shortName + examInfo.userExamName + jobInfo.name
})
const scenario = examInfo.scenario

/**
 * 初始化step
 */
const isPractice = infoStore.isPractice

interface IStepList {
	title: string
	hidden: boolean
	layoutName: string
}

const steps = [
	{
		title: '设备检测',
		hidden: !examInfo.isDeviceCheck,
		layoutName: 'Detect',
	},
	{
		title: '完善信息',
		hidden: false,
		layoutName: 'Basic',
	},
	{
		title: examInfo.isFaceRecognizeNeed ? '身份验证' : '摄像拍照',
		hidden: false,
		layoutName: examInfo.isFaceRecognizeNeed ? 'Face' : 'Camera',
	},
	{
		title: '手机监控',
		hidden: examInfo.mobileMonitorType === 0 && examInfo.mobileVideoType === 0,
		layoutName: 'Mobile',
	},
	{
		title: '考试须知',
		hidden: false,
		layoutName: 'Notice',
	},
	{
		title: isPractice ? '考前练习' : '开始考试',
		hidden: false,
		layoutName: 'Exam',
	},
]
const stepsList: Array<IStepList> = steps.filter((item) => !item.hidden)
// 根据stepList动态加载组件
const components = stepsList.map((item) => {
	return {
		layout: defineAsyncComponent(() => import(`@/views/Confirm/Confirm${item.layoutName}.vue`)),
		name: item.layoutName,
	}
})

// 上一步
function prev() {
	const index = layoutName.indexOf(currentLayout.value)
	if (index > 0) {
		currentLayout.value = layoutName[index - 1]
		ls.setItem('layoutName', currentLayout.value)
	}
}
// 下一步
function next() {
	const index = layoutName.indexOf(currentLayout.value)
	if (index < layoutName.length - 1) {
		currentLayout.value = layoutName[index + 1]
		ls.setItem('layoutName', currentLayout.value)
	}
}

/**
 * 初始化layout
 */
const layoutName = stepsList.map((item) => item.layoutName)
let currentLayout = ref(ls.getItem('layoutName'))

function initLayout() {
	const { isDeviceCheck } = examInfo
	if (!currentLayout.value) {
		currentLayout.value = isDeviceCheck ? layoutName[0] : layoutName[1]
		ls.setItem('layoutName', currentLayout.value)
	}
}

// 监听currentLayout 更新 active
let active = ref(0)
active.value = layoutName.indexOf(currentLayout.value)
watch(currentLayout, (val: any) => {
	const index = layoutName.indexOf(val)
	active.value = index
})
</script>

<style scoped lang="scss">
:deep(.el-step__icon) {
	width: 2.5rem;
	height: 2.5rem;
}
:deep(.el-step.is-vertical .el-step__line) {
	left: 1.25rem;
	top: 2.8rem;
	bottom: 0.25rem;
	width: 1px;
}
:deep(.el-step.is-vertical .el-step__main) {
	padding: 0.67rem 0 0 2rem;
}
:deep(.el-step__head.is-process) {
	color: var(--el-color-primary);
	border-color: var(--el-color-primary);
}
:deep(.el-step__head.is-process .el-step__line) {
	background-color: var(--el-color-primary);
}
:deep(.el-step__head.is-finish .el-step__line) {
	background-color: var(--el-color-primary);
}

:deep(.el-step__title.is-process) {
	color: var(--el-color-primary);
}

:deep(.el-step__line-inner) {
	border-width: 0 !important;
}
</style>
