import { waitFor, ClearablePromise } from '../utils/util.wait'
import EventEmitter from 'eventemitter3'
import { GrpcError } from '../utils/util.error'
import { IncomingMessage } from '../types/string'

let event = new EventEmitter()

/**
 * displaying message to string format
@param incomingMessage - set incoming messages to retrieve all handlers - required
@param message - set messages for displaying into screen - required
@param statusCode - set http status code for http headers - optional
@param delay - set delay for pause message before displaying into screen - optional
@return void
 */

export const string = (incomingMessage: IncomingMessage, message: string, statusCode?: number, delay?: number): void => {
	try {
		let wait = waitFor(delay) as ClearablePromise<void>

		if (!incomingMessage || !message) {
			incomingMessage.json({ error: new GrpcError('parameter is required') })
		} else if ((typeof message !== 'string' && message !== undefined) || null) {
			incomingMessage.json({ error: new GrpcError('message must be a string') })
		} else if ((typeof delay !== 'number' && delay !== undefined) || null) {
			incomingMessage.json({ error: new GrpcError('delay must be a number') })
		} else {
			event.once('message', (data): void => {
				incomingMessage.status(data.statusCode || 200).send(data.message)
			})
			event.emit('message', { message, statusCode })
			event.removeListener('message')
		}
		wait.clear()
	} catch (e) {}
}
