import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
} from 'react-native';
import TabScreen from './TabScreen';

class AssistantScreen extends Component{
    static navigationOptions = {
        tabBarLabel: 'Assistant',
        header: null,
    };
    render(){
        return (
            <TabScreen>
                <Text>Assistant</Text>
            </TabScreen>
        )
    }
}

export default AssistantScreen;