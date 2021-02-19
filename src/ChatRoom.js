import React, { Component } from 'react';
import { View, Text, Image,ImageBackground, StyleSheet,Keyboard,
  KeyboardAvoidingView,ScrollView,TouchableOpacity,TextInput,Dimensions,percentage ,FlatList,Modal} from 'react-native';


import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';

import BackButton from '../assets/back.svg';
import firestore from '@react-native-firebase/firestore';
import {_saveToAsync,_getDataAsync} from "./AsyncStorage"

import { withNavigation } from 'react-navigation';
import { NavigationEvents } from 'react-navigation';

import { showMessage, hideMessage } from "react-native-flash-message";

import io from "socket.io-client";
import SocketProvider from './socket'

import {getMessages,sendMessage,JoinRoom} from './api/ApiEndPoints'


var position = ''


var _this;
var socket;
var theme="require('../assets/background.jpg')"

  class BackgroundImage extends React.Component {

    render() {

      //let background = require('../assets/background.jpg')
      return (
        <ImageBackground source={this.props.theme}
          style={{
            resizeMode: 'cover', flex: 1,
          }}>
  
          {this.props.children}
  
        </ImageBackground>
      )
    }
  }

class ChatRoom extends Component {    

  constructor(props) {
    super(props);
  
    _this=this;

  }

  state ={
    theme:"require('../assets/background.jpg')",
    token:'',
    RoomName :'',
    Roomid :'',
    RoomAnouncement : '',
    isPlaying: false, 
    isLiveEnded: true,
    msgArray: [],
    msg: "",
    img:'',
    modalVisible:false,
    membersmodalVisible:false,
    themeModal:false,
    userid:'',
    user1:'',
    user2:'',
    user3:'',
    user4:'',
    user5:'',
    user6:'',
    messages :[
      // {
      // "msg":"Hello"
      // },
     ],
     memberslist :[
       {
         "userid" :"Mr abc"
       },
       {
        "userid" :"Mr abc"
      },
      {
        "userid" :"Mr abc"
      },
     ],
     giftslist:[
       {
         "src" :require("../assets/ferrari.png"),
         "coins":"$300",
         "name":"ferrari"
       },
       {
        "src" :require("../assets/football.png"),
        "coins":"$100",
        "name":"football"
      }
     ],
     themeList:[
      {
        "src" :require("../assets/theme1.jpg"),
      },
      {
        "src" :require("../assets/theme2.jpg"),
      },
      {
        "src" :require("../assets/theme3.jpg"),
      },      {
        "src" :require("../assets/theme4.jpg"),
      },      {
        "src" :require("../assets/theme5.jpg"),
      },      {
        "src" :require("../assets/theme6.jpg"),
      },      {
        "src" :require("../assets/theme7.jpg"),
      },      {
        "src" :require("../assets/theme8.jpg"),
      },      {
        "src" :require("../assets/theme9.jpg"),
      },      {
        "src" :require("../assets/theme10.jpg"),
      },      {
        "src" :require("../assets/theme11.jpg"),
      },      {
        "src" :require("../assets/theme12.jpg"),
      },      {
        "src" :require("../assets/theme13.jpg"),
      },      {
        "src" :require("../assets/theme14.jpg"),
      },      {
        "src" :require("../assets/theme15.jpg"),
      },      {
        "src" :require("../assets/theme16.jpg"),
      }
    ]

  }
  

  componentDidMount(){
    const { navigation } = this.props;

    //socket = SocketProvider.getSocket()

    this.focusListener = navigation.addListener('didFocus', () => {
      var  name = this.props.navigation.getParam('roomname')
      var id = this.props.navigation.getParam('roomid')
      var anouncement = this.props.navigation.getParam('anouncement')
      //var img = this.props.navigation.getParam('image')
      //console.log("image " + img)

      this.setState({
        RoomName :name,
        Roomid : id,
        RoomAnouncement :'',
        //image:img
      })

      this.getdata()
      this.livechanges(id)
    }
    )
  
 }
  
