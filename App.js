import React from 'react';
import { View,Text} from 'react-native';
import { createAppContainer,createSwitchNavigator} from 'react-navigation';
import { createStackNavigator, } from 'react-navigation-stack';
import { createDrawerNavigator, } from 'react-navigation-drawer';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import LoginScreen from "./src/login";
import ChatRoomScreen from "./src/ChatRoom";
import Room from "./src/Room";
import RoomHomeScreen from "./src/RoomHome";

import Moment from "./src/Moment";
import Messages from "./src/messages";
import Chat from "./src/chat";

import PhoneAuthScreen from "./src/PhoneAuth";
import VerifyPhoneScreen from "./src/verifyCode";

import SideMenu from './src/sideMenu';
import createNewRoomScreen from './src/createNewRoom';
import messages from './src/messages';
import chat from './src/chat';

import FlashMessage from "react-native-flash-message";

const MessageNavigator = createStackNavigator({
  MessageScreen: {
    screen: messages,
    navigationOptions: {
      header: null,
  }
  },
  ChatScreen: {
    screen: chat,
    navigationOptions: {
      header: null,
  }
  }
})

const RoomTabNavigator = createBottomTabNavigator(
  {
  Room: {
    screen: RoomHomeScreen,
    navigationOptions: {
      tabBarIcon: ({tintColor}) => (
                        <View style={{flexDirection: 'column', 
        width:'100%', height: '100%', alignItems: 'center', justifyContent:'center',
        backgroundColor: tintColor}}>
        <Text style={{fontSize: 12, color: 'black'}}>Room</Text>
        </View>

      ),
    },
  },
  Moment: {
    screen: Moment,
    navigationOptions: {
      header : null,
      tabBarIcon: ({tintColor}) => (
                        <View style={{flexDirection: 'column', 
        width:'100%', height: '100%', alignItems: 'center', justifyContent:'center',
        backgroundColor: tintColor}}>
        <Text style={{fontSize: 12, color: 'black'}}>Moment</Text>
        </View>

      ),
    },
  },
  Messages: {
    screen: MessageNavigator,
    navigationOptions: {
      header : null,
      tabBarIcon: ({tintColor}) => (
                        <View style={{flexDirection: 'column', 
        width:'100%', height: '100%', alignItems: 'center', justifyContent:'center',
        backgroundColor: tintColor}}>
        <Text style={{fontSize: 12, color: 'black'}}>Messages</Text>
        </View>

      ),
    },
  },
  },
  {
    initialRouteName: "Room",
  tabBarOptions: {
    activeTintColor: '#D82020',
    inactiveTintColor: 'white',
    showIcon: true,
    showLabel: false,
    style: {
      backgroundColor: 'white',
      height: 50
    },
  },
  },
);


const RoomDashboard = createDrawerNavigator(
  {
    Room: {
       screen: RoomTabNavigator ,
       navigationOptions: {
       title: "Change Pin Code",
      headerStyle: {
        height: 200,
      }
    }
    }, 
    createNewRoom:{
      screen:createNewRoomScreen
    },
    RoomScrn :{
      screen:ChatRoomScreen
    }

  },
  {
  contentComponent: SideMenu,
  drawerWidth: 300,
  drawerPosition: "left",
  activeTintColor: 'white',
  inactiveTintColor: 'white'
}
);

const RootContainer =  createAppContainer(createSwitchNavigator(
  {
    login:LoginScreen,
    Home: RoomDashboard,
    phoneauth :PhoneAuthScreen,
    verifyPhone :VerifyPhoneScreen,
  },
  {
    initialRouteName: 'login',
  }
));


export default class App extends React.Component {
  render() { 
   return <View style={{flex:1}}>
      <RootContainer>
      ref={navigatorRef => {
        NavigationService.setTopLevelNavigator(navigatorRef);
      }}
      </RootContainer>  
      <FlashMessage position="top" />
 
    </View>  
       
  
}

}