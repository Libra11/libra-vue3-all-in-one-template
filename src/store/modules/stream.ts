/*
 * @Author: Libra
 * @Date: 2023-04-17 19:00:16
 * @LastEditTime: 2023-04-17 19:05:56
 * @LastEditors: Libra
 * @Description:
 */
import { defineStore } from 'pinia'
import type { LocalStream } from 'trtc-js-sdk'

interface IStream {
	cameraStream: LocalStream
	screenStream: LocalStream
}

export const useStreamStore = defineStore('stream', {
	state: (): Partial<IStream> => ({}),
	actions: {
		setCameraStream(stream: LocalStream) {
			this.cameraStream = stream
		},
		setScreenStream(stream: LocalStream) {
			this.screenStream = stream
		},
	},
	getters: {
		getCameraStream: (state) => state.cameraStream,
		getScreenStream: (state) => state.screenStream,
	},
})
