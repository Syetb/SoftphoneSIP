import React, { Component } from 'react'
import { View } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { connect } from 'react-redux'

import DialerViewport from './DialerViewport'
import sc from '../../assets/styles/containers'

class DialerScreen extends Component {

    constructor(props){
        super(props);
        Navigation.events().bindComponent(this);
        this.state = {
            sideMenu: false
        }
    }

    navigationButtonPressed({ buttonId }) {
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
            <View style={sc.mainContainer}>
                <DialerViewport />
            </View>
        )
    }
}

DialerScreen.propTypes = {

}

const mapStateToProps = (state) => {
    return {}
}

const mapDispatchToProps = (dispatch) => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(DialerScreen)
