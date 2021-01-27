import { GrpcBox } from '../utils/util.error'
import { isType } from '../utils/util.is'
import { deserializeBytes } from '../utils/util.deserialize'

/**
 * parse buffer data to object
 */

export function toObject(chunkByte: Uint8Array): any {
	if (chunkByte instanceof Uint8Array) {
		return JSON.parse(deserializeBytes(chunkByte).toString()).data
	} else {
		return new GrpcBox(`parameter must be a object you give type ${isType(chunkByte)}`)
	}
}

/**
 * parse buffer data to array
 */

export function toArray(chunkByte: Uint8Array): any {
	if (chunkByte instanceof Uint8Array) {
		return JSON.parse(deserializeBytes(chunkByte).toString()).data.data
	} else {
		return new GrpcBox(`parameter must be a object you give type ${isType(chunkByte)}`)
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
