import { UserView, UserModel } from './UserView'
import { createPropList } from './createPropList'

export class UserInfo extends UserView {
	constructor(model: UserModel, selector: string) {
		super(model, selector)
		this.eventMap = {
			'click:h1': (): void => console.log(this)
		}
	}

	render = (): string => `
		<div>
			<h1>User Form</h1>
			${createPropList(['name', 'age'], this.model)}
		</div>
	`
}