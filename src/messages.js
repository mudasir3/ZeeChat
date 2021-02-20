import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import {TabView, TabBar} from 'react-native-tab-view';

import firestore from '@react-native-firebase/firestore';
import {_saveToAsync, _getDataAsync} from './AsyncStorage';

import {withNavigation} from 'react-navigation';

class RoomHomeScreen extends Component {
  state = {
    FriendsList: [
      {
        name: 'Static User',
        msg: 'Hello Friend',
      },
    ],
    visible: false,
  };

  componentDidMount() {
    // const { navigation } = this.props;
    // this.focusListener = navigation.addListener('didFocus', () => {
    // })
  }

  getRoomData = async () => {
    this.setState({
      RoomList: [],
      visible: true,
    });

    firestore()
      .collection('Rooms')
      .get()
      .then((querySnapshot) => {
        console.log('Total users: ', querySnapshot.size);

        querySnapshot.forEach((documentSnapshot) => {
          var obj = {
            anouncement: documentSnapshot.data().anouncement,
            name: documentSnapshot.data().name,
            id: documentSnapshot.id,
          };

          this.setState({
            visible: false,
            RoomList: [...this.state.RoomList, obj],
          });
        });
      });
  };

  createFriendsList = (item, index) => {
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate('ChatScreen')}
        style={{
          borderRadius: 15,
          flexDirection: 'row',
          backgroundColor: '#ffffff',
          height: 80,
          marginVertical: 10,
        }}>
        <Image
          style={{width: 80, height: 80, borderRadius: 10}}
          source={require('../assets/avatar.png')}
        />

        <View>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                marginLeft: 10,
                textAlign: 'center',
                color: '#000000',
                marginTop: 5,
                fontWeight: 'bold',
              }}>
              {item.name}
            </Text>
          </View>

          <View style={{flexDirection: 'row'}}></View>

          <Text
            style={{
              textAlign: 'center',
              color: '#000000',
              marginTop: 5,
              marginLeft: 10,
            }}>
            {item.msg}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#FCF3F4'}}>
        <View
          style={{
            backgroundColor: '#D82020',
            padding: 8,
            flexDirection: 'row',
            alignSelf: 'stretch',
          }}>
          <TouchableOpacity
            style={{alignSelf: 'flex-start', flex: 1}}
            onPress={() => this.props.navigation.openDrawer()}>
            <Image
              style={{
                marginTop: 5,
                marginLeft: 5,
                width: 40,
                height: 40,
                borderRadius: 20,
              }}
              source={require('../assets/avatar.png')}
            />
          </TouchableOpacity>

          <Text
            style={{
              backgroundColor: '#D82020',
              color: '#ffffff',
              fontSize: 20,
            }}>
            Messages
          </Text>

          <TouchableOpacity
            //onPress={()=>this.addFriend(this.state.selectedmember)}
            style={{alignSelf: 'flex-end', flex: 1}}>
            <Image
              style={{
                width: 40,
                height: 40,
                resizeMode: 'contain',
                alignSelf: 'flex-end',
              }}
              source={require('../assets/addfriend.png')}
            />
          </TouchableOpacity>
        </View>

        <View style={{flex: 1, marginHorizontal: 10, marginTop: 10}}>
          <FlatList
            style={{borderRadius: 20, margin: 5}}
            data={this.state.FriendsList}
            renderItem={({item, index}) => this.createFriendsList(item, index)}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tabStyle: {},
  scrollStyle: {
    backgroundColor: 'white',
    paddingLeft: 65,
    paddingRight: 65,
    // justifyContent: 'center',
  },
  tabBarTextStyle: {
    fontSize: 14,
    fontWeight: 'normal',
    color: '#000000',
  },
  underlineStyle: {
    height: 3,
    backgroundColor: 'red',
    borderRadius: 3,
    width: 15,
  },
  tabbar: {
    backgroundColor: '#D82020',
  },
  indicator: {
    backgroundColor: '#ffeb3b',
  },
  label: {
    fontWeight: '400',
  },
  tabStyle: {
    width: 'auto',
  },
});

export default withNavigation(RoomHomeScreen);
