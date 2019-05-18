import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TouchableHighlight, View, Text, ScrollView } from 'react-native'

import { Navigation } from 'react-native-navigation'
import { connect } from 'react-redux'
import { createAccount, replaceAccount, deleteAccount } from '../../actions/pjsip'

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
                visible: false,
                drawBehind: true,
            }
        }
    }

    constructor(props) {
        super(props)

        if (this.props.account) {
            this.state = {
                addable: true,
                value: '',

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
                value: '',

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

        console.log('onFieldChanged() executed!')
        // console.log('event es: ', event)
        console.log('name es: ', name)
        console.log('value es: ', value)

        // if( name === 'domain') {
        //     value = this.onHandleDomainChanged(value)
        // }

        this.setState({[name]: value, addable: addable})
    }

    onHandleDomainChanged(newValue) {
        console.log('onHandleDomainChanged() excuted!!')
        console.log('newValue es: ', newValue)

        let length = newValue.length
        console.log('length es: ', length)
        let index = newValue.lastIndexOf('.') + 1
        console.log('index es: ', index)
        let noOfDots = newValue.split('.').length - 1
        console.log('noOfDots es: ', noOfDots)
        let updatedVal = ''

        if(length !== index && noOfDots < 3 && this.state.value.length < length && (length - index) % 3 === 0) {
            updatedVal = `${newValue}.`

        } else if( noOfDots > 3 || length - index > 3 ) {
            let newString = newValue.substring(0, length-1)
            updatedVal =  newString

        } else {
            updatedVal = newValue
        }

        return updatedVal

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
                        inputProps={{autoCapitalize: "none", autoCorrect: false, secureTextEntry: true, keyboardType: 'decimal-pad', maxLength: 15}}
                        title="Password"
                        placeholder="SIP password" value={this.state.password}
                        valueType="password"
                        onChange={this._onPasswordChanged}
                    />
                    <ListFieldSeparator />
                    <ListTextField
                        inputProps={{autoCapitalize: "none", autoCorrect: false, keyboardType: 'decimal-pad', maxLength: 15}}
                        title="Servidor"
                        placeholder="Servidor SIP / Dominio"
                        value={this.state.domain}
                        onChange={this._onDomainChanged}
                    />

                    <ListFieldSeparator />
                    <ListSection title="Avanzado"/>
                    <ListFieldSeparator />
                    <ListSelectField
                        options={["UDP", "TCP"]}
                        title="Transporte"
                        placeholder="Conexion de transporte UDP o TCP"
                        value={this.state.transport}
                        onChange={this._onTransportChanged}
                    />
                    <ListFieldSeparator />
                    <ListTextField
                        inputProps={{autoCapitalize: "none", autoCorrect: false}}
                        title="Proxy"
                        description="Dominio Proxy / IP y puerto"
                        placeholder="Dominio Proxy / IP y puerto"
                        value={this.state.proxy}
                        onChange={this._onProxyChanged}
                    />
                    <ListFieldSeparator />
                    <ListTextField
                        inputProps={{autoCapitalize: "none", autoCorrect: false, keyboardType: "numeric"}}
                        title="Timeout de Registro"
                        placeholder="Intervalo de tiempo para el registro, en segundos"
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
            dispatch( async () => await dispatch(replaceAccount(account, configuration)));
        },
        onDeletePress: (account) => dispatch(deleteAccount(account))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountScreen)
