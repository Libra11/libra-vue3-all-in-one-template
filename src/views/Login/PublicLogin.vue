<!--
 * @Author: Libra
 * @Date: 2023-04-10 14:35:14
 * @LastEditTime: 2023-04-10 14:51:32
 * @LastEditors: Libra
 * @Description: 公开作答
-->
<template>
	<login-layout :welcome-info="PUBLIC_WELCOME"> 登录页public </login-layout>
</template>

<script setup lang="ts">
import LoginLayout from './layout/LoginLayout.vue'
import { PUBLIC_WELCOME } from '@/common/config/login'
</script>

<style scoped></style>
