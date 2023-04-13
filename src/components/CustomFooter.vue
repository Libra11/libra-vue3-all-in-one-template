<!--
 * @Author: Libra
 * @Date: 2023-04-10 14:01:32
 * @LastEditTime: 2023-04-12 17:15:46
 * @LastEditors: Libra
 * @Description: 自定义页脚
-->
<template>
	<div class="fixed bottom-4 w-full text-center text-sm text-primary">
		主办方：{{ shortName }}
		<span class="line">|</span>
		本网站由<a class="font-bold text-primary-color" href="https://www.iguokao.com" target="view_window">国考云</a>考试系统提供技术支持
	</div>
</template>

<script setup lang="ts">
defineProps<{
	shortName: string
}>()
</script>

<style scoped></style>
