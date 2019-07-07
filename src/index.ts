import { Dom, RegionMap } from './lib'
import { User, UserProps } from './models/User'
import { UserForm, UserInfo } from './views/User'

const user = User.build({
	name: 'User Name',
	age: 999
})

const nodeMap: RegionMap<User, UserProps> = {
	'div.userForm': (parent: Element) => new UserForm(user, parent),
}

type IdKey = 'id'

interface GetsId {
	get(prop: IdKey): number
}

const userCollection = User.createCollection()
userCollection.on('change', (models: GetsId[]) => {
	models.forEach(model => {
		const selector = `p#user-${model.get('id')}`
		nodeMap[selector] = (parent: Element) => new UserInfo(model, parent)
	})
})
userCollection.fetch()

setTimeout(() => {
	Dom.renderNodeMap('main.node-container', nodeMap)
}, 500)
