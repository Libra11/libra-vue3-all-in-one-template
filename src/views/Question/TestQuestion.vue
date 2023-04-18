<!--
 * @Author: Libra
 * @Date: 2023-04-17 17:47:23
 * @LastEditTime: 2023-04-17 17:55:43
 * @LastEditors: Libra
 * @Description: 
-->
<template>
	<detect-layout>
		<el-button type="primary" @click="handleClick">to exam</el-button>
	</detect-layout>
</template>

<script setup lang="ts">
import DetectLayout from '@/layout/DetectLayout.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
function handleClick() {
	router.push('/confirm/exam')
}
</script>

<style scoped></style>
