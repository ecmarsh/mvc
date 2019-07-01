import axios, { AxiosResponse, AxiosPromise, AxiosError } from 'axios'
import { trimSlashPadding as trimmed } from './utils'
import { ModelData } from './models/Model'


const { DB_PORT } = process.env
const baseURL = `http://localhost:${DB_PORT}`
const api = axios.create({ baseURL })


type ApiResponse = AxiosResponse
type ApiPromise = AxiosPromise
type ApiError = AxiosError
type Id = number
export { ApiResponse, ApiPromise, ApiError }


type POST = (endpoint: string, data: ModelData) => ApiPromise
const createModel: POST = (endpoint, data) => {
	return api.post(`/${trimmed(endpoint)}/`, data)
}

type PUT = (endpoint: string, id: Id, data: ModelData) => ApiPromise
const updateModel: PUT = (endpoint, id, data) => {
	return api.put(`/${trimmed(endpoint)}/${id}`, data)
}

type GET_Model = (endpoint: string, id: Id) => ApiPromise
const getModel: GET_Model = (endpoint, id) => {
	return api.get(`/${trimmed(endpoint)}/${id}`)
}

type GET_Collection = (endpoint: string) => ApiPromise
const getCollection: GET_Collection = endpoint => {
	return api.get(`/${trimmed(endpoint)}/`)
}

export { createModel, updateModel, getModel, getCollection }