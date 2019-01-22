import React from 'react'
import { View, Text, Platform, Button } from 'react-native'
import { Navigation } from 'react-native-navigation'

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

export default HistoryViewport
