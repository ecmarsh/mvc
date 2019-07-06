import api from './index'
import { ApiPromise, ApiResponse, ModelData } from './types'

export class Sync<T extends ModelData> {
	constructor(private endpoint: string) { }

	fetch = (id: number): ApiPromise => {
		return api.getModel(this.endpoint, id)
			.then((res: ApiResponse) => res.data)
	}

	save = async (data: T): Promise<any> => {
		const { id } = data
		if (!id) {
			return api.createModel(this.endpoint, data)
		}
		return api.updateModel(this.endpoint, id, data)
	}
}