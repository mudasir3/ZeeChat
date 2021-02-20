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

import {_saveToAsync,_getDataAsync} from "../components/AsyncStorage"

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
        style={styles.listItemContainer}
       >
        <Image
          style={{width: 80, height: 80, borderRadius: 10}}
          source={require('../../assets/avatar.png')}
        />

        <View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.textBold}>
              {item.name}
            </Text>
          </View>

          <View style ={{flexDirection:'row'}}>
          </View>

          <Text style={styles.listItemText}>
            {item.msg}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View style={styles.container} >
        <View style={styles.topContainer}>
            <TouchableOpacity
              style={{alignSelf:'flex-start',flex: 1,}}
              onPress={()=> this.props.navigation.openDrawer()}>
              <Image style={styles.topimg}
                          source={require("../../assets/avatar.png")}
                          />
            </TouchableOpacity>

            <Text style={styles.text}>Messages</Text>

              <TouchableOpacity
                style={{alignSelf:'flex-end',flex: 1}}>
                  <Image style={styles.img}
                    source={require("../../assets/addfriend.png")}
                    />
                </TouchableOpacity>

        </View>


      <View style={styles.flatlistContainer} >

        <FlatList
          style={styles.flatlist}
            data={this.state.FriendsList}
            renderItem={({ item, index }) => 
              this.createFriendsList(item, index)
            }
            keyExtractor={(item) => item.id
            }
            />
     </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#FCF3F4'
  },
  flatlist:{
    borderRadius: 20,
    margin:5
  },
  flatlistContainer:{
    flex:1,
    marginHorizontal:10,
    marginTop:10
  },
  topContainer:{
    backgroundColor:"#D82020",
    padding:8,
    flexDirection:'row',
    alignSelf:'stretch'
  },
  listItemContainer:{
    borderRadius:15,
    flexDirection:'row',
    backgroundColor:'#ffffff',
    height: 80,
    marginVertical:10
  },
  listItemImg:{
    width: 80,
    height: 80,
    borderRadius:10
  },
  img:{
    width: 40,
    height: 40,
    resizeMode:'contain',
    alignSelf:'flex-end'
  },
  topimg:{
    marginTop: 5, 
    marginLeft: 5,
    width: 40,
    height: 40,
    borderRadius: 20
  },
  textBold:{
    marginLeft:10, 
    textAlign:'center',
    color:"#000000",
    marginTop:5,
    fontWeight:'bold'
  },
  listItemText:{
    textAlign:'center',
    color:"#000000",
    marginTop:5 ,
    marginLeft:10 
  },
  text:{
    backgroundColor:"#D82020",
    color:'#ffffff',
    fontSize:20
  },
 scrollStyle: {
   backgroundColor: 'white',
   paddingLeft: 65,
   paddingRight: 65,
   // justifyContent: 'center',
 },
 tabBarTextStyle: {
   fontSize: 14,
   fontWeight: 'normal',
   color:'#000000'
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
