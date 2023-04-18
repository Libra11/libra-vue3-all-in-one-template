/*
 * @Author: Libra
 * @Date: 2023-04-17 15:02:41
 * @LastEditTime: 2023-04-18 16:55:36
 * @LastEditors: Libra
 * @Description: candidate job exam info
 */
import type { ICandidateInfo } from '@/api/candidate'
import type { IExamInfo, IJobInfo } from '@/api/exam'
import { defineStore } from 'pinia'

interface IInfo {
	candidateInfo: Partial<ICandidateInfo>
	jobInfo: Partial<IJobInfo>
	examInfo: Partial<IExamInfo>
	isPractice: boolean
}
export const useInfoStore = defineStore('info', {
	state: (): IInfo => ({
		candidateInfo: {},
		jobInfo: {},
		examInfo: {},
		isPractice: true,
	}),
	actions: {
		setCandidateInfo(candidateInfo: object) {
			this.candidateInfo = candidateInfo
		},
		setJobInfo(jobInfo: object) {
			this.jobInfo = jobInfo
		},
		setExamInfo(examInfo: object) {
			this.examInfo = examInfo
		},
		setIsPractice(isPractice: boolean) {
			this.isPractice = isPractice
		},
	},
	getters: {
		getCandidateInfo: (state) => state.candidateInfo,
		getJobInfo: (state) => state.jobInfo,
		getExamInfo: (state) => state.examInfo,
		getIsPractice: (state) => state.isPractice,
	},
	persist: {
		enabled: true,
	},
})
