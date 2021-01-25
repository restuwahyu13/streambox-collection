import { Response } from 'express'
import { waitFor, ClearablePromise } from '../utils/util.wait'
import EventEmitter from 'eventemitter3'
import { GrpcError } from '../utils/util.error'

let event = new EventEmitter()

export interface IncomingMessage extends Response {}

export interface OptionsJson {
	method: string
	statusCode: number
	message: string
	delay?: number
	data?: Record<string, any> | Record<string, any>[]
}

/**
 * displaying message to json format
@param incomingMessage - set incoming messages to retrieve all handlers - required
@param T - set the options to display message format - required
@return void
 */

export const json = (incomingMessage: IncomingMessage, options: Readonly<OptionsJson>): void => {
	try {
		let opt: OptionsJson = { ...options }
		let wait = waitFor(opt.delay) as ClearablePromise<void>

		if (!incomingMessage || !options) {
			incomingMessage.json({ error: new GrpcError('parameter is required') })
		} else if ((Object.keys(options).length < 1 && opt.method !== undefined) || null) {
			incomingMessage.json({ error: new GrpcError('options is required') })
		} else if ((typeof opt.method !== 'string' && opt.method !== undefined) || null) {
			incomingMessage.json({ error: new GrpcError('method must be a string') })
		} else if ((typeof opt.statusCode !== 'number' && opt.statusCode !== undefined) || null) {
			incomingMessage.json({ error: new GrpcError('statusCode must be a number') })
		} else if ((typeof opt.message !== 'string' && opt.message !== undefined) || null) {
			incomingMessage.json({ error: new GrpcError('message must be a string') })
		} else if ((typeof opt.delay !== 'number' && opt.delay !== undefined) || null) {
			incomingMessage.json({ error: new GrpcError('delay must be a number') })
		} else if ((typeof opt.data !== 'object' && opt.data !== undefined) || null) {
			incomingMessage.json({ error: new GrpcError('data must be a object or array') })
		} else {
			event.once('message', (data): void => {
				incomingMessage.status(data.statusCode).json({ ...data })
			})
			event.emit('message', { ...opt })
			event.removeListener('message')
		}
		wait.clear()
} catch (e) {}
}
