import { unzipSync } from 'zlib'
import { StreamBoxError } from '../utils/util.error'
import { Generator } from '../utils/util.generator'
import { isType } from '../utils/util.is'

/**
 * parse buffer data to buffer
 */

export function toObject(chunk: Buffer): any {
	if (chunk instanceof Buffer) {
		return JSON.parse(unzipSync(chunk).toString())
	} else {
		return new StreamBoxError(`parameter must be a buffer you give type ${isType(chunk)}`)
	}
}

/**
 * parse buffer data to array
 */

export function toArray(chunk: Buffer): any {
	if (chunk instanceof Buffer) {
		return JSON.parse(unzipSync(chunk).toString()).data
	} else {
		return new StreamBoxError(`parameter must be a buffer you give type ${isType(chunk)}`)
	}
}

/**
 * parse buffer data to string
 */

export function toString(chunk: Buffer): any {
	if (chunk instanceof Buffer) {
		return unzipSync(chunk).toString()
	} else {
		return new StreamBoxError(`parameter must be a buffer you give type ${isType(chunk)}`)
	}
}

/**
 * parse buffer data to number
 */

export function toNumber(chunk: Buffer): any {
	if (chunk instanceof Buffer) {
		return +unzipSync(chunk).toString()
	} else {
		return new StreamBoxError(`parameter must be a buffer you give type ${isType(chunk)}`)
	}
}

/**
 * parse promise to callback
 */

export function toCallback(parameter: Promise<any>, callback: any): void {
	let response
	let error

	if (parameter instanceof Promise) {
		new Generator(parameter).execute().then((res) => {
			response = res
			callback(error, response)
		})
	} else {
		error = new StreamBoxError(`parameter must be a Promise you give type ${isType(parameter)}`)
		callback(error, response)
	}
}
