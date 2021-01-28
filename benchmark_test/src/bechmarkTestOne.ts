import * as streamBox from 'streambox-collection'

let dateNow = new Date().toISOString()

console.time(`bechmark test one: ${dateNow}`)

function streamboxBechmark() {
	const results = []
	for (let i = 0; i < 1000000; i++) {
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

	console.timeEnd(`bechmark test one: ${dateNow}`)
}

streamboxBechmark()


