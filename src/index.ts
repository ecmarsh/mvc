import { Dom, NodeMap } from './lib'

import { User, UserProps } from './models/User'
import { UserForm, UserInfo } from './views/User'

const sampleProps = {
	name: 'USER_4',
	age: 44,
}

const userCollection = User.createCollection()
userCollection.on('change', (data: any) => {
	console.log(data)
})
userCollection.fetch()

const user = User.build(sampleProps)

const nodeMap: NodeMap<User, UserProps> = {
	'div#user': (selector: string) => new UserInfo(user, selector),
	'div.userForm': (selector: string) => new UserForm(user, selector)
}

Dom.renderNodeMap('main.node-container', nodeMap)
