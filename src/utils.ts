const trimSlashPadding = (str: string): string => {
	return str.replace(/^\/|\/$/g, '')
}

type AnyFn = (...args: any[]) => any
const compareToStringEquality = (fn1: AnyFn, fn2: AnyFn) => {
	return fn1.toString() === fn2.toString()
}

export { trimSlashPadding, compareToStringEquality }
