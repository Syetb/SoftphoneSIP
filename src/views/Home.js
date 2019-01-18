import React from 'react'
import {
    View,
    Text,
    Button,
    StyleSheet
} from 'react-native'
import { Navigation } from 'react-native-navigation'

export default class Home extends React.Component {
    static get options() {
        return {
            topBar: {
                title: {
                    text: 'Home'
                },
            }
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Hello from Home screen.</Text>

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
