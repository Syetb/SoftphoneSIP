import { Navigation } from 'react-native-navigation'

export const goToAuth = () => Navigation.setRoot({
    root: {
        bottomTabs: {
            id: 'BottomTabsId',
            children: [
                {
                    component: {
                        name: 'SignIn',
                        options: {
                            bottomTab: {
                                fontSize: 12,
                                text: 'Sign In',
                                icon: require('./assets/images/signin.png')
                            }
                        }
                    }
                },
                {
                    component: {
                        name: 'SignUp',
                        options: {
                            bottomTab: {
                                fontSize: 12,
                                text: 'SignUp',
                                icon: require('./assets/images/signup.png')
                            }
                        }
                    }
                },
            ]
        }
    }
});

export const goHome = () => Navigation.setRoot({
    root:{
        stack: {
            id: 'App',
            children: [
                {
                    component: {
                        name: 'Home',
                    }
                }
            ]
        }
    }
});