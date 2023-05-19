<!--
 * @Author: Libra
 * @Date: 2023-04-10 14:41:27
 * @LastEditTime: 2023-05-04 10:42:37
 * @LastEditors: Libra
 * @Description: 登录layout
-->
<template>
	<div>
		<custom-header :login-logo="state.companyLogo" />
		<el-row class="flex-c bg-img m-auto h-screen bg-cover pb-20">
			<el-col :span="12" class="flex-c">
				<div v-if="isLoaded && !isElectron" class="animate__animated animate__fadeIn">
					<p class="text-4xl font-bold">{{ title }}</p>
					<div v-if="!!startEnd" class="my-5 text-primary">{{ computedData.timeTitle }}：{{ startEnd }}</div>
					<p class="my-5 text-2xl text-primary">{{ welcomeInfo.subTitle }}{{ state.scenario }}!</p>
					<p class="text-sm leading-7 text-primary" v-for="item in computedData.finalTips" :key="item">{{ item }}</p>
					<p class="my-5 font-bold" v-if="time.secondToStart > 0">
						距离开考还有：<span v-if="startTime" class="animate__animated animate__fadeIn text-xl font-bold leading-5 text-primary-color"
							>{{ startTime }}
						</span>
					</p>
				</div>
				<div v-if="isLoaded && isElectron" class="animate__animated animate__fadeIn">
					<p class="mb-5 text-4xl font-bold">{{ electronInfo.title }}</p>
					<p class="text-sm leading-7 text-primary" v-for="item in electronInfo.tips" :key="item">{{ item }}</p>
				</div>
			</el-col>
			<el-col :span="12" class="flex-c">
				<slot />
			</el-col>
		</el-row>
		<custom-footer :shortName="state.companyShortName" />
	</div>
</template>

<script setup lang="ts">
import { getSimpleApi, getTimeByExamIdApi } from '@/api/exam'
import { ExamType } from '@/common/const'
import { computed, onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import CustomHeader from '@/components/CustomHeader.vue'
import CustomFooter from '@/components/CustomFooter.vue'
import { UserStore } from '@/store/modules/user'

const props = defineProps<{
	welcomeInfo: {
		title: string
		subTitle: string
		tips: string[]
	}
}>()

const userStore = UserStore()

onMounted(async () => {
	// 清空 token
	userStore.$reset()
	await getSimple()
	setDocumentTitle()
	await getTimeByExamId()
	isLoaded.value = true
})

onBeforeUnmount(() => {
	clearInterval(timer)
})

/**
 * electron 逻辑
 */
const isElectron = window.isElectron
const electronInfo = reactive({
	title: '国考云考试客户端',
	tips: [
		'请提前登录系统，调试电脑摄像头及手机监控位置；',
		'提前作答考前练习题，熟悉系统操作；',
		'严禁使用除监控设备外的手机、平板电脑等设备；',
		'严禁查看考试辅助书籍等材料；',
		'请注意考试纪律，诚信作答；',
		'如果网络故障中断考试，重新登录继续作答即可。',
	],
})

// 页面加载
const isLoaded = ref(false)

const state = reactive({
	companyShortName: '',
	userExamName: '',
	scenario: '',
	examUuid: '',
	category: 0,
	companyLogo: '',
})

const title = computed(() => {
	return state.companyShortName ? state.companyShortName + state.userExamName + state.scenario : props.welcomeInfo.title
})

const computedData = computed(() => {
	const finalTips = props.welcomeInfo.tips.map((item) => {
		return state.category === ExamType.INTERVIEW_TIME ? item.replace('考试', '面试') : item
	})
	const timeTitle = state.category === ExamType.INTERVIEW_TIME ? '面试时间' : '考试时间'

	return {
		finalTips,
		timeTitle,
	}
})

/**
 * 获取基本信息(公司简称、考试名称、考试场景(无token))
 */
async function getSimple() {
	const route = useRoute()
	const { shortId } = route.query
	if (!shortId || shortId === 'undefined') return
	userStore.setShortId(shortId as string)
	const res = await getSimpleApi({
		examShortId: shortId as string,
	})
	if (res.code === 0) {
		Object.assign(state, res.data)
	}
}
/**
 * 设置文档标题
 */
function setDocumentTitle() {
	document.title = state.companyShortName ? state.companyShortName + state.scenario + '系统-国考云' : '国考云在线考试'
}

/**
 * 获取考试开始剩余时间
 */
const time = reactive({
	examStartAt: '',
	examEndAt: '',
	secondToStart: 0,
})
let startTime = ref('')
let timer: ReturnType<typeof setInterval>
const startEnd = computed(() => {
	const start = time.examStartAt.substring(0, time.examStartAt.length - 3).replace(/-/g, '/')
	const end = time.examEndAt.substring(0, time.examEndAt.length - 3).replace(/-/g, '/')
	return start + '-' + end
})
async function getTimeByExamId() {
	const examId = state.examUuid
	if (!examId) return
	const res = await getTimeByExamIdApi(examId)
	if (res.code === 0) {
		Object.assign(time, res.data)
		getTime()
	}
}
function getTime() {
	timer = setInterval(() => {
		time.secondToStart = time.secondToStart - 1
		startTime.value = formatDuration(time.secondToStart)
		if (time.secondToStart <= 0) {
			clearInterval(timer)
		}
	}, 1000)
}
function formatDuration(seconds: number): string {
	const SECONDS_IN_MINUTE = 60
	const SECONDS_IN_HOUR = SECONDS_IN_MINUTE * 60
	const SECONDS_IN_DAY = SECONDS_IN_HOUR * 24

	if (seconds >= SECONDS_IN_DAY) {
		const days = Math.floor(seconds / SECONDS_IN_DAY)
		return `${days} 天`
	} else if (seconds >= SECONDS_IN_HOUR) {
		const hours = Math.floor(seconds / SECONDS_IN_HOUR)
		return `${hours} 小时`
	} else if (seconds >= SECONDS_IN_MINUTE) {
		const minutes = Math.floor(seconds / SECONDS_IN_MINUTE)
		return `${minutes} 分钟`
	}
	return `${seconds} 秒`
}
</script>

<style scoped></style>
