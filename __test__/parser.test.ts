import * as grpcBox from '../src/index'
import { isType } from '../src/utils/util.is'
import { gzipSync } from 'zlib'

describe('grpcBox.parser', () => {
	let grpc

	beforeEach(() => {
		grpc = grpcBox
	})

	it('check if is method is exist', () => {
		expect(grpc.object).toBeDefined()
		expect(grpc.array).toBeDefined()
		expect(grpc.string).toBeDefined()
		expect(grpc.number).toBeDefined()
		expect(grpc.object).toBeInstanceOf(Function)
		expect(grpc.array).toBeInstanceOf(Function)
		expect(grpc.string).toBeInstanceOf(Function)
		expect(grpc.number).toBeInstanceOf(Function)
	})

	it('check if is response value type is object', () => {
		const data = JSON.stringify({ name: 'restu wahyu saputra' })
		const object = grpc.toObject(gzipSync(Buffer.from(data)))
		expect(isType(object)).toBe('object')
		expect(object).toMatchObject({ name: 'restu wahyu saputra' })
	})

	it('check if is response value type is array', () => {
		const data: any = JSON.stringify({ data: [{ name: 'restu wahyu saputra' }] })
		const array = grpc.toArray(gzipSync(Buffer.from(data)))
		expect(isType(array)).toBe('array')
		expect(array).toMatchObject([{ name: 'restu wahyu saputra' }])
	})

	it('check if is response value type is string', () => {
		const data = 'restu wahyu saputra'
		const string = grpc.toString(gzipSync(Buffer.from(data)))
		expect(isType(string)).toBe('string')
		expect(string).toEqual('restu wahyu saputra')
	})

	it('check if is response value type is number', () => {
		const data = Math.pow(4, 2).toString()
		const number = grpc.toNumber(gzipSync(Buffer.from(data)))
		expect(isType(number)).toBe('number')
		expect(number).toEqual(16)
	})

	it('check if is response value type is not object and throw error', () => {
		const data = 12345
		const object = grpc.toObject(data)
		expect(object.message).toMatch(/number/)
	})

	it('check if is response value type is not array and throw error', () => {
		const data = 12345
		const array = grpc.toArray(data)
		expect(array.message).toMatch(/number/)
	})

	it('check if is response value type is not string and throw error', () => {
		const data = 12345
		const string = grpc.toString(data)
		expect(string.message).toMatch(/number/)
	})

	it('check if is response value type is not number and throw error', () => {
		const data = '12345'
		const string = grpc.toNumber(data)
		expect(string.message).toMatch(/string/)
	})
})
