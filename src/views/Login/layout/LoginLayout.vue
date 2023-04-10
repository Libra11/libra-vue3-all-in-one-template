<!--
 * @Author: Libra
 * @Date: 2023-04-10 14:41:27
 * @LastEditTime: 2023-04-10 15:46:33
 * @LastEditors: Libra
 * @Description: 登录layout
-->
<template>
	<el-row class="flex-c h-full">
		<el-col :span="12">
			<span>{{ welcomeInfo.title }}</span>
			<span>{{ welcomeInfo.subTitle }}</span>
			<span v-for="item in welcomeInfo.tips" :key="item">{{ item }}</span>
		</el-col>
		<el-col :span="12">
			<slot />
		</el-col>
	</el-row>
</template>

<script setup lang="ts">
import { getSimple } from '@/api/exam'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

defineProps<{
	welcomeInfo: {
		title: string
		subTitle: string
		tips: string[]
	}
}>()

onMounted(async () => {
	await getSimpleInfo()
})

let companyShortName = ref('')
let userExamName = ref('')
let scenario = ref('')

async function getSimpleInfo() {
	const route = useRoute()
	const { shortId } = route.query
	if (!shortId || shortId === 'undefined') return
	const res = await getSimple({
		examShortId: shortId as string,
	})
	if (res.code === 0) {
		companyShortName.value = res.data.shortName
		userExamName.value = res.data.userExamName
		scenario.value = res.data.scenario
	}
}
</script>

<style scoped></style>
