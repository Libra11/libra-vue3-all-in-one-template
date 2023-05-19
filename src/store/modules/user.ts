/*
 * @Author: Libra
 * @Date: 2023-03-22 18:52:51
 * @LastEditTime: 2023-05-04 10:37:47
 * @LastEditors: Libra
 * @Description: user store
 */
import { defineStore } from 'pinia'

interface IUserStore {
	token: string
	shortId: string
}
export const UserStore = defineStore('user', {
	state: (): IUserStore => ({
		token: '',
		shortId: '',
	}),
	actions: {
		setToken(token: string) {
			this.token = token
		},
		setShortId(shortId: string) {
			this.shortId = shortId
		},
	},
	getters: {
		getToken: (state) => state.token,
		getShortId: (state) => state.shortId,
	},
	persist: {
		enabled: true,
	},
})
