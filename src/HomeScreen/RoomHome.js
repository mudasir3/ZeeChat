import React, { Component } from 'react';
import { View, Text, Image, FlatList ,TouchableOpacity,StyleSheet,ActivityIndicator} from 'react-native';

import {TabView,TabBar} from 'react-native-tab-view';

import firestore from '@react-native-firebase/firestore';
import {_saveToAsync,_getDataAsync} from "../components/AsyncStorage"
import {getRooms} from '../api/ApiEndPoints'


import { withNavigation } from 'react-navigation';

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
    RoomList :[{
      "name":"Random Room"
    }],
    key: "all",
    visible: false,
    title: "All",
    userid:'',
    token:'',
    index: 0,
    routes: [
      { key: 'all', title: 'All' },
      { key: 'new', title: 'New' },
      { key: 'popular', title: 'Popular' },
      { key: 'recent', title: 'Recent' },
      { key: 'joined', title: 'Joined' },
    ],
    flatlistloading:false
  };

  componentDidMount(){

    this.getdata()

  }

  getdata =async() => {
    await _getDataAsync('userid', (response => {
      //let object = JSON.parse(response);
      console.log('user : ', response);
      this.setState({userid:response})
      }));

    await _getDataAsync('token', (response => {
      console.log('token : ', response);

      this.getRoomData(response)

      this.setState({token:response})
      }));

  }

  reloadRoomsList =async()=>{

    this.setState({
      RoomList:[],
      flatlistloading:true,
      loading:true
    })

    let token = this.state.token
    //let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImlhdCI6MTYwNzI1Njk3NSwiZXhwIjoxNjA3ODYxNzc1fQ.UtcnCaDReH25LsKAeQ5HGfwZZ-0ma8bleH9mftwhX04"
    getRooms(token)
    .then(res =>{
      console.log(" response rooms" + JSON.stringify(res))

        this.setState({
          visible:false,
          RoomList:res.data,
          flatlistloading:false,
        })
    })
    .catch(err=>{
      console.log(" response rooms" + err + "  " + JSON.stringify(err))

    })
    
}
  getRoomData =async(token) => {

    this.setState({
      RoomList:[],
      visible:true
    })

       getRooms(token)
    .then(res =>{
      console.log(" response rooms" + JSON.stringify(res))

        this.setState({
          visible:false,
          RoomList:res.data
        })
    })
    .catch(err=>{
      console.log(" response rooms" + err + "  " + JSON.stringify(err))

    })


  }


    navigationState = (index,routes) =>
    {
      this.setState({
        index,routes
      })
    }
    handleIndexChange = (index) =>
    {
      this.setState({
        index,
      })
    }

 renderTabBar = (props,navigationState ) => (
  <TabBar
    {...props}
    scrollEnabled
    indicatorStyle={styles.indicator}
    style={styles.tabbar}
    labelStyle={styles.label}
    tabStyle={styles.tabStyle}
  />
);

 
  renderScene = (route, jumpTo ) => {

    return<View
     style={{borderRadius:10}}>
    <FlatList
      style={{marginHorizontal:10 , borderRadius:10}}
      onRefresh={()=> this.reloadRoomsList()}
      refreshing={this.state.flatlistloading}
      data={this.state.RoomList}
      renderItem={({ item, index }) => 
        this.createRoomList(item, index)
      }
      keyExtractor={(item) => item.id}
      />

      <ActivityIndicator 
      style={{marginTop:20}}
     visible = {this.state.visible}
     size="large" color="#ff0000"
     animating={this.state.visible}
     ></ActivityIndicator>
    </View>
  };


  createRoomList = (item, index) =>{
    return(
      <TouchableOpacity 
       onPress={() => this.props.navigation.navigate('RoomScrn',{"roomname":item.name ,
                     "roomid" :item.id,
                     "anouncement" : item.anouncement,
                     "image":item.image
                    })}
      style={styles.roomItemContainer}
      >
        <Image style={styles.roomItemImg}
          source={require("../../assets/chat.jpg")}
          />

        <View>
          <View style ={{flexDirection:'row'}}>

            <Image style={styles.roomItemFlagImg}
              source={require("../../assets/pak.png")}
              />

            <Text style={styles.roomItemText}>
              {item.name}
            </Text>
          </View>

          <View style ={{flexDirection:'row'}}>

            <View style={styles.roomItemInnerContainer}>
            
            </View>
          </View>

          <Text style={styles.roomItemText,{marginLeft:10 }}>
            Welcome New Members
          </Text>
        </View>

       
        <View style={{marginLeft:5,marginTop:5}}>
          <View >

        </View>

        <View >

          <View >
          
          </View>
        </View>

       </View>
    </TouchableOpacity>
    )
}


  render() {
    const index = this.state.index
    const routes = this.state.routes
    return (
      <View style={styles.container} >

      <View style={styles.topContainer}>
          <TouchableOpacity
            onPress={()=> this.props.navigation.openDrawer()}>
            <Image style={styles.img}
                    source={require("../../assets/avatar.png")}
                        />

          </TouchableOpacity>

          <Text style={styles.text}>Welcome To Zee</Text>

        </View>


      <View style={styles.middleContainer} >

      <TouchableOpacity 
        style={styles.createRoomCard}
        onPress={() => this.props.navigation.navigate('createNewRoom')}

        >
          <Image style={styles.createImg}
            source={require("../../assets/addicon.png")}
            />

          <View>
            <View style ={{flexDirection:'row'}}
              >

              <Text style={styles.createText,{ marginTop:15}}>
                CREATE NEW ROOM
              </Text>
            </View>

            <Text style={styles.createText,{ marginTop:10}}>
              Start your journey on Zee
            </Text>
          </View>

      </TouchableOpacity>

      <TabView
        navigationState={{index,routes} }
        renderScene={(routes, jumpTo) => this.renderScene(routes, jumpTo)}
         renderTabBar={(props,navigation)=>this.renderTabBar(props,navigation)}
         onIndexChange={(index)=>this.handleIndexChange(index)}
      />

      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#dddddd'
  },
  topContainer:{
    backgroundColor:"#D82020",
    padding:8,
    flexDirection:'row'
  },
  middleContainer:{
    flex:1,
    marginHorizontal:10,
    marginTop:10,
    backgroundColor:'#dddddd'
  },
  createRoomCard:{
    borderRadius:15,
    flexDirection:'row',
    backgroundColor:'#ffffff',
        height: 80,
        marginTop:10, 
        elevation:5,
        marginBottom:20
  },
  createImg:{
    width: 40,
    height: 40,
    borderRadius:30,
    padding:20,
     margin:20
  },
  createText:{
    textAlign:'center',
    color:"#000000",
    marginLeft:5
  },
  img:{
    marginTop: 5,
     marginLeft: 5,
     width: 40,
     height: 40,
     borderRadius: 20
  },
  text:{
    backgroundColor:"#D82020",
    marginLeft:50,
        color:'#ffffff',
        fontSize:20,
        alignSelf:'center'
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
roomItemContainer:{
  borderRadius:15,
  flexDirection:'row',
  backgroundColor:'#ffffff',
  height: 80,
  marginVertical:10
},
roomItemInnerContainer:{
  backgroundColor:'green',
  borderRadius:20,
  marginLeft:20,
  paddingHorizontal:10
},
roomItemImg:{
  width: 80,
  height: 80,
  borderRadius:10
},
roomItemFlagImg:{
  marginTop: 5,
   marginLeft: 5,
   width: 20,
   height: 20,
   borderRadius: 20
},
roomItemText:{
  textAlign:'center',
  color:"#000000",
  marginTop:5
}
},

);

export default withNavigation(RoomHomeScreen);

