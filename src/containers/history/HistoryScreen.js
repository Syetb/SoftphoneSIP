import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'

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

const mapStateToProps = (state) => {
    return {}
}

const mapDispatchToProps = (dispatch) => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(HistoryScreen)
