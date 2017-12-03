import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
} from 'react-native';
import TabScreen from './TabScreen';

class AlbumsScreen extends Component{
    static navigationOptions = {
        tabBarLabel: 'Albums',
        header: null,
    };
    render(){
        return (
            <TabScreen>
                <Text>Albums</Text>
            </TabScreen>
        )
    }
}

export default AlbumsScreen;