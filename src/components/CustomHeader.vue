<!--
 * @Author: Libra
 * @Date: 2023-03-31 11:27:46
 * @LastEditTime: 2023-05-04 10:34:46
 * @LastEditors: Libra
 * @Description:  自定义头部组件
-->
<template>
	<el-row class="flex-bc !fixed z-10 h-20 w-screen bg-gradient bg-1 px-4 shadow-md backdrop-blur-sm backdrop-saturate-1/2">
		<el-col :span="12">
			<img v-if="logo" class="animate__animated animate__fadeIn h-16" :src="`${file_host}${logo}`" alt="" />
			<img v-else-if="logo === null" class="h-16" src="@/assets/images/default_logo.png" alt="" />
		</el-col>
		<el-col class="flex-bc" :span="12" v-if="hasRight">
			<span></span>
			<div class="flex-bc" v-show="time">
				<div v-show="time" class="animate__animated animate__fadeIn flex-dc w-20">
					<div class="text-sm text-primary">
						<span v-if="isStart">距考试结束</span>
						<span v-else>开考倒计时</span>
					</div>
					<span class="font-['digital'] text-2xl text-primary-color">{{ time }}</span>
				</div>
				<div class="animate__animated animate__fadeIn flex-bc">
					<div class="mx-4">
						<el-avatar v-if="avatar" size="large" :src="`${file_host}${avatar}`" />
						<el-avatar v-else size="large" :icon="UserFilled" />
					</div>
					<div class="flex h-10 flex-col items-end justify-between">
						<span class="text-sm">{{ realName }}</span>
						<div class="cursor-pointer text-success-color">
							<i class="iconfont icontuichu mr-1 align-bottom"></i>
							<span class="text-xs">退出</span>
						</div>
					</div>
				</div>
			</div>
			<!-- 切换白天黑夜模式 -->
			<!-- <el-card v-if="true" class="h-10 w-20 cursor-pointer !rounded-full border" @click="toggleDark()">
				<el-icon :class="!isDark && 'bg-primary-color !text-white'" class="icon"><Sunny /></el-icon>
				<el-icon :class="isDark && 'bg-primary-color !text-white'" class="icon"><Moon /></el-icon>
			</el-card> -->
		</el-col>
	</el-row>
</template>

<script setup lang="ts">
// import { toggleDark, isDark } from '@/composables/useDark'
// import { Sunny, Moon } from '@element-plus/icons-vue'
import { file_host } from '@/api/config'
import { useInfoStore } from '@/store/modules/info'
import { UserFilled } from '@element-plus/icons-vue'
import { onMounted, ref, type Ref } from 'vue'

const props = defineProps({
	isStart: {
		type: Boolean,
		default: false,
	},
	time: {
		type: String,
		default: '',
	},
	hasRight: {
		type: Boolean,
		default: false,
	},
	loginLogo: {
		type: String,
		default: '',
	},
})

let logo: string | null = null
let realName: Ref<string | undefined> = ref('')
let avatar: Ref<string | undefined> = ref(undefined)
onMounted(() => {
	const infoStore = useInfoStore()
	const candidateInfo = infoStore.getCandidateInfo
	const examInfo = infoStore.getExamInfo

	realName.value = candidateInfo.realName
	avatar.value = candidateInfo.avatar
	let logo = examInfo.coverInfo?.logo
	if (!logo) logo = props.loginLogo
})
</script>

<style scoped lang="scss">
:deep(.el-card__body) {
	padding: 0.2rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.icon {
	@apply h-8 w-8 rounded-full;
}
</style>
