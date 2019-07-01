type Callback = (...args: any[]) => void

export default class Eventing {
	events: { [key: string]: Array<Callback> } = {}

	on = (eventName: string, callback: Callback): void => {
		const eventHandlers = this.events[eventName] || []
		eventHandlers.push(callback)
		this.events[eventName] = eventHandlers
	}

	trigger = (eventName: string, ...args: any[]): void => {
		const handlers = this.events[eventName]
		const handlersExist = handlers && handlers.length

		if (handlersExist) {
			handlers.forEach(callback => {
				callback(...args)
			})
		}
	}
}