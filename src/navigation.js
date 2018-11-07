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

export const goHomez = () => Navigation.setRoot({
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

export const goHome = () => Navigation.setRoot({
    root: {
        bottomTabs: {
            children: [
                {
                    stack: {
                        children: [
                            {
                                component: {
                                    name: 'DialUp',
                                    passProps: {
                                        text: 'This is tab 1'
                                    }
                                }
                            }
                        ],
                        options: {
                            bottomTab: {
                                text: 'Tab 1',
                                icon: require('./assets/images/dialup.png'),
                                testID: 'FIRST_TAB_BAR_BUTTON'
                            }
                        }
                    }
                },
                {
                    component: {
                        name: 'Contacts',
                        passProps: {
                            text: 'This is tab 2'
                        },
                        options: {
                            bottomTab: {
                                text: 'Tab 2',
                                icon: require('./assets/images/contacts.png'),
                                testID: 'SECOND_TAB_BAR_BUTTON'
                            }
                        }
                    }
                },
                {
                    stack: {
                        children: [
                            {
                                component: {
                                    name: 'Profile',
                                    passProps: {
                                        text: 'This is tab 3'
                                    }
                                }
                            }
                        ],
                        options: {
                            bottomTab: {
                                text: 'Tab 3',
                                icon: require('./assets/images/profile.png'),
                                testID: 'THIRD_TAB_BAR_BUTTON'
                            }
                        }
                    }
                },
            ]
        }
    }
});