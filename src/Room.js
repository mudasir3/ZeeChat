import React, { Component } from 'react';
import { View, Text, Image, FlatList ,TouchableOpacity} from 'react-native';

export default class Roomex extends Component {    

  state = {
    selected: 'all',
    RoomList :[{
      "RoomName":"Random Room"
    }]
  };

  createRoomList = (item, index) =>{
      return(
        <TouchableOpacity 
         onPress={() => this.props.navigation.navigate('RoomScrn',{"roomname":item.RoomName})}
        style={{borderRadius:15,flexDirection:'row',backgroundColor:'#ffffff',height: 80,margin:8}}
        >
          <Image style={{width: 80,height: 80}}
            source={require("../assets/chat.jpg")}
            />
 
          <View>
            <View style ={{flexDirection:'row'}}>

              <Image style={{marginTop: 5, marginLeft: 5,width: 20,height: 20,borderRadius: 20}}
                source={require("../assets/pak.png")}
                />

              <Text style={{textAlign:'center',color:"#000000",marginTop:5}}>
                {item.RoomName}
              </Text>
            </View>

            <View style ={{flexDirection:'row'}}>

              <View style={{backgroundColor:'green',borderRadius:20,marginLeft:20,paddingHorizontal:10}}>
                <Text style={{textAlign:'center',color:"#000000"}}>
                  Family
                </Text>
              </View>
            </View>

            <Text style={{textAlign:'center',color:"#000000",marginTop:5 ,marginLeft:10 }}>
              Welcome New Members
            </Text>
          </View>

         
          <View style={{marginLeft:5,marginTop:5}}>
            <View style ={{flexDirection:'row'}}>

            <Image style={{marginTop: 5, marginLeft: 5,width: 20,height: 20,borderRadius: 20}}
              source={require("../assets/badge.png")}
              />

            <Image style={{marginTop: 5, marginLeft: 5,width: 20,height: 20,borderRadius: 20}}
              source={require("../assets/badge.png")}
              />
          
            <Image style={{marginTop: 5, marginLeft: 5,width: 20,height: 20,borderRadius: 20}}
              source={require("../assets/badge.png")}
              />
          </View>

          <View style ={{flexDirection:'row'}}>

            <View style ={{flexDirection:'row'}}>
              <Image style={{marginTop: 5, marginLeft: 5,width: 20,height: 20,borderRadius: 20}}
                source={require("../assets/user.png")}
                />
                <Text style={{textAlign:'center',color:"#000000",marginTop:5}}>
                  100
              </Text>
            </View>
          </View>

         </View>
      </TouchableOpacity>
      )
  }
    



