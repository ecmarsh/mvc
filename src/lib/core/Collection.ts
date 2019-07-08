import Observer from './Observer'
import { ModelData, Deserializer } from './types'
import { Api } from '../api'

export default class Collection<T, U extends ModelData> {
	private models: Array<T>
	private observer: Observer

	constructor(
		private deserialize: Deserializer<T, U>,
		private api: Api,
		private endpoint: string,
	) {
		this.models = []
		this.observer = new Observer()
	}

	public get on() {
		return this.observer.on
	}
	public get off() {
		return this.observer.off
	}

	public get trigger() {
		return this.observer.trigger
	}

	public fetch = (): void => {
		this.api.getCollection(this.endpoint)
			.then((res: any) => {
				this.updateModels(res.data)
			})
			.catch((err: any) => {
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