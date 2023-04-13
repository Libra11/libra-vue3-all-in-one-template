<!--
 * @Author: Libra
 * @Date: 2023-04-12 17:31:34
 * @LastEditTime: 2023-04-13 16:02:40
 * @LastEditors: Libra
 * @Description: Confirm router
-->
<template>
	<custom-layout>
		<confirm-layout>
			<router-view />
		</confirm-layout>
	</custom-layout>
</template>

<script setup lang="ts">
import CustomLayout from '@/layout/CustomLayout.vue'
import ConfirmLayout from '@/layout/ConfirmLayout.vue'
</script>

<style scoped></style>
