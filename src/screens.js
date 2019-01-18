import {Navigation} from 'react-native-navigation';

export function registerScreens() {
    Navigation.registerComponent('Initializing', (sc) => require('./views/Initializing').default);

    Navigation.registerComponent('SideMenu', () => require('./views/SideMenu').default);
    Navigation.registerComponent('TopBar', () => require('./views/TopBar').default);
    Navigation.registerComponent('About', () => require('./views/About').default);

    Navigation.registerComponent('DialUp', () => require('./views/DialUp').default);
    Navigation.registerComponent('Contacts', () => require('./views/Contacts').default);
    Navigation.registerComponent('Recents', () => require('./views/Recents').default);
    Navigation.registerComponent('Settings', () => require('./views/Settings').default);

    Navigation.registerComponent('Home', () => require('./views/Home').default);
    Navigation.registerComponent('Screen2', () => require('./views/Screen2').default);
}
