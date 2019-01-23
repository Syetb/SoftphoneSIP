import React, { Component}  from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'

import { Navigation } from 'react-native-navigation'
import { connect } from 'react-redux'

import Header from '../../components/common/Header'
import SettingsViewport from './SettingsViewport'
import sc from '../../assets/styles/containers'

class SettingsScreen extends Component {

    static get options() {
        return {
            topBar: {
                visible: false,
                animate: false,
                drawBehind: true,
                title: {
                    text: 'Mis Ajustes'
                },
                leftButtons: {
                    id: 'toggleButtom',
                    enabled: false
                }
            }
        };
    }

    constructor(props) {
        super(props)
    }

    onNewAccountPress = () => {
        Navigation.push('SettingsScreenId', {
                component: 'AccountScreen'
            }
        )
    }

    render() {
        const platformHeaderProps = {
            rightItem: {
                title: 'Create',
                icon: require('../../assets/images/header/add_white.png'),
                layout: 'icon',
                onPress: this.onNewAccountPress
            }
        }

        return (
            <View style={sc.mainContainer}>
                <Header title="Settings" {...platformHeaderProps} />
                <SettingsViewport />
            </View>
        )
    }
}

SettingsScreen.propTypes = {

}

const mapStateToProps = (state) => {
    return {}
}

const mapDispatchToProps = (dispatch) => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen)
