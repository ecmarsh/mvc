import { AxiosWrapper, ApiPromise, ApiResponse, ModelData } from './types'

export class Sync<T extends ModelData> {
	constructor(
		private api: AxiosWrapper,
		private endpoint: string
	) { }

	fetch = (id: number): ApiPromise => {
		return this.api.getModel(this.endpoint, id)
			.then((res: ApiResponse) => res.data)
	}

	save = async (data: T): Promise<any> => {
		const { id } = data
		if (!id) {
			return this.api.createModel(this.endpoint, data)
		}
		return this.api.updateModel(this.endpoint, id, data)
	}
}