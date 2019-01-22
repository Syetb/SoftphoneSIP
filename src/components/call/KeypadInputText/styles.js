import { StyleSheet } from 'react-native'
import { correctFontSizeForScreen } from '../../../utils/scale'

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputText: {
        marginLeft: 48,
        flex: 1,
        textAlign: 'center',
        fontSize: correctFontSizeForScreen(30)
    },
    textNotEditable: {
        marginLeft: 10,
        marginRight: 10
    },
    clearTouchable: {
        width: 32,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16
    },
    stretch: {
        width: '100%',
        height: 24
    }
})

export default styles
