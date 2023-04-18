/*
 * @Author: Libra
 * @Date: 2023-04-07 15:03:21
 * @LastEditTime: 2023-04-18 15:18:10
 * @LastEditors: Libra
 * @Description: 工具函数
 */

/**
 *
 * @param str 字符串
 * @returns 换行符替换为 <br/>
 */
function breakLineToBr(str: string) {
	return str.replace(/\n/g, '<br/>')
}

/**
 * @param value
 * @returns 是否为 undefined
 */
function isUndefined(value: any) {
	return typeof value === 'undefined'
}

/**
 *
 * @param seconds 秒数
 * @returns 格式化后的时间
 */
function formatSeconds(seconds: number): string {
	const dayInSeconds = 24 * 60 * 60

	if (seconds >= dayInSeconds) {
		const days = Math.floor(seconds / dayInSeconds)
		return `${days} day${days > 1 ? 's' : ''}`
	}
	const hours = Math.floor(seconds / 3600)
	const minutes = Math.floor((seconds % 3600) / 60)
	const second = Math.floor(seconds % 60)

	const pad = (num: number): string => (num < 10 ? '0' : '') + num

	return `${pad(hours)}:${pad(minutes)}:${pad(second)}`
}

export { breakLineToBr, isUndefined, formatSeconds }
