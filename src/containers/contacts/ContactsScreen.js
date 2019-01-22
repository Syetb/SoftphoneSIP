import React from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'

import ContactsViewport from './ContactsViewport'
import sc from '../../assets/styles/containers'

const ContactsScreen = (props) => {

    return (
        <View style={sc.mainContainer}>
            <ContactsViewport props={ props } />
        </View>
    )
}

ContactsScreen.propTypes = {

}

const mapStateToProps = (state) => {
    return {}
}

const mapDispatchToProps = (dispatch) => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactsScreen)
