import React from 'react'
import { View } from 'react-native'

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

export default ContactsScreen
