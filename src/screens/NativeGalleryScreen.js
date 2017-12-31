import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    Image,
    CameraRoll,
    TouchableHighlight,
    FlatList
} from 'react-native';
import {connect} from 'react-redux';
import { viewPhoto } from '../redux/modules/albums/actions';

const ITEM_PER_PAGE = 8;

const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
  const paddingToBottom = 20;
  return layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom;
};

class PhotoItem extends React.PureComponent{

    _onPress = () => {
        this.props.onPressItem(this.props.index, this.props.images)
    }
    render(){
       return (
            <TouchableHighlight
                onPress={this._onPress}>
                <Image 
                    style={styles.image} 
                    source={{uri: this.props.item.uri}}
                     />
            </TouchableHighlight>
        );
    }
}
class NativeGalleryScreen extends Component{
    static navigationOptions = {header: null}
    
    constructor(){
        super();
        this.state = {
            images: [],
            end_photo_cursor: null,
            hasNextPhoto: true
        };

        this.storeImages = this.storeImages.bind(this);
        this.logImageError = this.logImageError.bind(this);
        this._renderItem = this._renderItem.bind(this);
    }

    componentWillMount(){
        this.getPhoto();        
    }

    getPhoto(){
        console.log(this.state.hasNextPhoto);


        const fetchParam = {
            first: ITEM_PER_PAGE,
            after: this.state.end_photo_cursor
        };
        CameraRoll.getPhotos(fetchParam)
        .then(this.storeImages)
        .catch(this.logImageError);
    }

    componentWillReceiveProps(nextProps){
        if(this.props.lastEditedImage === nextProps.lastEditedImage){
            return;
        }
        if(nextProps.lastEditedImage){
            this.props.lastEditedImage = null;
            this.setState({
                images: this.sliceImageArray(nextProps.lastEditedImage, this.state.images)
            });
            console.log(this.state);
        }
    }

    sliceImageArray(newImage, images){
        return [{uri: newImage}, ...images];
    }

    storeImages(data){
        console.log(data);
        const assets = data.edges;
        const images = assets.map(asset => asset.node.image);
        this.setState({
            images: [...this.state.images, ...images],
            end_photo_cursor: data.page_info.end_cursor,
            hasNextPhoto: data.page_info.has_next_page
        });
    }

    logImageError(err){
        console.log(err);
    }
    // TODO use PureComponent
    _renderItem(listItem){
        return (
            <PhotoItem
                index={listItem.index}
                images={this.state.images}
                item={listItem.item}
                onPressItem={(index, images) => {
                    this.props.dispatch(viewPhoto(0, images));
                    this.props.navigation.navigate('photoDetail');
                }}
             />
        )
    }

    render(){
        console.log(this.state);
        return (
            <View style={styles.container}>
                <FlatList style={styles.imageGrid}
                    data={this.state.images}
                    renderItem={this._renderItem}
                    numColumns={4}
                    keyExtractor={(item, index) => index}
                    scrollToIndex={0}
                    onEndReached={() => {
                        if(this.state.hasNextPhoto){
                            this.getPhoto();
                        }
                    }}>
                </FlatList>
                <View style={styles.takePhotoBtnContainer}>
                    <TouchableHighlight
                        style={styles.takePhotoBtn}
                        onPress={() => this.props.navigation.navigate('takePhoto')}>
                        <Text style={styles.takeByShit}>+</Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
       flex: 1 
    },
    imageGrid: {
        flex: 1,
    },
    image: {
        width: 100,
        height: 100,
        marginLeft: 1,
        marginTop: 2,
    },
    takePhotoBtnContainer: {
        position: 'absolute',
        bottom: 5,
        left: 5,
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
});

const mapStateToProps = (state, ownProps) => {
    return {
        // images: state.images,
        lastEditedImage: state.albums.lastEditedImage,
    }
}

export default connect(mapStateToProps)(NativeGalleryScreen);