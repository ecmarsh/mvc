import Model from './Model'
import Template from './Template'
import { createOrGetElement } from '../elementKit'

export default abstract class View<T extends Model<U>, U> {
	abstract render: () => string

	public parent: Element
	public template: Template
	protected eventMap: EventMap = {}

	constructor(
		public model: T,
		private selector: string,
	) {
		this.parent = createOrGetElement(this.selector)
		this.template = new Template()
		this._bindViewToModel()
	}

	public renderDOM: DOMRenderer = (markupOverrides = this.render()) => {
		this._clearTemplate()
		this.template.set(markupOverrides)
		this._bindEvents()
		this._children = this.template.get()
	}

	private set _children(templateContent: DocumentFragment) {
		this.parent.append(templateContent)
	}

	private _clearTemplate = () => {
		this.parent.innerHTML = ''
	}

	private _bindViewToModel = () => {
		this.model.on('change', () => {
			this.renderDOM()
		})
	}

	private _mapEvents = (): EventMap => this.eventMap

	private _bindEvents = (): void => {
		const eventMap = Object.entries(this._mapEvents())

		for (const [eventKey, callback] of eventMap) {
			const [eventName, selector] = eventKey.split(':')
			const matchingElements = this.template.findNodes(selector) || []

			matchingElements.forEach((element: Element) => {
				element.addEventListener(eventName, callback)
			})
		}
	}
}
