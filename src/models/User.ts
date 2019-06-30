import * as api from '../api'
import { AxiosResponse } from 'axios'

export interface UserProps {
	id?: number
	name?: string
	age?: number
}

type Callback = () => void

export default class User {
	events: { [key: string]: Array<Callback> } = {}

	constructor(private data: UserProps) { }

	get(propertyName: keyof UserProps): (number | string) {
		return this.data[propertyName]
	}

	set(updatedData: UserProps): void {
		Object.assign(this.data, updatedData)
	}

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

	fetch(): void {
		api.getUser(this.get(`id`))
			.then((res: AxiosResponse) => {
				this.set(res.data)
			})
	}

	save(): void {
		const id = this.get(`id`)
		if (id) {
			api.updateUser(id, this.data)
		} else {
			api.createNewUser(this.data)
		}
	}
}