import * as api from '../api'
import { ModelData } from './Model'

export default class ApiSync<T extends ModelData> {
	constructor(private endpoint: string) { }

	fetch = (id: number): api.ApiPromise => {
		return api.getModel(this.endpoint, id)
			.then((res: api.ApiResponse) => res.data)
	}

	save = async (data: T): Promise<any> => {
		const { id } = data
		if (!id) {
			return api.createModel(this.endpoint, data)
		}
		return api.updateModel(this.endpoint, id, data)
	}
}