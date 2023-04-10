/*
 * @Author: Libra
 * @Date: 2023-03-24 09:41:51
 * @LastEditTime: 2023-04-10 14:09:12
 * @LastEditors: Libra
 * @Description: tailwindcss 配置文件
 */
/** @type {import('tailwindcss').Config} */
module.exports = {
	corePlugins: {
		// due to https://github.com/tailwindlabs/tailwindcss/issues/6602 - buttons disappear
		preflight: false,
	},
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,vue}'],
	theme: {
		extend: {
			backgroundImage: () => ({
				gradient: 'radial-gradient(transparent 1px,var(--el-bg-color) 1px)',
			}),
			backgroundColor: {
				'primary-color': 'var(--el-color-primary)',
			},
			backgroundSize: {
				1: '0.25rem 0.25rem',
			},
			backdropSaturate: {
				'1/2': '50%',
			},
			colors: {
				'primary-color': 'var(--el-color-primary)',
			},
		},
	},
	plugins: [],
}
