import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, ScrollView } from 'react-native'

import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'

import ListSection from '../../components/common/ListSection'
import Header from '../../components/common/Header'

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

        return (
            <View style={sc.mainContainer}>
                <Header title={"Media settings"} {...platformHeaderProps} />

                <ScrollView style={sc.mainContainer}>
                    <ListSection title="General"/>
                    <View style={{padding: 10}}>
                        <Text>Por implementar</Text>
                    </View>

                    <ListSection title="Avanzado"/>
                    <View style={{padding: 10}}>
                        <Text>Por implementar</Text>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

MediaSettingsScreen.propTypes = {

}

const mapStateToProps = (state) => {
    return {}
}

const mapDispatchToProps = (dispatch) => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(MediaSettingsScreen)
