import React from 'react'
import {
    View,
    Text,
    StyleSheet
} from 'react-native'

export default class About extends React.Component {

    static get options() {
        return {
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

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>About Screen :)</Text>
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
