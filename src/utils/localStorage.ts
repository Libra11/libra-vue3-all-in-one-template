/*
 * @Author: Libra
 * @Date: 2023-04-19 13:52:56
 * @LastEditTime: 2023-04-19 13:52:56
 * @LastEditors: Libra
 * @Description: 封装localStorage
 */
export default class LocalStorageUtil {
	static setItem(key: string, value: any): void {
		if (typeof value === 'object') {
			value = JSON.stringify(value)
		}
		localStorage.setItem(key, value)
	}

	static getItem<T = any>(key: string): T | null {
		const value = localStorage.getItem(key)
		if (value === null) {
			return null
		}

		try {
			return JSON.parse(value) as T
		} catch (error) {
			return value as unknown as T
		}
	}

	static removeItem(key: string): void {
		localStorage.removeItem(key)
	}

	static clear(): void {
		localStorage.clear()
	}
}
