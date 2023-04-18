<!--
 * @Author: Libra
 * @Date: 2023-04-12 17:28:30
 * @LastEditTime: 2023-04-17 17:58:54
 * @LastEditors: Libra
 * @Description: 考前确认 layout
-->
<template>
	<div>
		<custom-header :logo="logo" />
		<div class="h-screen pt-20" v-if="!initLoading">
			<slot></slot>
		</div>
		<custom-footer v-if="isShowFooter" short-name="Libra" />
	</div>
</template>

<script setup lang="ts">
import CustomHeader from '@/components/CustomHeader.vue'
import CustomFooter from '@/components/CustomFooter.vue'
import { onMounted, ref, watch, type Ref } from 'vue'
import { useRoute } from 'vue-router'
import { examInfoApi, jobInfoApi } from '@/api/exam'
import { candidateInfoApi } from '@/api/candidate'
import router from '@/router'
import { useInfoStore } from '@/store/modules/info'

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
})

/**
 * 获取初始化数据
 */
const initLoading = ref(true)
const logo: Ref<string> = ref('')
let isDeviceCheck = false
async function initData() {
	await examInfo()
	await candidateInfo()
	await jobInfo()
	initLoading.value = false
	if (route.name !== 'Confirm') return
	router.push(isDeviceCheck ? '/confirm/device' : '/confirm/basic')
}
async function examInfo() {
	const res = await examInfoApi()
	if (res.code === 0) {
		const result = res.data
		infoStore.setExamInfo(result)
		logo.value = result.coverInfo.logo
		isDeviceCheck = result.isDeviceCheck
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
</script>

<style scoped></style>
