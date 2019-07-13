import { Attributes, Collection, Model, Observer } from '../lib'
import { ApiSync } from '../lib/api'
import api from '../api'

export interface UserProps {
  [key: string]: any
  id?: number
  name?: string
  age?: number
}

export class User extends Model<UserProps> {
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

  static createCollection = (): Collection => {
    return new Collection<User, UserProps>(
      (json: UserProps) => User.build(json),
      api,
      User.dataEndpoint,
    )
  }

  private static construct = (attrs: UserProps): User => new User(
    new Attributes<UserProps>(attrs),
    new Observer(),
    new ApiSync<UserProps>(api, User.dataEndpoint)
  )

  constructor(
    attrHandler: Attributes,
    observer: Observer,
    sync: ApiSync
  ) {
    super(attrHandler, observer, sync)
  }
}