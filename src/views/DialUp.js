import React from 'react'
import {
    View,
    Text,
    Button,
    StyleSheet,
    AsyncStorage,
} from 'react-native'
import { Navigation } from 'react-native-navigation'
import { goToAuth } from "../navigation";

import { USER_KEY } from "../config";

export default class DialUp extends React.Component {
    static get options() {
        return {
            topBar: {
                title: {
                    text: 'DialUp'
                },
            }
        };
    }
    logout = async () => {
        try {
            await AsyncStorage.removeItem(USER_KEY)
            goToAuth()
        } catch (err) {
            console.log('error signing out...: ', err)
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <Text>Dial Up</Text>
                <Button
                    onPress={this.logout}
                    title="Sign Out"
                />
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