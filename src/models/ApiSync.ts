import * as api from '../api'

interface HasId {
	id?: number
}

export default class ApiSync<T extends HasId> {
	constructor(public endpoint: string) { }

	fetch = (id: number): api.ApiPromise => {
		return api.getModel(this.endpoint, id)
			.then((res: api.ApiResponse) => res.data)
			.catch(_ => { })
	}

	save = async (data: T): Promise<any> => {
		try {
			const res = await api.getModel(this.endpoint, data.id)
			if (res.status < 400) {
				return api.updateModel(this.endpoint, data.id, data)
			}
		} catch (err) {
			return api.createModel(this.endpoint, data)
		}
	}
}