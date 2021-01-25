import wait, { ClearablePromise } from 'delay'

export { ClearablePromise }
export const waitFor = (delay?: number): ClearablePromise<void> =>
	delay !== undefined || null ? wait(delay) : wait(3000)
