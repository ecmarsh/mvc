import { View } from '../../lib'
import User, { UserProps } from '../../models/User'

export interface UserNodeMap {
	[cssLikeSelector: string]: () => View<User, UserProps>
}

abstract class UserView extends View<User, UserProps> {
	static model: User
}

export default UserView