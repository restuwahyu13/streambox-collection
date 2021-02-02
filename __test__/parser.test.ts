import * as streamBox from '../src/index'
import { httpRequestTest } from '../src/utils/util.http'
import { isType } from 'is-any-type'
import { gzipSync } from 'zlib'

describe('streamboxBox.parser', () => {
	let streambox
	let is

	beforeEach(() => {
		streambox = streamBox
		is = isType
	})

	it('check if is method is exist', () => {
		expect(streambox.object).toBeDefined()
		expect(streambox.array).toBeDefined()
		expect(streambox.string).toBeDefined()
		expect(streambox.number).toBeDefined()
		expect(streambox.object).toBeInstanceOf(Function)
		expect(streambox.array).toBeInstanceOf(Function)
		expect(streambox.string).toBeInstanceOf(Function)
		expect(streambox.number).toBeInstanceOf(Function)
		expect(streambox.toCallback).toBeInstanceOf(Function)
	})

	it('check if is response value type is object', () => {
		const data = JSON.stringify({ name: 'restu wahyu saputra' })
		const object = streambox.toObject(gzipSync(Buffer.from(data)))
		expect(is(object)).toBe('object')
		expect(object).toMatchObject({ name: 'restu wahyu saputra' })
	})

	it('check if is response value type is array', () => {
		const data: any = JSON.stringify({ data: [{ name: 'restu wahyu saputra' }] })
		const array = streambox.toArray(gzipSync(Buffer.from(data)))
		expect(is(array)).toBe('array')
		expect(array).toMatchObject([{ name: 'restu wahyu saputra' }])
	})

	it('check if is response value type is string', () => {
		const data = 'restu wahyu saputra'
		const string = streambox.toString(gzipSync(Buffer.from(data)))
		expect(is(string)).toBe('string')
		expect(string).toEqual('restu wahyu saputra')
	})

	it('check if is response value type is number', () => {
		const data = Math.pow(4, 2).toString()
		const number = streambox.toNumber(gzipSync(Buffer.from(data)))
		expect(is(number)).toBe('number')
		expect(number).toEqual(16)
	})

	it('check if is response value is hello word', () => {
		streambox.toCallback(Promise.resolve('hello wordl'), (err, res) => {
			expect(is(err)).toEqual('object')
			expect(is(res)).toBe('string')
			expect(res).toEqual('hello wordl')
		})
	})

	it('check if is response value is error', (done) => {
		const http = httpRequestTest('https://jsonplaceholder.typicode.com/usersx', 'get')
		streambox.toCallback(http, (err, res) => {
			expect(is(res)).toEqual('undefined')
			expect(err.response.status).toEqual(404)
			expect(err.response.statusText).toEqual('Not Found')
			done()
		})
		done()
	})

	it('check if is response value type is not object and throw error', () => {
		const data = 12345
		const object = streambox.toObject(data)
		expect(object.message).toMatch(/number/)
	})

	it('check if is response value type is not array and throw error', () => {
		const data = 12345
		const array = streambox.toArray(data)
		expect(array.message).toMatch(/number/)
	})

	it('check if is response value type is not string and throw error', () => {
		const data = 12345
		const string = streambox.toString(data)
		expect(string.message).toMatch(/number/)
	})

	it('check if is response value type is not number and throw error', () => {
		const data = '12345'
		const string = streambox.toNumber(data)
		expect(string.message).toMatch(/string/)
	})

	it('check if is response value type is not promise and throw error', () => {
		streambox.toCallback('hello wordl', (err, res) => {
			expect(is(res)).toEqual('undefined')
			expect(err.message).toMatch(/string/)
		})
	})
})
