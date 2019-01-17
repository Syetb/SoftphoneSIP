/** @format */

// import {AppRegistry} from 'react-native';
// import App from './App';
// import {name as appName} from './app.json';

// AppRegistry.registerComponent(appName, () => App);

import {Navigation} from 'react-native-navigation';
import {registerScreens} from './src/screens';

import Platform from 'react-native';

if (Platform.OS === 'android') {
    alert = (title) => {
        Navigation.showOverlay({
            component: {
                name: 'navigation.playground.alert',
                passProps: {
                    title
                },
                options: {
                    overlay: {
                        interceptTouchOutside: true
                    }
                }
            }
        });
    };
}

registerScreens();

Navigation.events().registerAppLaunchedListener(async () => {
    await Navigation.setRoot({
        root: {
            component: {
                name: 'Initializing'
            }
        }
    });
});
