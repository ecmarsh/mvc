import { Dom, RegionMap } from './lib'
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

const nodeMap: RegionMap<User, UserProps> = {
	'div#user': (parent: Element) => new UserInfo(user, parent),
	'div.userForm': (parent: Element) => new UserForm(user, parent)
}

setTimeout(() => {
	Dom.renderNodeMap('main.node-container', nodeMap)
}, 0)
