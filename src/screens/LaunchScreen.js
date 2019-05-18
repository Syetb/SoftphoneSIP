import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet
} from 'react-native'

import { goHome } from '../navigation'

export default class Initialising extends Component {
    async componentDidMount() {
        try {
            await goHome()
        } catch (err) {
            // console.log('error: ', err)
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Iniciando...
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    welcome: {
        fontSize: 40,
        color: '#424242'
    }
})
