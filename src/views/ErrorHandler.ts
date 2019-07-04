type ErrorMessage = string

export default class ErrorHandler {
	protected errorMessage: ErrorMessage

	constructor() {
		this.errorMessage = ''
	}

	public set = (message: ErrorMessage): void => {
		this.errorMessage = message
	}

	public get = (): ErrorMessage => {
		return this.errorMessage
	}

	public clear = (): void => {
		this.set('')
	}

	public flash = (): string => {
		if (this.get()) {
			return `
				<div class="error">
					<strong>Shoot!</strong>&nbsp;${this.get()}
				</div>
			`
		} else {
			return `<span></span>`
		}
	}
}