 initializesocket =(userid) => {

    socket = io("ws://159.89.223.138:3000", {
      'reconnection': true,
						'reconnectionDelay': 50000,
						'reconnectionDelayMax' : 50000,
						'reconnectionAttempts': 3,
						transports: ['websocket']
    });

    socket.on("connect", () => {

      console.log("sockettttt connect ")

      var roomId = this.state.Roomid
      var userId = userid

      console.log("sockettttt roomid " +roomId + " userrrid " + userId)
      socket.emit('join-room', roomId,userId);

     });

    // socket.on('message', msg => {
    //   console.log("sockettttt on message  "+ msg)
    //   //this.getchatlist()
    // });

    socket.on('receive-message', msg => {
      console.log("sockettttt receive-message  "+ msg)
      //this.getchatlist()
    });

    
    socket.on('user-connected', msg => {
      console.log("sockettttt user-connected  "+ msg)
      //this.getchatlist()
    });
        //socket.emit("message", data);


}

socketEmitEvent =()=>{

  var data = {msg:"testtttt"}

  socket.emit("message", data);
}

 getdata =async() => {
      await _getDataAsync('userid', (response => {
        //let object = JSON.parse(response);
        console.log('useriddddd : ', response);
        this.setState({userid:response ,
          theme:require('../assets/background.jpg')})

       // this.initializesocket(response)

      //  this.joinRoom(response)
        this.joinroom(response)

    }));

    await _getDataAsync('token', (response => {
      //console.log('token : ', response);

      //this.getMessages(response)
      this.setState({token:response})
      }));

}



getMessages=(token) => {
  console.log('onresult ');

  _this.setState({
    messages:[],
  })

    getMessages(token)
  .then(res =>{
    console.log(" response messages" + res.data)

    this.arrayholder = res.data;

          let newArray = [];
      this.arrayholder.forEach(element => {
        if(element.room_id == this.state.Roomid )
        {
          newArray.push(element);
        }
      })
      this.setState({
        messages:newArray,
      })
  })
  .catch(err=>{
    console.log(" response messagess errror" + err + "  " + JSON.stringify(err))
  })

}

 joinRoom =(userid) =>{

  var user_id = userid
  var room_id = this.state.Roomid
  var user_role = 'admin'
  var stream_id = '1234'

  const params = {user_id,room_id,user_role,stream_id};
  let token = this.state.token

  JoinRoom(token,params)
  .then(res =>{
    console.log('responseee Join Room: ', JSON.stringify(res));
  })
  .catch(err=>{
    console.log('error Join Room: ', JSON.stringify(err));

  })

 }

  _requestPermission = async() => {
    const granted = await request(
      Platform.select({
        android: PERMISSIONS.ANDROID.RECORD_AUDIO,
        ios: PERMISSIONS.IOS.MICROPHONE,
      }),
      {
        title: 'Microphone Permission',
        message: 'Zee Chat needs access to your Microphone',
      },
    );
  
    console.log(" permisiion " + granted)
    if(granted == 'granted')
    {
     
    }
    return granted === RESULTS.GRANTED;
  }

  createMessageList = (item, index) =>{
    return( 
        <View style={{ marginBottom: 5 }}>
                    <View style={{ flexDirection:  "row" , margin : 4
                  }}>
                      <View style={{ marginTop: 5 }}>
                      {item.msgby == ""?
                        null
                        :
                        <Image style={{marginTop: 5,marginLeft: 5, width: 40,height: 40,borderRadius :20}}
                        
                          source={require("../assets/user.png")}
                         />
                         }
                      </View>
                      <View style={styles.card}>
                        <TouchableOpacity>
                        <View
                            style={{flex: 1, flexDirection: "row", marginRight: 10}}>
                            <Text
                              style={{fontSize: 12,marginRight: 20,fontWeight:'bold'}}>
                              {item.msgby}
                            </Text>
                          </View>
                          <View
                            style={{flex: 1, flexDirection: "row", marginRight: 10}}>
                            <Text
                              style={{fontSize: 13,marginRight: 20}}>
                              {item.msg}
                            </Text>
                          </View>

                        </TouchableOpacity>
                      </View>
                    </View>
              
              </View> 
    )
}

  sendGift =(name) => {
   var message = this.state.userid + " has gifted " + name
   var type ='success'

   console.log(" send giftttt " +JSON.stringify(this.state.memberslist) )

       showMessage({
        message ,
        type,
      })

    
  }

