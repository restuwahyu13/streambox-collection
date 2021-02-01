import * as streamBox from '../src/index'
import { isType } from '../src/utils/util.is'
import { httpRequestTest } from '../src/utils/util.http'

describe('streamBox.object', () => {
	let stream

	beforeEach(() => {
		stream = streamBox
	})

	it('check if is method is exist', () => {
		expect(stream.object).toBeDefined()
		expect(stream.object).toBeInstanceOf(Function)
	})

	it('check if is response value is Buffer and return object', async (done) => {
		const res = await stream.object({ name: 'restu wahyu saputra' })
		expect(res).toBeInstanceOf(Buffer)
		expect(stream.toObject(res)).toMatchObject({ name: 'restu wahyu saputra' })
		done()
	})

	it('check if is response value from Buffer typeof is object', async (done) => {
		const res = await stream.object({ name: 'restu wahyu saputra' })
		expect(res).toBeInstanceOf(Buffer)
		expect(isType(stream.toObject(res))).toBe('object')
		done()
	})

	it('check if is response value is object from api', async (done) => {
		const { data } = await httpRequestTest('https://jsonplaceholder.typicode.com/users', 'get')
		const res = await stream.object(data[0])
		expect(isType(stream.toObject(res))).toStrictEqual('object')
		done()
	})

	it('check if object property in response from api is match', async (done) => {
		const { data } = await httpRequestTest('https://jsonplaceholder.typicode.com/users', 'get')
		const res = await stream.object(data[0])
		expect(stream.toObject(res)).toHaveProperty('name')
		expect(stream.toObject(res)).toHaveProperty('name', 'Leanne Graham')
		done()
	})

	it('check if response value error is not object', (done) => {
		stream.object(12345).catch((error) => {
			expect(error.message).toMatch(/number/)
			done()
		})
		done()
	})
})
