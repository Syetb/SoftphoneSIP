import React from 'react'
import {
    View,
    Text,
    Button,
    StyleSheet
} from 'react-native'
import { Navigation } from 'react-native-navigation'

export default class Recents extends React.Component {
    static get options() {
        return {
            topBar: {
                title: {
                    text: 'My Screen'
                },
                drawBehind: true,
                visible: false,
                animate: false
            }
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Recents</Text>

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
