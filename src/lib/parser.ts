import { unzipSync } from 'zlib'
import { StreamBoxCollection } from '../utils/util.error'
import { Generator, event } from '../utils/util.generator'
import { isType } from '../utils/util.is'

/**
 * parse buffer data to buffer
 */

export function toObject(chunk: Buffer): any {
	if (chunk instanceof Buffer) {
		return JSON.parse(unzipSync(chunk).toString())
	} else {
		return new StreamBoxCollection(`parameter must be a buffer you give type ${isType(chunk)}`)
	}
}

/**
 * parse buffer data to array
 */

export function toArray(chunk: Buffer): any {
	if (chunk instanceof Buffer) {
		return JSON.parse(unzipSync(chunk).toString()).data
	} else {
		return new StreamBoxCollection(`parameter must be a buffer you give type ${isType(chunk)}`)
	}
}

/**
 * parse buffer data to string
 */

export function toString(chunk: Buffer): any {
	if (chunk instanceof Buffer) {
		return unzipSync(chunk).toString()
	} else {
		return new StreamBoxCollection(`parameter must be a buffer you give type ${isType(chunk)}`)
	}
}

/**
 * parse buffer data to number
 */

export function toNumber(chunk: Buffer): any {
	if (chunk instanceof Buffer) {
		return +unzipSync(chunk).toString()
	} else {
		return new StreamBoxCollection(`parameter must be a buffer you give type ${isType(chunk)}`)
	}
}

/**
 * parse promise to callback
 */

export function toCallback(parameter: Promise<any>, callback: any): void {
	new Generator(parameter).execute().then((res) => event.emit('data', res))
	event.once('data', (chunk) => {
		const res: Record<string, any> | number | string | any[] = chunk
		callback(res)
	})
}
