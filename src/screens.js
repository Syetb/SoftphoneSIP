import { Navigation } from 'react-native-navigation';

export function registerScreens() {
    Navigation.registerComponent('LaunchScreen', (sc) => require('./screens/LaunchScreen').default);

    Navigation.registerComponent('SideMenu', () => require('./screens/SideMenu').default);
    Navigation.registerComponent('About', () => require('./screens/About').default);

    Navigation.registerComponent('DialerScreen', () => require('./containers/dialer/DialerScreen').default);
    Navigation.registerComponent('ContactsScreen', () => require('./containers/contacts/ContactsScreen').default);
    Navigation.registerComponent('HistoryScreen', () => require('./containers/history/HistoryScreen').default);
    Navigation.registerComponent('Settings', () => require('./screens/Settings').default);

    Navigation.registerComponent('Screen2', () => require('./screens/Screen2').default);
}
