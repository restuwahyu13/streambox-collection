import wait, { ClearablePromise } from 'delay'
import { isType } from 'is-any-type'

export { ClearablePromise }
export const waitFor = (delay: number): ClearablePromise<void> => (isType(delay) === 'number' ? wait(delay) : wait(0))
