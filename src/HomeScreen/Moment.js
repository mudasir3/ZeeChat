import React, {Component} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

export default class Moment extends Component {
  state = {
    selected: 'all',
  };

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#dddddd'}}>
        <View
          style={{
            backgroundColor: '#D82020',
            padding: 8,
            flexDirection: 'row',
            alignSelf: 'stretch',
          }}>
          <TouchableOpacity
            style={{alignSelf: 'flex-start'}}
            onPress={() => this.props.navigation.openDrawer()}>
            <Image
              style={{
                marginTop: 5,
                marginLeft: 5,
                width: 40,
                height: 40,
                borderRadius: 20,
              }}
              source={require('../../assets/avatar.png')}
            />
          </TouchableOpacity>

          <Text
            style={{
              backgroundColor: '#D82020',
              color: '#ffffff',
              fontSize: 20,
              textAlign: 'center',
              marginLeft: 50,
            }}>
            Moments
          </Text>
        </View>

        <View
          style={{
            borderRadius: 15,
            flexDirection: 'row',
            backgroundColor: '#ffffff',
            height: 80,
            margin: 8,
          }}>
          <Image
            style={{width: 50, height: 50, margin: 20}}
            source={require('../../assets/badge.png')}
          />

          <View>
            <Text style={{textAlign: 'center', color: '#000000', marginTop: 5}}>
              There is no post yet
            </Text>
            <Text style={{textAlign: 'center', color: '#000000', marginTop: 5}}>
              see recommended posts below
            </Text>
          </View>
        </View>

        <View style={{borderRadius: 15, backgroundColor: '#ffffff', margin: 8}}>
          <View
            style={{
              borderRadius: 15,
              flexDirection: 'row',
              height: 80,
              margin: 8,
            }}>
            <Image
              style={{width: 30, height: 30, margin: 10}}
              source={require('../../assets/user.png')}
            />

            <View>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{textAlign: 'center', color: '#000000', marginTop: 5}}>
                  MR. ABC
                </Text>

                <Image
                  style={{
                    marginTop: 5,
                    marginLeft: 5,
                    width: 20,
                    height: 20,
                    borderRadius: 20,
                  }}
                  source={require('../../assets/pak.png')}
                />
              </View>

              <View style={{flexDirection: 'row'}}>
                <View style={{marginLeft: 5}}>
                  <Text style={{textAlign: 'center', color: '#000000'}}>
                    yesterday 21:00
                  </Text>
                </View>
              </View>

              <View style={{flexDirection: 'row'}}>
                <Image
                  style={{
                    marginTop: 5,
                    marginLeft: 5,
                    width: 20,
                    height: 20,
                    borderRadius: 20,
                  }}
                  source={require('../../assets/badge.png')}
                />

                <Image
                  style={{
                    marginTop: 5,
                    marginLeft: 5,
                    width: 20,
                    height: 20,
                    borderRadius: 20,
                  }}
                  source={require('../../assets/badge.png')}
                />

                <Image
                  style={{
                    marginTop: 5,
                    marginLeft: 5,
                    width: 20,
                    height: 20,
                    borderRadius: 20,
                  }}
                  source={require('../../assets/badge.png')}
                />
              </View>
            </View>

            <View style={{marginLeft: 5, marginTop: 5}}>
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    borderRadius: 20,
                    width: 80,
                    borderWidth: 2,
                    paddingHorizontal: 5,
                    marginLeft: 60,
                    borderColor: 'green',
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: '#000000',
                      marginTop: 5,
                    }}>
                    Follow
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <Text
            style={{
              textAlign: 'center',
              color: '#000000',
              marginTop: 5,
              padding: 5,
            }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Text>

          <View style={{flexDirection: 'row', marginBottom: 10}}>
            <Image
              style={{
                marginTop: 5,
                marginLeft: 5,
                width: 30,
                height: 30,
                borderRadius: 20,
              }}
              source={require('../../assets/share.png')}
            />
            <Image
              style={{
                marginTop: 5,
                marginLeft: 100,
                width: 20,
                height: 20,
                alignSelf: 'center',
              }}
              source={require('../../assets/like.png')}
            />
            <Text
              style={{
                textAlign: 'center',
                color: '#000000',
                marginTop: 5,
                padding: 5,
              }}>
              5
            </Text>

            <Image
              style={{
                marginTop: 5,
                marginLeft: 15,
                width: 20,
                height: 20,
                alignSelf: 'center',
              }}
              source={require('../../assets/comment.png')}
            />
            <Text
              style={{
                textAlign: 'center',
                color: '#000000',
                marginTop: 5,
                padding: 5,
              }}>
              3
            </Text>

            <Image
              style={{
                marginTop: 5,
                marginLeft: 15,
                width: 20,
                height: 20,
                alignSelf: 'center',
              }}
              source={require('../../assets/gift.png')}
            />
            <Text
              style={{
                textAlign: 'center',
                color: '#000000',
                marginTop: 5,
                padding: 5,
              }}>
              8
            </Text>
          </View>
        </View>
      </View>
    );
  }
}
