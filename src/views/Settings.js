import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    AsyncStorage
} from 'react-native'

import { goToAuth, goHome } from '../navigation'

import { USER_KEY } from '../config'

export default class Settings extends React.Component {

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