type Deserializer<T, U> = (json: U) => T

interface AttrHandler<T> {
	get: <K extends keyof T>(key: K) => T[K]
	set: (value: T) => T
	getAll: () => T
}

interface Synchronizes<T> {
	fetch: (id: number) => Promise<any>
	save: (data: T) => Promise<any>
}

interface Observes {
	on: (eventName: string, callback: EventCallback) => void
	off: (eventName?: string, callback?: EventCallback) => void
	trigger: (eventName: string, ...args: any[]) => void
}

interface ModelData {
	[key: string]: any
	id?: number
}

type EventCallback = (...args: any[]) => any
type EventMap = { [eventName: string]: EventCallback }
type ObservedEvents = { [eventName: string]: EventCallback[] }

type DOMRenderer = (markup?: string) => void
interface Renderable {
	render: () => void
	renderDOM: DOMRenderer
}

type TemplateContent = DocumentFragment