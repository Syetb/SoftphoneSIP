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
        bottomTabs: {
            id: 'AppBottomTabsId',
            children: [
                {
                    component: {
                        name: 'DialUp',
                        options: {
                            bottomTab: {
                                fontSize: 12,
                                text: 'DialUP',
                                icon: require('./assets/images/dialup.png')
                            }
                        }
                    }
                },
                {
                    component: {
                        name: 'Contacts',
                        options: {
                            bottomTab: {
                                fontSize: 12,
                                text: 'Contacts',
                                icon: require('./assets/images/contacts.png')
                            }
                        }
                    }
                },
                {
                    component: {
                        name: 'Profile',
                        options: {
                            bottomTab: {
                                fontSize: 12,
                                text: 'Profile',
                                icon: require('./assets/images/profile.png')
                            }
                        }
                    }
                },
                {
                    component: {
                        name: 'Recents',
                        options: {
                            bottomTab: {
                                fontSize: 12,
                                text: 'Recents',
                                icon: require('./assets/images/recents.png')
                            }
                        }
                    }
                }
            ]
        }
    }
});