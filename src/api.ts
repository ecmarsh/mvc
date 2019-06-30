import axios, { AxiosResponse, AxiosPromise } from 'axios'
import { UserProps } from './models/User'

type ApiResponse<T = any> = AxiosResponse
type ApiPromise = Promise<ApiResponse<any>>

const baseURL = `http://localhost:${process.env.DB_PORT}/`
const api = axios.create({ baseURL })

const createNewUser = (userProps: UserProps): ApiPromise => api.post('/users/', userProps)

const getUser = (id: number | string): ApiPromise =>
	api.get(`/users/${id}`)
		.then(res => res.data)
		.catch(err => console.error(err))

const getAllUsers = (): ApiPromise =>
	api.get('/users/')
		.then(res => res.data)
		.catch(err => console.error(err))

const updateUser = (id: number | string, data: UserProps) => api.put(`/users/${id}`, data)


export { ApiResponse, ApiPromise, createNewUser, getUser, getAllUsers, updateUser }