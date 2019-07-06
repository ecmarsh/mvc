import { AxiosInstance, AxiosResponse, AxiosPromise, AxiosError } from 'axios'

type ApiInstance = AxiosInstance
type ApiResponse = AxiosResponse
type ApiPromise = AxiosPromise
type ApiError = AxiosError


interface ModelApi {
	createModel: CreateModel
	updateModel: UpdateModel
	getModel: GetModel
	getCollection: GetCollection
}

type CreateModel = (endpoint: string, data: ModelData) => ApiPromise

type UpdateModel = (endpoint: string, id: Id, data: ModelData) => ApiPromise

type GetModel = (endpoint: string, id: Id) => ApiPromise

type GetCollection = (endpoint: string) => ApiPromise

interface ModelData {
	id?: Id
	[key: string]: any
}

type Id = number
