import React, { Component } from 'react'
import { View } from 'react-native'
import PropTypes from "prop-types"
import { Navigation } from 'react-native-navigation'
import { connect } from 'react-redux'

import DialerViewport from './DialerViewport'

import sc from '../../assets/styles/containers'

class DialerScreen extends Component {

    constructor(props){
        super(props);

        Navigation.events().bindComponent(this);
        this.state = {
            sideMenu: false,
            account: {}
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

    showRegistrationStatus(account) {

        let name = 'Cuenta'
        let status = 'no registrada'
        let color = '#f8f9fa'

        if( Object.keys(account).length > 0 ) {
            name = account.getName()
            const registration = account.getRegistration()
            const isRegisterOk = registration.isActive() && registration.getStatusText() === "OK"
            color = isRegisterOk ? "#34D023" : "#ff1123"
            status = isRegisterOk ? 'Registrado' : registration.getStatusText()
        }

        Navigation.mergeOptions(this.props.componentId, {
            topBar: {
                visible: true,
                title: {
                    text: name,
                },
                subtitle: {
                    text: status,
                    color: color,
                    fontSize: 14
                }
            }
        });
    }

    render() {
        const { account } = this.props

        this.showRegistrationStatus(account)

        return (
            <View style={sc.mainContainer}>
                <DialerViewport />
            </View>
        )
    }
}

DialerScreen.propTypes = {
    account: PropTypes.object
}

const mapStateToProps = (state) => {
    return {
        account: state.pjsip.account
    }
}

const mapDispatchToProps = (dispatch) => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(DialerScreen)
