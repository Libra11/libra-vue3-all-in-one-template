<!--
 * @Author: Libra
 * @Date: 2023-04-12 17:31:01
 * @LastEditTime: 2023-04-20 11:25:55
 * @LastEditors: Libra
 * @Description: 设备检测
-->
<template>
	<div>
		detect
		<el-button type="primary" @click="confirm.next()">click</el-button>
	</div>
</template>

<script setup lang="ts">
import { inject } from 'vue'

const confirm: any = inject('confirm')
</script>

<style scoped></style>