  addFriend =(name) => {
    //alert(name)
 
    var message = " Request Sent to" + name
    var type ='success'
 
    console.log(" selected member " +name)
 
    showMessage({
      message ,
      type,
    })
 
   }

   createThemeList = (item, index) =>{
    return( 
    <TouchableOpacity 
       style={{width:150,height:100 , margin:10}}
         onPress={() => {
           this.setState({
             theme:item.src,
             themeModal:false
           })
          }}>
        <Image style={{flex:1 , width: undefined, height: undefined}}
                            source={item.src}
                          />                   
      </TouchableOpacity> 
    )
  }


  createGiftsList = (item, index) =>{
    return( 
    <TouchableOpacity 
       style={{width:100,height:100 , margin:10}}
         onPress={() => {
           this.sendGift(item.name)
          }}>
        <Image style={{flex:1 , width: undefined, height: undefined,resizeMode:'contain'}}
                            source={item.src}
                          />
          <View style={{flexDirection:'row'}} >
            <Image style={{ width: 30, height: 30,resizeMode:'contain'}}
                                source={require("../assets/coin.png")}
                              />   
            <Text style={{textAlign:'center',justifyContent:'center',marginTop:5}}>{item.coins}</Text>
          </View>                    
      </TouchableOpacity> 
    )
  }

  sendmessage=()=>{
    var obj = {"msg" : this.state.msg}

    //socket.emit("message", obj);
    Keyboard.dismiss()

      this.setState({
        msg:''
      })

          var user_id = this.state.userid
          var room_id = this.state.Roomid
          var message = this.state.msg
          const params = {user_id,room_id,message};

          let token = this.state.token
    sendMessage(token,params)
    .then(res =>{
      console.log(" response messages" + res.data)

      
      this.setState({
        msg:''
      })

        //this.getMessages()
                })
    .catch(err=>{
      console.log(" response messagess errror" + err + "  " + JSON.stringify(err))
    })

  }

  createMembersList = (item, index) =>{
  //  console.log(" members list " +JSON.stringify(item) )
    return(
          <TouchableOpacity style={{ margin:5}}
          onPress={() => { this.setState({
            membersmodalVisible:true,
            selectedmember : item.userid
          })}}>
            <Image style={{marginTop: 5,marginLeft: 10,
              width: 30,height: 30,resizeMode:'contain',alignSelf:'center'
            }}
              source={require("../assets/user.png")}
              />
              <Text style={{marginLeft: 5,marginRight:5,width:100,multiline:true,
                fontSize:10,textAlign:'center'}}>{item.userid}</Text>
          </TouchableOpacity>
    )
  }




