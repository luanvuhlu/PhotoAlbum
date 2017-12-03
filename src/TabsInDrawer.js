/**
 * @flow
 */

import React from 'react';
import {
  Button,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';
import {
  DrawerNavigator,
  TabNavigator,
  StackNavigator,
} from 'react-navigation';

// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const MyNavScreen = ({ navigation, banner }) => (
  <ScrollView style={styles.container}>
    <Text>{banner}</Text>
    <Button
      onPress={() => navigation.navigate('DrawerOpen')}
      title="Open drawer"
    />
    <Button
      onPress={() => navigation.goBack(null)}
      title="Go back"
    />
  </ScrollView>
);

const InboxScreen = ({ navigation }) => (
  <MyNavScreen
    banner={'Inbox Screen'}
    navigation={navigation}
  />
);
InboxScreen.navigationOptions = {
  drawer: {
    label: 'Inbox',
    
  },
};

const DraftsScreen = ({ navigation }) => (
  <MyNavScreen
    banner={'Drafts Screen'}
    navigation={navigation}
  />
);


DraftsScreen.navigationOptions = {
  drawer: {
    label: 'Drafts',
   
  },
};

const StacksNavScreen = ({navigation, banner, routeToGo}) => (
  <ScrollView style={styles.container}>
    <Text>{banner}</Text>
    <Button
      onPress={() => navigation.navigate('DrawerOpen')}
      title="Open drawer"
    />
    <Button
      onPress={() => navigation.navigate(routeToGo)}
      title={`Go to ${routeToGo} Screen`}
    />
    <Button
      onPress={() => navigation.goBack(null)}
      title="Go back"
    />
  </ScrollView>
);

const SettingsScreen = ({navigation}) => (
  <StacksNavScreen
    banner="Settings Screen"
    routeToGo="Profile"
    navigation={navigation}
  />
);
SettingsScreen.navigationOptions = {
  title: 'Settings screen nav title',
  drawer: {
  
  }

};
const ProfileScreen = ({navigation}) => (
  <StacksNavScreen
    banner="Profile Screen"
    routeToGo="Settings"
    navigation={navigation}
  />
);

ProfileScreen.navigationOptions = {
  title: 'Profile screen nav title'
};

const TabsScreen = TabNavigator({
  Settings: {
    screen: SettingsScreen
  },
  Profile: {
    screen: ProfileScreen
  }
});

TabsScreen.navigationOptions = {
  title: 'Stacks Screen'
};

const DrawerExample = DrawerNavigator({
  Inbox: {
    path: '/',
    screen: InboxScreen,
  },
  Drafts: {
    path: '/sent',
    screen: DraftsScreen,
  },
  Stacks: {
    path: '/stacks',
    screen: TabsScreen
  }
}, {
  initialRouteName: 'Drafts',
  contentOptions: {
    activeTintColor: '#e91e63',
  },
});

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === 'ios' ? 20 : 0,
  },
});

export default DrawerExample;