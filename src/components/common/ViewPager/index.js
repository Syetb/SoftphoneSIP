import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text, View, ScrollView, ViewPagerAndroid, Platform } from 'react-native'

import svp from './styles'

class ViewPager extends Component {

    constructor(props) {
        super(props)

        this.state = {
            width: 0,
            height: 0,
            selectedIndex: this.props.selectedIndex,
            initialSelectedIndex: this.props.selectedIndex,
            scrollingTo: null
        }

        this._handleHorizontalScroll = this.handleHorizontalScroll.bind(this)
        this._adjustCardSize = this.adjustCardSize.bind(this)
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.selectedIndex !== this.state.selectedIndex) {
            if (Platform.OS === 'ios') {
                this.scrollView.scrollTo({
                    x: nextProps.selectedIndex * this.state.width,
                    animated: true,
                })
                this.setState( { scrollingTo: nextProps.selectedIndex } )

            } else {
                this.scrollView.setPage(nextProps.selectedIndex)
                this.setState( { selectedIndex: nextProps.selectedIndex } )
            }
        }
    }

    handleHorizontalScroll(e: any) {

        let selectedIndex = e.nativeEvent.position
        if (selectedIndex === undefined) {
            selectedIndex = Math.round(
                e.nativeEvent.contentOffset.x / this.state.width
            )
        }

        if (selectedIndex < 0 || selectedIndex >= this.props.count) {
            return
        }

        if (this.state.scrollingTo !== null && this.state.scrollingTo !== selectedIndex) {
            return
        }

        if (this.props.selectedIndex !== selectedIndex || this.state.scrollingTo !== null) {
            this.setState( { selectedIndex, scrollingTo: null } )
            const { onSelectedIndexChange } = this.props
            onSelectedIndexChange && onSelectedIndexChange(selectedIndex)
        }
    }

    adjustCardSize(e: any) {
        this.setState({
            width: e.nativeEvent.layout.width,
            height: e.nativeEvent.layout.height,
        })
    }

    renderIOS() {
        return (
            <ScrollView
                ref={ (c) => { this.scrollView = c } }
                contentOffset={ { x: this.state.width * this.state.initialSelectedIndex, y: 0 } }
                style={ [ svp.scrollview, this.props.style ] }
                horizontal
                pagingEnabled
                bounces={!!this.props.bounces}
                scrollsToTop={false}
                onScroll={this._handleHorizontalScroll}
                scrollEventThrottle={100}
                removeClippedSubviews
                automaticallyAdjustContentInsets={false}
                directionalLockEnabled
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                onLayout={this._adjustCardSize}
            >
                { this.renderContent() }
            </ScrollView>
        )
    }

    renderAndroid() {
        return (
            <ViewPagerAndroid
                ref={ (c) => { this.scrollView = c } }
                initialPage={this.state.initialSelectedIndex}
                onPageSelected={this._handleHorizontalScroll}
                style={svp.container}
            >
                { this.renderContent() }
            </ViewPagerAndroid>
        )
    }

    renderContent() {
        const { width, height } = this.state
        const style = Platform.OS === 'ios' && svp.card

        return React.Children.map(this.props.children, (child, i) => (
            <View style={ [ style, { width, height } ] } key={`r_${i}`}>
                { child }
            </View>
        ))
    }

    render() {

        return Platform.OS === 'ios'
            ? this.renderIOS()
            : this.renderAndroid()
    }
}

ViewPager.propTypes = {
    children: PropTypes.node,
    style: Text.propTypes.style,
    count: PropTypes.number,
    selectedIndex: PropTypes.number,
    onSelectedIndexChange: PropTypes.func,
    bounces: PropTypes.bool
}

export default ViewPager