  startBroadcast=async(pos)=>{
  //   console.log("start broadcast")

  }

  
  render() {

    let Img = require("../assets/chat.jpg")

    // if (this.state.image != '') {
    //   Img = this.state.image;
    // } else {
    //   Img = require("../assets/chat.jpg")
    // }

    return (

      <BackgroundImage 
       theme={this.state.theme}
        style={{ height: '100%'}}
        > 
        <View style={styles.container}>

        
        <NavigationEvents
      onWillBlur={payload => this.setState({
        messages:[]
      })
      }
    />

        <View 
        style={{borderRadius:15,flexDirection:'row',backgroundColor:'#ffffff',height: 90,paddingTop:10,margin:8}}
        >
          <Image style={{width: 80,height: 80}}
            source={require("../assets/chat.jpg")}
            />

          <View>
            <View style ={{flexDirection:'row'}}>

              <Text style={{textAlign:'center',color:"#000000",marginTop:5,marginLeft:10,fontSize:14,fontWeight:'bold'}}>
                {this.state.RoomName}
              </Text>

              
              <TouchableOpacity
                onPress={()=>this.setState({
                  themeModal:true
                })} >
              <Image style={{marginTop: 5, marginLeft: 30,width: 20,height: 20}}
                source={require("../assets/changetheme.jpg")}
                />
              </TouchableOpacity>
              

            <Image style={{marginTop: 5, marginLeft: 10,width: 20,height: 20,borderRadius: 20}}
              source={require("../assets/exit.png")}
              /> 
              
            </View>

            <View style ={{flexDirection:'row'}}>

              <View style={{marginLeft:10,marginTop:10}}>
                <Text style={{width:200,multiline:true,textAlign:'center',color:"#000000",fontSize:12}}>
                  {this.state.Roomid}
                </Text>
              </View>
            </View>

          </View>


         
          <View style={{marginLeft:5,marginTop:5}}>
            <View style ={{flexDirection:'row',marginLeft:10}}>

            
          </View>

         </View>
      </View>
          
          <View style={{marginLeft: 5,marginRight:5,height:100}}>
      <Text style={{marginLeft: 5,marginRight:5,fontSize:20,color:'#ffffff'}}>Members</Text>
      <FlatList
            style={{borderRadius: 20,margin:5}}
            numColumns ={3}

                data={this.state.memberslist}
                renderItem={({ item, index }) => 
                  this.createMembersList(item, index)
                }
                keyExtractor={(item) => item.id
                }
                />

       </View>
      <View 
        style={{borderRadius:15,flexDirection:'row',backgroundColor:'#aaaaaa',height: 100,margin:8}}
        >
          <TouchableOpacity
          style={{borderRadius: 20,backgroundColor:'#ffffff',margin:5}}>
            {this.state.user1 == ''?
            <View>
            <Image style={{marginTop: 5, marginLeft: 5,width: 30,height: 30,resizeMode:'contain',alignSelf:'center'
            }}
              source={require("../assets/microphone.png")}
              />
              <Text style={{width:50,marginLeft: 5,marginRight:5,multiline:true,fontSize:10,textAlign:'center'}}>Mr.ABC1</Text>
              </View> :
              <View>
               <Image style={{marginTop: 5, marginLeft: 5,width: 30,height: 30,resizeMode:'contain',alignSelf:'center'
                }}
              source={require("../assets/user.png")}
              />
              <Text style={{width:50,marginLeft: 5,marginRight:5,multiline:true,fontSize:10,textAlign:'center'}}>{this.state.user1}</Text>
              </View>
             }
              </TouchableOpacity>


              <TouchableOpacity
          style={{borderRadius: 20,backgroundColor:'#ffffff',margin:5}}>
            {this.state.user2 == ''?
            <View>
            <Image style={{marginTop: 5, marginLeft: 5,width: 30,height: 30,resizeMode:'contain',alignSelf:'center'
            }}
              source={require("../assets/microphone.png")}
              />
              <Text style={{width:50,marginLeft: 5,marginRight:5,multiline:true,fontSize:10,textAlign:'center'}}>Mr.ABC2</Text>
              </View> :
              <View>
               <Image style={{marginTop: 5, marginLeft: 5,width: 30,height: 30,resizeMode:'contain',alignSelf:'center'
                }}
              source={require("../assets/user.png")}
              />
              <Text style={{width:50,marginLeft: 5,marginRight:5,multiline:true,fontSize:10,textAlign:'center'}}>{this.state.user2}</Text>
              </View>
             }
              </TouchableOpacity>

              <TouchableOpacity
          style={{borderRadius: 20,backgroundColor:'#ffffff',margin:5}}>
            {this.state.user3 == ''?
            <View>
            <Image style={{marginTop: 5, marginLeft: 5,width: 30,height: 30,resizeMode:'contain',alignSelf:'center'
            }}
              source={require("../assets/microphone.png")}
              />
              <Text style={{width:50,marginLeft: 5,marginRight:5,multiline:true,fontSize:10,textAlign:'center'}}>Mr.ABC3</Text>
              </View> :
              <View>
               <Image style={{marginTop: 5, marginLeft: 5,width: 30,height: 30,resizeMode:'contain',alignSelf:'center'
                }}
              source={require("../assets/user.png")}
              />
              <Text style={{width:50,marginLeft: 5,marginRight:5,multiline:true,fontSize:10,textAlign:'center'}}>{this.state.user3}</Text>
              </View>
             }
              </TouchableOpacity>

              <TouchableOpacity
          style={{borderRadius: 20,backgroundColor:'#ffffff',margin:5}}>
            {this.state.user4 == ''?
            <View>
            <Image style={{marginTop: 5, marginLeft: 5,width: 30,height: 30,resizeMode:'contain',alignSelf:'center'
            }}
              source={require("../assets/microphone.png")}
              />
              <Text style={{width:50,marginLeft: 5,marginRight:5,multiline:true,fontSize:10,textAlign:'center'}}>Mr.ABC4</Text>
              </View> :
              <View>
               <Image style={{marginTop: 5, marginLeft: 5,width: 30,height: 30,resizeMode:'contain',alignSelf:'center'
                }}
              source={require("../assets/user.png")}
              />
              <Text style={{width:50,marginLeft: 5,marginRight:5,multiline:true,fontSize:10,textAlign:'center'}}>{this.state.user4}</Text>
              </View>
             }
              </TouchableOpacity>

              <TouchableOpacity
          style={{borderRadius: 20,backgroundColor:'#ffffff',margin:5}}>
            {this.state.user5 == ''?
            <View>
            <Image style={{marginTop: 5, marginLeft: 5,width: 30,height: 30,resizeMode:'contain',alignSelf:'center'
            }}
              source={require("../assets/microphone.png")}
              />
              <Text style={{width:50,marginLeft: 5,marginRight:5,multiline:true,fontSize:10,textAlign:'center'}}>Mr.ABC5</Text>
              </View> :
              <View>
               <Image style={{marginTop: 5, marginLeft: 5,width: 30,height: 30,resizeMode:'contain',alignSelf:'center'
                }}
              source={require("../assets/user.png")}
              />
              <Text style={{width:50,marginLeft: 5,marginRight:5,multiline:true,fontSize:10,textAlign:'center'}}>{this.state.user5}</Text>
              </View>
             }
              </TouchableOpacity>

        </View>

        <FlatList
                data={this.state.messages}
                renderItem={({ item, index }) => 
                  this.createMessageList(item, index)
                }
                keyExtractor={(item) => item.id}
                />
        
        </View>

        <View style={{  elevation: 0 , marginBottom: 5, width: '100%', }}>
          

            <View style={[styles.msgBar,{width: '100%',  }]}>
              <TouchableOpacity
                             >
            <Image style={{marginTop: 5,marginLeft: 5, width: 40,height: 40,borderRadius :20}}
                          source={require("../assets/speaker.png")}
                         />
                         </TouchableOpacity>
              <TextInput
                style={{ paddingStart: 10, fontSize: 12 ,flex :0.80,  }}
                value={this.state.msg}
                multiline 
                numberOfLines={3}
                returnKeyType='none'
                onChangeText={val => this.setState({ msg: val })}
                placeholder="Write your message here"
              />
 
              <TouchableOpacity
                style={[styles.sendBtn,{flex:0.20} ]} 
                rounded
                onPress={()=>this.sendmessage()}
                >
                <Text style={{ color: "#fff",fontSize:12 }}>Send</Text>
              </TouchableOpacity>

              <TouchableOpacity
              onPress={()=> this.setState({modalVisible:true})}>
                  <Image style={{marginTop: 5,marginLeft: 15, width: 30,height: 30,borderRadius :20}}
                              source={require("../assets/gift.png")}
                            />
              </TouchableOpacity>
            </View> 


        </View> 

              <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                  this.setState({modalVisible:false})
                }}>

