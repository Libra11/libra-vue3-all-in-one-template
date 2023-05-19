<!--
 * @Author: Libra
 * @Date: 2023-04-12 17:30:22
 * @LastEditTime: 2023-04-20 11:23:51
 * @LastEditors: Libra
 * @Description: 个人信息页
-->
<template>
	<div>
		basic
		<el-button type="primary" @click="myData.next()">click</el-button>
	</div>
</template>

<script setup lang="ts">
import { inject } from 'vue'

const myData: any = inject('confirm')
</script>

<style scoped></style>
