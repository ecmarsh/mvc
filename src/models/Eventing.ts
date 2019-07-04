import { compareToStringEquality, typeGuard, is } from '../utils'

export type EventCallback = (...args: any[]) => any
export type EventMap = { [key: string]: EventCallback }

export default class Eventing {
	events: { [key: string]: EventCallback[] } = {}

	on = (eventName: string, callback: EventCallback): void => {
		const eventHandlers = this.events[eventName] || []
		eventHandlers.push(callback)
		this.events[eventName] = eventHandlers
	}

	off = (eventName?: string, callbackArg?: EventCallback): void => {
		const isSpecificEvent =
			typeGuard.isString(eventName) && eventName in this.events
		const isSpecificCallback =
			isSpecificEvent && is.Function(callbackArg)

		const filterEventCallbacks = (): EventCallback[] => {
			const isCallbackMatch = (callback: EventCallback) => {
				const isRefMatch = callback === callbackArg
				const isSourceMatch = compareToStringEquality(callback, callbackArg)

				return isRefMatch || isSourceMatch
			}

			return this.events[eventName!].filter(isCallbackMatch)
		}
		const removeAllEventCallbacks = (): void => {
			delete this.events[eventName!]
		}

		if (isSpecificCallback) {
			this.events[eventName!] = filterEventCallbacks()
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