import React from 'react'
import { connect } from 'react-redux'

import KeypadWithActions from '../../components/call/KeypadWithActions'
import sc from '../../assets/styles/containers'

const DialerViewport = ({ onCallPress }) => {
    return (
        <KeypadWithActions
            style={ sc.mainContainer }
            actions={[
                { icon: "call", text: "", callback: onCallPress }
            ]}
        />
    )
}

DialerViewport.propTypes = {

}

const mapStateToProps = (state) => {
    return {}
}

const mapDispatchToProps = (dispatch) => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(DialerViewport)
