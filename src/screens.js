import { Navigation } from 'react-native-navigation';

import { Provider } from 'react-redux';
import configureStore from './configureStore'

const store = configureStore();

export function registerScreens() {
    Navigation.registerComponentWithRedux('LaunchScreen', (sc) => require('./screens/LaunchScreen').default, Provider, store);

    Navigation.registerComponentWithRedux('SideMenu', () => require('./screens/SideMenu').default, Provider, store);
    Navigation.registerComponentWithRedux('About', () => require('./screens/About').default, Provider, store);

    Navigation.registerComponentWithRedux('DialerScreen', () => require('./containers/dialer/DialerScreen').default, Provider, store);
    Navigation.registerComponentWithRedux('ContactsScreen', () => require('./containers/contacts/ContactsScreen').default, Provider, store);
    Navigation.registerComponentWithRedux('HistoryScreen', () => require('./containers/history/HistoryScreen').default, Provider, store);
    Navigation.registerComponentWithRedux('SettingsScreen', () => require('./containers/settings/SettingsScreen').default, Provider, store);

    Navigation.registerComponentWithRedux('AccountScreen', () => require('./screens/AccountScreen').default, Provider, store);

    Navigation.registerComponentWithRedux('Screen2', () => require('./screens/Screen2').default, Provider, store);
}
