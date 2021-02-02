import * as streamBox from '../src/index'
import { isType } from 'is-any-type'
import { httpRequestTest } from '../src/utils/util.http'

describe('streamBox.object', () => {
	let stream
	let is

	beforeEach(() => {
		stream = streamBox
		is = isType
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
		expect(is(stream.toObject(res))).toBe('object')
		done()
	})

	it('check if is response value is object from api', async (done) => {
		const { data } = await httpRequestTest('https://jsonplaceholder.typicode.com/users', 'get')
		const res = await stream.object(data[0])
		expect(is(stream.toObject(res))).toBe('object')
		done()
	})

	it('check if response value error is not object', (done) => {
		stream.object(12345).catch((error) => {
			expect(error.message).toMatch(/number/)
			done()
		})
	})
})
