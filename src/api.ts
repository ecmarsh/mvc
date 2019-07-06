import { initApi, Api } from './lib/api';

const port = process.env.DB_PORT || 3000;

export default initApi(port) as Api;
