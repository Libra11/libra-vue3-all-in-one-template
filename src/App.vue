<!--
 * @Author: Libra
 * @Date: 2023-03-07 14:15:32
 * @LastEditTime: 2023-04-17 17:25:24
 * @LastEditors: Libra
 * @Description: App.vue
-->
<script setup lang="ts">
import { RouterView } from 'vue-router'
import { isDark } from './composables/useDark'
import { computed } from 'vue'
import CustomLayout from './layout/CustomLayout.vue'
import { useToken } from './composables/useToken'

const cssVariables = computed(() => {
	return {
		'--color-text-primary': !isDark.value ? '#606266' : '#CFD3DC',
		'--color-text-secondary': !isDark.value ? '#909399' : '#A3A6AD',
		'--color-text-placeholder': !isDark.value ? '#A8ABB2' : '#8D9095',
	}
})
</script>

<template>
	<custom-layout class="h-screen w-screen" :style="cssVariables" v-if="useToken().value">
		<router-view v-slot="{ Component }">
			<transition name="fade" mode="out-in">
				<component :is="Component" :key="$route.path" />
			</transition>
		</router-view>
	</custom-layout>
	<div class="h-screen w-screen" :style="cssVariables" v-else>
		<router-view v-slot="{ Component }">
			<transition name="fade" mode="out-in">
				<component :is="Component" :key="$route.path" />
			</transition>
		</router-view>
	</div>
</template>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
</style>
