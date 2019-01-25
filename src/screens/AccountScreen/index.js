import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TouchableHighlight, View, Text, ScrollView } from 'react-native'

import { Navigation } from 'react-native-navigation'
import { connect } from 'react-redux'
import { createAccount, deleteAccount } from '../../actions/pjsip'

import Header from '../../components/common/Header'
import ListSection from '../../components/common/ListSection'
import ListTextField from '../../components/common/ListTextField'
import ListSelectField from '../../components/common/ListSelectField'
import ListFieldSeparator from '../../components/common/ListFieldSeparator'

import sas from './styles'
import sc from '../../assets/styles/containers'

class AccountScreen extends Component {

    static get options() {
        return {
            topBar: {
                visible: false,
                animate: false,
                drawBehind: true,
                title: {
                    text: 'Mi Nueva Cuenta'
                },
                leftButtons: {
                    id: 'toggleButtom',
                    enabled: false
                }
            },
            bottomTabs: {
                visible: false
            }
        }
    }

    constructor(props) {
        super(props)

        if (this.props.account) {
            this.state = {
                addable: true,

                name: this.props.account.getName(),
                username: this.props.account.getUsername(),
                domain: this.props.account.getDomain(),
                password: this.props.account.getPassword(),

                proxy: this.props.account.getProxy(),
                transport: this.props.account.getTransport(),
                regServer: this.props.account.getRegServer(),
                regTimeout: this.props.account.getRegTimeout()
            }
        } else {
            this.state = {
                addable: false,

                name: "",
                username: "",
                domain: "",
                password: "",

                proxy: "",
                transport: "",
                regServer: "",
                regTimeout: ""
            }
        }

        this._onNameChanged = this.onFieldChanged.bind(this, "name")
        this._onUsernameChanged = this.onFieldChanged.bind(this, "username")
        this._onPasswordChanged = this.onFieldChanged.bind(this, "password")
        this._onDomainChanged = this.onFieldChanged.bind(this, "domain")
        this._onProxyChanged = this.onFieldChanged.bind(this, "proxy")
        this._onTransportChanged = this.onFieldChanged.bind(this, "transport")
        this._onRegServerChanged = this.onFieldChanged.bind(this, "regServer")
        this._onRegTimeoutChanged = this.onFieldChanged.bind(this, "regTimeout")
        this._onSubmitPress = this.onSubmitPress.bind(this)
        this._onDeletePress = this.onDeletePress.bind(this)
    }

    onFieldChanged(name, value) {
        const s = {...this.state, [name]: value}
        const addable = s.name.length > 0 && s.username.length > 0 && s.domain.length > 0 && s.password.length > 0

        this.setState({[name]: value, addable: addable})
    }

    onSubmitPress() {
        if (!this.state.addable) {
            return alert("Por favor llena todos los campos requeridos!")
        }

        const credentials = {
            name: this.state.name,
            username: this.state.username,
            domain: this.state.domain,
            password: this.state.password,

            proxy: this.state.proxy,
            transport: this.state.transport,
            regServer: this.state.regServer,
            regTimeout: this.state.regTimeout
        }

        if (this.props.account) {
            this.props.onChangePress && this.props.onChangePress(this.props.account, credentials)
        } else {
            this.props.onCreatePress && this.props.onCreatePress(credentials)
        }
    }

    onDeletePress() {
        this.props.onDeletePress && this.props.onDeletePress(this.props.account)
    }

    onBackPress = async () => {
        await Navigation.pop(this.props.componentId)
    }

