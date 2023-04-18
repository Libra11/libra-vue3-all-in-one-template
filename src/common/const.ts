/*
 * @Author: Libra
 * @Date: 2023-04-10 18:17:49
 * @LastEditTime: 2023-04-13 14:17:55
 * @LastEditors: Libra
 * @Description: 常量
 */
/**
 * 考试类型
 */
export enum ExamType {
	CONSTANT_TIME = 1, // 集中考试
	FREE_TIME = 2, // 随来随考
	INTERVIEW_TIME = 3, // 人机面试
}

/**
 * 考试设备
 */
export enum ExamDevice {
	H5 = 1, // H5
	PC = 2, // PC
}

/**
 * 摄像头监控参数
 */
export const CameraMonitorParam = {
	width: 640,
	height: 480,
	frameRate: 30,
	bitrate: 300,
}

/**
 * 屏幕监控参数
 */
export const ScreenMonitorParam = {
	width: 1920,
	height: 1080,
	frameRate: 30,
	bitrate: 1000,
}
