/*
 * @Author: Libra
 * @Date: 2023-04-07 15:03:21
 * @LastEditTime: 2023-04-10 14:47:56
 * @LastEditors: Libra
 * @Description: 工具函数
 */

/**
 *
 * @param str 字符串
 * @returns 换行符替换为 <br/>
 */
function breakLineToBr(str: string) {
	return str.replace(/\n/g, '<br/>')
}

export { breakLineToBr }