  render() {
    return (
      <View style={{flex:1,marginTop:50,marginHorizontal:10,backgroundColor:'#dddddd'}} >

      <View style={{ backgroundColor:"#D82020" , borderRadius:15,padding:8,flexDirection:'row',justifyContent:'space-between'}}>

<TouchableOpacity
onPress={()=> this.props.navigation.openDrawer()}
>

<Image style={{marginTop: 5, marginLeft: 5,width: 40,height: 40,borderRadius: 20}}
            source={require("../assets/avatar.png")}
            />

</TouchableOpacity>
        
            <TouchableOpacity
                       onPress={() => this.setState({ selected: 'related' })}
                       >
               <Text style={{textAlign:'center',color:"#ffffff", marginTop:10 }}
          >
           Related
         </Text>
            </TouchableOpacity>
        

           <TouchableOpacity
                               onPress={() => this.setState({ selected: 'all' })}
                               >
           <Text style={{textAlign:'center',color:"#ffffff",marginTop:10  }}
                    >
           All
         </Text>
         </TouchableOpacity>

         <TouchableOpacity
                      onPress={() => this.setState({ selected: 'explore' })}
                      >
         <Text style={{textAlign:'center',color:"#ffffff",marginTop:10  }}
                    >
           Explore
         </Text>
</TouchableOpacity>
         <Image style={{marginTop: 5, marginLeft: 5,width: 30,height: 30,borderRadius: 10}}
            source={require("../assets/search.png")}
          />

      </View>

       
       
       
       
       {this.state.selected == 'all'?
       <View>
      
      <View style={{padding:8,flexDirection:'row',justifyContent:'space-between',
                     alignSelf:'center'}}>

      <Text style={{textAlign:'center',color:"#000000",marginTop:10 ,marginRight:10 }}>
           Popular
         </Text>

         <Text style={{textAlign:'center',color:"#000000",marginTop:10 ,marginRight:10 ,marginLeft:10}}>
           |
         </Text>

         <Text style={{textAlign:'center',color:"#000000",marginTop:10 ,marginLeft:10 }}>
           New
         </Text>

      </View>

      <View Style ={{flex:0.6}}>


              <FlatList
                data={this.state.RoomList}
                //onRefresh={()=> this.onSwipeDown()}
                //refreshing={this.state.flatlistloading}
                renderItem={({ item, index }) => 
                  this.createRoomList(item, index)
                }
                keyExtractor={(item) => item.id}
                />



        {/* <TouchableOpacity 
         onPress={() => this.props.navigation.navigate('RoomScrn')}
        style={{borderRadius:15,flexDirection:'row',backgroundColor:'#ffffff',height: 80,margin:8}}
        >
          <Image style={{width: 80,height: 80}}
            source={require("../assets/chat.jpg")}
            />

          <View>
            <View style ={{flexDirection:'row'}}>

              <Image style={{marginTop: 5, marginLeft: 5,width: 20,height: 20,borderRadius: 20}}
                source={require("../assets/pak.png")}
                />

              <Text style={{textAlign:'center',color:"#000000",marginTop:5}}>
                CHAT ROOM ABC
              </Text>
            </View>

            <View style ={{flexDirection:'row'}}>

              <View style={{backgroundColor:'green',borderRadius:20,marginLeft:20,paddingHorizontal:10}}>
                <Text style={{textAlign:'center',color:"#000000"}}>
                  Family
                </Text>
              </View>
            </View>

            <Text style={{textAlign:'center',color:"#000000",marginTop:5 ,marginLeft:10 }}>
              Welcome New Members
            </Text>
          </View>

         
          <View style={{marginLeft:5,marginTop:5}}>
            <View style ={{flexDirection:'row'}}>

            <Image style={{marginTop: 5, marginLeft: 5,width: 20,height: 20,borderRadius: 20}}
              source={require("../assets/badge.png")}
              />

            <Image style={{marginTop: 5, marginLeft: 5,width: 20,height: 20,borderRadius: 20}}
              source={require("../assets/badge.png")}
              />
          
            <Image style={{marginTop: 5, marginLeft: 5,width: 20,height: 20,borderRadius: 20}}
              source={require("../assets/badge.png")}
              />
          </View>

          <View style ={{flexDirection:'row'}}>

            <View style ={{flexDirection:'row'}}>
              <Image style={{marginTop: 5, marginLeft: 5,width: 20,height: 20,borderRadius: 20}}
                source={require("../assets/user.png")}
                />
                <Text style={{textAlign:'center',color:"#000000",marginTop:5}}>
                  100
              </Text>
            </View>
          </View>

         </View>
      </TouchableOpacity>



      <TouchableOpacity style={{borderRadius:15,flexDirection:'row',backgroundColor:'#ffffff',height: 80,margin:8}}>
          <Image style={{width: 80,height: 80}}
            source={require("../assets/chat.jpg")}
            />

          <View>
            <View style ={{flexDirection:'row'}}>

              <Image style={{marginTop: 5, marginLeft: 5,width: 20,height: 20,borderRadius: 20}}
                source={require("../assets/pak.png")}
                />

              <Text style={{textAlign:'center',color:"#000000",marginTop:5}}>
                CHAT ROOM ABC
              </Text>
            </View>

            <View style ={{flexDirection:'row'}}>

              <View style={{backgroundColor:'green',borderRadius:20,marginLeft:20,paddingHorizontal:10}}>
                <Text style={{textAlign:'center',color:"#000000"}}>
                  Family
                </Text>
              </View>
            </View>

            <Text style={{textAlign:'center',color:"#000000",marginTop:5 ,marginLeft:10 }}>
              Welcome New Members
            </Text>
          </View>

         
          <View style={{marginLeft:5,marginTop:5}}>
            <View style ={{flexDirection:'row'}}>

            <Image style={{marginTop: 5, marginLeft: 5,width: 20,height: 20,borderRadius: 20}}
              source={require("../assets/badge.png")}
              />

            <Image style={{marginTop: 5, marginLeft: 5,width: 20,height: 20,borderRadius: 20}}
              source={require("../assets/badge.png")}
              />
          
            <Image style={{marginTop: 5, marginLeft: 5,width: 20,height: 20,borderRadius: 20}}
              source={require("../assets/badge.png")}
              />
          </View>

          <View style ={{flexDirection:'row'}}>

            <View style ={{flexDirection:'row'}}>
              <Image style={{marginTop: 5, marginLeft: 5,width: 20,height: 20,borderRadius: 20}}
                source={require("../assets/user.png")}
                />
                <Text style={{textAlign:'center',color:"#000000",marginTop:5}}>
                  100
              </Text>
            </View>
          </View>

         </View>
      </TouchableOpacity> */}



     
     
     

     </View>
     
      </View>
      :
      <View >
        {this.state.selected =='related'?
               <View>

       <TouchableOpacity 
        style={{borderRadius:15,flexDirection:'row',backgroundColor:'#ffffff',
        height: 80,marginTop:10, marginHorizontal:10, elevation:5}}
        onPress={() => this.props.navigation.navigate('createNewRoom')}

        >
          <Image style={{width: 50,height: 50,backgroundColor:'#aaaaaa' ,borderRadius:30,padding:20, margin:20}}
            source={require("../assets/add.png")}
            />

          <View>
            <View style ={{flexDirection:'row'}}
              >

              <Text style={{textAlign:'center',color:"#000000",marginTop:15}}>
                CREATE NEW ROOM
              </Text>
            </View>

            <Text style={{textAlign:'center',color:"#000000",marginTop:10 ,marginLeft:5 }}>
              Start your journey on Zee
            </Text>
          </View>

         
      </TouchableOpacity>


      
               <View style={{padding:8,flexDirection:'row',justifyContent:'space-between',
                              alignSelf:'center',marginTop:20}}>
         
               <Text style={{textAlign:'center',color:"#000000",marginTop:10 ,marginRight:10 }}>
                    Joined
                  </Text>
         
                  <Text style={{textAlign:'center',color:"#000000",marginTop:10 ,marginRight:10 ,marginLeft:10}}>
                    |
                  </Text>
         
                  <Text style={{textAlign:'center',color:"#000000",marginTop:10 ,marginLeft:10 }}>
                    Following
                  </Text>
         
               </View>
         
         
         
               <View Style ={{flex:0.6}}>
         
                 <TouchableOpacity 
                  onPress={() => this.props.navigation.navigate('RoomScrn')}
                 style={{borderRadius:15,flexDirection:'row',backgroundColor:'#ffffff',height: 80,margin:8}}
                 >
                   <Image style={{width: 80,height: 80}}
                     source={require("../assets/chat.jpg")}
                     />
         
                   <View>
                     <View style ={{flexDirection:'row'}}>
         
                       <Image style={{marginTop: 5, marginLeft: 5,width: 20,height: 20,borderRadius: 20}}
                         source={require("../assets/pak.png")}
                         />
         
                       <Text style={{textAlign:'center',color:"#000000",marginTop:5}}>
                         CHAT ROOM ABC
                       </Text>
                     </View>
         
                     <View style ={{flexDirection:'row'}}>
         
                       <View style={{backgroundColor:'green',borderRadius:20,marginLeft:20,paddingHorizontal:10}}>
                         <Text style={{textAlign:'center',color:"#000000"}}>
                           Family
                         </Text>
                       </View>
                     </View>
         
                     <Text style={{textAlign:'center',color:"#000000",marginTop:5 ,marginLeft:10 }}>
                       Welcome New Members
                     </Text>
                   </View>
         
                  
                   <View style={{marginLeft:5,marginTop:5}}>
                     <View style ={{flexDirection:'row'}}>
         
                     <Image style={{marginTop: 5, marginLeft: 5,width: 20,height: 20,borderRadius: 20}}
                       source={require("../assets/badge.png")}
                       />
         
                     <Image style={{marginTop: 5, marginLeft: 5,width: 20,height: 20,borderRadius: 20}}
                       source={require("../assets/badge.png")}
                       />
                   
                     <Image style={{marginTop: 5, marginLeft: 5,width: 20,height: 20,borderRadius: 20}}
                       source={require("../assets/badge.png")}
                       />
                   </View>
         
                   <View style ={{flexDirection:'row'}}>
         
                     <View style ={{flexDirection:'row'}}>
                       <Image style={{marginTop: 5, marginLeft: 5,width: 20,height: 20,borderRadius: 20}}
                         source={require("../assets/user.png")}
                         />
                         <Text style={{textAlign:'center',color:"#000000",marginTop:5}}>
                           100
                       </Text>
                     </View>
                   </View>
         
                  </View>
               </TouchableOpacity>
         
         
         
               <TouchableOpacity style={{borderRadius:15,flexDirection:'row',backgroundColor:'#ffffff',height: 80,margin:8}}>
                   <Image style={{width: 80,height: 80}}
                     source={require("../assets/chat.jpg")}
                     />
         
                   <View>
                     <View style ={{flexDirection:'row'}}>
         
                       <Image style={{marginTop: 5, marginLeft: 5,width: 20,height: 20,borderRadius: 20}}
                         source={require("../assets/pak.png")}
                         />
         
                       <Text style={{textAlign:'center',color:"#000000",marginTop:5}}>
                         CHAT ROOM ABC
                       </Text>
                     </View>
         
                     <View style ={{flexDirection:'row'}}>
         
                       <View style={{backgroundColor:'green',borderRadius:20,marginLeft:20,paddingHorizontal:10}}>
                         <Text style={{textAlign:'center',color:"#000000"}}>
                           Family
                         </Text>
                       </View>
                     </View>
         
                     <Text style={{textAlign:'center',color:"#000000",marginTop:5 ,marginLeft:10 }}>
                       Welcome New Members
                     </Text>
                   </View>
         
                  
                   <View style={{marginLeft:5,marginTop:5}}>
                     <View style ={{flexDirection:'row'}}>
         
                     <Image style={{marginTop: 5, marginLeft: 5,width: 20,height: 20,borderRadius: 20}}
                       source={require("../assets/badge.png")}
                       />
         
                     <Image style={{marginTop: 5, marginLeft: 5,width: 20,height: 20,borderRadius: 20}}
                       source={require("../assets/badge.png")}
                       />
                   
                     <Image style={{marginTop: 5, marginLeft: 5,width: 20,height: 20,borderRadius: 20}}
                       source={require("../assets/badge.png")}
                       />
                   </View>
         
                   <View style ={{flexDirection:'row'}}>
         
                     <View style ={{flexDirection:'row'}}>
                       <Image style={{marginTop: 5, marginLeft: 5,width: 20,height: 20,borderRadius: 20}}
                         source={require("../assets/user.png")}
                         />
                         <Text style={{textAlign:'center',color:"#000000",marginTop:5}}>
                           100
                       </Text>
                     </View>
                   </View>
         
                  </View>
               </TouchableOpacity>
         
         
         
               <TouchableOpacity style={{borderRadius:15,flexDirection:'row',backgroundColor:'#ffffff',height: 80,margin:8}}>
                   <Image style={{width: 80,height: 80}}
                     source={require("../assets/chat.jpg")}
                     />
         
                   <View>
                     <View style ={{flexDirection:'row'}}>
         
                       <Image style={{marginTop: 5, marginLeft: 5,width: 20,height: 20,borderRadius: 20}}
                         source={require("../assets/pak.png")}
                         />
         
                       <Text style={{textAlign:'center',color:"#000000",marginTop:5}}>
                         CHAT ROOM ABC
                       </Text>
                     </View>
         
                     <View style ={{flexDirection:'row'}}>
         
                       <View style={{backgroundColor:'green',borderRadius:20,marginLeft:20,paddingHorizontal:10}}>
                         <Text style={{textAlign:'center',color:"#000000"}}>
                           Family
                         </Text>
                       </View>
                     </View>
         
                     <Text style={{textAlign:'center',color:"#000000",marginTop:5 ,marginLeft:10 }}>
                       Welcome New Members
                     </Text>
                   </View>
         
                  
                   <View style={{marginLeft:5,marginTop:5}}>
                     <View style ={{flexDirection:'row'}}>
         
                     <Image style={{marginTop: 5, marginLeft: 5,width: 20,height: 20,borderRadius: 20}}
                       source={require("../assets/badge.png")}
                       />
         
                     <Image style={{marginTop: 5, marginLeft: 5,width: 20,height: 20,borderRadius: 20}}
                       source={require("../assets/badge.png")}
                       />
                   
                     <Image style={{marginTop: 5, marginLeft: 5,width: 20,height: 20,borderRadius: 20}}
                       source={require("../assets/badge.png")}
                       />
                   </View>
         
                   <View style ={{flexDirection:'row'}}>
         
                     <View style ={{flexDirection:'row'}}>
                       <Image style={{marginTop: 5, marginLeft: 5,width: 20,height: 20,borderRadius: 20}}
                         source={require("../assets/user.png")}
                         />
                         <Text style={{textAlign:'center',color:"#000000",marginTop:5}}>
                           100
                       </Text>
                     </View>
                   </View>
         
                  </View>
               </TouchableOpacity>
         
         
               
          
              </View>
              
               </View>
          :
          <View>
          {this.state.selected =='explore'?
          <View>

<View style={{padding:8,flexDirection:'row'}}>
    
          <Text style={{color:"#000000",marginTop:10 ,marginRight:10 }}>
               TOP
             </Text>
    
          </View>
    
    <View style={{flexDirection:'row',marginLeft:5}}>
      <View style={{flexDirection:'row',backgroundColor:'green',padding:10,flex:0.5}}>
          <Image style={{width: 40,height: 40}}
                source={require("../assets/gift.png")}
                />

            <Text style={{color:"#000000",marginTop:10 ,marginRight:10,marginLeft:10 }}>
               ROOM GIFTS
             </Text>
        </View>

        <View style={{flexDirection:'row',backgroundColor:'yellow',padding:10,flex:0.5,marginLeft:5}}>
          <Image style={{width: 40,height: 40}}
                source={require("../assets/gift.png")}
                />

            <Text style={{color:"#000000",marginTop:10 ,marginRight:10,marginLeft:10 }}>
               GIFTS SENT
             </Text>
        </View>

      </View>

      <View style={{flexDirection:'row',marginLeft:5,marginTop:10}}>
      <View style={{flexDirection:'row',backgroundColor:'blue',padding:10,flex:0.5}}>
          <Image style={{width: 40,height: 40}}
                source={require("../assets/gift.png")}
                />

            <Text style={{color:"#000000",marginTop:10 ,marginRight:10,marginLeft:10 }}>
               Gifts receieved
             </Text>
        </View>

        <View style={{flexDirection:'row',backgroundColor:'pink',padding:10,flex:0.5,marginLeft:5}}>
          <Image style={{width: 40,height: 40}}
                source={require("../assets/gift.png")}
                />

            <Text style={{color:"#000000",marginTop:10 ,marginRight:10,marginLeft:10 }}>
               Yalla billionare
             </Text>
        </View>

      </View>

            <Text style={{color:"#000000",marginTop:10 ,marginRight:10,marginLeft:5}}>
               Countries
             </Text>


             <View style={{flexDirection:'row',marginLeft:5,marginRight:5}}>
      <View style={{flexDirection:'row',backgroundColor:'white',padding:10,flex:0.5}}>
          <Image style={{width: 40,height: 40}}
                source={require("../assets/pak.png")}
                />

            <Text style={{color:"#000000",marginTop:10 ,marginRight:10,marginLeft:10 }}>
               Pak
             </Text>
        </View>

        <View style={{flexDirection:'row',backgroundColor:'white',padding:10,flex:0.5,marginLeft:5}}>
            <Image style={{width: 40,height: 40}}
                source={require("../assets/pak.png")}
                />

            <Text style={{color:"#000000",marginTop:10 ,marginRight:10,marginLeft:10 }}>
               USA
             </Text>
        </View>

        <View style={{flexDirection:'row',backgroundColor:'white',padding:10,flex:0.5,marginLeft:5}}>
            <Image style={{width: 40,height: 40}}
                source={require("../assets/pak.png")}
                />

            <Text style={{color:"#000000",marginTop:10 ,marginRight:10,marginLeft:10 }}>
               KSA
             </Text>
        </View>

      </View>



      <View style={{flexDirection:'row',marginLeft:5,marginTop:10,marginRight:5}}>
      <View style={{flexDirection:'row',backgroundColor:'white',padding:10,flex:0.5}}>
          <Image style={{width: 40,height: 40}}
                source={require("../assets/pak.png")}
                />

            <Text style={{color:"#000000",marginTop:10 ,marginRight:10,marginLeft:10 }}>
               India
             </Text>
        </View>

        <View style={{flexDirection:'row',backgroundColor:'white',padding:10,flex:0.5,marginLeft:5}}>
            <Image style={{width: 40,height: 40}}
                source={require("../assets/pak.png")}
                />

            <Text style={{color:"#000000",marginTop:10 ,marginRight:10,marginLeft:10 }}>
               UAE
             </Text>
        </View>

        <View style={{flexDirection:'row',backgroundColor:'white',padding:10,flex:0.5,marginLeft:5}}>
            <Image style={{width: 40,height: 40}}
                source={require("../assets/pak.png")}
                />

            <Text style={{color:"#000000",marginTop:10 ,marginRight:10,marginLeft:10 }}>
               AFG
             </Text>
        </View>

      </View>

         <View style={{flexDirection:'row',marginTop:20,marginLeft:5}}>

            <View style={{backgroundColor:'white',padding:5,margin:3,borderRadius:8}}>
                <Text style={{color:"#000000" }}>
                  #Singing
                </Text>
            </View>

            <View style={{backgroundColor:'white',padding:5,margin:3,borderRadius:8}}>
                <Text style={{color:"#000000" }}>
                  #Love
                </Text>
            </View>

            <View style={{backgroundColor:'white',padding:5,margin:3,borderRadius:8}}>
                <Text style={{color:"#000000" }}>
                  #Friends
                </Text>
            </View>

            <View style={{backgroundColor:'white',padding:5,margin:3,borderRadius:8}}>
                <Text style={{color:"#000000" }}>
                  #Gossip
                </Text>
            </View>

            <View style={{backgroundColor:'white',padding:5,margin:3,borderRadius:8}}>
                <Text style={{color:"#000000" }}>
                  #DJ
                </Text>
            </View>

          </View>


          <Text style={{color:"#000000",marginTop:10 ,marginRight:10,marginLeft:5}}>
               HOT ROOMS
             </Text>


             <View style={{flexDirection:'row',marginLeft:5,marginRight:5}}>
      <View style={{flexDirection:'row',padding:10,flex:0.5}}>
          <Image style={{width: 120,height: 100}}
                source={require("../assets/background.jpg")}
                />

        </View>

        <View style={{flexDirection:'row',padding:10,flex:0.5,marginLeft:5}}>
        <Image style={{width: 120,height: 100}}
                source={require("../assets/background.jpg")}
                />
        </View>

</View>


            </View>
            :
            <View>

<View style={{padding:8,flexDirection:'row',justifyContent:'space-between',
                         alignSelf:'center'}}>
    
          <Text style={{textAlign:'center',color:"#000000",marginTop:10 ,marginRight:10 }}>
               Popular
             </Text>
    
             <Text style={{textAlign:'center',color:"#000000",marginTop:10 ,marginRight:10 ,marginLeft:10}}>
               |
             </Text>
    
             <Text style={{textAlign:'center',color:"#000000",marginTop:10 ,marginLeft:10 }}>
               New
             </Text>
    
          </View>
    
    
    
          <View Style ={{flex:0.6}}>
    
            <TouchableOpacity 
             onPress={() => this.props.navigation.navigate('RoomScrn')}
            style={{borderRadius:15,flexDirection:'row',backgroundColor:'#ffffff',height: 80,margin:8}}
            >
              <Image style={{width: 80,height: 80}}
                source={require("../assets/chat.jpg")}
                />
    
              <View>
                <View style ={{flexDirection:'row'}}>
    
                  <Image style={{marginTop: 5, marginLeft: 5,width: 20,height: 20,borderRadius: 20}}
                    source={require("../assets/pak.png")}
                    />
    
                  <Text style={{textAlign:'center',color:"#000000",marginTop:5}}>
                    CHAT ROOM ABC
                  </Text>
                </View>
    
                <View style ={{flexDirection:'row'}}>
    
                  <View style={{backgroundColor:'green',borderRadius:20,marginLeft:20,paddingHorizontal:10}}>
                    <Text style={{textAlign:'center',color:"#000000"}}>
                      Family
                    </Text>
                  </View>
                </View>
    
                <Text style={{textAlign:'center',color:"#000000",marginTop:5 ,marginLeft:10 }}>
                  Welcome New Members
                </Text>
              </View>
    
             
              <View style={{marginLeft:5,marginTop:5}}>
                <View style ={{flexDirection:'row'}}>
    
                <Image style={{marginTop: 5, marginLeft: 5,width: 20,height: 20,borderRadius: 20}}
                  source={require("../assets/badge.png")}
                  />
    
                <Image style={{marginTop: 5, marginLeft: 5,width: 20,height: 20,borderRadius: 20}}
                  source={require("../assets/badge.png")}
                  />
              
                <Image style={{marginTop: 5, marginLeft: 5,width: 20,height: 20,borderRadius: 20}}
                  source={require("../assets/badge.png")}
                  />
              </View>
    
              <View style ={{flexDirection:'row'}}>
    
                <View style ={{flexDirection:'row'}}>
                  <Image style={{marginTop: 5, marginLeft: 5,width: 20,height: 20,borderRadius: 20}}
                    source={require("../assets/user.png")}
                    />
                    <Text style={{textAlign:'center',color:"#000000",marginTop:5}}>
                      100
                  </Text>
                </View>
              </View>
    
             </View>
          </TouchableOpacity>
    
    
    
          <TouchableOpacity style={{borderRadius:15,flexDirection:'row',backgroundColor:'#ffffff',height: 80,margin:8}}>
              <Image style={{width: 80,height: 80}}
                source={require("../assets/chat.jpg")}
                />
    
              <View>
                <View style ={{flexDirection:'row'}}>
    
                  <Image style={{marginTop: 5, marginLeft: 5,width: 20,height: 20,borderRadius: 20}}
                    source={require("../assets/pak.png")}
                    />
    
                  <Text style={{textAlign:'center',color:"#000000",marginTop:5}}>
                    CHAT ROOM ABC
                  </Text>
                </View>
    
                <View style ={{flexDirection:'row'}}>
    
                  <View style={{backgroundColor:'green',borderRadius:20,marginLeft:20,paddingHorizontal:10}}>
                    <Text style={{textAlign:'center',color:"#000000"}}>
                      Family
                    </Text>
                  </View>
                </View>
    
                <Text style={{textAlign:'center',color:"#000000",marginTop:5 ,marginLeft:10 }}>
                  Welcome New Members
                </Text>
              </View>
    
             
              <View style={{marginLeft:5,marginTop:5}}>
                <View style ={{flexDirection:'row'}}>
    
                <Image style={{marginTop: 5, marginLeft: 5,width: 20,height: 20,borderRadius: 20}}
                  source={require("../assets/badge.png")}
                  />
    
                <Image style={{marginTop: 5, marginLeft: 5,width: 20,height: 20,borderRadius: 20}}
                  source={require("../assets/badge.png")}
                  />
              
                <Image style={{marginTop: 5, marginLeft: 5,width: 20,height: 20,borderRadius: 20}}
                  source={require("../assets/badge.png")}
                  />
              </View>
    
              <View style ={{flexDirection:'row'}}>
    
                <View style ={{flexDirection:'row'}}>
                  <Image style={{marginTop: 5, marginLeft: 5,width: 20,height: 20,borderRadius: 20}}
                    source={require("../assets/user.png")}
                    />
                    <Text style={{textAlign:'center',color:"#000000",marginTop:5}}>
                      100
                  </Text>
                </View>
              </View>
    
             </View>
          </TouchableOpacity>
    
    
    
          <TouchableOpacity style={{borderRadius:15,flexDirection:'row',backgroundColor:'#ffffff',height: 80,margin:8}}>
              <Image style={{width: 80,height: 80}}
                source={require("../assets/chat.jpg")}
                />
    
              <View>
                <View style ={{flexDirection:'row'}}>
    
                  <Image style={{marginTop: 5, marginLeft: 5,width: 20,height: 20,borderRadius: 20}}
                    source={require("../assets/pak.png")}
                    />
    
                  <Text style={{textAlign:'center',color:"#000000",marginTop:5}}>
                    CHAT ROOM ABC
                  </Text>
                </View>
    
                <View style ={{flexDirection:'row'}}>
    
                  <View style={{backgroundColor:'green',borderRadius:20,marginLeft:20,paddingHorizontal:10}}>
                    <Text style={{textAlign:'center',color:"#000000"}}>
                      Family
                    </Text>
                  </View>
                </View>
    
                <Text style={{textAlign:'center',color:"#000000",marginTop:5 ,marginLeft:10 }}>
                  Welcome New Members
                </Text>
              </View>
    
             
              <View style={{marginLeft:5,marginTop:5}}>
                <View style ={{flexDirection:'row'}}>
    
                <Image style={{marginTop: 5, marginLeft: 5,width: 20,height: 20,borderRadius: 20}}
                  source={require("../assets/badge.png")}
                  />
    
                <Image style={{marginTop: 5, marginLeft: 5,width: 20,height: 20,borderRadius: 20}}
                  source={require("../assets/badge.png")}
                  />
              
                <Image style={{marginTop: 5, marginLeft: 5,width: 20,height: 20,borderRadius: 20}}
                  source={require("../assets/badge.png")}
                  />
              </View>
    
              <View style ={{flexDirection:'row'}}>
    
                <View style ={{flexDirection:'row'}}>
                  <Image style={{marginTop: 5, marginLeft: 5,width: 20,height: 20,borderRadius: 20}}
                    source={require("../assets/user.png")}
                    />
                    <Text style={{textAlign:'center',color:"#000000",marginTop:5}}>
                      100
                  </Text>
                </View>
              </View>
    
             </View>
          </TouchableOpacity>
    
    
          <TouchableOpacity style={{borderRadius:15,flexDirection:'row',backgroundColor:'#ffffff',height: 80,margin:8}}>
              <Image style={{width: 80,height: 80}}
                source={require("../assets/chat.jpg")}
                />
    
              <View>
                <View style ={{flexDirection:'row'}}>
    
                  <Image style={{marginTop: 5, marginLeft: 5,width: 20,height: 20,borderRadius: 20}}
                    source={require("../assets/pak.png")}
                    />
    
                  <Text style={{textAlign:'center',color:"#000000",marginTop:5}}>
                    CHAT ROOM ABC
                  </Text>
                </View>
    
                <View style ={{flexDirection:'row'}}>
    
                  <View style={{backgroundColor:'green',borderRadius:20,marginLeft:20,paddingHorizontal:10}}>
                    <Text style={{textAlign:'center',color:"#000000"}}>
                      Family
                    </Text>
                  </View>
                </View>
    
                <Text style={{textAlign:'center',color:"#000000",marginTop:5 ,marginLeft:10 }}>
                  Welcome New Members
                </Text>
              </View>
    
             
              <View style={{marginLeft:5,marginTop:5}}>
                <View style ={{flexDirection:'row'}}>
    
                <Image style={{marginTop: 5, marginLeft: 5,width: 20,height: 20,borderRadius: 20}}
                  source={require("../assets/badge.png")}
                  />
    
                <Image style={{marginTop: 5, marginLeft: 5,width: 20,height: 20,borderRadius: 20}}
                  source={require("../assets/badge.png")}
                  />
              
                <Image style={{marginTop: 5, marginLeft: 5,width: 20,height: 20,borderRadius: 20}}
                  source={require("../assets/badge.png")}
                  />
              </View>
    
              <View style ={{flexDirection:'row'}}>
    
                <View style ={{flexDirection:'row'}}>
                  <Image style={{marginTop: 5, marginLeft: 5,width: 20,height: 20,borderRadius: 20}}
                    source={require("../assets/user.png")}
                    />
                    <Text style={{textAlign:'center',color:"#000000",marginTop:5}}>
                      100
                  </Text>
                </View>
              </View>
    
             </View>
          </TouchableOpacity>
    
    
    
          <TouchableOpacity style={{borderRadius:15,flexDirection:'row',backgroundColor:'#ffffff',height: 80,margin:8}}>
              <Image style={{width: 80,height: 80}}
                source={require("../assets/chat.jpg")}
                />
    
              <View>
                <View style ={{flexDirection:'row'}}>
    
                  <Image style={{marginTop: 5, marginLeft: 5,width: 20,height: 20,borderRadius: 20}}
                    source={require("../assets/pak.png")}
                    />
    
                  <Text style={{textAlign:'center',color:"#000000",marginTop:5}}>
                    CHAT ROOM ABC
                  </Text>
                </View>
    
                <View style ={{flexDirection:'row'}}>
    
                  <View style={{backgroundColor:'green',borderRadius:20,marginLeft:20,paddingHorizontal:10}}>
                    <Text style={{textAlign:'center',color:"#000000"}}>
                      Family
                    </Text>
                  </View>
                </View>
    
                <Text style={{textAlign:'center',color:"#000000",marginTop:5 ,marginLeft:10 }}>
                  Welcome New Members
                </Text>
              </View>
    
             
              <View style={{marginLeft:5,marginTop:5}}>
                <View style ={{flexDirection:'row'}}>
    
                <Image style={{marginTop: 5, marginLeft: 5,width: 20,height: 20,borderRadius: 20}}
                  source={require("../assets/badge.png")}
                  />
    
                <Image style={{marginTop: 5, marginLeft: 5,width: 20,height: 20,borderRadius: 20}}
                  source={require("../assets/badge.png")}
                  />
              
                <Image style={{marginTop: 5, marginLeft: 5,width: 20,height: 20,borderRadius: 20}}
                  source={require("../assets/badge.png")}
                  />
              </View>
    
              <View style ={{flexDirection:'row'}}>
    
                <View style ={{flexDirection:'row'}}>
                  <Image style={{marginTop: 5, marginLeft: 5,width: 20,height: 20,borderRadius: 20}}
                    source={require("../assets/user.png")}
                    />
                    <Text style={{textAlign:'center',color:"#000000",marginTop:5}}>
                      100
                  </Text>
                </View>
              </View>
    
             </View>
          </TouchableOpacity>
    
         </View>

              
            </View>
            }
        
          </View>
            
            
            
            
            
            
            }
      </View>
      
      }


      </View>
    );
  }
}
 
