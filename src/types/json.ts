import { Response } from 'express'

export interface IncomingMessage extends Response {}

export interface OptionsJson {
	method: string
	statusCode: number
	message: string
	delay?: number
	data?: Record<string, any> | Record<string, any>[]
}
