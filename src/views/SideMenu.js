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
                drawBehind: false,
                visible: true,
                animate: true,
                title: {
                    text: 'Side Menu Main - SoftPhone SIP',
                    fontSize: 14000,
                    color: 'red',
                    fontFamily: 'Helvetica',
                },
                background: {
                    color: '#00ff00',
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

    navigateToScreen = (screenName) => () => {
        console.log('navigateToScreen executed! :)')

        // Navega entre pantallas
        Navigation.push(this.props.componentId, {
            component: {
                name: screenName,
            }
        });
    }

    goToAccountsScreen = () => {
        console.log('goToAccountsScreen executed! :)')
        console.log(this.props.componentId)
        Navigation.push(this.props.componentId, {
            component: {
                name: 'Settings',
            }
        })
    }

    render () {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View>
                        <Text style={styles.sectionHeadingStyle}>
                            Section 1
                        </Text>
                        <View style={styles.navSectionStyle}>
                            <Text style={styles.navItemStyle}>
                                Page1
                            </Text>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.sectionHeadingStyle}>
                            Section 2
                        </Text>
                        <View style={styles.navSectionStyle}>
                            <Text style={styles.navItemStyle} onPress={this.goToAccountsScreen()}>
                                Settings
                            </Text>
                            <Text style={styles.navItemStyle}>
                                Others
                            </Text>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.sectionHeadingStyle}>
                            Section 3
                        </Text>
                        <View style={styles.navSectionStyle}>
                            <Text style={styles.navItemStyle} onPress={this.navigateToScreen('About')}>
                                About
                            </Text>
                        </View>
                    </View>
                </ScrollView>
                <View style={styles.footerContainer}>
                    <Text>This is my fixed footer</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 0,
        flex: 1
    },
    navItemStyle: {
        padding: 25
    },
    navSectionStyle: {
        backgroundColor: 'lightgrey'
    },
    sectionHeadingStyle: {
        paddingVertical: 10,
        paddingHorizontal: 5
    },
    footerContainer: {
        padding: 20,
        backgroundColor: 'lightgrey'
    }
})