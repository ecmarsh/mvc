import { compareToStringEquality } from '../utils'

export type EventCallback = (...args: any[]) => any

export default class Eventing {
	events: { [key: string]: Array<EventCallback> } = {}

	on = (eventName: string, callback: EventCallback): void => {
		const eventHandlers = this.events[eventName] || []
		eventHandlers.push(callback)
		this.events[eventName] = eventHandlers
	}

	off = (eventName?: string, callbackArg?: EventCallback): void => {
		const isSpecificEvent =
			typeof eventName === 'string' && eventName in this.events
		const isSpecificCallback =
			isSpecificEvent && typeof callbackArg === 'function'

		const filterEventCallbacks = (): EventCallback[] => {
			const isCallbackMatch = (callback: EventCallback) =>
				callback === callbackArg
				|| compareToStringEquality(callback, callbackArg)

			return this.events[eventName].filter(cb => isCallbackMatch(cb))
		}
		const removeAllEventCallbacks = (): void => {
			delete this.events[eventName]
		}

		if (isSpecificCallback) {
			this.events[eventName] = filterEventCallbacks()
		} else if (isSpecificEvent) {
			removeAllEventCallbacks()
		}
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