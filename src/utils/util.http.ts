import axios, { Method } from 'axios'

export function httpRequestTest(url: string, method: string): Promise<any> {
	return new Promise((resolve, reject) => {
		axios({
			url: url,
			method: method.toUpperCase() as Method,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json'
			}
		})
			.then(resolve)
			.catch(reject)
	})
}
