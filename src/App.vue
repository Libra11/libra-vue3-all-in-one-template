<!--
 * @Author: Libra
 * @Date: 2023-03-07 14:15:32
 * @LastEditTime: 2023-04-06 14:57:47
 * @LastEditors: Libra
 * @Description: App.vue
-->
<script setup lang="ts">
import { toggleDark } from '@/composables/useDark'
import { RouterView } from 'vue-router'
import { memberInfo } from './api'
import { ElMessage } from 'element-plus'
import CustomHeader from '@/components/CustomHeader.vue'

const getInfo = async () => {
	const res = await memberInfo()
	if (res.code === 200) {
		ElMessage.success(res.message)
	}
}
</script>

<template>
	<header>
		<div class="wrapper no-animation">
			<custom-header />
			<div style="height: 200px"></div>
			<el-button type="primary" @click="toggleDark()">Toggle Dark Mode</el-button>
			<el-button @click="getInfo()">getInfo</el-button>
			<div class="text-lg font-light">test tailwindcss</div>
		</div>
	</header>

	<RouterView />
</template>

<style lang="scss"></style>
