import React, { Component } from 'react'
import { View } from 'react-native'

import HistoryViewport from './HistoryViewport'
import sc from '../../assets/styles/containers'

class HistoryScreen extends Component {

    static get options() {
        return {
            topBar: {
                title: {
                    text: 'Mis llamadas'
                },
                drawBehind: true,
                visible: true,
                animate: false
            }
        };
    }

    render() {

        return (
            <View style={sc.mainContainer}>
                <HistoryViewport props={this.props}/>
            </View>
        )
    }
}

HistoryScreen.propTypes = {

}

export default HistoryScreen
