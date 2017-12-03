import React, {Component} from 'react';
import {
    Text,
    StyleSheet,
    View,
    TouchableHighlight,    
} from 'react-native'
import {CameraKitCamera} from 'react-native-camera-kit';


class TakePhotoNativeScreen extends Component {
    static navigationOptions = {
        header: null,
    }
    render(){
        return (
            <View style={styles.container}>
                <CameraKitCamera
                    actions={{ rightButtonText: 'Done', leftButtonText: 'Cancel' }}
                    ref={cam => this.camera = cam}
                    style={{
                        flex: 1,

                    }}
                    cameraOptions={{
                        flashMode: 'auto',
                        focusMode: 'on',
                        zoomMode: 'on',
                        ratioOverlay: '1:1',
                        ratioOverlayColor: '#00000077',
                    }}
                    onReadQRCode={(event) => console.log(event.nativeEvent.qrCodeStringValue)}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
    },
});

export default TakePhotoNativeScreen;