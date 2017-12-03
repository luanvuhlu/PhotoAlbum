import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
} from 'react-native';
import TabScreen from './TabScreen';

class SharingScreen extends Component{
    static navigationOptions = {
        tabBarLabel: 'Sharing',
        header: null,
    };
    render(){
        return (
            <TabScreen>
                <Text>Sharing</Text>
            </TabScreen>
        )
    }
}

export default SharingScreen;