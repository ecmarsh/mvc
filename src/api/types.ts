import { AxiosInstance, AxiosResponse, AxiosPromise, AxiosError } from 'axios'

export type ApiInstance = AxiosInstance
export type ApiResponse = AxiosResponse
export type ApiPromise = AxiosPromise
export type ApiError = AxiosError

export interface AxiosWrapper {
	api: ApiInstance
	createModel: CreateModel
	updateModel: UpdateModel
	getModel: GetModel
	getCollection: GetCollection
}

export type InitApi = (port?: string) => AxiosWrapper
export type CreateModel = (endpoint: string, data: ModelData) => ApiPromise
export type UpdateModel = (endpoint: string, id: Id, data: ModelData) => ApiPromise
export type GetModel = (endpoint: string, id: Id) => ApiPromise
export type GetCollection = (endpoint: string) => ApiPromise

export interface ModelData {
	id?: Id
	[key: string]: any
}
type Id = number
