import express, { Express } from 'express'
import http, { Server } from 'http'
import axios from 'axios'
import * as streamBox from 'streambox-collection'

const app = express() as Express
const server = http.createServer(app) as Server

app.get('/fetch/one', () => {

	console.time(`bechmark fetch one`)

	const results = []
	for (let i = 0; i < 100000; i++) {
		results.push(
			JSON.stringify({
				id: 1,
				name: 'Leanne Graham',
				username: 'Bret',
				email: 'Sincere@april.biz',
				address: {
					street: 'Kulas Light',
					suite: 'Apt. 556',
					city: 'Gwenborough',
					zipcode: '92998-3874',
					geo: {
						lat: '-37.3159',
						lng: '81.1496'
					}
				},
				phone: '1-770-736-8031 x56442',
				website: 'hildegard.org',
				company: {
					name: 'Romaguera-Crona',
					catchPhrase: 'Multi-layered client-server neural-net',
					bs: 'harness real-time e-markets'
				}
			})
		)
	}

	streamBox.array(results).then((response) => console.log(`count: ${streamBox.toArray(response).length}`))

	console.timeEnd(`bechmark fetch one`)
})



app.get('/fetch/two', async () => {
	
	console.time(`bechmark fetch two`)

	const data1 = await axios.get('https://jsonplaceholder.typicode.com/photos')
	const data2 = await axios.get('https://jsonplaceholder.typicode.com/photos')
	const data3 = await axios.get('https://jsonplaceholder.typicode.com/photos')
	const data4 = await axios.get('https://jsonplaceholder.typicode.com/photos')
	const data5 = await axios.get('https://jsonplaceholder.typicode.com/photos')
	const data6 = await axios.get('https://jsonplaceholder.typicode.com/photos')
	const data7 = await axios.get('https://jsonplaceholder.typicode.com/photos')
	const data8 = await axios.get('https://jsonplaceholder.typicode.com/photos')
	const data9 = await axios.get('https://jsonplaceholder.typicode.com/photos')
	const data10 = await axios.get('https://jsonplaceholder.typicode.com/photos')
	const data11 = await axios.get('https://jsonplaceholder.typicode.com/photos')
	const data12 = await axios.get('https://jsonplaceholder.typicode.com/photos')
	const data13 = await axios.get('https://jsonplaceholder.typicode.com/photos')
	const data14 = await axios.get('https://jsonplaceholder.typicode.com/photos')
	const data15 = await axios.get('https://jsonplaceholder.typicode.com/photos')
	const data16 = await axios.get('https://jsonplaceholder.typicode.com/photos')
	const data17 = await axios.get('https://jsonplaceholder.typicode.com/photos')
	const data18 = await axios.get('https://jsonplaceholder.typicode.com/photos')
	const data19 = await axios.get('https://jsonplaceholder.typicode.com/photos')
	const data20 = await axios.get('https://jsonplaceholder.typicode.com/photos')

	const data = await Promise.all([
		data1.data,
		data2.data,
		data3.data,
		data4.data,
		data5.data,
		data6.data,
		data7.data,
		data8.data,
		data9.data,
		data10.data,
		data11.data,
		data12.data,
		data13.data,
		data14.data,
		data15.data,
		data16.data,
		data17.data,
		data18.data,
		data19.data,
		data20.data
	])

	streamBox.array(data).then((response) => console.log(`count: ${streamBox.toArray(response).length}`))
	
	console.timeEnd(`bechmark fetch two`)
})

server.listen(3000, () => console.log('server is running on port 3000'))
