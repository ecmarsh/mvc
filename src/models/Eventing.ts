type Callback = () => void

export default class Eventing {
	events: { [key: string]: Array<Callback> } = {}

	on(eventName: keyof GlobalEventHandlersEventMap, callback: Callback): void {
		const eventHandlers = this.events[eventName] || []
		eventHandlers.push(callback)
		this.events[eventName] = eventHandlers
	}

	trigger(eventName: string): void {
		const handlers = this.events[eventName]
		const handlersExist = handlers && handlers.length

		if (handlersExist) {
			handlers.forEach(callback => {
				callback()
			})
		}
	}
}