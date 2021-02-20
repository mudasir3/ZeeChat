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
import {getRooms} from './api/ApiEndPoints';

import {withNavigation} from 'react-navigation';

class RoomHomeScreen extends Component {
  static navigationOptions = {
    title: 'HeaderTitle',
    headerStyle: {
      backgroundColor: 'red',
    },
    headerTintColor: 'red',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  state = {
    RoomList: [
      {
        name: 'Random Room',
      },
    ],
    key: 'all',
    visible: false,
    title: 'All',
    userid: '',
    token: '',
    index: 0,
    routes: [
      {key: 'all', title: 'All'},
      {key: 'new', title: 'New'},
      {key: 'popular', title: 'Popular'},
      {key: 'recent', title: 'Recent'},
      {key: 'joined', title: 'Joined'},
    ],
    flatlistloading: false,
  };

  componentDidMount() {
    this.getdata();
  }

  getdata = async () => {
    await _getDataAsync('userid', (response) => {
      //let object = JSON.parse(response);
      console.log('user : ', response);
      this.setState({userid: response});
    });

    await _getDataAsync('token', (response) => {
      console.log('token : ', response);

      this.getRoomData(response);

      this.setState({token: response});
    });
  };

  reloadRoomsList = async () => {
    this.setState({
      RoomList: [],
      flatlistloading: true,
      loading: true,
    });

    let token = this.state.token;
    //let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImlhdCI6MTYwNzI1Njk3NSwiZXhwIjoxNjA3ODYxNzc1fQ.UtcnCaDReH25LsKAeQ5HGfwZZ-0ma8bleH9mftwhX04"
    getRooms(token)
      .then((res) => {
        console.log(' response rooms' + JSON.stringify(res));

        this.setState({
          visible: false,
          RoomList: res.data,
          flatlistloading: false,
        });
      })
      .catch((err) => {
        console.log(' response rooms' + err + '  ' + JSON.stringify(err));
      });
  };
  getRoomData = async (token) => {
    this.setState({
      RoomList: [],
      visible: true,
    });

    getRooms(token)
      .then((res) => {
        console.log(' response rooms' + JSON.stringify(res));

        this.setState({
          visible: false,
          RoomList: res.data,
        });
      })
      .catch((err) => {
        console.log(' response rooms' + err + '  ' + JSON.stringify(err));
      });
  };

  navigationState = (index, routes) => {
    this.setState({
      index,
      routes,
    });
  };
  handleIndexChange = (index) => {
    this.setState({
      index,
    });
  };

  renderTabBar = (props, navigationState) => (
    <TabBar
      {...props}
      scrollEnabled
      indicatorStyle={styles.indicator}
      style={styles.tabbar}
      labelStyle={styles.label}
      tabStyle={styles.tabStyle}
    />
  );

  renderScene = (route, jumpTo) => {
    return (
      <View style={{borderRadius: 10}}>
        <FlatList
          style={{marginHorizontal: 10, borderRadius: 10}}
          onRefresh={() => this.reloadRoomsList()}
          refreshing={this.state.flatlistloading}
          data={this.state.RoomList}
          renderItem={({item, index}) => this.createRoomList(item, index)}
          keyExtractor={(item) => item.id}
        />

        <ActivityIndicator
          style={{marginTop: 20}}
          visible={this.state.visible}
          size="large"
          color="#ff0000"
          animating={this.state.visible}></ActivityIndicator>
      </View>
    );
  };

  createRoomList = (item, index) => {
    return (
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate('RoomScrn', {
            roomname: item.name,
            roomid: item.id,
            anouncement: item.anouncement,
            image: item.image,
          })
        }
        style={{
          borderRadius: 15,
          flexDirection: 'row',
          backgroundColor: '#ffffff',
          height: 80,
          marginVertical: 10,
        }}>
        <Image
          style={{width: 80, height: 80, borderRadius: 10}}
          source={require('../assets/chat.jpg')}
        />

        <View>
          <View style={{flexDirection: 'row'}}>
            <Image
              style={{
                marginTop: 5,
                marginLeft: 5,
                width: 20,
                height: 20,
                borderRadius: 20,
              }}
              source={require('../assets/pak.png')}
            />

            <Text style={{textAlign: 'center', color: '#000000', marginTop: 5}}>
              {item.name}
            </Text>
          </View>

          <View style={{flexDirection: 'row'}}>
            <View
              style={{
                backgroundColor: 'green',
                borderRadius: 20,
                marginLeft: 20,
                paddingHorizontal: 10,
              }}>
              {/* <Text style={{textAlign:'center',color:"#000000"}}>
                Family
              </Text> */}
            </View>
          </View>

          <Text
            style={{
              textAlign: 'center',
              color: '#000000',
              marginTop: 5,
              marginLeft: 10,
            }}>
            Welcome New Members
          </Text>
        </View>

        <View style={{marginLeft: 5, marginTop: 5}}>
          <View style={{flexDirection: 'row'}}></View>

          <View style={{flexDirection: 'row'}}>
            <View style={{flexDirection: 'row'}}>
              {/* <Image style={{marginTop: 5, marginLeft: 5,width: 20,height: 20,borderRadius: 20}}
              source={require("../assets/user.png")}
              />
              <Text style={{textAlign:'center',color:"#000000",marginTop:5}}>
                100
            </Text> */}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const index = this.state.index;
    const routes = this.state.routes;
    return (
      <View style={{flex: 1, backgroundColor: '#dddddd'}}>
        <View
          style={{
            backgroundColor: '#D82020',
            padding: 8,
            flexDirection: 'row',
          }}>
          <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
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
              marginLeft: 50,
              color: '#ffffff',
              fontSize: 20,
              alignSelf: 'center',
            }}>
            Welcome To Zee
          </Text>
        </View>

        <View
          style={{
            flex: 1,
            marginHorizontal: 10,
            marginTop: 10,
            backgroundColor: '#dddddd',
          }}>
          <TouchableOpacity
            style={{
              borderRadius: 15,
              flexDirection: 'row',
              backgroundColor: '#ffffff',
              height: 80,
              marginTop: 10,
              elevation: 5,
              marginBottom: 20,
            }}
            onPress={() => this.props.navigation.navigate('createNewRoom')}>
            <Image
              style={{
                width: 40,
                height: 40,
                borderRadius: 30,
                padding: 20,
                margin: 20,
              }}
              source={require('../assets/addicon.png')}
            />

            <View>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: '#000000',
                    marginTop: 15,
                    marginLeft: 5,
                  }}>
                  CREATE NEW ROOM
                </Text>
              </View>

              <Text
                style={{
                  textAlign: 'center',
                  color: '#000000',
                  marginTop: 10,
                  marginLeft: 5,
                }}>
                Start your journey on Zee
              </Text>
            </View>
          </TouchableOpacity>

          <TabView
            navigationState={{index, routes}}
            renderScene={(routes, jumpTo) => this.renderScene(routes, jumpTo)}
            renderTabBar={(props, navigation) =>
              this.renderTabBar(props, navigation)
            }
            onIndexChange={(index) => this.handleIndexChange(index)}
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
