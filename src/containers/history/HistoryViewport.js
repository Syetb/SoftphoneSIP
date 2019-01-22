import React from 'react'
import { View, Text, Platform, Button } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { connect } from 'react-redux'

const HistoryViewport = (props) => {
    return (
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                backgroundColor: "#ECEFF1",
                justifyContent: 'center',
                paddingBottom: (Platform.OS === 'ios' ? 50 : 0)
            }}
        >
            <Text style={{fontSize: 42, marginTop: 26, color: "#666"}}>Historial Llamadas</Text>

            <Button
                onPress={() => {
                    Navigation.push('HistoryScreenId', {
                        component: {
                            name: 'Screen2',
                        }
                    });
                }}
                title="View next screen"
            />
        </View>
    )
}

HistoryViewport.propTypes = {

}

const mapStateToProps = (state) => {
    return {}
}

const mapDispatchToProps = (dispatch) => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(HistoryViewport)
