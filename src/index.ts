import { Collection, Dom, RegionMap } from './lib'
import { User, UserProps } from './models/User'
import { UserForm, UserInfo } from './views/User'

type IdKey = 'id'

interface GetsId {
  get(prop: IdKey): number
}

const user = User.build({
  name: 'User Name',
  age: 999
})

const regions: RegionMap<User, UserProps> = {
  'div.userForm': (parent: Element) => new UserForm(user, parent),
}

const setupUserList = (): Collection => {
  const userCollection: Collection = User.createCollection()

  userCollection.on('change', (models: GetsId[]) => {
    models.forEach(model => {
      const selector = `p#user-${model.get('id')}`
      regions[selector] = (parent: Element) => new UserInfo(model, parent)
    })
  })

  return userCollection
}

setupUserList().fetch()

Dom.render('main.node-container', regions)
