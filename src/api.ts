import axios from 'axios'
import { UserProps } from './models/User'

const baseURL = `http://localhost:${process.env.DEV_DB_PORT}/`
const api = axios.create({ baseURL })

const createNewUser = (userProps: UserProps) => api.post('/users/', userProps)

const getUser = (id: number | string) => {
	return api.get(`/users/${id}`).then(res => res.data)
}

const getAllUsers = () => api.get('/users/')
	.then(res => res.data)
	.catch(err => console.error(err))

const updateUser = (id: number | string, data: UserProps) => {
	return api.put(`/users/${id}`, data)
}

export { createNewUser, getUser, getAllUsers, updateUser }