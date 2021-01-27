import wait, { ClearablePromise } from 'delay'
import { isType } from './util.is'

export { ClearablePromise }
export const waitFor = (delay: number): ClearablePromise<void> => (isType(delay) === 'number' ? wait(delay) : wait(0))
