export function deserializeBytes(array: Uint8Array): any {
	const parseToString = new TextDecoder().decode(array)
	return parseToString
}
