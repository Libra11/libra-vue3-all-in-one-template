<!--
 * @Author: Libra
 * @Date: 2023-04-17 17:45:57
 * @LastEditTime: 2023-04-17 17:55:29
 * @LastEditors: Libra
 * @Description:  confirm exam
-->
<template>
	<detect-layout>
		<el-button type="primary" @click="handleClick">to question</el-button>
	</detect-layout>
</template>

<script setup lang="ts">
import DetectLayout from '@/layout/DetectLayout.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
function handleClick() {
	router.push('/question')
}
</script>

<style scoped></style>
