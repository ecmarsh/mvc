import axios, { AxiosResponse, AxiosPromise, AxiosError } from 'axios'

type ApiResponse = AxiosResponse
type ApiPromise = AxiosPromise
type ApiError = AxiosError
type Id = number

interface ModelData {
	id?: Id
}

const baseURL = `http://localhost:${process.env.DB_PORT}`
const api = axios.create({ baseURL })

type POST = (endpoint: string, data: ModelData) => ApiPromise
const createModel: POST = (endpoint, data) => {
	return api.post(`/${trimmed(endpoint)}/`, data)
}

type PUT = (endpoint: string, id: Id, data: ModelData) => ApiPromise
const updateModel: PUT = (endpoint, id, data) => {
	return api.put(`/${trimmed(endpoint)}/${id}`, data)
}

type GET = (endpoint: string, id: Id) => ApiPromise
const getModel: GET = async (endpoint, id) => {
	return api.get(`/${trimmed(endpoint)}/${id}`)
}


// API Types
export { ApiResponse, ApiPromise, ApiError }

// API Functions
export { createModel, updateModel, getModel }

// Helpers
const trimSlashes = (str: string): string => {
	const ref = [str]
	const isLeadingSlash = /^\//.test(str)
	const isTrailingSlash = /\/$/.test(str)
	const trimLeadingSlash = () => { ref[0] = ref[0].substring(1) }
	const trimTrailingSlash = () => { ref[0] = ref[0].substring(0, str.length - 1) }

	if (isLeadingSlash) {
		trimLeadingSlash()
	}
	if (isTrailingSlash) {
		trimTrailingSlash()
	}

	const trimmedStr = ref[0]
	return trimmedStr
}
const trimmed = trimSlashes