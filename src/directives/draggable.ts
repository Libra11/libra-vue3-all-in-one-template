/*
 * @Author: Libra
 * @Date: 2023-04-06 16:30:48
 * @LastEditTime: 2023-04-06 16:35:55
 * @LastEditors: Libra
 * @Description: 拖拽指令
 */
// draggable.ts
import type { Directive } from 'vue'

interface Position {
	x: number
	y: number
}

const draggable: Directive = {
	beforeMount(el: HTMLElement) {
		const handle = document.createElement('div')
		handle.style.position = 'absolute'
		handle.style.top = '0'
		handle.style.left = '0'
		handle.style.height = '20px'
		handle.style.width = '100%'
		handle.style.cursor = 'move'

		el.appendChild(handle)

		const onMouseDown = (event: MouseEvent) => {
			el.style.cursor = 'move'

			const startPos: Position = {
				x: event.clientX,
				y: event.clientY,
			}

			const onMove = (moveEvent: MouseEvent) => {
				const dx = moveEvent.clientX - startPos.x
				const dy = moveEvent.clientY - startPos.y

				el.style.left = `${el.offsetLeft + dx}px`
				el.style.top = `${el.offsetTop + dy}px`

				startPos.x = moveEvent.clientX
				startPos.y = moveEvent.clientY
			}

			const onMouseUp = () => {
				document.removeEventListener('mousemove', onMove)
				document.removeEventListener('mouseup', onMouseUp)
				el.style.cursor = 'default'
			}

			document.addEventListener('mousemove', onMove)
			document.addEventListener('mouseup', onMouseUp)
		}

		handle.addEventListener('mousedown', onMouseDown)

		el.style.position = 'absolute'
	},
}

export default draggable
