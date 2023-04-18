<!--
 * @Author: Libra
 * @Date: 2023-04-13 09:43:21
 * @LastEditTime: 2023-04-18 17:41:12
 * @LastEditors: Libra
 * @Description: confirm layout
-->
<template>
	<div>
		<div>
			<el-steps direction="vertical" :active="active">
				<el-step :title="item.title" v-for="(item, index) in stepsList" :key="index"></el-step>
			</el-steps>
		</div>
		<slot />
	</div>
</template>

<script setup lang="ts">
import { useInfoStore } from '@/store/modules/info'
import { useRoute } from 'vue-router'

const infoStore = useInfoStore()
const examInfo = infoStore.getExamInfo
const isPractice = infoStore.isPractice

interface IStepList {
	title: string
	hidden: boolean
	routeName: string
}

const steps = [
	{
		title: '设备检测',
		hidden: !examInfo.isDeviceCheck,
		routeName: 'Detect',
	},
	{
		title: '完善信息',
		hidden: false,
		routeName: 'Basic',
	},
	{
		title: examInfo.isFaceRecognizeNeed ? '身份验证' : '摄像拍照',
		hidden: false,
		routeName: examInfo.isFaceRecognizeNeed ? 'Face' : 'Camera',
	},
	{
		title: '手机监控',
		hidden: examInfo.mobileMonitorType === 0 && examInfo.mobileVideoType === 0,
		routeName: 'Mobile',
	},
	{
		title: '考试须知',
		hidden: false,
		routeName: 'Notice',
	},
	{
		title: isPractice ? '考前练习' : '开始考试',
		hidden: false,
		routeName: 'Exam',
	},
]
const stepsList: Array<IStepList> = steps.filter((item) => !item.hidden)
const route = useRoute()
const active = stepsList.findIndex((item) => {
	if (route.name === 'ConfirmCamera' && item.routeName === 'FaceRecognition') {
		item.title = '摄像拍照'
		return item.routeName === 'FaceRecognition'
	}
	return item.routeName === route.name
})
</script>

<style scoped></style>
