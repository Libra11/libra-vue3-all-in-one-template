/*
 * @Author: Libra
 * @Date: 2023-04-18 14:48:51
 * @LastEditTime: 2023-04-18 14:51:05
 * @LastEditors: Libra
 * @Description:
 */
let timer: ReturnType<typeof setInterval> | null = null

function startTimer(): void {
	timer = setInterval(() => {
		postMessage('tick')
	}, 1000)
}

function stopTimer(): void {
	if (timer !== null) {
		clearInterval(timer)
		timer = null
	}
}

self.onmessage = (e: MessageEvent) => {
	if (e.data === 'start') {
		startTimer()
	} else if (e.data === 'stop') {
		stopTimer()
	}
}

export {}
