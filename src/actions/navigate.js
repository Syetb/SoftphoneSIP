import { Navigation } from "react-native-navigation";

export const NAVIGATE_TO = 'navigation/NAVIGATE_TO'
export const NAVIGATE_BACK = 'navigation/NAVIGATE_BACK'
export const NAVIGATE_REPLACE = 'navigation/NAVIGATE_REPLACE'

export function goTo(route, currentScreen='DialerScreenId') {
    return async (dispatch, getState) => {
        dispatch( { type: NAVIGATE_TO, route } )

        return await Navigation.push(currentScreen, {
            component: { name: route.name }
        })
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

export function goBottomTab(route, tabIndex=3) {
    return async (dispatch, getState) => {
        dispatch({ type: NAVIGATE_REPLACE, route })

        // return await Navigation.mergeOptions('BottomTabsId', {
        //     bottomTabs: {
        //         currentTabIndex: tabIndex
        //     }
        // });

        return await Navigation.mergeOptions('tabs', {
            bottomTabs: {
                currentTabId: route.name
            }
        });
    }
}
