import React, {Component} from 'react';
import {
    Text,
    StyleSheet,
    View,
    TouchableHighlight,    
} from 'react-native'
import Camera from 'react-native-camera';


class TakePhotoScreen extends Component {
    static navigationOptions = {
        header: null,
    }
    render(){
        return (
            <View style={styles.container}>
                <Camera
                    ref={(cam) => {
                        this.camera = cam;
                    }}
                    captureMode={Camera.constants.CaptureMode.still}
                    playSoundOnCapture={false}
                    style={styles.preview}
                    onBarCodeRead={this.barcodeScan.bind(this)}
                    aspect={Camera.constants.Aspect.fill}>
                    <TouchableHighlight onPress={this.takePicture.bind(this)}>
                        <Text style={styles.capture}></Text>
                    </TouchableHighlight>
                </Camera>
            </View>
        )
    }

    barcodeScan(data){
        console.log(data);
    }
    takePicture(){
        const options = {};
        this.camera.capture({metadata: options})
        .then((data)=> console.log(data))
        .catch((err) => console.error(err));
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    capture: {
      flex: 0,
      borderWidth:1,
      borderColor:'rgba(0,0,0,0.2)',
      alignItems:'center',
      justifyContent:'center',
      width:70,
      height:70,
      backgroundColor: '#673AB7',
      borderRadius:70,
      marginBottom: 10,
    }
});

export default TakePhotoScreen;