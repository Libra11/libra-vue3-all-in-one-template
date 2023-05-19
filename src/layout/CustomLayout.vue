<!--
 * @Author: Libra
 * @Date: 2023-04-12 17:28:30
 * @LastEditTime: 2023-05-04 10:25:59
 * @LastEditors: Libra
 * @Description: 考前确认 layout
-->
<template>
	<div v-if="!initLoading" class="text-primary">
		<custom-header :isStart="isExamStart" :time="displayTime" :has-right="true" />
		<div class="bg-img h-screen px-10 pt-20">
			<slot></slot>
		</div>
		<custom-footer v-if="isShowFooter" :short-name="shortName" />
	</div>
</template>

<script setup lang="ts">
import CustomHeader from '@/components/CustomHeader.vue'
import CustomFooter from '@/components/CustomFooter.vue'
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { examInfoApi, getTimeApi, jobInfoApi } from '@/api/exam'
import { candidateInfoApi } from '@/api/candidate'
import { useInfoStore } from '@/store/modules/info'
import { formatSeconds } from '@/utils'

const isShowFooter = ref(true)
const route = useRoute()
const infoStore = useInfoStore()

watch(
	() => route.name,
	(newName) => {
		isShowFooter.value = newName !== 'Question'
	}
)

onMounted(async () => {
	await initData()
	await initTime()
	initLoading.value = false
})

onBeforeUnmount(() => {
	timeWorker.postMessage('stop')
})

/**
 * 获取初始化数据
 */
const initLoading = ref(true)
const shortName = ref('')
async function initData() {
	await examInfo()
	await candidateInfo()
	await jobInfo()
}
async function examInfo() {
	const res = await examInfoApi()
	if (res.code === 0) {
		infoStore.setExamInfo(res.data)
		shortName.value = res.data.coverInfo!.name
	}
}
async function candidateInfo() {
	const res = await candidateInfoApi()
	if (res.code === 0) {
		infoStore.setCandidateInfo(res.data)
	}
}
async function jobInfo() {
	const res = await jobInfoApi()
	if (res.code === 0) {
		infoStore.setJobInfo(res.data)
	}
}

/**
 * 时间相关
 */
let isExamStart = ref(false)
let displayTime = ref('')
let secondToStart = 0
let secondRemain = 0
const timeWorker = new Worker(new URL('@/worker/time.worker.ts', import.meta.url), {
	type: 'module',
})

async function getTime() {
	const res = await getTimeApi()
	if (res.code === 0) {
		return res.data
	}
}

async function initTime() {
	const time = await getTime()
	if (!time) return
	secondToStart = time.secondToStart
	secondRemain = time.secondRemain
	// set isPractice
	infoStore.setIsPractice(secondToStart > 0)
	timeWorker.postMessage('start')
	timeWorker.onmessage = () => {
		handleCountDown()
	}
}

function handleCountDown() {
	if (secondToStart > 0) {
		// 考试未开始
		secondToStart--
		displayTime.value = formatSeconds(secondToStart)
		isExamStart.value = false
	} else if (secondRemain > 0) {
		// 考试进行中
		secondRemain--
		displayTime.value = formatSeconds(secondRemain)
		isExamStart.value = true
	} else {
		// 考试结束
		displayTime.value = ''
		isExamStart.value = false
		timeWorker.postMessage('stop')
	}
}
</script>

<style scoped></style>
