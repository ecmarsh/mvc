import { ApiPromise } from '../api'
import { EventCallback } from './Eventing'
import { compareDeep } from '../utils'

interface ModelAttributes<T> {
	get: <K extends keyof T>(key: K) => T[K]
	set: (value: T) => T
	getAll: () => T
}

interface Sync<T> {
	fetch: (id: number) => ApiPromise
	save: (data: T) => ApiPromise
}

interface Events {
	on: (eventName: string, callback: EventCallback) => void
	off: (eventName?: string, callback?: EventCallback) => void
	trigger: (eventName: string, ...args: any[]) => void
}

export interface ModelData {
	[key: string]: any
	id?: number
}

export default class Model<T extends ModelData> {
	constructor(
		private attributes: ModelAttributes<T>,
		private events: Events,
		private sync: Sync<T>
	) { }

	// ATTRIBUTES
	get = this.attributes.get
	set = (updatedData: T): T => {
		const prevData = this.attributes.getAll()
		const hasChanged = compareDeep(prevData, updatedData)
		if (hasChanged) {
			this.attributes.set(updatedData)
			this.trigger('change')
		}

		return updatedData
	}

	// EVENTS
	on = this.events.on
	off = this.events.off
	trigger = this.events.trigger

	// SYNC
	fetch = (): void => {
		const id = this.get(`id`)
		id && this.sync.fetch(id)
			.then(res => res.data)
			.then(data => {
				this.set(data)
				this.trigger('fetched', data.toString())
			})
			.catch(err => { this.trigger('error') })
	}
	save = (): void => {
		this.sync.save(this.attributes.getAll())
			.then(res => { res && this.set(res.data) })
			.catch(err => { this.trigger('error') })
	}
}
