import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    TouchableHighlight,
} from 'react-native';

import {
    CameraKitGalleryView, 
    CameraKitGallery
} from 'react-native-camera-kit';
import {connect} from 'react-redux';
import { viewPhoto } from '../redux/modules/albums/actions';

const window = Dimensions.get('window');

class PhotosScreen extends Component{
    static navigationOptions = { header: null }

    componentWillReceiveProps(nextProps){
        if(this.props.lastEditedImage === nextProps.lastEditedImage){
            return;
        }
        if(nextProps.lastEditedImage){
            this.props.lastEditedImage = null;
            this.gallery.refreshGalleryView(nextProps.lastEditedImage);
        }
    }
    render(){
        return (
            <View style={styles.container}>
                <CameraKitGalleryView 
                    ref={(gallery) => {
                        this.gallery = gallery;
                    }}
                    onTapImage = {event => {
                        this.props.dispatch(viewPhoto(event.nativeEvent.selected));
                        this.props.navigation.navigate('photoDetail');
                    }}
                    style={styles.photoContainer}
                    minimumInteritemSPacing={10}
                    minimumLineSpacing={10}
                    columnCount={3}
                    selection={{
                        overlayColor: 0
                    }}
                />
                <View style={styles.takePhotoBtnContainer}>
                    <TouchableHighlight
                        style={styles.takePhotoBtn}
                        onPress={() => this.props.navigation.navigate('takePhoto')}>
                        <Text style={styles.takeByShit}>+</Text>
                    </TouchableHighlight>
                </View>
            </View>
        )
    }

    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    photoContainer: {
        flex: 2,
        margin: 0, 
        backgroundColor: '#ffffff', 
    },
    takePhotoBtnContainer: {
        position: 'absolute',
        bottom: 5,
        left: 5,
    },
    takeByNative: {
        backgroundColor: '#673AB7',
        borderRadius: 5,
        color: '#000',
        padding: 20,
        width: 120,
        alignSelf: 'flex-start',
        textAlign: 'center',
        
    },
    takePhotoBtn: {
        borderWidth:1,
        borderColor:'rgba(0,0,0,0.2)',
        alignItems:'center',
        justifyContent:'center',
        width:70,
        height:70,
        backgroundColor: '#673AB7',
        borderRadius:70,
    },
    takeByShit: {
        fontSize: 30,
        marginTop: -5,
        color: 'white',
    },
  });

const mapStateToProps = state => {
    return {
        lastEditedImage: state.albums.lastEditedImage,
    };
}
export default connect(mapStateToProps)(PhotosScreen);