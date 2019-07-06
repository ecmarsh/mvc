import { initApi } from './Api'

// Use a singleton api instance
export default initApi(process.env.DB_PORT)
export { Sync as ApiSync } from './Sync'
