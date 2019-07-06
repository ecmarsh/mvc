import api from '../../api'
import Observer from './Observer'

export default class Collection<T, U extends ModelData> {
	private models: Array<T>
	private events: Observer

	constructor(
		private endpoint: string,
		private deserialize: Deserializer<T, U>
	) {
		this.models = []
		this.events = new Observer()
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