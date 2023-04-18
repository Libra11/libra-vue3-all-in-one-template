<!--
 * @Author: Libra
 * @Date: 2023-04-17 17:50:43
 * @LastEditTime: 2023-04-18 09:51:21
 * @LastEditors: Libra
 * @Description: detect layout
-->
<template>
	<div>
		detect layout
		<slot />
	</div>
</template>

<script setup lang="ts">
import { getCameraSigApi, getScreenSigApi, type ISig } from '@/api/monitor'
import { onMounted, reactive, ref, type Ref } from 'vue'
import TRTC, { type ClientConfig, type LocalStream } from 'trtc-js-sdk'
import type { Client } from 'trtc-js-sdk'
import { CameraMonitorParam, ScreenMonitorParam } from '@/common/const'
import { useStreamStore } from '@/store/modules/stream'

onMounted(async () => {
	streamStore.cameraStream || (await cameraRecord())
	streamStore.screenStream || (await screenRecord())
})

const streamStore = useStreamStore()

/**
 * 摄像头监控和录制
 */
let cameraOptions: Partial<ISig> = reactive({})
let cameraClient: Client
let cameraLocalStream: Ref<LocalStream | null> = ref(null)
async function cameraRecord() {
	await getCameraSig()
	await initCameraClient()
	await joinCameraChannel()
}
async function getCameraSig() {
	const res = await getCameraSigApi()
	if (res.code === 0) {
		cameraOptions = res.data
	}
}
async function initCameraClient() {
	const { sig, userId, appId } = cameraOptions
	if (!sig || !userId || !appId) return
	const option: ClientConfig = {
		mode: 'rtc',
		sdkAppId: appId,
		userId,
		userSig: sig,
		autoSubscribe: false,
	}
	cameraClient = TRTC.createClient(option)
}
async function joinCameraChannel() {
	const { roomNumber, userId } = cameraOptions
	if (!roomNumber) return
	await cameraClient.join({ roomId: roomNumber })
	const micList = await TRTC.getMicrophones()
	cameraLocalStream.value = await TRTC.createStream({
		userId: userId,
		audio: micList.length !== 0,
		video: true,
		facingMode: 'user',
	})
	streamStore.setCameraStream(cameraLocalStream.value)
	const { width, height, frameRate, bitrate } = CameraMonitorParam
	cameraLocalStream.value.setVideoProfile({
		width,
		height,
		frameRate,
		bitrate,
	})
	await cameraClient.enableSmallStream()
	await cameraLocalStream.value.initialize()
	await cameraClient.publish(cameraLocalStream.value)
}

/**
 * 屏幕监控和录制
 */
let screenOptions: Partial<ISig> = reactive({})
let screenClient: Client
let screenLocalStream: Ref<LocalStream | null> = ref(null)
async function screenRecord() {
	await getScreenSig()
	await initScreenClient()
	await joinScreenChannel()
}

async function getScreenSig() {
	const res = await getScreenSigApi()
	if (res.code === 0) {
		screenOptions = res.data
	}
}

async function initScreenClient() {
	const { sig, userId, appId } = screenOptions
	if (!sig || !userId || !appId) return
	const option: ClientConfig = {
		mode: 'rtc',
		sdkAppId: appId,
		userId,
		userSig: sig,
		autoSubscribe: false,
	}
	screenClient = TRTC.createClient(option)
}

async function joinScreenChannel() {
	const { roomNumber } = screenOptions
	if (!roomNumber) return
	await screenClient.join({ roomId: roomNumber })
	screenLocalStream.value = await TRTC.createStream({
		userId: screenOptions.userId,
		audio: false,
		screen: true,
	})
	const { width, height, frameRate, bitrate } = ScreenMonitorParam
	screenLocalStream.value.setVideoProfile({
		width,
		height,
		frameRate,
		bitrate,
	})
	streamStore.setScreenStream(screenLocalStream.value)
	await screenClient.enableSmallStream()
	await screenLocalStream.value.initialize()
	await screenClient.publish(screenLocalStream.value)
}
</script>

<style scoped></style>
