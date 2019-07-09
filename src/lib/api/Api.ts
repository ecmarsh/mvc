import axios from 'axios'
import { trimSlashPadding as trimmed } from '../utils'
import { AxiosWrapper, ApiInstance, CreateModel, UpdateModel, GetModel, GetCollection, InitApi } from './types'

export class Api implements AxiosWrapper {
	public api: ApiInstance

	constructor(public baseURL: string) {
		this.api = axios.create({ baseURL })
	}

	static createInstance: InitApi = (baseURL) => {
		return new Api(baseURL)
	}

	createModel: CreateModel = (endpoint, data) => {
		return this.api.post(`/${trimmed(endpoint)}/`, data)
	}

	updateModel: UpdateModel = (endpoint, id, data) => {
		return this.api.put(`/${trimmed(endpoint)}/${id}`, data)
	}

	getModel: GetModel = (endpoint, id) => {
		return this.api.get(`/${trimmed(endpoint)}/${id}`)
	}

	getCollection: GetCollection = endpoint => {
		return this.api.get(`/${trimmed(endpoint)}/`)
	}
}

export default Api
