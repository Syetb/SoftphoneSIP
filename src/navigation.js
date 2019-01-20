import { Navigation } from 'react-native-navigation'

export const goHome = () => {

    Navigation.setDefaultOptions({
        layout: {
            orientation: ['portrait']
        },
        statusBar: {
            backgroundColor: '#575606',
            visible: true
        },
        topBar: {
            visible: true,
            animate: false,
            hideOnScroll: true,
            drawBehind: true,
            title: {
                color: "#0f0f0f",
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
            }
        },
        bottomTabs: {
            backgroundColor: '#f8f9fa',
            drawBehind: true,
            translucent: false
        },
        bottomTab: {
            textColor: '#0f0f0f',
            selectedTextColor: '#346a11',
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
                                                            text: 'Marcar',
                                                            color: "#0f0f0f"
                                                        }
                                                    },
                                                    bottomTab: {
                                                        text: 'Marcar',
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
                                                name: 'Contacts',
                                                passProps: {
                                                    text: 'This is tab 2'
                                                },
                                                options: {
                                                    topBar: {
                                                        visible: true,
                                                        animate: false,
                                                        title: {
                                                            text: 'Contacts!',
                                                            color: "#0f0f0f"
                                                        }
                                                    },
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
                                                name: 'Recents',
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
                                                    //         icon: require('./assets/images/dialup.png')
                                                    //     }
                                                    // },
                                                    bottomTab: {
                                                        text: 'Recientes',
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
                                                name: 'Settings',
                                                passProps: {
                                                    text: 'This is tab 4'
                                                }
                                            }
                                        }
                                    ],
                                    options: {
                                        bottomTab: {
                                            text: 'Settings',
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
