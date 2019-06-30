type Test = (testName: string, fn: () => TestResult) => void
type Expect = (actual: any) => { toBe: ToBe }
type ToBe = (expected: any) => TestResult
interface TestResult {
	value: PassOrFail
	failDetail: string
}
type PassOrFail = 'PASS' | 'FAIL'

const PASS = `PASS`
const FAIL = `FAIL`

export const test: Test = (testName, fn) => {
	const { printTestResult, printFailDetail } = testUtils
	const testResult = fn()
	printTestResult(testName, testResult.value)
	if (testResult.failDetail) {
		printFailDetail(testResult.failDetail)
	}
}
// Alias to use "it" or "test"
export const it = test

export const expect: Expect = actual => {
	const toBe: ToBe = expected => {
		let testResult: PassOrFail = actual === expected ? PASS : FAIL

		const isFailedFnRefComparison =
			typeof expected === `function`
			&& testResult === FAIL
		const useFunctionStringComparison = () =>
			expected.toString() === actual.toString() ? PASS : FAIL
		if (isFailedFnRefComparison) {
			testResult = useFunctionStringComparison()
		}

		const failDetail = testResult === FAIL
			? `%c Expected: %c ${expected} %c \n Received: %c ${actual}`
			: ''

		return { value: testResult, failDetail }
	}

	return { toBe }
}

const testUtils = {
	printTestResult: (label: string, res: string): void => {
		const resultStyle = testUtils.getTestResultColor(res)
		console.log(`%c ${label}: %c ${res}`, consoleCss.italic, resultStyle)
	},
	printFailDetail: (error: string): void => {
		const { italic, red, green, grey } = consoleCss
		console.log(error, grey, green + italic, grey, red + italic)
	},
	getTestResultColor: (testResult: string): string => {
		const { green, grey, red } = consoleCss
		switch (testResult) {
			case PASS: return green
			case FAIL: return red
			default: return grey
		}
	},
}

const consoleCss = {
	italic: `font-syle: italic;`,
	red: `color: red;`,
	green: `color: limegreen;`,
	grey: `color: #ccc;`,
}
