import React, {PureComponent} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  FlatList,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ImageBackground,
  Picker,
  Text,
  Image,
  View,
} from 'react-native';
import {withNavigationFocus} from 'react-navigation';
import styles from '../src/Style';
import {left, library, icon, play, leftVid} from '../src/IconManager';
import {
  themeColor,
  themeWhite,
  Background,
  sort,
  filter,
  TRANLINE,
  overlayimage,
  rightWrongBack,
  rite,
  FontBold,
  darkract,
  iconSearch,
  FontRegular,
} from '../Constant/index';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../Component/responsive-ratio';
import {scale, snack} from '../src/Util';
import CustomInput from '../Component/Input';
import {Rating, NavigationHead} from '../Component/ViewManager.js';
import ItemMV from '../src/ItemMV';
import DeviceInfo from 'react-native-device-info';
import http from '../api';

// import PostedJobList from './PostedJobList';
// import styles from './Style'

class UserCreation extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      Type: true,
      selectedValue: '',
      firstName: '',
      lastName: '',
      email: '',
      pass: '',
    };
  }

  Back = () => {
    this.props.navigation.goBack();
  };

  callApi = () => {
    console.log('hellow');
    const {firstName, lastName, email, pass, selectedValue} = this.state;
    try {
      http
        .POST('api/comuser/add', {
          comId: global.Id,
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: pass,
          role: selectedValue,
        })
        .then(
          (res) => {
            if (res['data']['status']) {
              console.log('rrrrrrrrr', res['data']['result']);
              this.props.navigation.goBack();
            } else {
              snack(res['data']['message']);
            }
          },
          (err) => snack(err['message']),
        );
    } catch (error) {
      snack(error);
    }
  };

  setSelectedValue = (selectedValue) => {
    console.log('selectedValue', selectedValue);
    this.setState({
      selectedValue: selectedValue,
    });
    // global.Ci?ty = selectedValue
  };
  render() {
    const {firstName, lastName, email, pass, selectedValue} = this.state;

    return (
      <View style={styles.backGround}>
        <StatusBar hidden={true} />
        <ImageBackground
          style={styles.ImageBlue}
          source={Background}
          resizeMode={'stretch'}>
          <NavigationHead
            centerComponent={'Create User'}
            rightComponent="Save"
            onPress={() => this.Back()}
            onExit={() => this.callApi()}
          />
          <View
            style={{
              height: hp(100) - hp(5),
              width: wp(96),
              marginHorizontal: wp(2),
              top: hp(2),
            }}>
            <View>
              <ImageBackground
                style={{
                  width: wp('96%'),
                  height: hp('100%') - (StatusBar.currentHeight + 80),
                }}
                source={darkract}
                resizeMode={'stretch'}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: hp(4),
                  }}>
                  <View
                    style={{
                      alignItems: 'center',
                      width: wp(96),
                      marginVertical: hp(1),
                    }}>
                    <Text
                      style={{
                        fontSize: scale(18),
                        fontFamily: 'Roboto-Bold',
                        color: themeWhite,
                      }}>
                      Create User
                    </Text>
                  </View>
                  <View
                    style={{
                      alignItems: 'center',
                      width: wp(96),
                      marginTop: hp(1),
                    }}>
                    <Text
                      style={{
                        fontSize: scale(18),
                        fontFamily: 'Roboto-Bold',
                        textAlign: 'center',
                        color: themeWhite,
                      }}>
                      Please provide all the information mentioned below
                    </Text>
                  </View>
                  <View
                    style={{
                      marginTop: hp(2),
                    }}>
                    <CustomInput
                      placeholder={'First Name'}
                      textChange={(text) =>
                        this.setState({
                          firstName: text,
                        })
                      }
                      inputContainerStyle={{
                        backgroundColor: themeColor,
                        // width: "100%",
                        height: scale(40),
                        borderColor: themeColor,
                        justifyContent: 'center',
                        borderWidth: scale(1),
                        borderRadius: scale(5),
                      }}
                      inputStyle={{
                        color: 'white',
                        fontSize: scale(18),
                        fontFamily: 'Roboto-Bold',
                        fontWeight: 'bold',
                      }}
                      placeholderTextColor={themeWhite}
                      containerStyle={{
                        width: wp(75),
                        height: scale(40),
                      }}
                      iconName={iconSearch}
                    />
                    <View
                      style={{
                        marginTop: scale(10),
                      }}>
                      <CustomInput
                        placeholder={'Last Name'}
                        textChange={(text) =>
                          this.setState({
                            lastName: text,
                          })
                        }
                        inputContainerStyle={{
                          backgroundColor: themeColor,
                          // width: "100%",
                          height: scale(40),
                          borderColor: themeColor,
                          justifyContent: 'center',
                          borderWidth: scale(1),
                          borderRadius: scale(5),
                        }}
                        inputStyle={{
                          color: 'white',
                          fontSize: scale(18),
                          fontFamily: 'Roboto-Bold',
                          fontWeight: 'bold',
                        }}
                        placeholderTextColor={themeWhite}
                        containerStyle={{
                          width: wp(75),
                          height: scale(40),
                        }}
                        iconName={iconSearch}
                      />
                    </View>
                    <View
                      style={{
                        marginTop: scale(10),
                      }}>
                      <CustomInput
                        placeholder={'Email Address'}
                        textChange={(text) =>
                          this.setState({
                            email: text,
                          })
                        }
                        inputContainerStyle={{
                          backgroundColor: themeColor,
                          // width: "100%",
                          height: scale(40),
                          borderColor: themeColor,
                          justifyContent: 'center',
                          borderWidth: scale(1),
                          borderRadius: scale(5),
                        }}
                        inputStyle={{
                          color: 'white',
                          fontSize: scale(18),
                          fontFamily: 'Roboto-Bold',
                          fontWeight: 'bold',
                        }}
                        placeholderTextColor={themeWhite}
                        containerStyle={{
                          width: wp(75),
                          height: scale(40),
                        }}
                        iconName={iconSearch}
                      />
                    </View>
                    <View
                      style={{
                        marginTop: scale(10),
                      }}>
                      <CustomInput
                        placeholder={'Password'}
                        textChange={(text) =>
                          this.setState({
                            pass: text,
                          })
                        }
                        inputContainerStyle={{
                          backgroundColor: themeColor,
                          // width: "100%",
                          height: scale(40),
                          borderColor: themeColor,
                          justifyContent: 'center',
                          borderWidth: scale(1),
                          borderRadius: scale(5),
                        }}
                        inputStyle={{
                          color: 'white',
                          fontSize: scale(18),
                          fontFamily: 'Roboto-Bold',
                          fontWeight: 'bold',
                        }}
                        placeholderTextColor={themeWhite}
                        containerStyle={{
                          width: wp(75),
                          height: scale(40),
                        }}
                        iconName={iconSearch}
                      />
                    </View>
                    <View
                      style={{
                        width: wp(70),
                        height: scale(40),
                        borderRadius: scale(5),
                        backgroundColor: themeColor,
                        marginTop: hp(2),
                        marginLeft: wp(2.5),
                      }}>
                      <Picker
                        textStyle={{
                          fontSize: 25,
                        }}
                        selectedValue={this.state.selectedValue}
                        style={{
                          width: wp(50),
                          height: scale(40),
                          color: themeWhite,
                          fontSize: scale(22),
                          fontWeight: 'bold',
                          fontFamily: FontRegular,
                          left: scale(33),
                          transform: [
                            {
                              scaleX: 1.3,
                            },
                            {
                              scaleY: 1.3,
                            },
                          ],
                          // backgroundColor: themeColor
                        }}
                        onValueChange={(itemValue, itemIndex) =>
                          this.setSelectedValue(itemValue)
                        }>
                        <Picker.Item label={'Select Role'} value={''} />
                        <Picker.Item label={'Staff'} value={'Staff'} />
                        <Picker.Item label={'Admin'} value={'Admin'} />
                      </Picker>
                    </View>
                  </View>
                </View>
              </ImageBackground>
            </View>
          </View>
          <View>
            <View
              style={{
                bottom: 47,
                height: 5,
                width: '100%',
                position: 'absolute',
              }}>
              <Image
                source={TRANLINE}
                style={styles.imageStyle}
                resizeMode={'stretch'}
              />
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

export default UserCreation;
