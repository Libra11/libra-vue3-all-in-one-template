<!--
 * @Author: Libra
 * @Date: 2023-04-12 17:28:30
 * @LastEditTime: 2023-04-12 18:20:23
 * @LastEditors: Libra
 * @Description: 考前确认 layout
-->
<template>
	<custom-header />
	<div class="pt-20">
		<slot />
	</div>
	<custom-footer v-if="isShowFooter" short-name="Libra" />
</template>

<script setup lang="ts">
import CustomHeader from '@/components/CustomHeader.vue'
import CustomFooter from '@/components/CustomFooter.vue'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const isShowFooter = ref(true)
const route = useRoute()

watch(
	() => route.name,
	(newName) => {
		isShowFooter.value = newName !== 'Basic'
	}
)
</script>

<style scoped></style>
