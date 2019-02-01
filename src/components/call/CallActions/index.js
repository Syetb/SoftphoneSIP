import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'

import ViewPager from '../../common/ViewPager'
import CallAction from '../CallAction'

import scas from './styles'

class CallActions extends Component {

    constructor(props) {
        super(props)

        this.state = {
            actionsIndex: 0
        }

        this._onAddPress = this.onAddPress.bind(this)
        this._onMutePress = this.onMutePress.bind(this)
        this._onSpeakerPress = this.onSpeakerPress.bind(this)
        this._onTransferPress = this.onTransferPress.bind(this)
        this._onHoldPress = this.onHoldPress.bind(this)
        this._onDTMFPress = this.onDTMFPress.bind(this)
        this._onSelectedIndexChange = this.onSelectedIndexChange.bind(this)

        // Por implementar
        this._onParkPress = this.onParkPress.bind(this)
        this._onMergePress = this.onMergePress.bind(this)
    }

    onAddPress() {
        this.props.onAddPress && this.props.onAddPress(this.state.call)
    }

    onMutePress() {
        if (this.props.call.isMuted()) {
            this.props.onUnMutePress && this.props.onUnMutePress(this.state.call)
        } else {
            this.props.onMutePress && this.props.onMutePress(this.state.call)
        }
    }

    onSpeakerPress() {
        if (this.props.call.isSpeaker()) {
            this.props.onEarpiecePress && this.props.onEarpiecePress(this.state.call)
        } else {
            this.props.onSpeakerPress && this.props.onSpeakerPress(this.state.call)
        }
    }

    onTransferPress() {
        this.props.onTransferPress && this.props.onTransferPress(this.state.call)
    }

    onHoldPress() {
        if (this.props.call.isHeld()) {
            this.props.onUnHoldPress && this.props.onUnHoldPress(this.state.call)
        } else {
            this.props.onHoldPress && this.props.onHoldPress(this.state.call)
        }
    }

    onDTMFPress() {
        this.props.onDTMFPress && this.props.onDTMFPress(this.state.call)
    }

    onSelectedIndexChange(index) {
        this.setState({
            actionsIndex: index
        })
    }

    // Por implementar
    onParkPress() {
        this.props.onParkPress && this.props.onParkPress(this.state.call)
    }

    onMergePress() {
        this.props.onMergePress && this.props.onMergePress(this.state.call)
    }

    render() {
        const held = this.props.call.isHeld()
        const muted = this.props.call.isMuted()
        const speaker = this.props.call.isSpeaker()

        return (
            <View {...this.props.style}>

                <ViewPager
                    style={scas.pager}
                    count={2}
                    selectedIndex={this.state.actionsIndex}
                    onSelectedIndexChange={this._onSelectedIndexChange}
                >
                    <View style={scas.actionsRow}>
                        <View style={scas.actionsPadding}/>
                        <View style={scas.actionsContent}>
                            <View style={scas.actionsContentWrapper}>
                                <CallAction
                                    type="add"
                                    description="add"
                                    onPress={this._onAddPress}
                                />
                                <View style={scas.actionSeparator}/>
                                <CallAction
                                    type={muted ? "unmute" : "mute"}
                                    description={muted ? "unmute" : "mute"}
                                    onPress={this._onMutePress}
                                />
                                <View style={scas.actionSeparator}/>
                                <CallAction
                                    type={speaker ? "speaker" : "earpiece"}
                                    description="speaker"
                                    onPress={this._onSpeakerPress}
                                />
                            </View>
                            <View style={scas.actionsContentSecondWrapper}>
                                <CallAction
                                    type="transfer"
                                    description="transfer"
                                    onPress={this._onTransferPress}
                                />
                                <View style={scas.actionSeparator}/>
                                <CallAction
                                    type={held ? "unhold" : "hold"}
                                    description={held ? "unhold" : "hold"}
                                    onPress={this._onHoldPress}
                                />
                                <View style={scas.actionSeparator}/>
                                <CallAction
                                    type="dtmf"
                                    description="dtmf"
                                    onPress={this._onDTMFPress}
                                />
                            </View>
                        </View>
                        <View style={scas.actionsPadding}/>
                    </View>

                    <View style={scas.actionsRow}>
                        <View style={scas.actionsPadding}/>
                        <View style={scas.actionsContent}>
                            <View style={scas.actionsContentWrapper}>
                                <CallAction
                                    type="park"
                                    description="park"
                                    onPress={this._onParkPress}
                                />
                                <View style={scas.actionSeparator}/>
                                <CallAction
                                    type="merge"
                                    description="merge"
                                    onPress={this._onMergePress}
                                />
                                <View style={scas.actionSeparator}/>
                                <CallAction
                                    type="record"
                                    description="record"
                                    onPress={() => {}}
                                />
                            </View>
                            <View style={scas.actionsContentSecondWrapper}>
                                <CallAction
                                    type="record"
                                    description="chat"
                                    onPress={() => {}}
                                />
                                <View style={scas.actionSeparator}/>
                                <View style={scas.actionEmpty}/>
                                <View style={scas.actionSeparator}/>
                                <View style={scas.actionEmpty}/>
                            </View>
                        </View>
                        <View style={scas.actionsPadding}/>
                    </View>
                </ViewPager>
                <View style={scas.switchContainer}>
                    <View style={[scas.switchIndicatorLeft, scas.switchIndicator, (this.state.actionsIndex === 0 ? scas.switchActive : null)]}/>
                    <View style={[scas.switchIndicatorRight, scas.switchIndicator, (this.state.actionsIndex === 1 ? scas.switchActive : null)]}/>
                </View>
            </View>
        )
    }
}

CallActions.propTypes = {
    style: Text.propTypes.style,
    call: PropTypes.object.isRequired,
    onAddPress: PropTypes.func,
    onMutePress: PropTypes.func,
    onUnMutePress: PropTypes.func,
    onSpeakerPress: PropTypes.func,
    onEarpiecePress: PropTypes.func,
    onTransferPress: PropTypes.func,
    onHoldPress: PropTypes.func,
    onUnHoldPress: PropTypes.func,
    onDTMFPress: PropTypes.func,
    onSelectedIndexChange: PropTypes.func
    // Por implementar
    // onParkPress: PropTypes.func,
    // onMergePress: PropTypes.func,
}

export default CallActions
