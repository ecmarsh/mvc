import * as api from '../api'
import Eventing from '../models/Eventing'


export default class Collection<T, U> {
	private models: Array<T>
	private events: Eventing

	constructor(
		private endpoint: string,
		private deserialize: (json: U) => T
	) {
		this.models = []
		this.events = new Eventing()
	}

	public get on() {
		return this.events.on
	}

	public get trigger() {
		return this.events.trigger
	}

	public fetch = (): void => {
		api.getCollection(this.endpoint)
			.then(res => {
				this.updateModels(res.data)
			})
			.catch(err => {
				console.error('Collection fetch error:', err)
			})
	}

	private updateModels = (models: U[]): void => {
		const updatedModels = []
		for (const _model of models) {
			const model = this.deserialize(_model)
			updatedModels.push(model)
		}
		this.models = updatedModels
		this.trigger('change', this.models)
	}
}