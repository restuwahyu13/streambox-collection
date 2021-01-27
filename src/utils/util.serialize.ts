export function serializeToBytes(chunk: Buffer): Uint8Array {
	const string: any = JSON.stringify({ data: JSON.parse(chunk.toString()) })
	const input = new Uint8Array(Array.from(string)) as Uint8Array
	const ouput = input.map((_: any, i: number) => string.charCodeAt(i)) as Uint8Array
	return ouput
}
