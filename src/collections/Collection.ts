import * as api from '../api'
import Eventing from '../models/Eventing'
import { ModelData } from '../models/Model'

type Deserializer<T, U> = (json: U) => T

export default class Collection<T, U extends ModelData> {
	private models: Array<T>
	private events: Eventing

	constructor(
		private endpoint: string,
		private deserialize: Deserializer<T, U>
	) {
		this.models = []
		this.events = new Eventing()
	}

	public get on() {
		return this.events.on
	}
	public get off() {
		return this.events.off
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