import * as api from '../api'
import { AxiosResponse } from 'axios'

export interface UserProps {
	id?: number
	name?: string
	age?: number
}

export default class User {
	constructor(private data: UserProps) { }

	get(propertyName: keyof UserProps): (number | string) {
		return this.data[propertyName]
	}

	set(updatedData: UserProps): void {
		Object.assign(this.data, updatedData)
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