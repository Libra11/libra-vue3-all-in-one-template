<!--
 * @Author: Libra
 * @Date: 2023-03-07 14:15:32
 * @LastEditTime: 2023-04-12 17:17:05
 * @LastEditors: Libra
 * @Description: App.vue
-->
<script setup lang="ts">
import { RouterView } from 'vue-router'
import { isDark } from './composables/useDark'
import { computed } from 'vue'

const cssVariables = computed(() => {
	return {
		'--color-text-primary': !isDark.value ? '#606266' : '#CFD3DC',
		'--color-text-secondary': !isDark.value ? '#909399' : '#A3A6AD',
		'--color-text-placeholder': !isDark.value ? '#A8ABB2' : '#8D9095',
	}
})
</script>

<template>
	<div class="h-screen w-screen" :style="cssVariables">
		<RouterView />
	</div>
</template>

<style lang="scss"></style>
