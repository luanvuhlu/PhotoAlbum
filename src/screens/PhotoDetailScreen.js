import React, {Component} from 'react';
import {
    Text,
    Image,
    View,
    Dimensions,
    StyleSheet,
} from 'react-native';
import {connect} from 'react-redux';
const window = Dimensions.get('window');
class PhotoDetailScreen extends Component {

    static navigationOptions = {header: null}

    componentWillReceiveProps(nextProps){
        console.log(nextProps);
    }
    render(){
        return (
            <View style={styles.container}>
                <Image 
                    style={styles.photoContainer}
                    source={{uri: this.props.uri}} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    photoContainer: {
        flex: 2,
        margin: 0, 
    }
});

const mapStateToProps = (state, ownProps) => {
    return {
        uri: state.albums.imageUri
    }
}

export default connect(mapStateToProps)(PhotoDetailScreen);