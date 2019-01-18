import React from 'react'
import {
    View,
    Text,
    Button,
    StyleSheet
} from 'react-native'
import { Navigation } from 'react-native-navigation'

export default class DialUp extends React.Component {

    constructor(props){
        super(props);
        Navigation.events().bindComponent(this);
        this.state = {
            sideMenu: false
        }
    }

    navigationButtonPressed({ buttonId }) {
        console.log('Sidemenu triggered! :) :O', buttonId)
        console.log('this', this.state);

        const { sideMenu } = this.state;

        Navigation.mergeOptions('SideMenuId', {
            sideMenu: {
                left: {
                    visible: !sideMenu,
                },
            },
        });

        this.setState({
            sideMenu: !sideMenu
        });

        // alert(`sideMenu is now ${!sideMenu}`);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Dial Up</Text>

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
