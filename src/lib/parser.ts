import { GrpcBox } from '../utils/util.error'
import { isType } from '../utils/util.is'

/**
 * parse buffer data to object
 */
export function toObject<T extends Record<string, any>>(chunk: Buffer): T {
	if (chunk instanceof Buffer) {
		return JSON.parse(chunk.toString())
	} else {
		Promise.reject(new GrpcBox(`parameter must be a object you give type ${isType(chunk)}`))
	}
}

/**
 * parse buffer data to array
 */
export function toArray<T extends Record<string, any>>(chunk: Buffer): T {
	if (chunk instanceof Buffer) {
		return JSON.parse(chunk.toString()).data
	} else {
		Promise.reject(new GrpcBox(`parameter must be a object you give type ${isType(chunk)}`))
	}
}

/**
 * parse buffer data to string
 */
export function toString(chunk: Buffer): string {
	if (chunk instanceof Buffer) {
		return chunk.toString()
	} else {
		Promise.reject(new GrpcBox(`parameter must be a object you give type ${isType(chunk)}`))
	}
}

/**
 * parse buffer data to number
 */
export function toNumber(chunk: Buffer): number {
	if (chunk instanceof Buffer) {
		return +chunk.toString()
	} else {
		Promise.reject(new GrpcBox(`parameter must be a object you give type ${isType(chunk)}`))
	}
}
