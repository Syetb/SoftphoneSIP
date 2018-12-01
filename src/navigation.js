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

export const goHome = () => {

    Navigation.setDefaultOptions({
        layout: {
            orientation: 'portrait'
        },
        statusBar: {
            backgroundColor: '#1c4b20',
            visible: true
        },
        topBar: {
            visible: true,
            animate: false,
            hideOnScroll: true,
            drawBehind: true,
            title: {
                color: "#0f0f0f"
            }
        },
        bottomTabs: {
            titleDisplayMode: 'alwaysShow',
            backgroundColor: '#3f51b5',
            drawBehind: true,
        },
        bottomTab: {
            textColor: '#fff',
            selectedTextColor: '#428412',
        }
    });

    Navigation.setRoot({
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
                        id: 'tabs',
                        options: {
                            topbar: {
                                visible: true,
                            }
                        },
                        children: [
                            {
                                stack: {
                                    id: 'tab1',
                                    children: [
                                        {
                                            component: {
                                                name: 'DialUp',
                                                passProps: {
                                                    text: 'This is tab 1',
                                                    myFunction: () => 'Hello from a function!'
                                                },
                                                options: {
                                                    topBar: {
                                                        visible: true,
                                                        animate: false,
                                                        title: {
                                                            text: 'React Native Navigation!',
                                                            color: "#0f0f0f"
                                                        },
                                                        leftButtons: {
                                                            id: 'hamburgerButtom',
                                                            icon: require('./assets/images/dialup.png')
                                                        }
                                                    },
                                                    bottomTab: {
                                                        text: 'DialUp',
                                                        icon: require('./assets/images/dialup.png'),
                                                        selectedIcon: require('./assets/images/dialup.png'),
                                                        testID: 'FIRST_TAB_BAR_BUTTON'
                                                    }
                                                },
                                            }
                                        }
                                    ],
                                }
                            },
                            {
                                stack: {
                                    id: 'tab2',
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
                                        topBar: {
                                            visible: true,
                                            animate: false,
                                            title: {
                                                text: 'Contacts!',
                                                color: "#0f0f0f"
                                            }
                                        },
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
                                    id: 'tab3',
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
                                        topBar: {
                                            visible: true,
                                            animate: false,
                                            title: {
                                                text: 'Profile!',
                                                color: "#0f0f0f"
                                            },
                                            leftButtons: {
                                                id: 'hamburgerButtom',
                                                icon: require('./assets/images/dialup.png')
                                            }
                                        },
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
                                    id: 'tab4',
                                    children: [
                                        {
                                            component: {
                                                name: 'Recents',
                                                passProps: {
                                                    text: 'This is tab 4',
                                                    myFunction: () => 'Hello from a function!'
                                                },
                                                options: {
                                                    topBar: {
                                                        visible: true,
                                                        animate: false,
                                                        title: {
                                                            text: 'Recents!',
                                                            color: "#0f0f0f"
                                                        },
                                                        leftButtons: {
                                                            id: 'hamburgerButtom',
                                                            icon: require('./assets/images/dialup.png')
                                                        }
                                                    },
                                                    bottomTab: {
                                                        text: 'Recents',
                                                        icon: require('./assets/images/recents.png'),
                                                        selectedIcon: require('./assets/images/recents.png'),
                                                    }
                                                }
                                            }
                                        }
                                    ],
                                    options: {
                                        bottomTabs: {
                                            titleDisplayMode: 'alwaysShow',
                                            testID: 'BOTTOM_TABS_ELEMENT'
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
};