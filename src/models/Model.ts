import { ApiPromise, ApiResponse, ApiError } from '../api'
import { EventCallback } from './Eventing'
import { compareDeep, typeGuard } from '../utils'

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
	public get = this.attributes.get
	public set = (updatedData: T): T => {
		const prevData = this.attributes.getAll()
		const hasChanged = !compareDeep(prevData, updatedData)
		if (hasChanged) {
			this.attributes.set(updatedData)
			this.trigger('change')
		}

		return updatedData
	}

	// EVENTS
	public on = this.events.on
	public off = this.events.off
	public trigger = this.events.trigger

	// SYNC
	public fetch = (): void => {
		const id = this.get(`id`)
		if (typeGuard.isNumber(id)) {
			this.sync.fetch(id)
				.then((res: ApiResponse) => res.data)
				.then((data: any) => {
					this.set(data)
					this.trigger('fetched', data.toString())
				})
				.catch((err: ApiError) => { this.trigger('error') })
		}
	}

	public save = (): void => {
		this.sync.save(this.attributes.getAll())
			.then((res: ApiResponse) => { res && this.set(res.data) })
			.catch((err: ApiError) => { this.trigger('error', err) })
	}
}
