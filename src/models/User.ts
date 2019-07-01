import Model from './Model'
import Collection from '../collections/Collection'
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

	static init = (attrs: UserProps): User => {
		delete attrs.id
		const user = User.construct({ ...attrs })
		user.save()
		return user
	}

	static build = (attrs: UserProps): User => {
		return User.construct({ ...attrs })
	}

	static collection = () => {
		return new Collection<User, UserProps>(
			User.dataEndpoint,
			(json: UserProps) => User.build(json)
		)
	}

	private static construct = (attrs: UserProps): User => new User(
		new Attributes<UserProps>(attrs),
		new Eventing(),
		new ApiSync<UserProps>(User.dataEndpoint)
	)
}