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
import {_saveToAsync, _getDataAsync} from '../components/AsyncStorage';
import {getRooms} from '../api/ApiEndPoints';

import {withNavigation} from 'react-navigation';

import Colors from '../util/colors'
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
        style={styles.roomListItemContainer}>
        <Image
          style={styles.roomListItemImg}
          source={require('../../assets/chat.jpg')}
        />

        <View>
          <View style={{flexDirection: 'row'}}>
            <Image
              style={styles.roomListItemFlagImg}
              source={require('../../assets/pak.png')}
            />

            <Text style={styles.roomListItemText}>{item.name}</Text>
          </View>

          <View style={{flexDirection: 'row'}}>
            
          </View>

          <Text
            style={styles.welcomeMembersText}>
            Welcome New Members
          </Text>
        </View>

        <View style={{marginLeft: 5, marginTop: 5}}>
          <View></View>

          <View>
            <View></View>
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
        <View style={styles.container}>
          <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
            <Image
              style={styles.drawerImg}
              source={require('../../assets/avatar.png')}
            />
          </TouchableOpacity>

          <Text style={styles.Welcometext}>Welcome To Zee</Text>
        </View>

        <View style={styles.createRoomContainer}>
          <TouchableOpacity
            style={styles.createRoomCard}
            onPress={() => this.props.navigation.navigate('createNewRoom')}>
            <Image
              style={styles.createRoomImg}
              source={require('../../assets/addicon.png')}
            />

            <View>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.createRoomText}>CREATE NEW ROOM</Text>
              </View>

              <Text style={styles.startJourneyText}>Start your journey on Zee</Text>
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
  container: {
    backgroundColor: Colors.RED,
    padding: 8,
    flexDirection: 'row',
  },
  createRoomContainer: {
    flex: 1,
    marginHorizontal: 10,
    marginTop: 10,
    backgroundColor: Colors.OFFWHITE,
  },
  roomListItemContainer: {
    borderRadius: 15,
    flexDirection: 'row',
    backgroundColor: Colors.WHITE,
    height: 80,
    marginVertical: 10,
  },
  createRoomCard: {
    borderRadius: 15,
    flexDirection: 'row',
    backgroundColor: Colors.WHITE,
    height: 80,
    marginTop: 10,
    elevation: 5,
    marginBottom: 20,
  },
  createRoomImg: {
    width: 40,
    height: 40,
    borderRadius: 30,
    padding: 20,
    margin: 20,
  },
  drawerImg: {
    marginTop: 5,
    marginLeft: 5,
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  roomListItemImg: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  roomListItemFlagImg: {
    marginTop: 5,
    marginLeft: 5,
    width: 20,
    height: 20,
    borderRadius: 20,
  },
  roomListItemText: {
    textAlign: 'center',
    color: Colors.BLACK,
    marginTop: 5,
  },
  createRoomText: {
    textAlign: 'center',
    color: Colors.BLACK,
    marginTop: 15,
    marginLeft: 5,
  },
  Welcometext: {
    marginLeft: 50,
    color: Colors.WHITE,
    fontSize: 20,
    alignSelf: 'center',
  },
  startJourneyText: {
    textAlign: 'center',
    color: Colors.BLACK,
    marginTop: 10,
    marginLeft: 5,
  },
  welcomeMembersText:{
      textAlign: 'center',
      color: Colors.BLACK,
      marginTop: 5,
      marginLeft: 10,
  },
  tabbar: {
    backgroundColor: Colors.RED,
  },
  label: {
    fontWeight: '400',
  },
  tabStyle: {
    width: 'auto',
  },
});

export default withNavigation(RoomHomeScreen);
