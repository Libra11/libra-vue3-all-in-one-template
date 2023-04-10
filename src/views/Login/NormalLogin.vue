<!--
 * @Author: Libra
 * @Date: 2023-04-10 14:15:23
 * @LastEditTime: 2023-04-10 15:06:59
 * @LastEditors: Libra
 * @Description: 登录页
-->
<template>
	<login-layout :welcome-info="NORMAL_WELCOME"> 登录页 </login-layout>
</template>

<script setup lang="ts">
import LoginLayout from './layout/LoginLayout.vue'
import { NORMAL_WELCOME } from '@/common/config/login'
</script>

<style scoped></style>
