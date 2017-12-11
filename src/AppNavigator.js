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
import PhotosScreen from './screens/PhotosScreen';
import AlbumsScreen from './screens/AlbumsScreen';
import SharingScreen from './screens/SharingScreen';
import TakePhotoScreen from './screens/TakePhotoScreen';
import TakePhotoNativeScreen from './screens/TakePhotoNativeScreen';

const TabsScreen = TabNavigator({
	Assistant: {
		screen: AssistantScreen,
	},
	Photos: {
		screen: PhotosScreen,
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
		screen: PhotosScreen,
	},
	takePhoto: {
		screen: TakePhotoScreen,
	},
	takePhotoNative: {
		screen: TakePhotoNativeScreen,
	}
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
});

export default AppNavigator