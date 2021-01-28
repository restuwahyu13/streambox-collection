import axios from 'axios'
import * as streamBox from 'streambox-collection'
console.time()

async function streamboxBechmark() {
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
}

streamboxBechmark()

console.timeEnd()
