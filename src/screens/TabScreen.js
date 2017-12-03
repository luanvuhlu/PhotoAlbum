import React, {Component} from 'react';
import {
    Platform,
    View,
    Text,
    ScrollView,
    StyleSheet,
} from 'react-native';

class TabScreen extends Component {
    render(){
        return (
            <ScrollView style={styles.container}>
                {this.props.children}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: Platform.OS === 'ios' ? 20 : 0,
    },
});

export default TabScreen;