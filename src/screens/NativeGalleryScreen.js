import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    Image,
    CameraRoll
} from 'react-native';
import {connect} from 'react-redux';

const ITEM_PER_PAGE = 25;



class NativeGalleryScreen extends Component{
    static navigationOptions = {header: null}
    
    constructor(){
        super();
        this.state = {
            images: []
        };

        this.storeImages = this.storeImages.bind(this);
        this.logImageError = this.logImageError.bind(this);
    }

    componentDidMount(){
        const fetchParam = {
            first: ITEM_PER_PAGE,
        };
        CameraRoll.getPhotos(fetchParam)
        .then(this.storeImages)
        .catch(this.logImageError);
    }

    storeImages(data){
        console.log(data);
        const assets = data.edges;
        const images = assets.map(asset => asset.node.image);
        this.setState({
            images: images,
        });
    }

    logImageError(err){
        console.log(err);
    }

    render(){
        return (
            <ScrollView style={styles.container}>
                <View style={styles.imageGrid}>
                    {this.state.images.map(image => <Image key={image.uri} style={styles.image} source={{uri: image.uri}} />)}
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
       flex: 1 
    },
    imageGrid: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start'
    },
    image: {
        width: 100,
        height: 100,
        marginLeft: 1,
        marginTop: 2,
    }
});

const mapStateToProps = (state, ownProps) => {
    return {
        photos: state.photos
    }
}

export default connect(mapStateToProps)(NativeGalleryScreen);