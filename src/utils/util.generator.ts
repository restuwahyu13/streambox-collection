import EventEmitter from 'events'
import { isType } from './util.is'
import { StreamBoxCollection } from './util.error'

export let event = new EventEmitter()

export class Generator {
	private promise: any
	private iterator: globalThis.Generator
	private next: any

	constructor(handler: any) {
		this.promise = handler
		this.iterator = this.generator()
		this.next = this.iterator.next()
	}

	private *generator(): globalThis.Generator {
		yield this.promise
	}

	public execute(): Promise<any> | any {
		if (this.next.value instanceof Promise) {
			return this.next.value
		} else {
			return new StreamBoxCollection(`parameter must be a Promise you give type ${isType(this.next.value)}`)
		}
	}
}
