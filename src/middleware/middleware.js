import { getState, StateKeys } from '../utils/helpers'

export const isAuthenticated = () => {
    const access = getState(StateKeys.ACCESS)
    const refresh = getState(StateKeys.REFRESH)
    if (access && refresh) return true
    return false
}
