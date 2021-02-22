import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
} from 'react-native';

import firebase from '../components/FirebaseConfig';

import auth from '@react-native-firebase/auth';

import {authenticateUser} from '../api/ApiEndPoints';
import {_saveToAsync} from '../components/AsyncStorage';

export default class PhoneAuthScreen extends Component {
  constructor(props) {
    super(props);
    _this = this;
  }

  state = {
    number: '',
    code: '',
    setVerificationId: '',
    recaptchaVerifier: '',
    confirm: null,
    visible: false,
    visibletxt: true,
  };

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow,
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide,
    );
  }
  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }
  _keyboardDidShow(e) {
    _this.setState({
      visibletxt: false,
    });
  }

  _keyboardDidHide(e) {
    _this.setState({
      visibletxt: true,
    });
  }

  signInWithPhoneNumber = async (number) => {
    console.log(' signInWithPhoneNumber');

    this.setState({visible: true});

    Keyboard.dismiss();

    var phoneNumber = number;
    const params = {phoneNumber};

    authenticateUser(params)
      .then(async (res) => {
        console.log('reponse ' + JSON.stringify(res));
        if (res.data.message) {
          this.confirmation = await auth()
            .signInWithPhoneNumber(phoneNumber)
            .then((res) => {
              console.log(' response ' + res + '  ' + JSON.stringify(res));
              this.setState({visible: false});

              this.props.navigation.navigate('verifyPhone', {data: res});
            })
            .catch((err) => {
              this.setState({visible: false});
              alert(' Error ' + err);
            });
        } else {
          this.setState({visible: false});

          console.log('iddddddddddddddddddddddddd ' + res.data.id);
          _saveToAsync('userid', res.data.user_id);
          _saveToAsync('username', res.data.user_id);
          _saveToAsync('token', res.data.token);
          _saveToAsync('image', res.data.image);

          this.props.navigation.navigate('Home');
        }
      })
      .catch((err) => {
        console.log('error ' + JSON.stringify(err));

        alert(' error ' + JSON.stringify(err) + '  err ' + err);
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topView}></View>

        <View style={styles.topContainer}>
          <Image
            style={styles.img}
            source={require('../../assets/login.png')}
          />
        </View>

        <View style={styles.middleCntainer}>
          <View style={styles.homeContainer}>
            {this.state.visibletxt ? (
              <Text style={styles.text}>Enter Phone Number to Login</Text>
            ) : (
              <Text style={{marginTop: 60, marginBottom: 20}}></Text>
            )}

            <View>
              <TextInput
                style={styles.textInput}
                placeholder=" +923331234567"
                onChangeText={(text) => this.setState({number: text})}
              />
            </View>

            <ActivityIndicator
              visible={this.state.visible}
              size="large"
              color="#ff0000"
              animating={this.state.visible}></ActivityIndicator>
          </View>
        </View>

        <View style={styles.bottomContainer}>
          <TouchableOpacity
            onPress={() => this.signInWithPhoneNumber(this.state.number)}
            style={styles.btnpink}>
            <Text style={{textAlign: 'center', color: '#ffffff', fontSize: 16}}>
              Send Code
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCF4F4',
  },
  topView: {
    alignItems: 'center',
    marginTop: 30,
  },
  topContainer: {
    alignContent: 'center',
    justifyContent: 'center',
    flex: 0.1,
    alignItems: 'center',
    marginTop: 100,
  },
  middleCntainer: {
    alignContent: 'center',
    justifyContent: 'center',
    flex: 0.8,
  },
  img: {
    marginTop: 5,
    marginLeft: 5,
    width: 180,
    height: 180,
    borderRadius: 90,
  },
  homeContainer: {
    alignItems: 'center',
    padding: 10,
    margin: 10,
    marginTop: 20,
    justifyContent: 'center',
  },
  bottomContainer: {
    alignContent: 'center',
    justifyContent: 'center',
    flex: 0.1,
    marginBottom: 20,
  },
  text: {
    marginTop: 60,
    marginBottom: 20,
    color: '#949494',
    fontSize: 16,
  },
  textInput: {
    fontSize: 16,
    borderWidth: 0.5,
    textAlign: 'left',
    alignSelf: 'stretch',
    backgroundColor: '#ffffff',
    color: '#e15d86',
    borderColor: '#000000',
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 20,
    textTransform: 'uppercase',
  },
  btnpink: {
    fontSize: 16,
    borderWidth: 0.5,
    textAlign: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center',
    backgroundColor: '#E20030',
    paddingVertical: 18,
    marginHorizontal: 30,
    color: '#e15d86',
    borderColor: '#000000',
    borderRadius: 30,
    textTransform: 'uppercase',
  },
});
