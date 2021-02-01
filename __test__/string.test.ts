import * as streamBox from '../src/index'
import { isType } from '../src/utils/util.is'

describe('streamBox.string', () => {
	let stream

	beforeEach(() => {
		stream = streamBox
	})

	it('check if is method is exist', () => {
		expect(stream.string).toBeDefined()
		expect(stream.string).toBeInstanceOf(Function)
	})

	it('check if is response value is buffer and return string', async (done) => {
		const res = await stream.string('hello my name is restu')
		expect(res).toBeInstanceOf(Buffer)
		expect(stream.toString(res)).toBe('hello my name is restu')
		done()
	})

	it('check if is response value from buffer typeof is string', async (done) => {
		const res = await stream.string('hello my name is restu')
		expect(res).toBeInstanceOf(Buffer)
		expect(isType(stream.toString(res))).toBe('string')
		done()
	})

	it('check if response value error is not string', (done) => {
		stream.string(12345).catch((error) => {
			expect(error.message).toMatch(/number/)
			done()
		})
		done()
	})
})
