<!--
 * @Author: Libra
 * @Date: 2023-04-12 17:28:30
 * @LastEditTime: 2023-04-13 16:05:42
 * @LastEditors: Libra
 * @Description: 考前确认 layout
-->
<template>
	<div>
		<custom-header />
		<div class="h-full pt-20">
			<el-skeleton animated class="flex-bc h-full w-full p-6" v-if="initLoading">
				<template #template>
					<el-skeleton-item style="width: 33%; height: 100%" />
					<el-skeleton-item style="width: 66%; height: 100%" />
				</template>
			</el-skeleton>
			<slot v-else></slot>
		</div>
		<custom-footer v-if="isShowFooter" short-name="Libra" />
	</div>
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
		isShowFooter.value = newName !== 'Question'
	}
)

/**
 * 获取初始化数据
 */
const initLoading = ref(false)
</script>

<style scoped></style>
