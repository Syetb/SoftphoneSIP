import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { View, TouchableOpacity, Text, Image } from 'react-native'

import slcb from './styles'

class ListCheckbox extends Component {

    constructor(props) {
        super(props)

        this._onPress = this.onPress.bind(this)
    }

    onPress() {
        if (this.props.disabled) {
            return
        }

        this.props.onChange && this.props.onChange(!this.props.value)
    }

    render() {
        const disabled = this.props.disabled

        return (
            <TouchableOpacity onPress={this._onPress} style={[slcb.container, this.props.style]}>

                <View style={slcb.descriptionContainer}>
                    <Text
                        style={[slcb.descriptionTitle, (disabled ? slcb.descriptionTextDisabled : null)]}
                        numberOfLines={1}
                        ellipsizeMode="middle"
                    >
                        {this.props.title}
                    </Text>
                    <Text style={[slcb.descriptionText, (disabled ? slcb.descriptionTextDisabled : null)]}>
                        {this.props.description}
                    </Text>
                </View>

                {
                    this.props.value ?
                        <View style={[slcb.checkboxSelected, (disabled ? slcb.checkboxDisabled : null)]}>
                            <Image source={require('../../../assets/images/common/ok_small.png')}/>
                        </View>
                        :
                        <View style={[slcb.checkbox, (disabled ? slcb.checkboxDisabled : null)]}>
                            <View style={slcb.checkboxHole}/>
                        </View>
                }
            </TouchableOpacity>
        )
    }
}

ListCheckbox.propTypes = {
    value: PropTypes.bool.isRequired,
    style: Text.propTypes.style,
    title: PropTypes.string,
    disabled: PropTypes.bool,
    description: PropTypes.string,
    onChange: PropTypes.func
}

export default ListCheckbox
