export class GrpcBox extends Error {
	public name: string
	public message: string

	constructor(message: string) {
		super()
		this.name = this.constructor.name
		this.message = message
		Error.captureStackTrace(this, this.constructor)
	}
}
