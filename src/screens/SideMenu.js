import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
} from 'react-native'

import {Navigation} from "react-native-navigation";

export default class SideMenu extends React.Component {

    static get options() {
        return {
            topBar: {
                drawBehind: true,
                visible: true,
                animate: true,
                title: {
                    text: 'Side Menu Main - SoftPhone SIP',
                    fontSize: 14,
                    color: '#cfff20',
                    fontFamily: 'Helvetica',
                },
                background: {
                    color: '#ff1123',
                }
            }
        };
    }

    constructor(props){
        super(props);
    }

    componentDidMount(){

        // Navigation.showOverlay({
        //     component: {
        //         name: 'TopBar',
        //         passProps: {
        //         },
        //         options: {
        //             overlay: {
        //                 interceptTouchOutside: false,
        //             },
        //             layout: {
        //                 backgroundColor: 'transparent',
        //                 orientation: ['portrait'],
        //             }
        //         }
        //     }
        // });
    }

    navigateToScreen = (screenName) => async () => {
        // console.log('navigateToScreen executed! :)')

        // Navega entre pantallas
        await Navigation.push('DialerScreenId', {
            component: {
                name: screenName,
            }
        });

        await Navigation.mergeOptions('SideMenuId', {
            sideMenu: {
                left: {
                    visible: false,
                },
            },
        });
    }

    goToAccountsScreen = async () => {
        // console.log('goToAccountsScreen executed! :)')
        // console.log(this.props.componentId)
        await Navigation.push('DialerScreenId', {
            component: {
                name: 'AccountScreen',
            }
        })

        await Navigation.mergeOptions('SideMenuId', {
            sideMenu: {
                left: {
                    visible: false,
                },
            },
        });
    }

    render () {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View>
                        <Text style={styles.sectionHeadingStyle}>
                            Cuentas SIP registradas
                        </Text>
                        <View style={styles.navSectionStyle}>
                            <Text style={styles.navItemStyle}>
                                Cuenta 1
                            </Text>
                        </View>
                        <View style={styles.navSectionStyle}>
                            <Text style={styles.navItemStyle}>
                                Cuenta 2
                            </Text>
                        </View>
                        <View style={styles.navSectionStyle}>
                            <Text style={styles.navItemStyle}>
                                Cuenta 3
                            </Text>
                        </View>
                        <View style={styles.navSectionStyle}>
                            <Text style={styles.navItemStyle}>
                                Cuenta 4
                            </Text>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.sectionHeadingStyle}>
                            Otros
                        </Text>
                        <View style={styles.navSectionStyle}>
                            <Text style={styles.navItemStyle} onPress={this.navigateToScreen('AccountScreen')}>
                                Ajustes
                            </Text>
                            <Text style={styles.navItemStyle} onPress={this.navigateToScreen('AboutScreen')}>
                                Acerca de
                            </Text>
                        </View>
                    </View>
                </ScrollView>
                <View style={styles.footerContainer}>
                    <Text>2019 Todos los Derechos Reservados</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 0,
        flex: 1,
        backgroundColor: '#eff0f1'
    },
    navItemStyle: {
        padding: 25
    },
    navSectionStyle: {
        backgroundColor: '#afcdff'
    },
    sectionHeadingStyle: {
        paddingVertical: 13.20,
        paddingHorizontal: 16,
    },
    footerContainer: {
        padding: 16.3,
        backgroundColor: '#3F5057'
    }
})
