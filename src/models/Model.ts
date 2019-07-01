import { ApiPromise } from '../api'

type Callback = (...args: any[]) => any

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
	get get() {
		return this.attributes.get
	}
	set(updatedData: T): void {
		this.attributes.set(updatedData)
		this.events.trigger(`change`)
	}

	// EVENTS
	get on() {
		return this.events.on
	}
	get trigger() {
		return this.events.trigger
	}

	// SYNC
	fetch(): void {
		const id = this.get(`id`)

		if (!id) {
			throw Error('Must have ID to fetch')
		}

		this.sync.fetch(id)
			.then(res => { res.data && this.set(res.data) })
			.catch(err => { this.trigger('error', err) })
	}

	save(): void {
		this.sync.save(this.attributes.getAll())
			.then(res => { this.trigger('save', res.data) })
			.catch(err => { this.trigger('error', err) })
	}
}