    render() {
        const platformHeaderProps = {}

        platformHeaderProps['leftItem'] = {
            title: 'Back',
            icon: require('../../assets/images/header/back_white.png'),
            layout: 'icon',
            onPress: this.onBackPress
        }
        platformHeaderProps['rightItem'] = {
            title: 'Create',
            icon: require('../../assets/images/header/ok_white.png'),
            layout: 'icon',
            onPress: this._onSubmitPress
        }

        return (
            <View style={sc.mainContainer}>
                <Header title={this.props.account ? this.props.account.getName() : "Nueva Cuenta"} {...platformHeaderProps} />

                <ScrollView keyboardShouldPersistTaps='always' style={sc.mainContainer}>
                    <ListSection title="General"/>
                    <ListFieldSeparator />
                    <ListTextField
                        title="Nombre Completo"
                        placeholder="Display name"
                        value={this.state.name}
                        onChange={this._onNameChanged}
                    />
                    <ListFieldSeparator />
                    <ListTextField
                        inputProps={{autoCapitalize: "none", autoCorrect: false}}
                        title="Usuario"
                        placeholder="SIP username" value={this.state.username}
                        onChange={this._onUsernameChanged}
                    />
                    <ListFieldSeparator />
                    <ListTextField
                        inputProps={{autoCapitalize: "none", autoCorrect: false, secureTextEntry: true}}
                        title="Password"
                        placeholder="SIP password" value={this.state.password}
                        valueType="password"
                        onChange={this._onPasswordChanged}
                    />
                    <ListFieldSeparator />
                    <ListTextField
                        inputProps={{autoCapitalize: "none", autoCorrect: false}}
                        title="Servidor"
                        placeholder="Servidor SIP / Dominio"
                        value={this.state.domain}
                        onChange={this._onDomainChanged}
                    />

                    <ListFieldSeparator />
                    <ListSection title="Avanzado"/>
                    <ListFieldSeparator />
                    <ListTextField
                        inputProps={{autoCapitalize: "none", autoCorrect: false}}
                        title="Proxy"
                        description="Dominio Proxy/ip y puerto"
                        placeholder="Dominio Proxy/ip y puerto"
                        value={this.state.proxy}
                        onChange={this._onProxyChanged}
                    />
                    <ListFieldSeparator />
                    <ListSelectField
                        options={["UDP", "TCP", "TLS"]}
                        title="Transport"
                        placeholder="Conexion de transport UDP, TCP, TLS"
                        value={this.state.transport}
                        onChange={this._onTransportChanged}
                    />
                    <ListFieldSeparator />
                    <ListTextField
                        inputProps={{autoCapitalize: "none", autoCorrect: false}}
                        title="Registry server / Realm"
                        placeholder="URL to be put in the request URI for the registration"
                        value={this.state.regServer}
                        onChange={this._onRegServerChanged}
                    />
                    <ListFieldSeparator />
                    <ListTextField
                        inputProps={{autoCapitalize: "none", autoCorrect: false, keyboardType: "numeric"}}
                        title="Registration Timeout"
                        placeholder="Interval for registration, in seconds"
                        value={this.state.regTimeout} onChange={this._onRegTimeoutChanged}
                    />
                </ScrollView>
                {
                    !this.props.account ? null :
                        <TouchableHighlight
                            style={sas.deleteButton}
                            onPress={this._onDeletePress}
                        >
                            <Text style={sas.deleteButtonText}>Remove account</Text>
                        </TouchableHighlight>
                }
            </View>
        )
    }
}

AccountScreen.propTypes = {
    account: PropTypes.shape({
        getName: PropTypes.func,
        getUsername: PropTypes.func,
        getDomain: PropTypes.func,
        getPassword: PropTypes.func,
        getProxy: PropTypes.func,
        getTransport: PropTypes.func,
        getRegServer: PropTypes.func,
        getRegTimeout: PropTypes.func
    }),
    onCreatePress: PropTypes.func,
    onChangePress: PropTypes.func,
    onDeletePress: PropTypes.func
}

const mapStateToProps = (state) => {
    return {}
}

const mapDispatchToProps = (dispatch) => {
    return {
        onCreatePress: (configuration) => {
            dispatch( async () => await dispatch(createAccount(configuration)))
        },
        onChangePress: (account, configuration) => {
            alert("Por implementar")
            // dispatch(replaceAccount(account, configuration));
            // dispatch(Navigation.goAndReplace({name: 'settings'}))
        },
        onDeletePress: (account) => dispatch(deleteAccount(account))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountScreen)
