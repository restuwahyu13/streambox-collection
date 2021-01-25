import * as grpcMessage from '../src/index'

describe('string.test.ts', () => {
	let grpc

	beforeEach(() => {
		jest.resetAllMocks()
		grpc = grpcMessage
	})

	afterAll(() => {
		jest.clearAllMocks()
	})

	it('method hash been called', () => {
		const spyGrpc = jest.spyOn(grpc, 'string')
		grpc.string()
		expect(spyGrpc).toHaveBeenCalled()
		expect(spyGrpc).toHaveBeenCalledTimes(1)
	})

	it('not returning value because this void method', () => {
		expect(grpc.string()).toBeUndefined()
	})
})
