export const trimSlashPadding = (str: string): string => {
	return str.replace(/^\/|\/$/g, '')
}

export const minify = (markup: string): string => {
	return markup.replace(/\t|\n/g, '')
}

type AnyFn = (...args: any[]) => any
export const compareToStringEquality = (fn1: AnyFn, fn2: AnyFn) => {
	return fn1.toString() === fn2.toString()
}

type AnyObj = { [key: string]: any }
export const compareDeep = (o1: AnyObj, o2: AnyObj) => {
	const objLength = (o: AnyObj): number => Object.keys(o).length

	if (objLength(o1) !== objLength(o2)) {
		return false
	}

	const isPropsEq = (o1: AnyObj, o2: AnyObj) => {
		for (const prop in o1) {
			if (o1[prop] !== o2[prop]) {
				return false
			}
		}
		return true
	}

	const isBothPropsAndValsEqual = isPropsEq(o1, o2) && isPropsEq(o2, o1)
	return !isBothPropsAndValsEqual
}

export const isUndefined = (arg: any): boolean => {
	return typeof arg === 'undefined'
}

export const areUndefined = (...args: any[]): boolean => {
	let flag = !args.length
	args.forEach(arg => {
		if (isUndefined(arg)) {
			flag = true
		}
	})
	return flag
}
