<!--
 * @Author: Libra
 * @Date: 2023-03-07 14:15:32
 * @LastEditTime: 2023-04-10 14:54:37
 * @LastEditors: Libra
 * @Description: App.vue
-->
<script setup lang="ts">
import { RouterView } from 'vue-router'
import customLayout from '@/layout/CustomLayout.vue'
</script>

<template>
	<customLayout>
		<RouterView />
	</customLayout>
</template>

<style lang="scss"></style>
