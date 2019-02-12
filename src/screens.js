import { Navigation } from 'react-native-navigation';

import { Provider } from 'react-redux';
import configureStore from './configureStore'

import { init }  from './actions/app'
import { goAndReplace, goTo } from './actions/navigate';

const store = configureStore();

store.dispatch(async (dispatch, getState) => {

    await dispatch(init())

    // Render
    let route = { name: 'SettingsScreenId', index: 3 }
    const { calls, accounts } = getState().pjsip
    let isGoTo = false

    for (const id in accounts) {
        if (accounts.hasOwnProperty(id)) {
            route = { name: 'DialerScreenId', index: 0 }
            break
        }
    }

    for (const id in calls) {
        if (calls.hasOwnProperty(id)) {
            const call = calls[id]
            if (call.getState() === "PJSIP_INV_STATE_INCOMING") {
                route = { name: 'CallScreenId', call }
                isGoTo = true
                break
            }
        }
    }

    !isGoTo ? dispatch(goAndReplace(route)) : dispatch(goTo(route))
})

export function registerScreens() {
    Navigation.registerComponentWithRedux('LaunchScreen', (sc) => require('./screens/LaunchScreen').default, Provider, store);

    Navigation.registerComponentWithRedux('SideMenu', () => require('./screens/SideMenu').default, Provider, store);
    Navigation.registerComponentWithRedux('About', () => require('./screens/About').default, Provider, store);

    Navigation.registerComponentWithRedux('DialerScreen', () => require('./containers/dialer/DialerScreen').default, Provider, store);
    Navigation.registerComponentWithRedux('ContactsScreen', () => require('./containers/contacts/ContactsScreen').default, Provider, store);
    Navigation.registerComponentWithRedux('HistoryScreen', () => require('./containers/history/HistoryScreen').default, Provider, store);
    Navigation.registerComponentWithRedux('SettingsScreen', () => require('./containers/settings/SettingsScreen').default, Provider, store);

    Navigation.registerComponentWithRedux('AccountScreen', () => require('./screens/AccountScreen').default, Provider, store);
    Navigation.registerComponentWithRedux('NetworkSettingsScreen', () => require('./screens/NetworkSettingsScreen').default, Provider, store);
    Navigation.registerComponentWithRedux('MediaSettingsScreen', () => require('./screens/MediaSettingsScreen').default, Provider, store);

    Navigation.registerComponentWithRedux('CallScreen', () => require('./screens/CallScreen').default, Provider, store);

    Navigation.registerComponentWithRedux('Screen2', () => require('./screens/Screen2').default, Provider, store);
}
