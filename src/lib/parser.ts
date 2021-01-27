import { GrpcBox } from '../utils/util.error'
import { isType } from '../utils/util.is'

/**
 * parse buffer data to object
 */
export function toObject(chunk: Buffer): any {
	if (chunk instanceof Buffer) {
		return JSON.parse(chunk.toString())
	} else {
		return new GrpcBox(`parameter must be a object you give type ${isType(chunk)}`)
	}
}

/**
 * parse buffer data to array
 */
export function toArray(chunk: Buffer): any {
	if (chunk instanceof Buffer) {
		return JSON.parse(chunk.toString()).data
	} else {
		return new GrpcBox(`parameter must be a object you give type ${isType(chunk)}`)
	}
}

/**
 * parse buffer data to string
 */
export function toString(chunk: Buffer): any {
	if (chunk instanceof Buffer) {
		return chunk.toString()
	} else {
		return new GrpcBox(`parameter must be a object you give type ${isType(chunk)}`)
	}
}

/**
 * parse buffer data to number
 */
export function toNumber(chunk: Buffer): any {
	if (chunk instanceof Buffer) {
		return +chunk.toString()
	} else {
		return new GrpcBox(`parameter must be a object you give type ${isType(chunk)}`)
	}
}
