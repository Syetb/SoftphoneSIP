import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { View, ScrollView } from 'react-native'

import { Navigation } from 'react-native-navigation'
import { connect } from 'react-redux'

import Header from '../../components/common/Header'
import ListSection from '../../components/common/ListSection'
import ListCheckbox from '../../components/common/ListCheckbox'

import cs from '../../assets/styles/containers'

class NetworkSettingsScreen extends Component {

    static get options() {
        return {
            topBar: {
                drawBehind: true,
            },
            bottomTabs: {
                visible: false
            },
        };
    }

    constructor(props) {
        super(props)

        // debugging
        // console.log('NetworkSettingsScreen executed')
        // console.log('this.props es: ', this.props)
        // console.log('this.props.settings es: ', this.props.settings)

        // console.log('this.props.settings === undefined es: ', this.props.settings === undefined)
        // console.log('this.props.settings === null es: ', this.props.settings === null)

        // handling exceptions
        let thisPropsSettings = this.props.settings
        if( this.props.settings === undefined || this.props.settings === null) {
            thisPropsSettings = {
                network: {
                    useAnyway: false,
                    useWifi: false,
                    use3g: false,
                    useGprs: false,
                    useEdge: false,
                    useOtherNetworks: false,
                    useInRoaming: false,
                },
                service:{
                    foreground: true
                }
            }
        }

        const s = this.props.settings ? this.props.settings.network : thisPropsSettings.network
        const foreground = this.props.settings ? this.props.settings.service.foreground : thisPropsSettings.service.foreground




        const wifiDisabled = s.useAnyway
        const mobileDisabled = s.useAnyway || (!wifiDisabled && !s.useWifi)

        this.state = {
            foreground,
            useAnyway: s.useAnyway,
            useWifi: s.useWifi,
            use3g: s.use3g,
            useGprs: s.useGprs,
            useEdge: s.useEdge,
            useOtherNetworks: s.useOtherNetworks,
            useInRoaming: s.useInRoaming,
            wifiDisabled,
            mobileDisabled
        }

        this._onForegroundChange = this.onBooleanChanged.bind(this, "foreground")

        this._onAnywayChange = this.onBooleanChanged.bind(this, "useAnyway")
        this._onWifiChange = this.onBooleanChanged.bind(this, "useWifi")
        this._on3gChange = this.onBooleanChanged.bind(this, "use3g")
        this._onGprsChange = this.onBooleanChanged.bind(this, "useGprs")
        this._onEdgeChange = this.onBooleanChanged.bind(this, "useEdge")
        this._onOtherNetworksChange = this.onBooleanChanged.bind(this, "useOtherNetworks")
        this._onInRoamingChange = this.onBooleanChanged.bind(this, "useInRoaming")

        this._onSavePress = this.onSavePress.bind(this)
    }

    onSavePress() {
        const configuration = {
            foreground: this.state.foreground,
            useAnyway: this.state.useAnyway,
            useWifi: this.state.useWifi,
            use3g: this.state.use3g,
            useGprs: this.state.useGprs,
            useEdge: this.state.useEdge,
            useOtherNetworks: this.state.useOtherNetworks,
            useInRoaming: this.state.useInRoaming
        }

        this.props.onSavePress && this.props.onSavePress(configuration)
    }

    onBooleanChanged(property, value) {
        const newState = {...this.state, [property]: value}
        const wifiDisabled = newState.useAnyway
        const mobileDisabled = newState.useAnyway || (!wifiDisabled && !newState.useWifi)

        this.setState({
            ...newState,
            wifiDisabled,
            mobileDisabled
        })
    }

    render() {
        const platformHeaderProps = {}

        platformHeaderProps['leftItem'] = {
            title: 'Back',
            icon: require('../../assets/images/header/back_white.png'),
            layout: 'icon',
            onPress: async () => {
                await Navigation.pop(this.props.componentId)
            }
        }
        platformHeaderProps['rightItem'] = {
            title: 'Save',
            icon: require('../../assets/images/header/ok_white.png'),
            layout: 'icon',
            onPress: this._onSavePress
        }

        return(
            <View style={cs.mainContainer}>
                <Header title={"Network settings"} {...platformHeaderProps} />

                <ScrollView style={cs.mainContainer}>
                    <ListSection title="Configuraciones de Conectividad"/>

                    <ListCheckbox
                        disabled={this.state.wifiDisabled}
                        onChange={this._onWifiChange}
                        value={this.state.useWifi}
                        title="Usar WiFi"
                        description="Usa WiFi para llamadas entrantes y salientes"
                    />

                    <ListSection title="Conexion en Background"/>

                    <ListCheckbox
                        onChange={this._onForegroundChange}
                        value={this.state.foreground}
                        title="Ejecuta en background"
                        description="Deshabilita esto si no quieres llamadas entrantes. Mejora significativamente la vida de la bateria"
                    />

                    <ListSection title="Nat traversal"/>

                    <ListCheckbox
                        value={false}
                        title="Habilitar ICE"
                        description="Activar ICE feature"
                    />
                    <ListCheckbox
                        value={false}
                        title="Habilitar STUN"
                        description="Activar STUN feature"
                    />
                </ScrollView>
            </View>
        )
    }

}

NetworkSettingsScreen.propTypes = {
    settings: PropTypes.shape({
        network: PropTypes.object,
        service: PropTypes.shape({
            foreground: PropTypes.bool
        })
    }),
    onSavePress: PropTypes.func
}

const mapStateToProps = (state) => {
    return {}
}

const mapDispatchToProps = (dispatch) => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(NetworkSettingsScreen)
