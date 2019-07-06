import { Attributes, Collection, Model, Observer } from '../lib'
import ApiSync from '../api/Sync'

export interface UserProps {
	[key: string]: any
	id?: number
	name?: string
	age?: number
}

export default class User extends Model<UserProps> {
	static dataEndpoint = `/users`

	static init = (attrs: UserProps): User => {
		delete attrs.id
		const user = User.build(attrs)
		user.save()
		return user
	}

	static build = (attrs: UserProps): User => {
		return User.construct({ ...attrs })
	}

	static createCollection = () => {
		return new Collection<User, UserProps>(
			User.dataEndpoint,
			(json: UserProps) => User.build(json)
		)
	}

	private static construct = (attrs: UserProps): User => new User(
		new Attributes<UserProps>(attrs),
		new Observer(),
		new ApiSync<UserProps>(User.dataEndpoint)
	)
}