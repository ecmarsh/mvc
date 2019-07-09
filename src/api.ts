import { Api } from './lib/api';

interface InitApi {
	init: () => Api
}

function buildApi(rootURL: string) {
	return function (urlAdds: string): InitApi {
		return {
			init: function init(): Api {
				return Api.createInstance(rootURL + urlAdds)
			}
		}
	}
}

const port = process.env.DB_PORT || `3000`
const devApi = buildApi(`http://localhost:`)(port)

export default devApi.init()
