<!--
 * @Author: Libra
 * @Date: 2023-05-19 10:32:05
 * @LastEditTime: 2023-05-19 15:23:19
 * @LastEditors: Libra
 * @Description: 客户端欢迎页面
-->
<template>
	<div class="flex h-screen w-screen flex-col items-center py-20">
		<custom-dialog v-model="showUpdateAvailable" title="检测到新版本" :show-footer="false" :show-close="false">
			<div class="flex flex-col items-center justify-center">
				<div class="flex-c p-4">
					<el-icon :size="60" color="var(--el-color-primary)"><BellFilled /></el-icon>
					<div class="ml-4">
						<div class="mb-2 text-lg font-bold">检测到新版本</div>
						<span class="detail">检测到您的客户端当前不是最新版本<br />请点击下方开始下载按钮进行更新</span>
					</div>
				</div>
				<el-button class="mt-4 w-24" type="primary" @click="download">开始下载</el-button>
			</div>
		</custom-dialog>
		<custom-dialog v-model="showDownloadProgress" title="下载最新版" :show-footer="false" :show-close="false">
			<div class="flex w-full flex-col items-center justify-center">
				<span class="download-text mb-2 w-full">下载进度：</span>
				<el-progress class="w-full" :text-inside="true" :stroke-width="24" :percentage="percent" striped striped-flow :duration="10" />
				<el-button :disabled="!showUpdateBtn" class="mt-4 w-24" type="primary" @click="install">安装并打开</el-button>
			</div>
		</custom-dialog>
		<img class="w-52" src="@/assets/images/default_logo.png" alt="" />
		<div class="mt-10 text-[3rem] text-main">国考云考试客户端</div>
		<div class="my-10 text-center text-secondary">
			为保障您的考试顺利进行 <br />
			我们将进行相关设备软件检测
		</div>
		<el-button type="primary" size="large" class="w-52" @click="detect" :disabled="!candetect">开始检测</el-button>
		<div class="mt-20 mb-10 h-[1px] w-80 bg-[var(--color-text-lighter)]"></div>
		<div class="flex-c">
			<img class="mr-4 w-24" src="@/assets/images/default_logo.png" alt="" />
			<span class="text-secondary">发现每个人的价值</span>
		</div>
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import CustomDialog from '@/components/CustomDialog.vue'
import { BellFilled } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
const { ipcRenderer } = require('electron')

const router = useRouter()
onMounted(() => {
	const isDev = process.env.NODE_ENV === 'development'
	if (isDev) {
		candetect.value = true
		return
	}
	handleUpdate()
	setTimeout(() => {
		check()
	}, 1000)
})

const showUpdateAvailable = ref(false)
let candetect = ref(false)
let showDownloadProgress = ref(false)
let percent = ref(0)
let showUpdateBtn = ref(false)
function handleUpdate() {
	ipcRenderer.on('updateAvailable', () => {
		showUpdateAvailable.value = true
		candetect.value = true
	})
	ipcRenderer.on('updateNotAvailable', () => {
		candetect.value = true
	})
	ipcRenderer.on('downloadProgress', (event: Event, data: any) => {
		showDownloadProgress.value = true
		showUpdateAvailable.value = false
		percent.value = data.percent.toFixed(2)
	})
	ipcRenderer.on('updateDownloaded', () => {
		showUpdateBtn.value = true
	})
	ipcRenderer.on('printUpdaterMessage', (event: Event, data: string) => {
		console.log(event, data)
	})
	ipcRenderer.on('updateError', (event: Event, data: any) => {
		console.log('updateError', event, data)
	})
}
function download() {
	ipcRenderer.send('comfirmUpdate')
}
function check() {
	ipcRenderer.send('checkForUpdates')
}
function install() {
	ipcRenderer.send('updateNow')
}
function detect() {
	// TODO
	router.push('/detect')
}
</script>

<style scoped lang="scss">
:deep(.el-progress-bar__outer) {
	border-radius: 0.25rem;
	.el-progress-bar__inner {
		border-radius: 0.25rem;
	}
}
</style>
