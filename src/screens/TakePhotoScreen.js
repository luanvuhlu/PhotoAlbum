import React, {Component} from 'react';
import {
    Text,
    StyleSheet,
    View,
    TouchableHighlight,    
} from 'react-native'
import Camera from 'react-native-camera';
import PushNotification from 'react-native-push-notification';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addPhoto, viewPhoto} from '../redux/modules/albums/actions';

class TakePhotoScreen extends Component {
    static navigationOptions = {
        header: null,
    }

  constructor() {
    super();
    this._onNotification = this._onNotification.bind(this);
  }

  // TODO bug force close app
  _onNotification(notification){
    console.log(this);
    this.props.dispatch(viewPhoto(notification.data.uri));
    this.props.navigation.navigate('photoDetail');
  }

  componentDidMount(){
    PushNotification.configure({
      onNotification: this._onNotification
    });
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
                    <TouchableHighlight onPress={this.takePicture.bind(this)} style={styles.capture}>
                        <Text></Text>
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
        .then((data)=> {
            this.props.dispatch(addPhoto(data.path));
            PushNotification.localNotification({
              subText: 'This is a subText',
              bigText: 'This is a bigtext',
              title: "New photo",
              message: "A new photo is added to the gallery. Click to view",
              data: {
                uri: data.mediaUri
              }
            });
        })
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
      borderWidth: 0,
      borderColor:'rgba(0,0,0,0.2)',
      alignItems:'center',
      justifyContent:'center',
      width:70,
      height:70,
      backgroundColor: 'white',
      borderRadius:70,
      marginBottom: 10,
    }
});

export default connect(null)(TakePhotoScreen);