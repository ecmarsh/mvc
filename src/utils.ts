export const trimSlashPadding = (str: string): string => {
	return str.replace(/^\/|\/$/g, '')
}

type AnyFn = (...args: any[]) => any
export const compareToStringEquality = (fn1: AnyFn, fn2: AnyFn) => {
	return fn1.toString() === fn2.toString()
}

export const isUndefined = (arg: any): boolean => typeof arg === 'undefined'

export const areUndefined = (...args: any[]): boolean => {
	let flag = !args.length
	args.forEach(arg => {
		if (isUndefined(arg)) {
			flag = true
		}
	})
	return flag
}
