<!--
 * @Author: Libra
 * @Date: 2023-04-10 14:15:23
 * @LastEditTime: 2023-04-13 14:39:19
 * @LastEditors: Libra
 * @Description: 登录页
-->
<template>
	<login-layout :welcome-info="NORMAL_WELCOME">
		<custom-dialog
			v-model:model-value="dialogPrivacyVisible"
			:use-default-footer="true"
			title="国考云隐私保护条例"
			:show-close="true"
			:draggable="true"
			width="40rem"
		>
			dddd
		</custom-dialog>
		<el-card class="animate__animated animate__fadeIn w-[24rem] px-5 py-6">
			<div class="mb-8 text-center text-xl font-bold text-primary-color">用户登录</div>
			<el-form :model="form" :rules="rules" ref="loginForm" class="font-bold">
				<el-form-item prop="username">
					<el-input size="large" v-model="form.username" placeholder="请输入用户名"></el-input>
				</el-form-item>
				<el-form-item prop="password">
					<el-input size="large" :show-password="true" v-model="form.password" placeholder="请输入密码"></el-input>
				</el-form-item>
				<el-form-item class="relative" prop="verify">
					<el-input size="large" v-model="form.verify" placeholder="请输入验证码"></el-input>
					<img
						class="absolute top-1/2 right-1 h-8 -translate-y-1/2 cursor-pointer border-l border-primary-color pl-1"
						@click="getVerifyCode"
						:src="verifyCode"
						alt=""
					/>
				</el-form-item>
				<el-form-item prop="privacy">
					<el-checkbox v-model="privacy" name="type" />
					<span class="ml-2 cursor-pointer font-normal hover:text-primary-color" @click="dialogPrivacyVisible = true">国考云隐私保护条例</span>
				</el-form-item>
				<el-form-item>
					<el-button class="!h-9 w-full text-2xl" type="primary" :loading="loginLoading" @click="onSubmit(loginForm)">{{
						loginLoading ? '登录中...' : '登录'
					}}</el-button>
				</el-form-item>
			</el-form>
		</el-card>
	</login-layout>
</template>

<script setup lang="ts">
import LoginLayout from './layout/LoginLayout.vue'
import { NORMAL_WELCOME } from '@/common/config/login'
import CustomDialog from '@/components/CustomDialog.vue'
import { onMounted, reactive, ref } from 'vue'
import { getVerifyCodeApi, loginApi } from '@/api/candidate'
import { ExamDevice } from '@/common/const'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'

onMounted(async () => {
	await getVerifyCode()
})

/**
 * 表单
 */
const form = reactive({
	username: '',
	password: '',
	verify: '',
	key: '',
})
const rules = reactive<FormRules>({
	username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
	password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
	verify: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
})

const loginForm = ref<FormInstance>()

/**
 * 隐私保护条例
 */
const dialogPrivacyVisible = ref(false)
const privacy = ref(false)

/**
 * 验证码
 */
const verifyCode = ref('')
async function getVerifyCode() {
	const res = await getVerifyCodeApi()
	if (res.code === 0) {
		const { imageCode, key } = res.data
		form.key = key
		verifyCode.value = imageCode
	}
}

/**
 * 提交 登录
 */

const loginLoading = ref(false)
async function login() {
	const isElectron = window.isElectron
	const res = await loginApi({
		device: isElectron ? ExamDevice.PC : ExamDevice.H5,
		imageCode: form.verify,
		key: form.key,
		loginName: form.username.trim(),
		loginPassword: form.password,
	})
	if (res.code === 0) {
		// 登录成功
	}
}

function onSubmit(formEl: FormInstance | undefined) {
	if (!formEl) return
	formEl.validate(async (valid: boolean) => {
		if (valid) {
			if (!privacy.value) {
				ElMessage.error('请先同意国考云隐私保护条例！')
				return
			}
			loginLoading.value = true
			await login()
			loginLoading.value = false
		} else {
			return false
		}
	})
}
</script>

<style scoped lang="scss">
:deep(.el-input) {
	height: 2.75rem;
}
:deep(.el-checkbox) {
	margin-right: 0;
}
</style>
