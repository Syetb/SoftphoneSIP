/** @format */

// import {AppRegistry} from 'react-native';
// import App from './App';
// import {name as appName} from './app.json';

// AppRegistry.registerComponent(appName, () => App);

import {Navigation} from 'react-native-navigation';
import {registerScreens} from './src/screens';

registerScreens();

Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setRoot({
        root: {
            stack: {
                children: [
                    {
                        component: {
                            name: 'blog.PostsList',
                            options: {
                                topBar: {
                                    title: {
                                        text: 'Blog'
                                    }
                                }
                            }
                        }
                    }
                ],
            }
        }
    });
});
