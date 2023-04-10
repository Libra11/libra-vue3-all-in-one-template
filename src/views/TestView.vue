<!--
 * @Author: Libra
 * @Date: 2023-03-07 14:15:32
 * @LastEditTime: 2023-04-10 14:18:38
 * @LastEditors: Libra
 * @Description: 
-->
<template>
	<div class="about">
		<el-button type="primary" @click="openCalculatorDialog">打开计算器</el-button>
		<el-button type="primary" @click="openCustomerDialog">打开客服</el-button>
		<custom-dialog
			v-model:model-value="dialogCalculatorVisible"
			title="计算器"
			:show-close="true"
			:draggable="true"
			:show-modal="false"
			:show-footer="false"
			class="transition-width !fixed left-5 bottom-0"
			:width="modelValue ? '20rem' : '32rem'"
		>
			<custom-calculator @update-model-value="getModelValue" />
		</custom-dialog>
		<custom-dialog
			v-model:model-value="dialogCustomerVisible"
			title="客服答疑"
			:show-close="true"
			:draggable="true"
			:show-modal="false"
			:show-footer="false"
			class="!fixed left-5 bottom-0"
			width="20rem"
		>
			<customer-service />
		</custom-dialog>
	</div>
</template>

<script setup lang="ts">
import CustomDialog from '@/components/CustomDialog.vue'
import CustomCalculator from '@/components/CustomCalculator.vue'
import CustomerService from '@/components/CustomerService.vue'
import { ref } from 'vue'

// 计算器
const dialogCalculatorVisible = ref(false)
const openCalculatorDialog = () => {
	dialogCalculatorVisible.value = true
}
let modelValue = ref(true)
const getModelValue = (value: boolean) => {
	modelValue.value = value
}

// 客服答疑
const dialogCustomerVisible = ref(false)
const openCustomerDialog = () => {
	dialogCustomerVisible.value = true
}
</script>

<style></style>
