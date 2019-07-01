import { ApiPromise } from '../api'

type Callback = (...args: any[]) => void

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
	on: (eventName: string, callback: Callback) => void
	trigger: (eventName: string, ...args: any[]) => void
}

interface HasId {
	id?: number
}

export default class Model<T extends HasId> {
	constructor(
		private attributes: ModelAttributes<T>,
		private events: Events,
		private sync: Sync<T>
	) { }

	// ATTRIBUTES
	get = this.attributes.get
	set = (updatedData: T): T => this.attributes.set(updatedData)

	// EVENTS
	on = this.events.on
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