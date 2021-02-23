import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';

import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {_saveToAsync, _getDataAsync} from '../components/AsyncStorage';

import firestore from '@react-native-firebase/firestore';
import {createRooms, JoinRoom} from '../api/ApiEndPoints';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import FormData from 'form-data';
var _this;

import Colors from '../util/colors'
export default class createNewRoomScreen extends Component {
  constructor(props) {
    super(props);
    _this = this;
    //this.myBroadcasterRef = React.createRef();
  }

  state = {
    selected: 'all',
    anouncement: 'Welcome everyone,lets chat and have fun together ',
    name: '',
    visible: false,
    userid: '',
    token: '',
    uri: '',
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
      console.log('TOKENNNNN : ', response);

      this.setState({token: response});
    });
  };

  onChangeImageClicked = () => {
    console.log('onChangeImageClicked');

    Alert.alert(
      'Image Source',
      'Select Image From',
      [
        {text: 'Camera', onPress: () => this.pickImage('camera')},
        {text: 'Gallery', onPress: () => this.pickImage('gallary')},
      ],
      {cancelable: true},
    );
  };

  pickImage = async (driver) => {
    const {status} = await Permissions.askAsync(
      Permissions.CAMERA,
      Permissions.CAMERA_ROLL,
    );

    if (status === 'granted') {
      let src = ImagePicker.launchImageLibraryAsync;

      if (driver == 'camera') {
        src = ImagePicker.launchCameraAsync;
      }

      let result = await src({
        aspect: [4, 3],
        base64: true,
        quality: 0.5,
      });

      if (!result.cancelled) {
        //this.selectedAvatar = result.base64.replace(/\s/g, "");

        const selecteduri = {uri: result.uri};
        this.setState({uri: selecteduri});
      } else {
        this.log('result cancelled');
      }
    } else {
      alert('Permission not granted');
      return false;
    }
  };

  createRoom = async () => {
    if (this.state.name != '') {
      this.setState({visible: true});
      let token = this.state.token;

      let selecteduri = this.state.uri;

      const formData = new FormData();
      formData.append('name', this.state.name);
      formData.append('location', 'lahore pakistan');
      formData.append('user_id', this.state.userid);
      formData.append('image', {
        uri: selecteduri.uri,
        type: 'image/*',
        name: this.state.name,
      });
      formData.append('announcement', this.state.anouncement);

      createRooms(token, formData)
        .then((res) => {
          console.log('responseee : ', JSON.stringify(res));
          alert('Room created Successfully !');
          this.setState({visible: false});

          this.props.navigation.goBack(null);
        })
        .catch((err) => {
          console.log('err : ', JSON.stringify(err));
          alert('Error creating Room, please try again !');

          this.setState({visible: false});
        });
    } else {
      alert('please enter name');
    }
  };
  render() {
    let profileImg = require('../../assets/z.png');

    if (this.state.uri) {
      profileImg = this.state.uri;
    } else if (this.state.imageAvatar) {
      profileImg = require('../../assets/z.png');
    }

    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => this.onChangeImageClicked()}
          style={styles.topContainer}>
          <Image style={styles.img} source={profileImg} />
        </TouchableOpacity>

        <View style={styles.middleContainer}>
          <Text style={styles.text}>Room Name</Text>

          <TextInput
            style={styles.textInput}
            placeholder=" ABC "
            onChangeText={(text) => this.setState({name: text})}
          />

          <Text style={styles.text}>Anouncement</Text>

          <TextInput
            style={(styles.textInput, {marginBottom: 100})}
            placeholder=" Welcome everyone,let's chat and have fun together "
            onChangeText={(text) => this.setState({anouncement: text})}
          />

          <ActivityIndicator
            style={{marginTop: 20}}
            visible={this.state.visible}
            size="large"
            color="#ff0000"
            animating={this.state.visible}></ActivityIndicator>
        </View>

        <TouchableOpacity onPress={() => this.createRoom()} style={styles.btn}>
          <Text style={styles.textCreate}> Create for free</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    marginHorizontal: 10,
    backgroundColor: Colors.Gray,
  },
  topContainer: {
    borderRadius: 15,
    flexDirection: 'row',
    height: 80,
    margin: 8,
    alignContent: 'center',
    justifyContent: 'center',
  },
  middleContainer: {
    borderRadius: 15,
    backgroundColor: Colors.WHITE,
    marginTop: 50,
    marginHorizontal: 10,
  },
  btn: {
    fontSize: 16,
    borderWidth: 0.5,
    textAlign: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center',
    backgroundColor: Colors.RED,
    paddingVertical: 18,
    marginHorizontal: 30,
    borderColor: Colors.BLACK,
    borderRadius: 30,
    margin: 15,
    textTransform: 'uppercase',
  },
  textCreate: {
    textAlign: 'center',
    color: Colors.WHITE,
    fontSize: 16,
  },
  textInput: {
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.BLACK,
    marginLeft: 10,
    textAlign: 'left',
    alignSelf: 'stretch',
    textTransform: 'uppercase',
  },
  text: {
    color:Colors.BLACK,
    marginTop: 20,
    marginLeft: 10,
  },
  img: {
    width: 100,
    height: 100,
    margin: 10,
  },
});
