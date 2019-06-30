import Eventing from './Eventing'
import Sync from './Sync'

export interface UserProps {
	id?: number
	name?: string
	age?: number
}

export default class User {
	private dataEndpoint = `/users`
	public events: Eventing = new Eventing()
	public sync: Sync<UserProps> = new Sync<UserProps>(this.dataEndpoint)

	constructor(private data: UserProps) { }

	get<K extends keyof UserProps>(propertyName: K): UserProps[K] {
		return this.data[propertyName]
	}

	set(updatedData: UserProps): void {
		Object.assign(this.data, updatedData)
	}
}