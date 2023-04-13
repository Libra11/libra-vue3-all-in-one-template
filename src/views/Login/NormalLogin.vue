<!--
 * @Author: Libra
 * @Date: 2023-04-10 14:15:23
 * @LastEditTime: 2023-04-12 19:08:18
 * @LastEditors: Libra
 * @Description: 登录页
-->
<template>
	<login-layout :welcome-info="NORMAL_WELCOME">
		<el-card class="animate__animated animate__fadeIn w-[24rem] px-5 py-6">
			<div>登录</div>
			<el-form :model="form" :rules="rules" ref="form">
				<el-form-item prop="username">
					<el-input size="large" v-model="form.username" placeholder="请输入用户名"></el-input>
				</el-form-item>
				<el-form-item prop="password">
					<el-input size="large" v-model="form.password" placeholder="请输入密码"></el-input>
				</el-form-item>
				<el-form-item prop="verify">
					<el-input size="large" v-model="form.verify" placeholder="请输入验证码"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button class="mt-4 w-full" size="large" type="primary" @click="onSubmit">登录</el-button>
				</el-form-item>
			</el-form>
		</el-card>
	</login-layout>
</template>

<script setup lang="ts">
import LoginLayout from './layout/LoginLayout.vue'
import { NORMAL_WELCOME } from '@/common/config/login'
import { reactive } from 'vue'

const form = reactive({
	username: '',
	password: '',
	verify: '',
})

const rules = reactive({
	username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
	password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
	verify: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
})

function onSubmit() {
	// @ts-ignore
	refs.form.validate((valid: boolean) => {
		if (valid) {
			// console.log('submit!')
		} else {
			// console.log('error submit!!')
			return false
		}
	})
}
</script>

<style scoped lang="scss">
:deep(.el-form-item) {
	margin-bottom: 1.3rem;
}
</style>
