import {Navigation} from 'react-native-navigation';

export function registerScreens() {
    Navigation.registerComponent('Home', () => require('./views/Home').default);
    Navigation.registerComponent('Initializing', (sc) => require('./views/Initializing').default);
    Navigation.registerComponent('SignIn', () => require('./views/SignIn').default);
    Navigation.registerComponent('SignUp', () => require('./views/SignUp').default);
    Navigation.registerComponent('Screen2', () => require('./views/Screen2').default);

    Navigation.registerComponent('DialUp', () => require('./views/DialUp').default);
    Navigation.registerComponent('Contacts', () => require('./views/Contacts').default);
    Navigation.registerComponent('Profile', () => require('./views/Profile').default);
    Navigation.registerComponent('Recents', () => require('./views/Recents').default);
}