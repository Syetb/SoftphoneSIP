import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'

import { Navigation } from 'react-native-navigation'
import { connect } from 'react-redux'

import ListAccountInfo from '../../components/settings/ListAccountInfo'
import ListConfigurationInfo from '../../components/settings/ListConfigurationInfo'
import ListSection from '../../components/common/ListSection'
import Touchable from '../../components/common/Touchable'

import sc from '../../assets/styles/containers'

class SettingsViewport extends Component {

    renderAccounts(accounts) {
        const result = []

        for (const id in accounts) {
            if (accounts.hasOwnProperty(id)) {
                const acc = accounts[id]
                result.push((
                    <ListAccountInfo
                        key={acc.getId()}
                        account={acc}
                        connectivity={this.props.connectivity}
                        onPress={this.onAccountPress && this.onAccountPress.bind(this, acc)}
                    />
                ))
            }
        }

        if (result.length === 0) {
            return (
                <View style={{height: 56, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{fontSize: 16, color: "#CCC"}}>Ninguna cuenta disponible</Text>
                </View>
            )
        }

        return result
    }

    onCreateAccountPress = () => {
        Navigation.push('SettingsScreenId', {
            component: {
                name: 'AccountScreen'
            }
        })
    }

    onAccountPress = (account) => {
        Navigation.push('SettingsScreenId', {
            component: {
                name: 'AccountScreen',
                passProps: {
                    account: account
                },
            }
        })
    }

    onNetworkSettingsPress = () => {
        Navigation.push('SettingsScreenId', {
            component: {
                name: 'NetworkSettingsScreen'
            }
        })
    }

    onMediaSettingsPress = () => {
        Navigation.push('SettingsScreenId', {
            component: {
                name: 'MediaSettingsScreen'
            }
        })
    }

    render() {

        return (
            <View style={sc.mainContainer}>
                <ListSection title="Cuentas"/>
                {this.renderAccounts(this.props.accounts)}

                <Touchable onPress={this.onCreateAccountPress} style={ { padding: 10, justifyContent:'center', alignItems: 'center', backgroundColor: '#CCC' } }>
                    <Text>Crear cuenta</Text>
                </Touchable>

                <ListSection title="Avanzado"/>
                <ListConfigurationInfo
                    onPress={this.onNetworkSettingsPress}
                    title="Network"
                    description="Ajustes de como la aplicacion puede ser conectada a la red"
                />
                <ListConfigurationInfo
                    onPress={this.onMediaSettingsPress}
                    title="Media"
                    description="Seleccion de Codecs para el funcionamiento de sonido en llamadas en curso"
                />
            </View>
        )
    }
}

SettingsViewport.propTypes = {
    connectivity: PropTypes.bool,
    accounts: PropTypes.object,
    onAccountPress: PropTypes.func,
    onNetworkSettingsPress: PropTypes.func,
    onMediaSettingsPress: PropTypes.func,
    onCreateAccountPress: PropTypes.func
}

const mapStateToProps = (state) => {
    return {
        accounts: state.pjsip.accounts,
        connectivity: state.pjsip.endpointConnectivity
    }
}

const mapDispatchToProps = (dispatch) => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsViewport)
