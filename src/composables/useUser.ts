/*
 * @Author: Libra
 * @Date: 2023-03-22 18:26:39
 * @LastEditTime: 2023-05-04 10:39:05
 * @LastEditors: Libra
 * @Description: useToken
 */
// src/composables/useToken.ts
import { UserStore } from '@/store/modules/user'
import { computed } from 'vue'
import type { Ref } from 'vue'

export function useToken(): Ref<string> {
	const userStore = UserStore()
	const token = computed(() => userStore.token)
	return token
}
export function useShortId(): Ref<string> {
	const userStore = UserStore()
	const shortId = computed(() => userStore.shortId)
	return shortId
}
