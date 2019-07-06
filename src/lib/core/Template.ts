import { minify } from '../utils'



export interface ViewTemplate {
	set: (markup: string) => void
	get: () => TemplateContent
	findNode: (selector: string) => Element | null
	findNodes: (selector: string) => NodeListOf<Element>
}

export default class Template implements ViewTemplate {
	private content = document.createDocumentFragment()

	static create = (markup: string): HTMLTemplateElement => {
		const templateElement = document.createElement('template')
		templateElement.innerHTML = markup
		return templateElement
	}

	public set = (markup: string): void => {
		this.content = Template.create(minify(markup)).content
	}

	public get = (): DocumentFragment => {
		return this.content
	}

	public findNode = (selector: string): Element | null => {
		return this.content.querySelector(selector)
	}

	public findNodes = (selector: string): NodeListOf<Element> => {
		return this.content.querySelectorAll(selector)
	}
}