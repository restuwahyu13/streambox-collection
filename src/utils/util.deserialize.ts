export function deserializeBytes(array: Uint8Array): Buffer {
	const parseToString = new TextDecoder().decode(array)
	return Buffer.from(parseToString)
}
