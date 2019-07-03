import Model from '../models/Model'
import User from '../models/User'
import { EventCallback } from '../models/Eventing'
import { minify } from '../utils'

interface EventMap {
	[key: string]: EventCallback
}

const rootNode = document.getElementById('#root')

export default class UserForm {
	constructor(
		public model: User,
		public parent: HTMLElement = rootNode,
		private template = document.createDocumentFragment()
	) {
		this.bindViewToModel()
	}

	private bindViewToModel = (): void => {
		this.model.on('change', () => {
			this.render()
		})
	}

	mapEvents = (): EventMap => ({
		'submit:form': this.onSubmit,
		'click:#increment': this.incrementAge
	})

	bindEvents = (): void => {
		const eventsMap = this.mapEvents()

		for (const [eventKey, callback] of Object.entries(eventsMap)) {
			const [eventName, selector] = eventKey.split(':')
			const elements = this.template.querySelectorAll(selector) || []

			elements.forEach((element: Element) => {
				element.addEventListener(eventName, callback)
			})
		}
	}

	set children(content: DocumentFragment) {
		this.bindEvents()
		this.parent.append(content)
	}

	render = (markup?: string): void => {
		this.clearTemplate()
		this.setTemplate(markup)
		this.children = this.template
	}

	private baseHTML = (customMarkup?: string): string => customMarkup || `
		<form action="post">
			<h1>User Form</h1>
			${listProps(['name', 'age'], this.model)}
			<label>
				User Name
				<input type="text" />
			</label>
			<label>
				User Age
				<input type="number" />
			</label>
			<button type="submit">Click Me</button>
		</form>
		<div>
			<button type="button" id="increment">Increment Age</button>
		</div>
	`

	private setTemplate: (markup?: string) => void = (markup = this.baseHTML()) => {
		const { content } = Template.create(minify(markup))
		this.template = content
	}

	private clearTemplate = (): void => {
		this.parent.innerHTML = ''
	}

	// EVENT MAP
	public onSubmit = (e: Event): void => {
		e.preventDefault()
		const textInput: HTMLInputElement = this.parent.querySelector('input[type="text"]')
		const numInput: HTMLInputElement = this.parent.querySelector('input[type="number"]')
		const name = textInput.value || this.model.get('name')
		const age = +numInput.value || this.model.get('age')

		resetInputValues(textInput, numInput)
		this.model.set({ name, age })


		function resetInputValues(...inputElements: HTMLInputElement[]): void {
			const clearInput = (inputEl: HTMLInputElement): void => { inputEl.value = '' }
			inputElements.forEach(inputEl => { clearInput(inputEl) })
		}
	}

	private incrementAge = (e: Event): void => {
		const age = this.model.get('age') + 1
		this.model.set({ age })
	}
}


//// REFACTOR
const listProps = <T extends Model<any>>(props: string[], model: T): string => {
	let html = `<ul>`
	props.forEach(prop => {
		html += `<li>${model.constructor.name} ${prop}: ${model.get(prop)}</li>`
	})
	html += `</ul>`
	return html
}

class Template {
	static create = (markup: string): HTMLTemplateElement => {
		const templateElement = document.createElement('template')
		templateElement.innerHTML = markup
		return templateElement
	}
}