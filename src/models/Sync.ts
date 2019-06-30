import * as api from '../api'

interface HasId {
	id?: number
}

export default class Sync<T extends HasId> {
	constructor(public endpoint: string) { }

	fetch(id: number): api.ApiPromise {
		return api.getModel(this.endpoint, id)
			.then((res: api.ApiResponse) => {
				return res.data
			})
			.catch((err: api.ApiError) => console.log(err.response))
	}

	save(data: T): api.ApiPromise {
		const { id } = data
		if (id) {
			return api.updateModel(this.endpoint, id, data)
		} else {
			return api.createModel(this.endpoint, data)
		}
	}
}