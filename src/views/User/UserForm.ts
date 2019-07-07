import { UserView, UserModel } from './UserView'
import { ErrorHandler } from '../ErrorHandler';

type InputElement = HTMLInputElement | null

interface InputSelector {
	[inputAttribute: string]: AttributeValue
}

type AttributeValue = string


export class UserForm extends UserView {
	private errorHandler: ErrorHandler

	constructor(model: UserModel, selector: string) {
		super(model, selector)
		this.eventMap = {
			'submit:form': this.onSubmit,
		}
		this.errorHandler = new ErrorHandler()
		this.bindErrorHandler()
	}

	onSubmit = (e: Event): void => {
		e.preventDefault()

		const textInput = findInputMatching.call(this, { type: 'text' })
		const numberInput = findInputMatching.call(this, { type: 'number' })

		if (!textInput || !numberInput) {
			const errorMessage = `Could not find text or number input!`
			this.model.trigger('error', errorMessage)
			return
		}

		const name = textInput.value || this.model.get('name')
		const age = +numberInput.value || this.model.get('age')

		this.model.set({ name, age })
		this.model.save()

		resetInputValues(textInput, numberInput)


		function findInputMatching(this: UserForm, inputSelector: InputSelector) {
			const [attribute, value] = Object.entries(inputSelector)[0]
			const selector = `input[${attribute}="${value}"]`
			const inputElement = this.parent.querySelector(selector)
			return inputElement as InputElement
		}

		function resetInputValues(...inputElements: HTMLInputElement[]): void {
			inputElements.forEach(inputElement => {
				clearInputValueFrom(inputElement)
			})
		}

		function clearInputValueFrom(inputElement: HTMLInputElement): void {
			inputElement.value = ''
		}
	}

	bindErrorHandler = (): void => {
		this.model.on('error', (errorMessage: string) => {
			this.errorHandler.set(errorMessage)
			this.model.trigger('change')

			const msToFlashError = 8000

			setTimeout(() => {
				this.errorHandler.clear()
				this.model.trigger('change')
			}, msToFlashError)
		})
	}

	render = (): string => `
		<form>
			${this.errorHandler.flash()}
			<label>User Name
				<input type="text" placeholder="${this.model.get('name')}" />
			</label>
			<br />
			<label>User Age
				<input type="number" placeholder="${this.model.get('age')}"/>
			</label>
			<br />
			<button type="submit">Save User Data</button>
		</form>
	`
}
