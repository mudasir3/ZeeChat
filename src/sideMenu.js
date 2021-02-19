import React, {Component} from 'react';
import {NavigationActions} from 'react-navigation';
import {Text, View, TextInput,StyleSheet,Image,TouchableOpacity} from 'react-native';
import {_saveToAsync,_getDataAsync} from "./AsyncStorage"
import firestore from '@react-native-firebase/firestore';

export default class SideMenu extends Component {


  state={
    username : '',
    userid:''
  }

  componentDidMount(){
    this.getdata()  
 }

  getdata =async() => {
      await _getDataAsync('username', (response => {
        //let object = JSON.parse(response);
        console.log('usernameeeeee : ', response);
        this.setState({username:response})
    }));

    await _getDataAsync('userid', (response => {
      //let object = JSON.parse(response);
      console.log('useridddddd : ', response);
      this.setState({userid:response})
  }));
  }

  changeName =() =>{
     firestore()
      .collection('Users')
      .doc(this.state.userid)
      .update({
        name: this.state.username,
      })
      .then(() => {
        console.log('User updated!');
      });
  }

  render () {
    return (
      <View style={{paddingTop: 20,
        flex: 1,
        backgroundColor: '#aaaaaa'}}>
            <View style={styles.navSectionStyle}>

            <View style={{alignSelf:'center',marginVertical:10}}>
              <Image style={{marginTop: 5,marginLeft: 5, width: 40,height: 40,borderRadius :20}}                
                source={require("../assets/user.png")}
                />
            </View>

            <TouchableOpacity
            // onPress={()=>{ }}
             style={{alignSelf:'center',marginVertical:10}}>
              <TextInput
                style={styles.navItemStyle}
                onChangeText ={(text) =>{ this.setState({username:text})}}
                onSubmitEditing={()=> {this.changeName() }}>
              {this.state.username}
              </TextInput>
            </TouchableOpacity>

            <View style={{alignSelf:'center',flexDirection:'row'}} >
            <Image style={{ width: 30, height: 30,resizeMode:'contain'}}
                                source={require("../assets/coin.png")}
                              />   
            <Text style={{textAlign:'center',justifyContent:'center',marginTop:5}}>300</Text>
          </View>      


              <Text style={styles.navItemStyle}>
              Tasks
              </Text>

              <Text style={styles.navItemStyle}>
                Wallet
              </Text>

              <Text style={styles.navItemStyle} >
                Yalla Premium
              </Text>

              <Text style={styles.navItemStyle} >
                Store
              </Text>

              <Text style={styles.navItemStyle} >
                Level
              </Text>

              <Text style={styles.navItemStyle} >
                Language
              </Text>

              <Text style={styles.navItemStyle} >
                Settings
              </Text>

              </View>
          



      </View>
    );
  }
}
const styles = StyleSheet.create({
    navItemStyle: {
        padding: 10,
        color: 'white',
        fontSize: 18
      },
      navSectionStyle: {
          margin : 10
      },
      sectionHeadingStyle: {
        paddingVertical: 10,
        paddingHorizontal: 5
      },
      footerContainer: {
        padding: 20,
        backgroundColor: 'lightgrey'
      }
    });


