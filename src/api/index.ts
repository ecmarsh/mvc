import Api, { initApi } from './Api'
import ApiSync from './Sync'

export default initApi(process.env.DB_PORT)(Api)
export { ApiSync }
