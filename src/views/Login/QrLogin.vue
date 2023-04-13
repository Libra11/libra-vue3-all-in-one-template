<!--
 * @Author: Libra
 * @Date: 2023-04-10 14:34:41
 * @LastEditTime: 2023-04-11 11:25:38
 * @LastEditors: Libra
 * @Description: 手机登录 
-->
<template>
	<login-layout :welcome-info="QR_WELCOME"> 登录页 Qr </login-layout>
</template>

<script setup lang="ts">
import LoginLayout from './layout/LoginLayout.vue'
import { QR_WELCOME } from '@/common/config/login'
</script>

<style scoped></style>
