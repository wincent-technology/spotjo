import React, {Component} from 'react';
import {
  SafeAreaView,
  Dimensions,
  StyleSheet,
  Platform,
  View,
  Text,
  StatusBar,
  ImageBackground,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {withNavigationFocus} from 'react-navigation';
import styles from '../src/Style';
import {scale, snack} from '../src/Util';
import {left, library, icon, play, leftVid} from '../src/IconManager';
import CustomInput from '../Component/TextInput';
import {Background, url} from '../Constant/index';
import http from '../api';
import AsyncStorage from '@react-native-community/async-storage';

class LoginWithEmail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }

  create = () => {
    this.props.navigation.navigate('NoAccount');
  };
  forgat = () => {
    this.props.navigation.navigate('EmailSend');
  };

  onLogin = async () => {
    const {email, password} = this.state;
    try {
      if (email.length > 0 && password.length > 0) {
        http
          .POST('api/company/login', {
            email: email,
            password: password,
          })
          .then(
            (res) => {
              console.log('sdf', res['data']['result']);
              if (res['data']['status']) {
                if (res['data']['result']['role'] == 'Super Admin') {
                  console.log('login id ', res['data']['result']);
                  global.role = res['data']['result']['role'];
                  global.Service = res['data']['result']['services'];
                  global.Id = res['data']['result']['id'];
                  global.Email = res['data']['result']['email'];
                  global.Branch = res['data']['result']['branch'];
                  global.uploadUri =
                    url + 'images/company/' + res['data']['result']['logo'];
                  global.Mobile = res['data']['result']['mobile'];
                  global.Company = res['data']['result']['name'];
                  global.Video =
                    url + 'images/company/' + res['data']['result']['video'];
                  global.WebSite = res['data']['result']['website'];
                  global.Address = res['data']['result']['address'];
                  global.Service = res['data']['result']['services'];
                  global.let = parseFloat(res['data']['result']['latitude']);
                  global.long = parseFloat(res['data']['result']['longitude']);
                  console.log('glo', global.let, global.long);
                  AsyncStorage.setItem(
                    'CompanyLoggedInData',
                    JSON.stringify(res['data']['result']),
                  );
                  if (res['data']['result']['isLoggedFirstTime'] == 0) {
                    this.props.navigation.navigate('TalentCom');
                  } else {
                    this.props.navigation.navigate('ComEdit');
                  }
                } else {
                  console.log('login id ', res['data']['result']);
                  global.role = res['data']['result']['role'];
                  global.Service = res['data']['result']['services'];
                  global.Id = res['data']['result']['companyId'];
                  global.Email = res['data']['result']['email'];
                  global.Branch = res['data']['result']['branch'];
                  global.uploadUri =
                    url + 'images/company/' + res['data']['result']['logo'];
                  global.Mobile = res['data']['result']['mobile'];
                  global.Company = res['data']['result']['name'];
                  global.Video =
                    url + 'images/company/' + res['data']['result']['video'];
                  global.WebSite = res['data']['result']['website'];
                  global.Address = res['data']['result']['address'];
                  global.let = parseFloat(res['data']['result']['latitude']);
                  global.long = parseFloat(res['data']['result']['longitude']);
                  console.log('glo', global.let, global.long);
                  // AsyncStorage.setItem('CompanyLoggedInData', JSON.stringify(res['data']['result']));
                  this.props.navigation.navigate('TalentCom');
                }
              } else {
                snack(res['data']['message']);
              }
            },
            (err) => snack(err['message']),
          );
      } else {
        snack('Required Email Password');
      }
    } catch (error) {
      snack('error while register' + error);
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.backGround}>
        <ImageBackground
          style={styles.ImageBlue}
          source={Background}
          resizeMode={'stretch'}>
          <StatusBar hidden={true} />
          <View
            style={[
              {
                top: scale(30),
              },
              styles.CenterLogo,
            ]}>
            <View>
              <Image
                source={require('../Img/logo-spotjo.png')}
                resizeMode={'contain'}
                style={{
                  height: scale(150),
                  width: Dimensions.get('window').width / 2 + scale(80),
                }}
              />
            </View>
            <Text style={styles.LookingFor}>Login</Text>
            <Text
              style={[
                styles.LookingFor,
                {
                  fontSize: scale(17),
                },
              ]}>
              Login with your email address
            </Text>
          </View>
          <View
            style={{
              // left: Dimensions.get('window').width / 7,
              marginTop: scale(45),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <CustomInput
              placeholder={'Email or Username'}
              textChange={(text) =>
                this.setState({
                  email: text,
                })
              }
            />
            <CustomInput
              placeholder={'Password'}
              secureTextEntry={true}
              textChange={(text) =>
                this.setState({
                  password: text,
                })
              }
            />
            <TouchableWithoutFeedback onPress={this.forgat}>
              <Text
                style={{
                  marginTop: scale(-8),
                  marginLeft: scale(115),
                  marginBottom: scale(40),
                  color: '#fff',
                }}>
                Forget Password?
              </Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              style={styles.CompanyLoginOpportunityView}
              onPress={this.onLogin}>
              <View
                style={[
                  styles.CompanyLoginWithEmailView,
                  {
                    borderRadius: scale(5),
                    justifyContent: 'center',
                  },
                ]}>
                <View>
                  <Text style={styles.CompanyOppoTalentText}>Login</Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.CompanyLoginAccountText}>
            <Text
              style={[
                {
                  fontSize: scale(23),
                },
                styles.FontSty,
              ]}>
              Don't Have Account?
            </Text>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Text
                style={[
                  {
                    fontSize: scale(19),
                  },
                  styles.FontSty,
                ]}>
                Create new account{' '}
              </Text>
              <TouchableWithoutFeedback onPress={this.create}>
                <Text
                  style={[
                    {
                      textDecorationLine: 'underline',
                      // textDecorationColor: "#fff",
                      fontSize: scale(19),
                    },
                    styles.FontSty,
                  ]}>
                  Click here
                </Text>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}
export default withNavigationFocus(LoginWithEmail);
