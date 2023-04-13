/*
 * @Author: Libra
 * @Date: 2023-03-06 10:21:05
 * @LastEditTime: 2023-04-12 18:09:37
 * @LastEditors: Libra
 * @Description: 路由
 */
import whiteList from '@/utils/whiteList'
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { useToken } from '@/composables/useToken'

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		redirect: '/login',
	},
	{
		path: '/login',
		name: 'Login',
		component: () => import('../views/Login/LoginRouter.vue'),
		children: [
			{
				path: '',
				name: 'Login',
				component: () => import('../views/Login/NormalLogin.vue'),
			},
			{
				path: 'public',
				name: 'PublicLogin',
				component: () => import('../views/Login/PublicLogin.vue'),
			},
			{
				path: 'qr',
				name: 'QrLogin',
				component: () => import('../views/Login/QrLogin.vue'),
			},
		],
	},
	{
		path: '/confirm',
		name: 'Confirm',
		component: () => import('../views/Confirm/ConfirmRouter.vue'),
		children: [
			{
				path: 'detect',
				name: 'Detect',
				component: () => import('../views/Confirm/ConfirmDetect.vue'),
			},
			{
				path: 'basic',
				name: 'Basic',
				component: () => import('../views/Confirm/ConfirmBasic.vue'),
			},
		],
	},
	{
		path: '/test',
		name: 'Test',
		component: () => import('../views/TestView.vue'),
	},
]

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
})

router.beforeEach((to, from, next) => {
	// 检查 token 是否存在
	const token = useToken().value
	// 检查路由名称是否在白名单中
	if (whiteList.includes(to.name as string)) {
		next()
	} else if (token) {
		// 如果 token 存在且不在白名单中，继续访问
		next()
	} else {
		// 如果 token 不存在且不在白名单中，重定向到首页
		next(`/login?redirect=${to.path}`)
	}
})

export default router
