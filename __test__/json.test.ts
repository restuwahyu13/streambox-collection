import * as grpcMessage from '../src/index'

describe('json.test.ts', () => {
	let grpc

	beforeEach(() => {
		jest.resetAllMocks()
		grpc = grpcMessage
	})

	afterAll(() => {
		jest.clearAllMocks()
	})

	it('method hash been called', () => {
		const spyGrpc = jest.spyOn(grpc, 'json')
		grpc.json()
		expect(spyGrpc).toHaveBeenCalled()
		expect(spyGrpc).toHaveBeenCalledTimes(1)
	})

	it('not returning value because this void method', () => {
		expect(grpc.json()).toBeUndefined()
	})
})
