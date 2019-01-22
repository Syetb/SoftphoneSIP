import {StyleSheet} from 'react-native'
import {correctFontSizeForScreen} from '../../../utils/scale'

export function inputStyle (ratio, theme) {
    return {
        flex: 0.04 * ratio,      //0.15
        backgroundColor: theme === 'dark' ? "#3c4b51" : '#ECEFF1'
    }
}

export function textStyle (theme) {
    return {
        color: theme === 'dark' ? "#FFF" : undefined
    }
}

export function keyUnderlayColor (theme) {
    return {
        color: theme === 'dark' ? "#566971" : undefined
    }
}

export default StyleSheet.create({
    actionsWrapper: {
        flex: 0.181,
        flexDirection: "row",
        justifyContent: 'center'
    },
    action: {
        flex: 0.202,
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    actionTouchable: {
        backgroundColor: "#f3f6f8",
        justifyContent: 'center',
        borderRadius: 128,
        alignItems: 'center'
    },
    actionDarkTouchable: {
        backgroundColor: "#59696f"
    },
    actionGreenTouchable: {
        backgroundColor: "#4cd964"
    },
    actionText: {
        fontSize: correctFontSizeForScreen(9),
        color: "#000",
        fontWeight: '200',
        textAlign: "center",
        paddingTop: 5
    },
    actionDarkText: {
        color: "#FFF"
    }
})

