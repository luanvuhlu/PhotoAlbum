import React, {Component} from 'react';
import {
    Text,
    Image,
    View,
    Dimensions,
    StyleSheet,
    FlatList,
    PixelRatio
} from 'react-native';
import {connect} from 'react-redux';
import Gallery from 'react-native-image-gallery';
const window = Dimensions.get('window');

// TODO use PureComponent
class PhotoDetailScreen extends Component {

    static navigationOptions = {header: null}
    constructor(props) {
      super(props);
    }

    // _renderItem(listItem){
    //     console.log(listItem);
    //     return (
    //             <Image style={{width:window.width, height:window.height}} resizeMode={Image.resizeMode.contain}
    //                 source={{uri: listItem.item.uri}} />
    //     );
    // }

    componentDidMount(){
        // this.flatListRef.scrollToIndex(3);
    }

    render(){
        return (
            <View style={styles.container}>
                <Gallery
                    style={styles.imageList}
                    images={this.props.images.map(image => ({source: {uri: image.uri}}))}
                    />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageList: {
        flex: 1,
    },
});

const mapStateToProps = (state, ownProps) => {
    return {
        images: state.albums.imageInfo.images,
        index: state.albums.imageInfo.index
    }
}

export default connect(mapStateToProps)(PhotoDetailScreen);