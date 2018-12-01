import React from 'react'
import {
    View,
    Text,
    StyleSheet
} from 'react-native'

export default class TopBar extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Top Bar Fixed :)</Text>
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
    }
})