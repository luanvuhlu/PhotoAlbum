import React from 'react';
import {
	Text,
	View,
	StyleSheet,
} from 'react-native';
import {
	DrawerNavigator,
	TabNavigator,
	StackNavigator,
} from 'react-navigation';
import './config/ReactotronConfig';
  
import AssistantScreen from './screens/AssistantScreen';
// import PhotosScreen from './screens/PhotosScreen';
import NativeGalerryScreen from './screens/NativeGalleryScreen';
import PhotoDetailScreen from './screens/PhotoDetailScreen';
import AlbumsScreen from './screens/AlbumsScreen';
import SharingScreen from './screens/SharingScreen';
import TakePhotoScreen from './screens/TakePhotoScreen';

const TabsScreen = TabNavigator({
	Photos: {
		// screen: PhotosScreen,
		screen: NativeGalerryScreen,
	},
	Assistant: {
		screen: AssistantScreen,
	},
	Albums: {
		screen: AlbumsScreen,
	},
	Sharing: {
		screen: SharingScreen,
	},
}, {
	tabBarPosition: 'bottom',
	swipeEnabled: false
});

const TakePhotoStack = StackNavigator({
	tabNav: {
		screen: TabsScreen,
	},
	photo: {
		screen: NativeGalerryScreen,
	},
	photoDetail: {
		screen: PhotoDetailScreen,
	},
	takePhoto: {
		screen: TakePhotoScreen,
	},
});

const AppNavigator = DrawerNavigator({
	home: {
		path: '/',
		screen: TakePhotoStack,
	},
	device_folder: {
		path: '/device-folder',
		screen: () => (<Text>Device folder</Text>),
	},
	archive: {
		path: '/archive',
		screen: () => (<Text>Archive</Text>),
	},
	trash: {
		path: '/trash',
		screen: () => (<Text>Trash</Text>),
	},
},{
	initialRouteName: 'home',
	drawerOpenRoute: 'DrawerOpen',
	drawerCloseRoute: 'DrawerClose',
	drawerToggleRoute: 'DrawerToggle'
});

export default AppNavigator;