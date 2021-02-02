import * as streamBox from '../src/index'
import { isType } from 'is-any-type'
import { httpRequestTest } from '../src/utils/util.http'

describe('streamBox.array', () => {
	let stream
	let is

	beforeEach(() => {
		stream = streamBox
		is = isType
	})

	it('check if is method is exist', () => {
		expect(stream.array).toBeDefined()
		expect(stream.array).toBeInstanceOf(Function)
	})

	it('check if is response value is buffer and return array', async (done) => {
		const res = await stream.array([{ name: 'restu wahyu saputra' }])
		expect(res).toBeInstanceOf(Buffer)
		expect(stream.toArray(res)).toMatchObject([{ name: 'restu wahyu saputra' }])
		done()
	})

	it('check if is response value from Buffer typeof is array', async (done) => {
		const res = await stream.array([{ name: 'restu wahyu saputra' }])
		expect(res).toBeInstanceOf(Buffer)
		expect(is(stream.toArray(res))).toBe('array')
		done()
	})

	// it('check if is response value is array from api', async (done) => {
	// 	const { data } = await httpRequestTest('https://jsonplaceholder.typicode.com/users', 'get')
	// 	const res = await stream.array(data)
	// 	expect(is(stream.toArray(res))).toBe('array')
	// 	done()
	// })

	it('check if object property in response from api is match', async (done) => {
		const { data } = await httpRequestTest('https://jsonplaceholder.typicode.com/users', 'get')
		const res = await stream.array(data)
		expect(stream.toArray(res).length).toBe(10)
		expect(stream.toArray(res)).toMatchObject(data)
		done()
	})

	it('check if response value error is not array', (done) => {
		stream.array(12345).catch((error) => {
			expect(error.message).toMatch(/number/)
			done()
		})
	})
})
