import { Navigation } from "react-native-navigation";

export const NAVIGATE_TO = 'navigation/NAVIGATE_TO'
export const NAVIGATE_BACK = 'navigation/NAVIGATE_BACK'
export const NAVIGATE_REPLACE = 'navigation/NAVIGATE_REPLACE'
export const NAVIGATE_BOTTOM_TAB = 'navigation/NAVIGATE_BOTTOM_TAB'

export function goTo(route, currentScreen='DialerScreenId') {
    return async (dispatch, getState) => {

        const screenName = getState().navigate.current.name

        dispatch( { type: NAVIGATE_TO, route } )

        if (screenName !== 'CallScreen') {
            return await Navigation.push(currentScreen, {
                component: { name: route.name }
            })
        }
    }
}

export function goAndReplace(route) {
    return (dispatch, getState) => {

        dispatch({type: NAVIGATE_REPLACE, route})
    }
}

export function goBack() {
    return async (dispatch, getState) => {

        dispatch( { type: NAVIGATE_BACK } )

        return await Navigation.popTo('DialerScreenId')
    }
}

export function goToIndexTab(route) {
    return (dispatch, getState) => {

        dispatch({type: NAVIGATE_BOTTOM_TAB, route})
    }
}
