import React from 'react'

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

export default DialerViewport
