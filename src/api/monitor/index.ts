/*
 * @Author: Libra
 * @Date: 2023-04-17 18:15:12
 * @LastEditTime: 2023-04-17 18:44:10
 * @LastEditors: Libra
 * @Description: 监控相关接口
 */
import fetch, { type ResponseData } from '@/request'

export interface ISig {
	appId: number
	sig: string
	roomNumber: number
	userId: string
}
/**
 * 获取摄像头签名
 */
function getCameraSigApi(): Promise<ResponseData<ISig>> {
	return fetch('/trtc/camera/sig')
}
/**
 * 获取屏幕分享签名
 */
function getScreenSigApi(): Promise<ResponseData<ISig>> {
	return fetch('/trtc/screen/sig')
}
export { getCameraSigApi, getScreenSigApi }
