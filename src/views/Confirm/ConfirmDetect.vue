<!--
 * @Author: Libra
 * @Date: 2023-04-12 17:31:01
 * @LastEditTime: 2023-04-12 18:15:18
 * @LastEditors: Libra
 * @Description: 设备检测
-->
<template>
	<div>detect</div>
	<el-button type="primary" @click="handleClick">Primary</el-button>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
function handleClick() {
	router.push('/confirm/basic')
}
</script>

<style scoped></style>
