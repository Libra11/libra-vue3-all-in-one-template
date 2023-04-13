/*
 * @Author: Libra
 * @Date: 2023-04-13 13:42:42
 * @LastEditTime: 2023-04-13 14:11:55
 * @LastEditors: Libra
 * @Description: 考试 api
 */
import fetch, { type ResponseData } from '@/request'

interface IVerifyCode {
	imageCode: string
	key: string
}

function getVerifyCodeApi(): Promise<ResponseData<IVerifyCode>> {
	return fetch(`/candidate/validate_code`)
}

interface ILogin {
	device: number
	imageCode: string
	key: string
	loginName: string
	loginPassword: string
}

function loginApi(data: ILogin): Promise<ResponseData<string>> {
	return fetch(`/candidate/login`, {
		method: 'POST',
		body: JSON.stringify(data),
	})
}

export { getVerifyCodeApi, loginApi }
