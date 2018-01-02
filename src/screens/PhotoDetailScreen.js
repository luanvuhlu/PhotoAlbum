import React, {Component} from 'react';
import {
    Text,
    Image,
    View,
    Dimensions,
    StyleSheet,
    FlatList,
    PixelRatio,
    StatusBar,
    TouchableHighlight,
} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import Share from 'react-native-share';
import RNFS from 'react-native-fs';
import RNFetchBlob from 'react-native-fetch-blob';
import {removePhoto} from '../redux/modules/albums/actions';

const window = Dimensions.get('window');

// TODO use PureComponent
class PhotoDetailScreen extends Component {

    static navigationOptions = {header: null}
    constructor(props) {
        super(props);

        this.state = {
            width: 0,
            height: 0,
            hideStatusBar: true
        };

        this.onImagePress = this.onImagePress.bind(this);
        this.shareOnClick = this.shareOnClick.bind(this);
        this.deleteOnClick = this.deleteOnClick.bind(this);
        this.backOnClick = this.backOnClick.bind(this);
    }

    componentDidMount() {
        // StatusBar.setHidden(this.state.hideStatusBar);
        Image.getSize(this.props.imageInfo, (srcWidth, srcHeight) => {
          const maxHeight = window.height;
          const maxWidth = window.width;
          console.log('srcWidth: ' + srcWidth);
          console.log('srcHeight: ' + srcHeight);
          const ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
          this.setState({ width: srcWidth * ratio, height: srcHeight * ratio });
        }, error => {
          console.log('error:', error);
        });
    }

    onImagePress(){
        this.setState({
            hideStatusBar: !this.state.hideStatusBar
        })
    }

    backOnClick(){
        this.props.navigation.goBack();
    }

    _renderTopAction(){
        if(!this.state.hideStatusBar){
            return (
                <View style={styles.topAction}>
                    <TouchableHighlight onPress={this.backOnClick}>
                        <Icon name='md-arrow-back' size={30} />
                    </TouchableHighlight>
                    <TouchableHighlight>
                        <Icon name='md-more' size={30} />
                    </TouchableHighlight>
                </View>
            )
        }else{
            return null;
        }
    }

    shareOnClick(){
        Share.open({
            url: this.props.imageInfo,
            title: 'Share the image'
          });
    }

    deleteOnClick(){
        const filePath = this.props.imageInfo;
        RNFetchBlob.fs.stat(filePath)
        .then(stats => {
            const fullPath = stats.path;
            RNFetchBlob.fs.unlink(fullPath)
                .then(() => {
                    console.log('FILE DELETED');
                    this.props.dispatch(removePhoto([filePath, 'file://'+fullPath]));
                    this.props.navigation.goBack();
                })
                .catch((err) => {
                    console.log(this.props.imageInfo);
                    console.error(err);
                });
        });
    }

    _renderBottomAction(){
        if(!this.state.hideStatusBar){
            return (
                <View style={styles.bottomAction}>
                    <TouchableHighlight onPress={this.shareOnClick}>
                        <Icon name='md-share' size={30} />
                    </TouchableHighlight>
                    <TouchableHighlight>
                        <Icon name='md-brush' size={30} />
                    </TouchableHighlight>
                    <TouchableHighlight>
                        <Icon name='ios-alert' size={30} />
                    </TouchableHighlight>
                    <TouchableHighlight onPress={this.deleteOnClick}>
                        <Icon name='ios-trash' size={32} />
                    </TouchableHighlight>
                </View>
            )
        }else{
            return null;
        }
    }

    render(){
        return (
            <View style={styles.container}>
                {this._renderTopAction()}
                <TouchableHighlight 
                    style={styles.imageBtn}
                    onPress={this.onImagePress}>
                    <Image source={{uri: this.props.imageInfo}}
                        style={{
                            width: this.state.width,
                            height: this.state.height
                        }} />
                </TouchableHighlight>
                {this._renderBottomAction()}
                <StatusBar 
                    translucent={true}
                    hidden={this.state.hideStatusBar} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        // backgroundColor: 'black',
    },
    imageBtn: {

    },
    topAction: {
        position: 'absolute',
        top: 30,
        left: 20,
        width: window.width - 40,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    bottomAction: {
        position: 'absolute',
        top: window.height - 40,
        left: 60,
        width: window.width - 120,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});

const mapStateToProps = (state, ownProps) => {
    return {
        imageInfo: state.albums.imageInfo,
    }
}

export default connect(mapStateToProps)(PhotoDetailScreen);