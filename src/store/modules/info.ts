/*
 * @Author: Libra
 * @Date: 2023-04-17 15:02:41
 * @LastEditTime: 2023-04-17 15:26:53
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
}
export const useInfoStore = defineStore('info', {
	state: (): IInfo => ({
		candidateInfo: {},
		jobInfo: {},
		examInfo: {},
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
	},
	getters: {
		getCandidateInfo: (state) => state.candidateInfo,
		getJobInfo: (state) => state.jobInfo,
		getExamInfo: (state) => state.examInfo,
	},
	persist: {
		enabled: true,
	},
})
