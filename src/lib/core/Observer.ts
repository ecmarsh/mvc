import { Observes, ObservedEvents, EventCallback } from './types'
import { compareToStringEquality } from '../utils'

export default class Observer implements Observes {
	events: ObservedEvents = {}

	on = (eventName: string, callback: EventCallback): void => {
		const eventHandlers = this.events[eventName] || []
		eventHandlers.push(callback)
		this.events[eventName] = eventHandlers
	}

	off = (eventName?: string, callbackArg?: EventCallback): void => {
		const isSpecificEvent =
			typeof eventName == 'string' && eventName in this.events

		const isSpecificCallback =
			isSpecificEvent && typeof callbackArg == 'function'

		const filterEventCallbacks = (): EventCallback[] => {
			const compareFnEquality = function (callback: EventCallback) {
				const isRefEquality = callback == callbackArg
				const isSourceEquality = !!(callbackArg && compareToStringEquality(callback, callbackArg))

				return isRefEquality || isSourceEquality
			}

			return this.events[eventName!].filter(compareFnEquality)
		}

		const filterEvent = (filteredEvent: string): ObservedEvents => {
			const events = { ...this.events }
			delete events[filteredEvent!]
			return events
		}

		if (isSpecificCallback) {
			const events = { ...this.events }
			events[eventName!] = filterEventCallbacks()
			this.events = events
		} else if (isSpecificEvent) {
			this.events = filterEvent(eventName!)
		}
	}

	trigger = (eventName: string, ...callbackArgs: any[]): void => {
		const handlers = this.events[eventName]
		const handlersExist = !!(handlers && handlers.length)

		if (handlersExist) {
			handlers.forEach(callback => {
				callback(...callbackArgs)
			})
		}
	}
}