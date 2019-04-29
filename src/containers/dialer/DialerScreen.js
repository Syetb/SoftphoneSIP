import React, { Component } from 'react'
import { View } from 'react-native'
import PropTypes from "prop-types"
import { Navigation } from 'react-native-navigation'
import { connect } from 'react-redux'

import DialerViewport from './DialerViewport'
import { destroy } from "../../actions/pjsip";

import sc from '../../assets/styles/containers'

class DialerScreen extends Component {

    constructor(props){
        super(props);

        this.navigationEventListener = Navigation.events().bindComponent(this)

        this.state = {
            sideMenu: false
        }
    }

    componentDidMount() {
        Navigation.mergeOptions('tabs', {
            bottomTabs: {
                currentTabIndex: this.props.screen.index
            }
        });
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

        if( account && Object.keys(account).length > 0 ) {
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

        return status;
    }

    render() {
        const { account } = this.props

        const status = this.showRegistrationStatus(account)

        return (
            <View style={sc.mainContainer}>
                <DialerViewport registrationStatus={status} />
            </View>
        )
    }

    componentWillUnmount() {
        // Not mandatory
        if (this.navigationEventListener) {
            this.navigationEventListener.remove();
        }

        this.props.onDestroy && this.props.onDestroy()
    }

    componentDidAppear() {
        // console.log('Dialer Aparece!!! :)')

        Navigation.mergeOptions(this.props.componentId, {
            sideMenu: {
                left: {
                    enabled: true
                }
            },
        });
    }
}

DialerScreen.propTypes = {
    account: PropTypes.object,
    screen: PropTypes.object,
    onDestroy: PropTypes.func,
}

const mapStateToProps = (state) => {
    return {
        account: state.pjsip.account,
        screen: state.navigate.screen,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onDestroy: () => dispatch(destroy())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DialerScreen)
