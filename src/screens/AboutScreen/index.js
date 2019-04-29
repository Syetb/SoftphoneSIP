import React from 'react'
import {
    View,
    Text,
    StyleSheet, Image, Dimensions
} from 'react-native'
import slai from "../../components/settings/ListAccountInfo/styles";
import slci from "./styles";
import Header from "../../components/common/Header";
import * as CallAnimation from "../CallScreen/anim";
import {correctFontSizeForScreen} from "../../utils/scale";
import {Navigation} from "react-native-navigation";

export default class AboutScreen extends React.Component {

    static get options() {
        return {
            layout: {
                backgroundColor: '#ECEFF1'
            },
            topBar: {
                visible: false,
                animate: false,
                drawBehind: true,
                // title: {
                //     text: 'Acerca de'
                // },
                leftButtons: {
                    id: 'toggleButtom',
                    enabled: true,
                    visible: true
                }
            },
            bottomTabs: {
                visible: false,
                drawBehind: true,
            }
        }
    }

    constructor(props) {
        super(props)

        const { height: screenHeight, width: screenWidth } = Dimensions.get('window')

        // console.assert('screenHeight es: ', screenHeight)
        // console.assert('screenWidth es: ', screenWidth)

        this.state = {
            screenHeight,
            screenWidth
        }
        // console.log('this.state es: ', this.state)
    }

    onBackPress = async () => {
        await Navigation.pop(this.props.componentId)
        await Navigation.mergeOptions('SideMenuId', {
            sideMenu: {
                left: {
                    visible: true,
                },
            },
        });
    }

    onGoDialerPress = async () => {
        await Navigation.pop(this.props.componentId)
    }

    render() {
        const platformHeaderProps = {}

        platformHeaderProps['leftItem'] = {
            title: 'Back',
            icon: require('../../assets/images/header/back_white.png'),
            layout: 'icon',
            onPress: this.onBackPress
        }
        platformHeaderProps['rightItem'] = {
            title: 'Create',
            icon: require('../../assets/images/call/action-dtmf.png'),
            layout: 'icon',
            onPress: this.onGoDialerPress
        }

        return (
            <View style={styles.container}>
                {/*<Text style={styles.welcome}>About Screen :)</Text>*/}
                <Header title='ABOUT ' {...platformHeaderProps} fontSizeTitle={correctFontSizeForScreen(28)} />

                <Image
                    source={require('../../assets/images/about/sip_about.png')}
                    style={slci.iconContainer}
                    width={correctFontSizeForScreen(this.state.screenWidth)}
                    height={correctFontSizeForScreen((this.state.screenHeight/2)+50)}/>

                <Text style={styles.welcome}>Semestre 2019A</Text>
                <Text style={styles.welcome}>Abril - Septiembre</Text>

                <Text style={styles.welcome}>Autores</Text>
                <Text style={styles.welcome}>Casaliglla Jhonatan</Text>
                <Text style={styles.welcome}>Lincango Betsy</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    welcome: {
        fontSize: 24
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
