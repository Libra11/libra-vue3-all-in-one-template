<!--
 * @Author: Libra
 * @Date: 2023-03-07 14:15:32
 * @LastEditTime: 2023-04-06 17:04:39
 * @LastEditors: Libra
 * @Description: 
-->
<template>
	<div class="about">
		<h1>This is an about page</h1>
		<input class="input-text" type="text" />
		<el-button type="primary" @click="openCalculatorDialog">打开计算器</el-button>
		<custom-dialog
			v-model:model-value="dialogCalculatorVisible"
			title="计算器"
			:show-close="true"
			:draggable="true"
			@confirm="confirm"
			:show-footer="false"
			class="transition-width"
			:width="modelValue ? '20rem' : '32rem'"
		>
			<custom-calculator @update-model-value="getModelValue" />
		</custom-dialog>
	</div>
</template>

<script setup lang="ts">
import CustomDialog from '@/components/CustomDialog.vue'
import CustomCalculator from '@/components/CustomCalculator.vue'
import { ref } from 'vue'

const dialogCalculatorVisible = ref(false)

const openCalculatorDialog = () => {
	dialogCalculatorVisible.value = true
}

const confirm = () => {
	// console.log('confirm')
}

let modelValue = ref(true)
const getModelValue = (value: boolean) => {
	modelValue.value = value
}
</script>

<style></style>
