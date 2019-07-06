type ErrorMessage = string

export class ErrorHandler {
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
		const style = `
			padding: 10px 20px;
      border-left: 10px solid red;
		`

		if (this.get()) {
			return `
				<div class="error" style="${style}">
					<strong>Shoot!</strong>&nbsp;${this.get()}
				</div>
			`
		} else {
			return `<span><!--Errors Here--></span>`
		}
	}
}