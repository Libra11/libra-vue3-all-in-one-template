<!--
 * @Author: Libra
 * @Date: 2023-03-31 11:27:46
 * @LastEditTime: 2023-04-10 11:46:54
 * @LastEditors: Libra
 * @Description:  自定义头部组件
-->
<template>
	<el-row class="flex-bc !fixed h-20 w-screen bg-gradient bg-1 px-4 shadow-md backdrop-blur-sm backdrop-saturate-1/2">
		<el-col :span="12">
			<img class="h-16" src="@/assets/images/default_logo.png" alt="" />
		</el-col>
		<el-col class="flex-bc" :span="12">
			<span></span>
			<!-- 切换白天黑夜模式 -->
			<el-card v-if="true" class="h-10 w-20 cursor-pointer rounded-full border" @click="toggleDark()">
				<el-icon :class="!isDark && 'bg-primary-color text-white'" class="icon"><Sunny /></el-icon>
				<el-icon :class="isDark && 'bg-primary-color text-white'" class="icon"><Moon /></el-icon>
			</el-card>
		</el-col>
	</el-row>
</template>

<script setup lang="ts">
import { toggleDark, isDark } from '@/composables/useDark'
import { Sunny, Moon } from '@element-plus/icons-vue'
</script>

<style scoped lang="scss">
:deep(.el-card__body) {
	padding: 0.2rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.icon {
	@apply h-8 w-8 rounded-full;
}
</style>
