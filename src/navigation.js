import { Navigation } from 'react-native-navigation'

export const goHome = async () => {

    Navigation.setDefaultOptions({
        layout: {
            orientation: ['portrait'],
            // backgroundColor: '#ECEFF1'
        },
        statusBar: {
            // backgroundColor: '#575606',
            backgroundColor: 'transparent',
            style: 'dark',
            drawBehind: false
        },
        sideMenu: {
            left: {
                enabled: false
            }
        },
        topBar: {
            visible: false,
            animate: false,
            hideOnScroll: false,
            drawBehind: false,
            title: {
                fontSize: 21,
                color: "white",   //0f0f0f
                // text: 'React Native Navigation!',
            },
            background: {
                color: '#3F5057',
            },
            leftButtons: {
                id: 'toggleButtom',
                icon: require('./assets/images/bottomtabs/contacts-icon.png'),
                text: 'Menu',
                color: "#0f0f0f"
            },
            noBorder: true
        },
        bottomTabs: {
            backgroundColor: '#f8f9fa',
            drawBehind: false,
            translucent: false,
        },
        bottomTab: {
            textColor: '#0f0f0f',
            selectedTextColor: '#346a11',
        }
    });

    await Navigation.setRoot({
        root: {
            sideMenu: {
                id: "sideMenu",
                left: {
                    component: {
                        id: "SideMenuId",
                        name: "SideMenu"
                    },
                    visible: true,
                },
                center: {
                    bottomTabs: {
                        id: 'tabs',
                        children: [
                            {
                                stack: {
                                    id: 'tab1',
                                    children: [
                                        {
                                            component: {
                                                id: 'DialerScreenId',
                                                name: 'DialerScreen',
                                                passProps: {
                                                    text: 'This is tab 1',
                                                    myFunction: () => 'Hello from a function!'
                                                },
                                                options: {
                                                    sideMenu: {
                                                        left: {
                                                            enabled: true
                                                        }
                                                    },
                                                    bottomTab: {
                                                        text: 'Teclado',
                                                        icon: require('./assets/images/bottomtabs/call-icon.png'),
                                                        selectedIcon: require('./assets/images/bottomtabs/call-active-icon.png'),
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
                                                id: 'ContactsScreenId',
                                                name: 'ContactsScreen',
                                                passProps: {
                                                    text: 'This is tab 2'
                                                },
                                                options: {
                                                    topBar: {
                                                        visible: true,
                                                        animate: false,
                                                        title: {
                                                            text: 'Contactos'
                                                        }
                                                    },
                                                    sideMenu: {
                                                        left: {
                                                            enabled: true
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    ],
                                    options: {
                                        bottomTab: {
                                            text: 'Contactos',
                                            icon: require('./assets/images/bottomtabs/contacts-icon.png'),
                                            selectedIcon: require('./assets/images/bottomtabs/contacts-active-icon.png'),
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
                                                id: 'HistoryScreenId',
                                                name: 'HistoryScreen',
                                                passProps: {
                                                    text: 'This is tab 3',
                                                    myFunction: () => 'Hello from a function!'
                                                },
                                                options: {
                                                    // topBar: {
                                                    //     visible: true,
                                                    //     animate: false,
                                                    //     title: {
                                                    //         text: 'Recents!',
                                                    //         color: "#0f0f0f"
                                                    //     },
                                                    //     leftButtons: {
                                                    //         id: 'toggleButtom',
                                                    //         icon: require('./assets/images/history-icon.png')
                                                    //     }
                                                    // },
                                                    bottomTab: {
                                                        text: 'Historial',
                                                        icon: require('./assets/images/bottomtabs/history-icon.png'),
                                                        selectedIcon: require('./assets/images/bottomtabs/history-active-icon.png'),
                                                    }
                                                }
                                            }
                                        }
                                    ]
                                }
                            },
                            {
                                stack: {
                                    id: 'tab4',
                                    children: [
                                        {
                                            component: {
                                                id: 'SettingsScreenId',
                                                name: 'SettingsScreen',
                                                passProps: {
                                                    text: 'This is tab 4'
                                                }
                                            }
                                        }
                                    ],
                                    options: {
                                        bottomTab: {
                                            text: 'Ajustes',
                                            icon: require('./assets/images/bottomtabs/settings-icon.png'),
                                            selectedIcon: require('./assets/images/bottomtabs/settings-active-icon.png'),
                                            testID: 'FOURTH_TAB_BAR_BUTTON'
                                        }
                                    }
                                }
                            }
                        ],
                        options: {
                            bottomTabs: {
                                titleDisplayMode: 'alwaysShow',
                                testID: 'BOTTOM_TABS_ELEMENT',
                                // backgroundColor: '#cfff20'
                            }
                        }
                    }
                }
            }
        }
    });
};
