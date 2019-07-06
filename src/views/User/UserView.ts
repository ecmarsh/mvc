import { View } from '../../lib'
import { User, UserProps } from '../../models/User'

export abstract class UserView extends View<User, UserProps> {
	static model: User
}
