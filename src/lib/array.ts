import MemoryStream from 'memorystream'
import { Transform } from 'stream'
import { gunzipSync, gzipSync } from 'zlib'
import { isType } from '../utils/util.is'
import { GrpcBox } from '../utils/util.error'
import { waitFor } from '../utils/util.wait'
import { serializeToBytes } from '../utils/util.serialize'

const stream = new MemoryStream() as MemoryStream
const transform = new Transform() as Transform

/**
 * create a data stream for the array data type
 * @param data - set stream data for consumption to the client - required
 * @param delay - set delay before returning data to the client - optional
 * @return Promise
 */

export function array(data: Record<string, any>[] | any[] | Uint8Array, delay?: number): Promise<Uint8Array> {
	return new Promise((resolve, reject) => {
		if (isType(data) === 'array') {
			const toArray: string = JSON.stringify({ data: data })
			stream.write(toArray)
			stream.once('data', (chunk): boolean => transform.emit('response', gzipSync(chunk.toString())))
		} else {
			reject(new GrpcBox(`data must be a array you give type ${isType(data)}`))
		}

		transform.once(
			'response',
			async (res): Promise<void> => {
				await waitFor(delay)
				const unzip = gunzipSync(res)
				resolve(serializeToBytes(unzip))
			}
		)
	})
}
