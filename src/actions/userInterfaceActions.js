import { LOADING_START, LOADING_STOP } from '../types'

export const loadingStarted = message => {
  return { type: LOADING_START, payload: message }
}

export const loadingStopped = () => {
  return { type: LOADING_STOP }
}
