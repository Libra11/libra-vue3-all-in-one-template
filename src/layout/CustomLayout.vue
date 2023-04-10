<!--
 * @Author: Libra
 * @Date: 2023-04-10 11:07:10
 * @LastEditTime: 2023-04-10 14:13:29
 * @LastEditors: Libra
 * @Description: layout
-->
<template>
	<div class="flex-db h-screen w-screen">
		<custom-header />
		<div :class="[isDark ? 'bg-dark' : 'bg-light', 'w-full flex-1 bg-cover pt-20']">
			<slot />
		</div>
		<custom-footer short-name="Libra" />
	</div>
</template>

<script setup lang="ts">
import CustomHeader from '@/components/CustomHeader.vue'
import CustomFooter from '@/components/CustomFooter.vue'
import { isDark } from '@/composables/useDark'
</script>

<style scoped lang="scss">
.bg-light {
	background-image: url('@/assets/images/light_bg.png');
}
.bg-dark {
	background-image: url('@/assets/images/dark_bg.png');
}
</style>
