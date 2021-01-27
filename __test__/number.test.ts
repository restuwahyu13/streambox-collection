import * as grpcBox from '../src/index'
import { isType } from '../src/utils/util.is'

describe('grpcBox.number', () => {
	let grpc

	beforeEach(() => {
		grpc = grpcBox
	})

	it('check if is method is exist', () => {
		expect(grpc.number).toBeDefined()
		expect(grpc.number).toBeInstanceOf(Function)
	})

	it('check if is response value is buffer and return number', async (done) => {
		const res = await grpc.number(Math.pow(4, 2))
		expect(res).toBeInstanceOf(Buffer)
		expect(grpc.toNumber(res)).toBe(16)
		done()
	})

	it('check if is response value from buffer typeof is number', async (done) => {
		const res = await grpc.number(Math.pow(4, 2))
		expect(res).toBeInstanceOf(Buffer)
		expect(isType(grpc.toNumber(res))).toBe('number')
		done()
	})

	it('check if response value error is not number', (done) => {
		grpc.object({ name: 'restu wahyu saputra' }).catch((error) => {
			expect(error.message).toMatch(/object/)
			done()
		})
		done()
	})
})
