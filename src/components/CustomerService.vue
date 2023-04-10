<!--
 * @Author: Libra
 * @Date: 2023-04-06 17:54:20
 * @LastEditTime: 2023-04-10 14:48:30
 * @LastEditors: Libra
 * @Description: 客服答疑 
-->
<template>
	<div class="flex h-[35rem] flex-col">
		<div ref="messageList" class="mb-4 flex-grow space-y-4 overflow-y-auto p-4">
			<template v-for="message in messages" :key="message.id">
				<div :class="['animate__animated animate__fadeIn', message.isMine ? 'text-right' : 'text-left']">
					<div
						class="mb-2 inline-block max-w-[75%] rounded-lg py-2 px-4"
						:class="[
							message.isMine ? 'rounded-br-none bg-primary-color text-left text-white' : `rounded-bl-none ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`,
						]"
						v-html="breakLineToBr(message.text)"
					></div>
				</div>
			</template>
		</div>
		<div class="flex-c flex-shrink-0">
			<el-input
				type="textarea"
				:autosize="{ minRows: 1, maxRows: 2 }"
				resize="none"
				@keyup.enter.prevent="handleEnter"
				placeholder="请输入内容"
				class="flex-1"
				v-model="msg"
			></el-input>
			<el-button type="primary" :icon="Promotion" circle class="z-0 -ml-9" @click="sendMessage" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { isDark } from '@/composables/useDark'
import { onMounted, ref, watch, type Ref } from 'vue'
import { Promotion } from '@element-plus/icons-vue'
import { breakLineToBr } from '@/utils'

type Message = {
	id: number
	text: string
	isMine: boolean
}

let messages: Ref<Array<Message>> = ref([
	{ id: 1, text: '你好', isMine: false },
	{ id: 2, text: '你好，有什么可以帮助你的吗？', isMine: true },
	{ id: 3, text: '我想问一下，这个项目是怎么做的？', isMine: false },
	{
		id: 4,
		text: '这个项目是基于 Vue3 + TypeScript + Vite + Element Plus + Tailwind CSS + Windi CSS + Prettier + Eslint + Husky + Lint-Staged + Git Hooks + Git Commit Message Lint + Git Commit Message Lint + Git Commit',
		isMine: true,
	},
])
let msg: Ref<string> = ref('')

onMounted(() => {
	scrollToBottom()
	setTimeout(() => {
		messages.value.push({
			id: 5,
			text: '这个项目是基于 Vue3 + TypeScript + Vite + Element Plus + Tailwind CSS + Windi CSS + Prettier + Eslint + Husky + Lint-Staged + Git Hooks + Git Commit Message Lint + Git Commit Message Lint + Git Commit',
			isMine: true,
		})
	}, 3000)
})

const messageList: Ref<HTMLElement | null> = ref(null)

watch(
	() => messages.value.length,
	() => {
		scrollToBottom()
	},
	{ immediate: true, flush: 'post' }
)

function scrollToBottom() {
	if (messageList.value) {
		messageList.value.scrollTo({
			top: messageList.value.scrollHeight,
			behavior: 'smooth',
		})
	}
}

function handleEnter(event: KeyboardEvent) {
	if (event.shiftKey) return
	event.preventDefault()
	sendMessage()
}
function sendMessage() {
	if (msg.value) {
		messages.value.push({
			id: messages.value.length + 1,
			text: msg.value,
			isMine: true,
		})
		msg.value = ''
	}
}
</script>

<style scoped lang="scss">
:deep(.el-textarea__inner) {
	border-radius: 6rem;
	padding: 0.6rem 1.5rem;
}
</style>
