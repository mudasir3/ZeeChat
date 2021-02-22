import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Platform,
  Alert,
  Modal,
  TouchableHighlight,
  KeyboardAvoidingView,
  Keyboard,
  AppState,
  ActivityIndicator,
  Constants,
} from 'react-native';
import * as Facebook from 'expo-facebook';

import {
  request,
  PERMISSIONS,
  RESULTS,
  requestMultiple,
} from 'react-native-permissions';

import {Login, fbgraphapi, socialLogin} from '../api/ApiEndPoints';
import {_saveToAsync} from '../components/AsyncStorage';

import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    _this = this;
  }

  _requestPermission = async () => {
    console.log(' _requestPermission ');

    await Permissions.askAsync(Permissions.CAMERA);
    // if (status !== 'granted') {
    //   alert('Hey! You might want to enable notifications for my app, they are good.');
    // }

    await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    // if (status !== 'granted') {
    //   alert('Hey! You might want to enable notifications for my app, they are good.');
    // }
  };

  pickImage = async () => {
    console.log('image picker');

    const {status} = await Permissions.askAsync(
      Permissions.CAMERA,
      Permissions.CAMERA_ROLL,
    );

    if (status === 'granted') {
      let src = ImagePicker.launchImageLibraryAsync;
      let result = await src({
        aspect: [4, 3],
        base64: true,
        quality: 0.5,
      });

      console.log('image ' + JSON.stringify(result));
    } else {
      return alert('Permission not granted');
    }
  };

  componentDidMount() {
    this._requestPermission();
  }

  logout = () => {
    Facebook.logOutAsync();
  };

  facebookLogin = async () => {
    try {
      await Facebook.initializeAsync('2733249120336930', 'ZeeChat')
        .then(async (response) => {
          console.log('FB INITIALIZEEE ' + JSON.stringify(response));

          const {
            type,
            token,
            expires,
            declinedPermissions,
          } = await Facebook.logInWithReadPermissionsAsync('2733249120336930', {
            permissions: ['public_profile'],
          });
          console.log('FB RESPONSE ', ' TYPE : ', type, ' token : ', token);

          if (type == 'success') {
            console.log('FB Success');

            fbgraphapi(token).then(async (res) => {
              console.log('fb graph  reponse ' + JSON.stringify(res));

              if (res.data) {
                var name = res.data.name;
                var phoneNumber = '12345678910';
                var image = res.data.picture.data.url;
                var coins = 200;
                var fb_id = res.data.id;

                const params = {name, phoneNumber, image, coins, fb_id};

                socialLogin(params)
                  .then((res) => {
                    if (res.message) {
                      socialLogin(params)
                        .then((res) => {
                          _saveToAsync('userid', res.data.user_id);
                          _saveToAsync('username', res.data.name);
                          _saveToAsync('image', res.data.image);

                          _saveToAsync('token', res.data.token);

                          this.props.navigation.navigate('Home');
                        })
                        .catch((err) => {
                          console.log(
                            'socialLogin  errr ' + JSON.stringify(err),
                          );
                        });
                    } else {
                      console.log(
                        'socialLogin  reponse ' + JSON.stringify(res),
                      );

                      _saveToAsync('userid', res.data.user_id);
                      _saveToAsync('username', res.data.name);
                      _saveToAsync('token', res.data.token);

                      this.props.navigation.navigate('Home');
                    }
                  })
                  .catch((err) => {
                    console.log('socialLogin  errr ' + JSON.stringify(err));
                  });
              }
            });
          } else {
            alert(`Facebook Login Not successful: `);
          }
        })
        .catch((err) => {
          alert('error initializing');
        });
    } catch ({message}) {
      alert(`Facebook Login Error: ${message}`);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <Image
            style={styles.img}
            source={require('../../assets/login.png')}
          />
        </View>

        <View style={styles.text}>
          <Text style={{fontSize: 24}}>LOGIN </Text>
        </View>

        <View style={styles.mainContainer}>
          <View style={styles.homeContainer}>
            <TouchableOpacity
              onPress={this.facebookLogin}
              style={styles.btnwhiteoutline}>
              <Text style={styles.whiteText}>LOGIN USING FACEBOOK</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('phoneauth')}
              style={styles.btnwhite}>
              <Text style={styles.redText}> REGISTER WITH PHONE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E20030',
  },
  innerContainer: {
    alignContent: 'center',
    justifyContent: 'center',
    flex: 0.2,
    alignItems: 'center',
    marginTop: 140,
  },
  mainContainer: {
    alignContent: 'center',
    justifyContent: 'center',
    flex: 0.8,
  },
  img: {
    marginTop: 5,
    marginLeft: 5,
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  text: {
    alignItems: 'center',
    marginTop: 80,
  },
  whiteText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
  },
  redText: {
    textAlign: 'center',
    color: '#E20030',
    fontSize: 16,
  },
  homeContainer: {
    alignItems: 'center',
    padding: 10,
    margin: 10,
    marginTop: 60,
    justifyContent: 'center',
  },
  btnwhite: {
    fontSize: 16,
    borderWidth: 0.5,
    textAlign: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    paddingVertical: 18,
    marginHorizontal: 30,
    color: '#e15d86',
    borderColor: '#000000',
    borderRadius: 30,
    margin: 15,
    textTransform: 'uppercase',
  },

  btnwhiteoutline: {
    fontSize: 16,
    textAlign: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center',
    backgroundColor: '#E20030',
    color: '#e15d86',
    borderColor: '#ffffff',
    borderWidth: 4,
    paddingVertical: 18,
    borderRadius: 30,
    marginHorizontal: 30,
    textTransform: 'uppercase',
  },
});
