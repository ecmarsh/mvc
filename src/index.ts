import User, { UserProps } from './models/User'
import * as api from './api'

const sampleProps = {
	name: 'NEW_NAME',
	age: 12,
}

const user = new User(sampleProps)
console.log(user.save())
