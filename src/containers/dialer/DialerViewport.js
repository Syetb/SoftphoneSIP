import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import KeypadWithActions from '../../components/call/KeypadWithActions'
import { makeCall } from "../../actions/pjsip";

import sc from '../../assets/styles/containers'

const DialerViewport = ({ onCallPress, registrationStatus }) => {

    return (
        <KeypadWithActions
            style={ sc.mainContainer }
            status={ registrationStatus }
            actions={[
                { icon: "call", text: "", callback: onCallPress }
            ]}
            flexActionModal={{}}
        />
    )
}

DialerViewport.propTypes = {
    onCallPress: PropTypes.func.isRequired,
    registrationStatus: PropTypes.string.isRequired,
}

const mapStateToProps = (state) => {
    return {}
}

const mapDispatchToProps = (dispatch) => {
    return {
        onCallPress: (destination) => {
            if (destination) {
                dispatch(makeCall(destination))
            }
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DialerViewport)
