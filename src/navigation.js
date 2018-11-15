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
        sideMenu: {
            id: "sideMenu",
            left: {
                component: {
                    id: "SideMenuId",
                    name: "SideMenu"
                },
                visible: true
            },
            center: {
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
                                        text: 'DialUp',
                                        icon: require('./assets/images/dialup.png'),
                                        testID: 'FIRST_TAB_BAR_BUTTON'
                                    }
                                }
                            }
                        },
                        {
                            stack: {
                                children: [
                                    {
                                        component: {
                                            name: 'Contacts',
                                            passProps: {
                                                text: 'This is tab 2'
                                            }
                                        }
                                    }
                                ],
                                options: {
                                    bottomTab: {
                                        text: 'Contacts',
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
                                        text: 'Profile',
                                        icon: require('./assets/images/profile.png'),
                                        testID: 'THIRD_TAB_BAR_BUTTON'
                                    }
                                }
                            }
                        },
                        {
                            stack: {
                                children: [
                                    {
                                        component: {
                                            name: 'Recents',
                                            passProps: {
                                                text: 'This is tab 4'
                                            }
                                        }
                                    }
                                ],
                                options: {
                                    bottomTab: {
                                        text: 'Recents',
                                        icon: require('./assets/images/recents.png'),
                                        testID: 'FOURTH_TAB_BAR_BUTTON'
                                    }
                                }
                            }
                        },
                    ]
                }
            }
        }
    }
});

export const goSettings = () => Navigation.setRoot();