import Model from './Model'
import Attributes from './Attributes'
import ApiSync from './ApiSync'
import Eventing from './Eventing'

export interface UserProps {
	[key: string]: any
	id?: number
	name?: string
	age?: number
}

export default class User extends Model<UserProps> {
	static dataEndpoint = `/users`
	static ids: number[] = [1]
	static getNextId = (): number => {
		const id = User.ids[User.ids.length - 1]
		User.incrementId(id)
		return id
	}
	static incrementId = (prevId: number): void => {
		const nextId = prevId + 1
		User.ids.push(nextId)
	}
	static buildUser = (attrs: UserProps): User => {
		const id = User.getNextId()
		const initialAttrs = Object.assign({}, attrs, { id })

		return new User(
			new Attributes<UserProps>(initialAttrs),
			new Eventing(),
			new ApiSync<UserProps>(User.dataEndpoint)
		)
	}
}