                  <View
                    style={{
                      height: '50%',
                      marginTop: 'auto',
                      backgroundColor:'#ffffff'
                    }}>

                    <TouchableOpacity
                      style={{alignSelf:'flex-end'}}
                        onPress={() => {
                          this.setState({
                            modalVisible:false
                          });
                        }}>

                      <Image style={{marginTop: 5, marginRight: 10,width: 20,height: 20,resizeMode:'contain',
                                  }}
                                    source={require("../assets/close.png")}
                                    />
                      </TouchableOpacity>

                      <FlatList
                        //horizontal={true}
                        numColumns ={4}
                          style={{borderRadius: 20,backgroundColor:'#ffffff',margin:5}}
                              data={this.state.giftslist}
                              renderItem={({ item, index }) => 
                                this.createGiftsList(item, index)
                              }
                              keyExtractor={(item) => item.id}
                              />
                        
                          </View>
                        </Modal>



                        <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.membersmodalVisible}
                onRequestClose={() => {
                  this.setState({membersmodalVisible:false})
                }}>

                  <View
                    style={{
                      height: '40%',
                      marginTop: 'auto',
                      backgroundColor:'#E20030',
                      borderTopLeftRadius:15,
                      borderTopRightRadius:15
                    }}>

                      <TouchableOpacity
                      style={{alignSelf:'flex-end'}}
                        onPress={() => {
                          this.setState({
                            membersmodalVisible:false
                          });
                        }}>

                      <Image style={{marginTop: 5, marginRight: 10,width: 20,height: 20,resizeMode:'contain',
                                  }}
                                    source={require("../assets/close.png")}
                                    />        
                      </TouchableOpacity>

                    <View style={{alignSelf:'center',marginVertical:10}}>
                      <Image style={{marginTop: 5,marginLeft: 5, width: 40,height: 40,borderRadius :20}}                
                        source={require("../assets/user.png")}
                       />
                    </View>

                    <View style={{alignSelf:'center',marginVertical:10}}>
                      <Text style={{marginLeft: 5,marginRight:5, color:"#ffffff"}}>{this.state.selectedmember}</Text>
                    </View>

                      
                      <View 
                        style={{borderRadius:15,flexDirection:'row',margin:8,padding:8,alignSelf:'center'}}>
                          <TouchableOpacity
                          onPress={()=>this.setState({modalVisible:true})} 
                          style={{borderRadius: 20,backgroundColor:'#ffffff',marginHorizontal:10}}>
                            <Image style={{width: 50,height: 50,resizeMode:'contain',alignSelf:'center'
                            }}
                              source={require("../assets/gift.png")}
                              />
                              <Text style={{marginLeft: 5,marginRight:5,marginBottom:10}}>Send Gift</Text>
                          </TouchableOpacity>
                       

                          <TouchableOpacity
                          onPress={()=>this.addFriend(this.state.selectedmember)} 
                          style={{borderRadius: 20,backgroundColor:'#ffffff',marginHorizontal:10}}>
                            <Image style={{width: 50,height: 50,resizeMode:'contain',alignSelf:'center'
                            }}
                              source={require("../assets/addfriend.png")}
                              />
                              <Text style={{marginLeft: 5,marginRight:5,marginBottom:10}}>Add Friend</Text>
                          </TouchableOpacity>

                        </View>


                        
                          </View>
                        </Modal>




                        <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.themeModal}
                onRequestClose={() => {
                  this.setState({themeModal:false})
                }}>

                  <View
                    style={{
                      height: '50%',
                      marginTop: 'auto',
                      backgroundColor:'#ffffff'
                    }}>

                    <TouchableOpacity
                      style={{alignSelf:'flex-end'}}
                        onPress={() => {
                          this.setState({
                            themeModal:false
                          });
                        }}>

                      <Image style={{marginTop: 5, marginRight: 10,width: 20,height: 20,resizeMode:'contain',
                                  }}
                                    source={require("../assets/close.png")}
                                    />
                      </TouchableOpacity>

                      <FlatList
                        //horizontal={true}
                        numColumns ={2}
                          style={{borderRadius: 20,backgroundColor:'#ffffff',margin:5}}
                              data={this.state.themeList}
                              renderItem={({ item, index }) => 
                                this.createThemeList(item, index)
                              }
                              keyExtractor={(item) => item.id}
                              />
                        
                          </View>
                        </Modal>

      </BackgroundImage>
          );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
  },

  main: {
    flex: 1,
    marginLeft : 10,
    marginRight : 10,
    marginTop: 4
  },

  item: {},

  bbar: {
    height: 40,
    margin: 10,
    backgroundColor: "red",
    flexDirection: "row"
  },
  card: {
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: "#fff",
    padding: 10,
    marginLeft: 10,
  },
  
  msgBar: {
    borderRadius: 25,
    flex: 0,
    backgroundColor: "#fff",
    flexDirection: "row",
    width: "100%",  
    padding:5, 
    justifyContent: "center",
    alignItems: "center"
  },
  msgBarContainer: {
    flex: 0,
    width: '100%',
    backgroundColor: "#eee",
    justifyContent:"flex-end",
    alignItems: "flex-end",
    marginLeft:4,
    marginRight:4,
    marginTop:4,
    marginBottom:4,

  },
  backgroundImage:{
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    opacity: 0.3
},
  sendBtn: { 
    backgroundColor: "#a78c52",
    justifyContent: "center",
    alignItems:'center',
    height: 30,
    borderRadius:15,
    padding:0,
    margin: 0
   }
});
export default withNavigation(ChatRoom);
