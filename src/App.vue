<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { useDark, useToggle } from '@vueuse/core'
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'

const isDark = useDark()
let toggleDark = useToggle(isDark),
	size = ref<'default' | 'large' | 'small'>('default'),
	value1 = ref(''),
	isAnimation = ref(true)

function removeAnimation() {
	if (isAnimation.value) return
	let style: HTMLStyleElement = document.createElement('style')
	style.textContent = `
  *, *::before, *::after {
    transition-duration: 0s !important;
    animation-duration: 0s !important;
    transition-delay: 0s !important;
    animation-delay: 0s !important;
    animation-iteration-count: 1 !important;
    transition-property: none !important;
    animation-name: none !important;
  }`
	document.head.appendChild(style)
}

onBeforeMount(() => {
	removeAnimation()
})
</script>

<template>
	<header>
		<img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

		<div class="wrapper no-animation">
			<HelloWorld msg="You did it!" />
			<el-button type="primary" @click="toggleDark()">Toggle Dark Mode</el-button>
			{{ isDark }}
			<el-date-picker v-model="value1" type="date" placeholder="Pick a day" :size="size" />
			<nav>
				<RouterLink to="/">Home</RouterLink>
				<RouterLink to="/about">About</RouterLink>
			</nav>
		</div>
	</header>

	<RouterView />
</template>

<style lang="scss">
header {
	line-height: 1.5;
	max-height: 100vh;
}

.logo {
	display: block;
	margin: 0 auto 2rem;
}

nav {
	width: 100%;
	font-size: 12px;
	text-align: center;
	margin-top: 2rem;
}

nav a.router-link-exact-active {
	color: var(--color-text);
}

nav a.router-link-exact-active:hover {
	background-color: transparent;
}

nav a {
	display: inline-block;
	padding: 0 1rem;
	border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
	border: 0;
}

@media (min-width: 1024px) {
	header {
		display: flex;
		place-items: center;
		padding-right: calc(var(--section-gap) / 2);
	}

	.logo {
		margin: 0 2rem 0 0;
	}

	header .wrapper {
		display: flex;
		place-items: flex-start;
		flex-wrap: wrap;
	}

	nav {
		text-align: left;
		margin-left: -1rem;
		font-size: 1rem;

		padding: 1rem 0;
		margin-top: 1rem;
	}
}
</style>
