/*
 * @Author: Libra
 * @Date: 2023-04-10 15:11:56
 * @LastEditTime: 2023-04-10 18:03:20
 * @LastEditors: Libra
 * @Description:
 */
import fetch, { type ResponseData } from '@/request'

interface IShortId {
	examShortId: string
}
type Exam = {
	category: number
	companyLogo: string | null
	companyName: string | null
	companyShortName: string
	endAt: string
	examDuration: number
	examUuid: string
	isDeviceCheck: boolean | null
	name: string | null
	scenario: string
	shortName: string
	startAt: string | null
	userExamName: string
}
// 获取shortname和logo
function getSimple(data: IShortId): Promise<ResponseData<Exam>> {
	return fetch(`/exam/info/simple`, {
		method: 'POST',
		body: JSON.stringify(data),
	})
}

function getTimeByExamId(examId: string) {
	return fetch(`/exam/time/${examId}`)
}

export { getSimple, getTimeByExamId }
