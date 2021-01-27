import * as grpcBox from '../src/index'
import { isType } from '../src/utils/util.is'

describe('grpcBox.string', () => {
	let grpc

	beforeEach(() => {
		grpc = grpcBox
	})

	it('check if is method is exist', () => {
		expect(grpc.string).toBeDefined()
		expect(grpc.string).toBeInstanceOf(Function)
	})

	it('check if is response value is buffer and return string', async (done) => {
		const res = await grpc.string('hello my name is restu')
		expect(res).toBeInstanceOf(Buffer)
		expect(grpc.toString(res)).toBe('hello my name is restu')
		done()
	})

	it('check if is response value from buffer typeof is string', async (done) => {
		const res = await grpc.string('hello my name is restu')
		expect(res).toBeInstanceOf(Buffer)
		expect(isType(grpc.toString(res))).toBe('string')
		done()
	})

	it('check if response value error is not string', (done) => {
		grpc.string(12345).catch((error) => {
			expect(error.message).toMatch(/number/)
			done()
		})
		done()
	})
})
