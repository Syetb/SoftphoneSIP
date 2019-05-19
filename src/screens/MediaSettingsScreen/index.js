import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, ScrollView } from 'react-native'

import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'

import ListSection from '../../components/common/ListSection'
import Header from '../../components/common/Header'

import SwitchItem from "../../components/common/SwitchItem";
import sc from '../../assets/styles/containers'

class MediaSettingsScreen extends Component {

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

        this.state = {
            codecs: this.props.codecs,
            mediaCodecs: this.initializeCodecs(this.props.codecs)
        }
    }

    initializeCodecs(codecs) {
        return Object.keys(codecs).reduce( (acc, key, index) => {
            // "G722/16000/1"
            const codecNameParts = key.split('/');
            const kHz = codecNameParts[1]

            acc[index] = {
                id: index,
                name: `${codecNameParts[0]} ${kHz.substr(0, kHz.length-3)}kHz`,
                [key]: codecs[key],
                toggled: false,
                priority: codecs[key]
            }

            return acc

        }, [])
    }

    toggleSwitch = (switchValue) => {
        const mediaCodecs = [...this.state.mediaCodecs]
        mediaCodecs[index].toggled = !mediaCodecs[index].toggled

        this.setState({ mediaCodecs })
    }

    renderSwitchCodecs(mediaCodecs, codecs) {

        // Renderizado de todos los codecs disponibles dentro de la app
       return  mediaCodecs.map( (item, index) => (
            <View key={item.id} style={{padding: 10, borderBottomWidth: 1, borderColor: '#E0E7EA'}}>
                <SwitchItem
                    switchName={item.name}
                    onToggleSwitch = { (switchValue) => {
                        const mediaCodecs = [...this.state.mediaCodecs]
                        mediaCodecs[index].toggled = switchValue

                        const codecs = [...this.state.codecs]
                        codecs[index].toggled = switchValue

                        this.setState({ mediaCodecs })
                        this.setState({ codecs })
                    } }
                    switchValue = { true }/> /* item.toggled */
            </View>
        ))
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
            onPress: () => {}
        }

        const { mediaCodecs } = this.state

        return (
            <View style={sc.mainContainer}>
                <Header title={"Ajuste de Audio"} {...platformHeaderProps} />

                <ScrollView style={sc.mainContainer}>
                    <ListSection title="Codecs Utilizados"/>
                    { this.renderSwitchCodecs(mediaCodecs) }
                </ScrollView>
            </View>
        )
    }
}

MediaSettingsScreen.propTypes = {
    codecs: PropTypes.object
}

const mapStateToProps = (state) => {
    return {
        codecs: state.pjsip.endpointSettings.codecs
    }
}

const mapDispatchToProps = (dispatch) => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(MediaSettingsScreen)
