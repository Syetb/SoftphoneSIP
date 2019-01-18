import React from 'react'
import {
    View,
    Text,
    Button,
    StyleSheet
} from 'react-native'
import { Navigation } from 'react-native-navigation'

export default class Contacts extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <Text>Contacts</Text>

                <Button
                    onPress={() => {
                        Navigation.push(this.props.componentId, {
                            component: {
                                name: 'Screen2',
                            }
                        });
                    }}
                    title="View next screen"
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
