import { View } from '../../lib'
import { User, UserProps } from '../../models/User'

export type UserModel = User
export class UserView extends View<User, UserProps> {}
