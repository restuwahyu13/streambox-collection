import MemoryStream from 'memorystream'
import { Transform } from 'stream'
import { gunzipSync, gzipSync } from 'zlib'
import { isType } from '../utils/util.is'
import { GrpcBox } from '../utils/util.error'
import { waitFor } from '../utils/util.wait'

const stream = new MemoryStream() as MemoryStream
const transform = new Transform() as Transform

export function array(data: Record<string, any>, delay?: number): Promise<any[]> {
  return new Promise((resolve, reject) => {
		if (isType(data) === 'array') {
			const toJson: string = JSON.stringify({ 'data': data })
			stream.write(toJson)
			stream.once('data', (chunk): boolean => transform.emit('data', gzipSync(chunk.toString())))
		} else {
			reject(new GrpcBox(`parameter must be a array you give type ${isType(data)}`))
		}

		transform.once('data', async (res): Promise<void> => {
			await waitFor(delay)
			const unzip = gunzipSync(res)
			resolve(JSON.parse(unzip.toString()))
		})
})
}
