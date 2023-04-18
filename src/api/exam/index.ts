/*
 * @Author: Libra
 * @Date: 2023-04-10 15:11:56
 * @LastEditTime: 2023-04-17 18:15:27
 * @LastEditors: Libra
 * @Description: exam 相关接口
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
function getSimpleApi(data: IShortId): Promise<ResponseData<Exam>> {
	return fetch(`/exam/info/simple`, {
		method: 'POST',
		body: JSON.stringify(data),
	})
}

function getTimeByExamIdApi(examId: string) {
	return fetch(`/exam/time/${examId}`)
}

/**
 * 获取考试信息
 */
export interface IExamInfo {
	examUuid: string
	name: string
	shortName: string
	startAt: string
	endAt: string
	examDuration: number
	allowLateSecond: number
	isFaceRecognizeNeed: boolean
	isEnableFaceDiff: boolean | null
	isEnableCalculator: boolean
	isEnableSecretary: boolean
	checkScore: number
	isAllowInfoModify: boolean
	examType: number
	fromType: number
	category: number
	isDeviceCheck: boolean
	endNote: string
	partNote: string
	confirmNote: string
	practiceNote: string
	status: number
	repeatAnswerTimes: number
	cameraMonitorType: number
	allowLanguage: number
	cameraVideoType: number
	mobileMonitorType: number
	screenShotMonitorType: number
	device: number
	cheatKickCount: number | null
	userExamName: string
	scenario: string
	candidateInfo: CandidateInfo
	extraCandidateInfo: any[]
	maximizeScreen: number
	mobileVideoType: number
	isEnableViewReport: number
	isCheckScore: boolean
	screenShotVideoType: number
	qualificationsNote: string
	isWatermark: boolean
	leaveCountLimit: number
	groupConfirmTip: string | null
	isEvaluation: boolean
	allowSubmitSecond: number
	aiCameraVideoType: number
	aiScreenShotVideoType: number
	nextExamUuid: string | null
	coverInfo: CoverInfo
	isPreheat: boolean
}

export interface CandidateInfo {
	isRealNameRequired: boolean
	isRealNameEditable: boolean
	isMobileRequired: boolean
	isMobileEditable: boolean
	isEmailRequired: boolean
	isEmailEditable: boolean
	isUniversityRequired: boolean
	isUniversityEditable: boolean
	isDegreeRequired: boolean
	isDegreeEditable: boolean
	isMajorRequired: boolean
	isMajorEditable: boolean
	isIdCardNumRequired: boolean
	isIdCardNumEditable: boolean
}

export interface CoverInfo {
	name: string
	shortName: string
	sn: string
	logo: string
}
function examInfoApi(): Promise<ResponseData<IExamInfo>> {
	return fetch(`/exam/info`)
}

/**
 * 获取职位信息
 */
export interface IJobInfo {
	jobUuid: string
	examUuid: string
	name: string
	shortName: string
	description: string
	partOpenType: number
	partStartTimeType: number
	isPractice: boolean
	timeRule: number
	jobDuration: number
	jobScore: number
	passScore: number
	isShowCandidateScore: boolean
	codePartCount: number
	tip: string
	isGroup: boolean
	groupConfirmTip: string
}
function jobInfoApi(): Promise<ResponseData<IJobInfo>> {
	return fetch(`/exam/job/info`)
}

export { getSimpleApi, getTimeByExamIdApi, examInfoApi, jobInfoApi }
