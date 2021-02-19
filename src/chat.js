import React, { Component } from 'react';
import { View, Text, Image, FlatList ,TouchableOpacity,StyleSheet,KeyboardAvoidingView,TextInput} from 'react-native';

import {TabView,TabBar} from 'react-native-tab-view';

import firestore from '@react-native-firebase/firestore';
import {_saveToAsync,_getDataAsync} from "./AsyncStorage"


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
      txt:'',
    MessagesList :[{
      "msg" : "Hello Friend",
      "msgby" : "abc"
    },
    {
      "msg" : "Hi",
      "msgby" : "xyz"
    }],
    visible: false,
  };

  componentDidMount(){
    // const { navigation } = this.props;

    // this.focusListener = navigation.addListener('didFocus', () => {

    // })

  }


  getRoomData =async() => {

    this.setState({
      RoomList:[],
      visible:true
    })

     firestore()
  .collection('Rooms')
  .get()
  .then(querySnapshot => {
    console.log('Total users: ', querySnapshot.size);

    querySnapshot.forEach(documentSnapshot => {

      var obj ={"anouncement" :documentSnapshot.data().anouncement,
    "name" :documentSnapshot.data().name,
    "id":documentSnapshot.id}

      this.setState({
        visible:false,
        RoomList:[...this.state.RoomList,obj]
      })
    });


  });


  }



  createMessagesList = (item, index) =>{
    return(
      <View 
        style={{borderRadius:15,marginVertical:10}}
      >
          {item.msgby == "abc"
          ?
          <View style={{alignSelf:'flex-start'}}>
          <View style={{
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              backgroundColor: '#f49fb6',
              padding: 10,
              marginHorizontal:10,
              marginVertical:5,
              borderRadius: 15,
              flexDirection:'row'
          }}>
              <Image style={{width: 60,height: 60,borderRadius:10}}
              source={require("../assets/avatar.png")}
            />
            <Text style={{marginLeft: 10,textAlign:'center',alignSelf:'center' }}>{item.msg}</Text>
          </View>

        </View>
        :
        
        <View style={{ alignSelf:'flex-end'}}>
        <View style={{
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        alignSelf:'stretch',
        backgroundColor: '#78849e',
        padding: 10,
        marginHorizontal:10,
        marginVertical:5,
        borderRadius: 15,
        flexDirection:'row'
          }}>

            <Text style={{marginLeft: 10,textAlign:'center',alignSelf:'center' }}>{item.msg}</Text>

            <Image style={{width: 60,height: 60,borderRadius:10,marginLeft:10}}
            source={require("../assets/avatar.png")}
          />
        </View>
      </View>
          }

    </View>
    )
}


sendMessage =()=>{

  console.log("msg sendddddd")
  var obj ={"msg": this.state.txt , "msgby" :"abc"}

  this.setState({
    MessagesList : [...this.state.MessagesList, obj],
    txt :''
  })

}

onChangeText = (val) =>{
  this.setState({
    txt:val
  })
}
  render() {
   
    return (
      <KeyboardAvoidingView style={{flex:1,backgroundColor:'#dddddd'}} >

        <View style={{ backgroundColor:"#D82020",padding:8,flexDirection:'row'}}>
            <TouchableOpacity
              onPress={()=> this.props.navigation.goBack(null)}>
              <Image style={{marginTop: 5, marginLeft: 5,width: 30,height: 30,borderRadius: 20}}
                          source={require("../assets/back.png")}
                          />
            </TouchableOpacity>

            <Text style={{ backgroundColor:"#D82020",marginLeft:50,
          color:'#ffffff',fontSize:20,alignSelf:'center'}}>Chat</Text>

        </View>


      <View style={{flex:1,marginHorizontal:10,marginTop:10,backgroundColor:'#dddddd'}} >

        <FlatList
          style={{borderRadius: 20,margin:5}}
            data={this.state.MessagesList}
            renderItem={({ item, index }) => 
              this.createMessagesList(item, index)
            }
            keyExtractor={(item) => item.id
            }
            />
      </View>

      <View style={{flexDirection: "row",borderColor: '#d0d0d0',backgroundColor: '#ffffff',
                     padding: 5,marginHorizontal:5,marginVertical:10, borderRadius : 10, borderWidth: 1}}>
          <TextInput
            style={{
              width: '80%',             
              
            }}
            onChangeText={(val) =>{ this.onChangeText(val)}}
            value={this.state.txt}
            multiline={true}
            placeholder={'Say Something...'}
          />

          <TouchableOpacity 
          onPress={() => this.sendMessage()} 
          style={styles.btnSend}>
           <Text style={{textAlign:'center'}}> Send</Text>
          </TouchableOpacity>

        </View>

      </KeyboardAvoidingView>
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
btnSend:
{
    justifyContent:'center',
    alignItems: 'center',
    flex:1,
    color: '#fff',
    backgroundColor:'#e15d86',
    borderRadius: 5, 
    marginRight: 5

}
});

export default withNavigation(RoomHomeScreen);

