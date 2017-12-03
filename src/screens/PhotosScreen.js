import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    TouchableHighlight,
} from 'react-native';

import {CameraKitGalleryView} from 'react-native-camera-kit';

const window = Dimensions.get('window');

class PhotosScreen extends Component{
    static navigationOptions = { header: null }
    render(){
        return (
            <View style={styles.container}>
                <CameraKitGalleryView 
                    ref={(gallery) => {
                        this.gallery = gallery;
                    }}
                    style={styles.photoContainer}
                    minimumInteritemSPacing={10}
                    minimumLineSpacing={10}
                    columnCount={3}
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

export default PhotosScreen;