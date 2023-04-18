/*
 * @Author: Libra
 * @Date: 2023-04-13 13:42:42
 * @LastEditTime: 2023-04-17 18:01:20
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

interface ILoginRequest {
	device: number
	imageCode: string
	key: string
	loginName: string
	loginPassword: string
}

interface ILoginResponse {
	token: string
}

function loginApi(data: ILoginRequest): Promise<ResponseData<ILoginResponse>> {
	return fetch(`/candidate/login`, {
		method: 'POST',
		body: JSON.stringify(data),
	})
}
/**
 * 获取考生信息
 */
export interface ICandidateInfo {
	candidateUuid: string
	jobUuid: string
	examUuid: string
	jobName: string
	type: number
	idCardNum: string
	idCardType: number
	mobile: string
	email: string
	university: string
	major: string
	degree: string
	realName: string
	avatar: string
	mobilePublishUrl: string | null
	startedAt: string | null
	finishedAt: string | null
	countdownBegin: number
	extraInfo: any[]
	faceRecognizeStatus: number
	faceDifferenceStatus: number
}

function candidateInfoApi(): Promise<ResponseData<ICandidateInfo>> {
	return fetch(`/candidate/info`)
}

export { getVerifyCodeApi, loginApi, candidateInfoApi }
