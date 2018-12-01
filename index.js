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

function start() {

    Navigation.events().registerAppLaunchedListener(async () => {

        Navigation.setDefaultOptions({
            bottomTab: {
                iconColor: '#1B4C77',
                selectedIconColor: '#0f0',
                textColor: '#1B4C77',
                selectedTextColor: '#0f0',
                fontFamily: 'HelveticaNeue-Italic',
                fontSize: 13
            },
            _animations: {
                push: {
                    waitForRender: false,
                }
            },
            animations: {
                setRoot: {
                    alpha: {
                        from: 0,
                        to: 1,
                        duration: 300
                    }
                },
                _push: {
                    topBar: {
                        id: 'TEST',
                        alpha: {
                            from: 0,
                            to: 1,
                            duration: 500,
                            interpolation: 'accelerate'
                        }
                    },
                    bottomTabs: {
                        y: {
                            from: 1000,
                            to: 0,
                            duration: 500,
                            interpolation: 'decelerate',
                        },
                        alpha: {
                            from: 0,
                            to: 1,
                            duration: 500,
                            interpolation: 'decelerate'
                        }
                    },
                    content: {
                        y: {
                            from: 1000,
                            to: 0,
                            duration: 500,
                            interpolation: 'accelerate',
                        },
                        alpha: {
                            from: 0,
                            to: 1,
                            duration: 500,
                            interpolation: 'accelerate'
                        }
                    }
                },
                _pop: {
                    topBar: {
                        id: 'TEST',
                        alpha: {
                            from: 1,
                            to: 0,
                            duration: 500,
                            interpolation: 'accelerate'
                        }
                    },
                    bottomTabs: {
                        y: {
                            from: 0,
                            to: 100,
                            duration: 500,
                            interpolation: 'accelerate',
                        },
                        alpha: {
                            from: 1,
                            to: 0,
                            duration: 500,
                            interpolation: 'accelerate'
                        }
                    },
                    bottomTabs: {
                        y: {
                            from: 0,
                            to: 100,
                            duration: 500,
                            interpolation: 'decelerate',
                        },
                        alpha: {
                            from: 1,
                            to: 0,
                            duration: 500,
                            interpolation: 'decelerate'
                        }
                    },
                    content: {
                        y: {
                            from: 0,
                            to: 1000,
                            duration: 500,
                            interpolation: 'decelerate',
                        },
                        alpha: {
                            from: 1,
                            to: 0,
                            duration: 500,
                            interpolation: 'decelerate'
                        }
                    }
                }
            }
        });

    });
}
