import * as streamBox from '../src/index'
import { isType } from 'is-any-type'

describe('streamBox.number', () => {
	let stream
	let is

	beforeEach(() => {
		stream = streamBox
		is = isType
	})

	it('check if is method is exist', () => {
		expect(stream.number).toBeDefined()
		expect(stream.number).toBeInstanceOf(Function)
	})

	it('check if is response value is buffer and return number', async (done) => {
		const res = await stream.number(Math.pow(4, 2))
		expect(res).toBeInstanceOf(Buffer)
		expect(stream.toNumber(res)).toBe(16)
		done()
	})

	it('check if is response value from buffer typeof is number', async (done) => {
		const res = await stream.number(Math.pow(4, 2))
		expect(res).toBeInstanceOf(Buffer)
		expect(is(stream.toNumber(res))).toBe('number')
		done()
	})

	it('check if response value error is not number', (done) => {
		stream.number('12345').catch((error) => {
			expect(error.message).toMatch(/string/)
			done()
		})
	})
})
