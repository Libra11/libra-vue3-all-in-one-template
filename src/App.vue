<!--
 * @Author: Libra
 * @Date: 2023-03-07 14:15:32
 * @LastEditTime: 2024-04-02 14:06:31
 * @LastEditors: Libra
 * @Description: App.vue
-->
<script setup lang="ts">
import { toggleDark } from '@/composables/useDark'
import { RouterView } from 'vue-router'
</script>

<template>
	<header>
		<div class="wrapper">
			<el-button type="primary" @click="toggleDark()">Toggle Dark Mode</el-button>
		</div>
	</header>

	<RouterView />
</template>

<style lang="scss"></style>
