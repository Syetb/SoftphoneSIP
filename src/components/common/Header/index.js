import React from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'

import HeaderItem from './item'
import s from './styles'

const Header = ( { style, leftItem, title, rightItem, foreground, children, fontSizeTitle=null } ) => {
  const titleColor = foreground === 'dark' ? F8Colors.darkText : 'white'
  const itemsColor = foreground === 'dark' ? F8Colors.lightText : 'white'

  const styleText = !fontSizeTitle ? [s.titleText, { color: titleColor }] : [{ fontSize: fontSizeTitle, color: titleColor}]

  const content = React.Children.count(children) === 0
    ? (<Text style={ styleText }>
      {title}
    </Text>)
    : children
  return (
    <View style={[s.header, style]}>
      <View style={s.leftItem}>
        <HeaderItem color={itemsColor} item={leftItem}/>
      </View>
      <View
        accessible
        accessibilityLabel={title}
        accessibilityTraits="header"
        style={s.centerItem}
      >
        {content}
      </View>
      <View style={s.rightItem}>
        <HeaderItem color={itemsColor} item={rightItem}/>
      </View>
    </View>
  )
}

Header.propTypes = {
  title: PropTypes.string,
  leftItem: PropTypes.object,
  rightItem: PropTypes.object,
  extraItems: PropTypes.array,
  foreground: PropTypes.object,
  style: PropTypes.any,
  children: PropTypes.any,
  fontSizeTitle: PropTypes.any,
}

export default Header
