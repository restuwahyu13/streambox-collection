import * as grpcBox from '../src/index'
import { isType } from '../src/utils/util.is'
import { httpRequestTest } from '../src/utils/util.http'

describe('grpcBox.array', () => {
	let grpc

	beforeEach(() => {
		grpc = grpcBox
	})

	it('check if is method is exist', () => {
		expect(grpc.array).toBeDefined()
		expect(grpc.array).toBeInstanceOf(Function)
	})

	it('check if is response value is buffer and return array', async (done) => {
		const res = await grpc.array([{ name: 'restu wahyu saputra' }])
		expect(res).toBeInstanceOf(Buffer)
		expect(grpc.toArray(res)).toMatchObject([{ name: 'restu wahyu saputra' }])
		done()
	})

	it('check if is response value from Buffer typeof is array', async (done) => {
		const res = await grpc.array([{ name: 'restu wahyu saputra' }])
		expect(res).toBeInstanceOf(Buffer)
		expect(isType(grpc.toArray(res))).toBe('array')
		done()
	})

	it('check if is response value is array from api', async (done) => {
		const { data } = await httpRequestTest('https://jsonplaceholder.typicode.com/users', 'get')
		const res = await grpc.array(data)
		expect(isType(grpc.toArray(res))).toStrictEqual('array')
		done()
	})

	it('check if object property in response from api is match', async (done) => {
		const { data } = await httpRequestTest('https://jsonplaceholder.typicode.com/users', 'get')
		const res = await grpc.array(data)
		expect(grpc.toArray(res).length).toBe(10)
		expect(grpc.toArray(res)).toMatchObject(data)
		done()
	})

	it('check if response value error is not array', (done) => {
		grpc.array(12345).catch((error) => {
			expect(error.message).toMatch(/number/)
			done()
		})
		done()
	})
})
