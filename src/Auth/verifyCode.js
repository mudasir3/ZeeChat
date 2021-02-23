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

import {_saveToAsync} from '../components/AsyncStorage';
import firestore from '@react-native-firebase/firestore';
import {authenticateUser} from '../api/ApiEndPoints';

import Colors from '../util/colors'
var _this;
export default class VerifyPhoneScreen extends Component {
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
    codeInput: '',
    text1: '',
    text2: '',
    text3: '',
    text4: '',
    text5: '',
    text6: '',
    visible: false,
  };

  componentDidMount() {
    this.confirm = this.props.navigation.getParam('data');

    console.log(' dataa ' + JSON.stringify(this.confirm));
  }

  confirmCode = () => {
    try {
      var {codeInput} = this.state;
      codeInput =
        this.state.text1 +
        this.state.text2 +
        this.state.text3 +
        this.state.text4 +
        this.state.text5 +
        this.state.text6;

      this.setState({visible: true});
      Keyboard.dismiss();

      this.confirm
        .confirm(codeInput)
        .then((res) => {
          var data = this.props.navigation.getParam('data');

          var phoneNumber = data._auth._user.phoneNumber;
          const params = {phoneNumber};

          authenticateUser(params).then(async (res) => {
            console.log('reponse ' + JSON.stringify(res));

            this.setState({visible: false});

            _saveToAsync('userid', res.data.user_id);
            _saveToAsync('username', res.data.user_id);
            _saveToAsync('token', res.data.token);

            _saveToAsync('image', res.data.image);

            this.props.navigation.navigate('Home');
          });
        })
        .catch((err) => {
          console.log(' verify errorr ' + JSON.stringify(err));

          //alert(" error " + err + " " + JSON.stringify(err))
          this.setState({visible: false});

          if (
            JSON.stringify(err).includes('the sms code has expired firebase')
          ) {
            this.props.navigation.navigate('Home');
          } else {
            this.props.navigation.navigate('Home');
          }
        });
    } catch (error) {
      console.log('Invalid code.' + error);

      alert('invalid code');
    }
  };

  onchangeText(value1) {
    this.setState({text1: value1});
    this.secondTextInput.focus();
  }
  onchangeText2(value2) {
    this.setState({text2: value2});
    this.thirdTextInput.focus();
  }
  onchangeText3(value3) {
    this.setState({text3: value3});
    this.fourthTextInput.focus();
  }
  onchangeText4(value4) {
    this.setState({text4: value4});
    this.fifthTextInput.focus();
  }
  onchangeText5(value5) {
    this.setState({text5: value5});
    this.sixthTextInput.focus();
  }
  onchangeText6(value6) {
    this.setState({text6: value6});
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topView}></View>

        <View style={styles.topContainer}>
          <Image
            style={styles.Mainimg}
            source={require('../../assets/login.png')}
          />
        </View>

        <View style={styles.middleContainer}>
          <View style={styles.homeContainer}>
            <Text style={styles.EnterCodetext}>Enter the verification code</Text>

            <View style={styles.textInputContainer}>
              <TextInput
                style={styles.codeInput}
                ref={(input1) => {
                  this.input1 = input1;
                }}
                keyboardType="numeric"
                maxLength={1}
                placeholder={'0'}
                onChangeText={(value1) => {
                  this.onchangeText(value1);
                }}
                blurOnSubmit={false}
              />

              <TextInput
                style={styles.codeInput}
                ref={(input2) => {
                  this.secondTextInput = input2;
                }}
                placeholder={'0'}
                maxLength={1}
                keyboardType="numeric"
                onChangeText={(value2) => {
                  this.onchangeText2(value2);
                }}
                blurOnSubmit={false}
              />

              <TextInput
                style={styles.codeInput}
                ref={(input3) => {
                  this.thirdTextInput = input3;
                }}
                maxLength={1}
                keyboardType="numeric"
                placeholder={'0'}
                onChangeText={(value3) => {
                  this.onchangeText3(value3);
                }}
                blurOnSubmit={false}
              />

              <TextInput
                ref={(input4) => {
                  this.fourthTextInput = input4;
                }}
                style={styles.codeInput}
                keyboardType="numeric"
                maxLength={1}
                placeholder={'0'}
                onChangeText={(value4) => {
                  this.onchangeText4(value4);
                }}
                blurOnSubmit={false}
              />

              <TextInput
                ref={(input5) => {
                  this.fifthTextInput = input5;
                }}
                style={styles.codeInput}
                keyboardType="numeric"
                maxLength={1}
                placeholder={'0'}
                onChangeText={(value5) => {
                  this.onchangeText5(value5);
                }}
                blurOnSubmit={false}
              />

              <TextInput
                ref={(input6) => {
                  this.sixthTextInput = input6;
                }}
                style={styles.codeInput}
                keyboardType="numeric"
                maxLength={1}
                placeholder={'0'}
                onChangeText={(value6) => {
                  this.onchangeText6(value6);
                }}
                blurOnSubmit={false}
              />
            </View>
          </View>

          <ActivityIndicator
            visible={this.state.visible}
            size="large"
            color="#ff0000"
            animating={this.state.visible}></ActivityIndicator>
        </View>

        <View style={styles.bottomContainer}>
          <TouchableOpacity
            onPress={() => this.confirmCode()}
            style={styles.btnRed}>
            <Text style={{textAlign: 'center', color: Colors.WHITE, fontSize: 16}}>
              Confirm Code
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            alignContent: 'center',
            justifyContent: 'center',
            flex: 0.1,
            marginBottom: 20,
          }}>
          <TouchableOpacity
            //onPress={() => this.props.navigation.navigate('Home')}
            onPress={() => this.confirmCode()}
            style={styles.btnRed}>
            <Text style={{textAlign: 'center', color: Colors.WHITE, fontSize: 16}}>
              Confirm Code
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
    backgroundColor:Colors.Gray ,
  },
  topView: {
    alignItems: 'center',
    marginTop: 30,
  },
  homeContainer: {
    alignItems: 'center',
    padding: 10,
    margin: 10,
    marginTop: 20,
    justifyContent: 'center',
  },
  topContainer: {
    alignContent: 'center',
    justifyContent: 'center',
    flex: 0.1,
    alignItems: 'center',
    marginTop: 100,
  },
  middleContainer: {
    alignContent: 'center',
    justifyContent: 'center',
    flex: 0.8,
  },
  textInputContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
  },
  bottomContainer: {
    alignContent: 'center',
    justifyContent: 'center',
    flex: 0.1,
    marginBottom: 20,
  },
  Mainimg: {
    marginTop: 5,
    marginLeft: 5,
    width: 180,
    height: 180,
    borderRadius: 90,
  },
  EnterCodetext: {
    marginTop: 60,
    marginBottom: 20,
    color: Colors.ICONGRAY,
    fontSize: 16,
  },
  btnwhite: {
    fontSize: 16,
    width: 150,
    borderWidth: 0.5,
    textAlign: 'left',
    backgroundColor: Colors.WHITE,
    paddingTop: 15,
    paddingBottom: 15,
    padding: 17,
    borderColor: Colors.BLACK,
    borderRadius: 15,
    margin: 15,
    textTransform: 'uppercase',
  },
  btnRed: {
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
    textTransform: 'uppercase',
  },
  homeContainer: {
    alignItems: 'center',
    padding: 10,
    margin: 10,
    marginTop: 20,
    justifyContent: 'center',
  },

  codeInput: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    textAlign: 'center',
    alignContent: 'center',
    fontSize: 20,
    padding: 10,
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomColor: Colors.ICONGRAY,
    borderBottomWidth: 2,
    marginTop: 5,
    marginRight: 5,
    marginBottom: 5,
    marginLeft: 5,
    backgroundColor: Colors.WHITE,
    flex: 1,
  },
});
