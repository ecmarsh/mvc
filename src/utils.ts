export const trimSlashPadding = (str: string): string => {
	return str.replace(/^\/|\/$/g, '')
}

export const minify = (markup: string): string => {
	return markup.replace(/\t|\n/g, '')
}

type AnyFn = (...args: any[]) => any
export const compareToStringEquality = (fn1: AnyFn, fn2?: AnyFn) => {
	return fn2 && fn1.toString() === fn2.toString()
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

	return isPropsEq(o1, o2) && isPropsEq(o2, o1)
}

export const areUndefined = (...args: any[]): boolean => {
	let flag = !args.length
	args.forEach(arg => {
		if (is.Undefined(arg)) {
			flag = true
		}
	})
	return flag
}

type _Is = (value: any) => boolean
interface IsTypes { [type: string]: _Is }
export const is: IsTypes = (function () {
	const _Undefined: _Is = x => typeof x === 'undefined'
	const _Null: _Is = x => x === null
	const _Nil: _Is = x => x == null
	const _Number: _Is = x => typeof x == 'number'
	const _String: _Is = x => typeof x == 'string'
	const _Boolean: _Is = x => typeof x == 'boolean'
	const _Symbol: _Is = x => typeof x == 'symbol'
	const _Function: _Is = x => typeof x == 'function'
	const _Object: _Is = x => x.toString() == '[object Object]'
	const _Array: _Is = x => x.length && x.length >= 0

	return {
		Undefined: _Undefined,
		Null: _Null,
		Nil: _Nil,
		Number: _Number,
		String: _String,
		Boolean: _Boolean,
		Symbol: _Symbol,
		Object: _Object,
		Array: _Array,
		Function: _Function,
	}
})()


interface TypeGuard { [isGuardType: string]: Guard<GuardType> }
type Guard<T> = (value: any) => value is T
type GuardType = boolean | string | number | symbol

export const typeGuard: TypeGuard = {
	isBoolean: (value: any): value is boolean => is.Boolean(value),
	isNumber: (value: any): value is number => is.Number(value),
	isString: (value: any): value is string => is.String(value),
	isSymbol: (value: any): value is symbol => is.Symbol(value),
}
