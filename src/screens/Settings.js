import React from 'react'
import {
    View,
    Text,
    StyleSheet
} from 'react-native'

import { goHome } from '../navigation'

export default class Settings extends React.Component {

    static get options() {
        return {
            topBar: {
                visible: true,
                animate: false,
                drawBehind: true,
                title: {
                    text: 'My Settings'
                },
                leftButtons: {
                    id: 'toggleButtom',
                    enabled: false
                }
            }
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Settings Screen :)</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    welcome: {
        fontSize: 28
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
