import * as grpcBox from '../src/index'
import { isType } from '../src/utils/util.is'
import { httpRequestTest } from '../src/utils/util.http'

describe('grpcBox.object', () => {
	let grpc

	beforeEach(() => {
		grpc = grpcBox
	})

	it('check if is method is exist', () => {
		expect(grpc.object).toBeDefined()
		expect(grpc.object).toBeInstanceOf(Function)
	})

	it('check if is response value is Uint8Array and return object', async (done) => {
		const res = await grpc.object({ name: 'restu wahyu saputra' })
		expect(res).toBeInstanceOf(Uint8Array)
		expect(grpc.toObject(res)).toMatchObject({ name: 'restu wahyu saputra' })
		done()
	})

	it('check if is response value from Uint8Array typeof is object', async (done) => {
		const res = await grpc.object({ name: 'restu wahyu saputra' })
		expect(res).toBeInstanceOf(Uint8Array)
		expect(isType(grpc.toObject(res))).toBe('object')
		done()
	})

	it('check if is response value is object from api', async (done) => {
		const { data } = await httpRequestTest('https://jsonplaceholder.typicode.com/users', 'get')
		const res = await grpc.object(data[0])
		expect(isType(grpc.toObject(res))).toStrictEqual('object')
		done()
	})

	it('check if object property in response from api is match', async (done) => {
		const { data } = await httpRequestTest('https://jsonplaceholder.typicode.com/users', 'get')
		const res = await grpc.object(data[0])
		expect(grpc.toObject(res)).toHaveProperty('name')
		expect(grpc.toObject(res)).toHaveProperty('name', 'Leanne Graham')
		done()
	})

	it('check if response value error is not object', (done) => {
		grpc.object(12345).catch((error) => {
			expect(error.message).toMatch(/number/)
			done()
		})
		done()
	})
})
