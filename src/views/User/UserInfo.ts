import { UserView, UserModel } from './UserView'
import { createPropList } from './createPropList'

interface EventMap {
	[key: string]: (...args: any[]) => any
}

export class UserInfo extends UserView {
	eventMap: EventMap

	constructor(model: UserModel, selector: string) {
		super(model, selector)
		this.eventMap = {
			'click:h1': (): void => console.log(this)
		}
	}

	render = (): string => `
		<div>
			${createPropList(['name', 'age'], this.model)}
		</div>
	`
}