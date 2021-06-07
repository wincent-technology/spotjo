import React, {
  PureComponent
} from 'react';
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
  Image,Keyboard,
  View,
} from 'react-native';
import {
  withNavigationFocus
} from 'react-navigation';
import styles from '../src/Style';
import {
  left,
  library,
  icon,
  play,
  leftVid
} from '../src/IconManager';
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
import {
  scale,
  snack
} from '../src/Util';
import CustomInput from '../Component/Input';
import {
  Rating,
  NavigationHead
} from '../Component/ViewManager.js';
import ItemMV from '../src/ItemMV';
import DeviceInfo from 'react-native-device-info';
import http from '../api';

// import PostedJobList from './PostedJobList';
// import styles from './Style'


const Input = ({placeholder,...props}) => {
          return (<View
                      style={{
                        marginTop: scale(10),
                      }}>
                      <CustomInput
                        placeholder={placeholder}
                        textChange={props.textChange}
                        inputContainerStyle={{
                          backgroundColor: themeWhite,
                          // width: "100%",
                          height: hp(6.5),
                          borderBottomColor: '#eee',
                          justifyContent: 'center',
                          borderBottomWidth: scale(1),
                          borderRadius: scale(5),
                        }}
                        inputStyle={{
                          color: '#333',
                          fontSize: hp(2.7),
                          fontFamily: 'Roboto-Bold',
                          fontWeight: 'bold',
                        }}
                        placeholderTextColor={'#333'}
                        containerStyle={{
                          width: wp(86),
                          height: hp(5.5),
                        }}
                        iconName={iconSearch}
                      />
                    </View>)

}

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
      cpass:'',
      keyboardShown:false

    };
  }

  Back = () => {
    this.props.navigation.goBack();
  };

  callApi = () => {
    console.log('hellow');
    const {
      firstName,
      lastName,
      email,
      pass,
      cpass,
      selectedValue
    } = this.state;
    try {
      http
        .POST('api/comuser/add', {
          comId: global.Id,
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: pass,
          role: selectedValue == 'Staff' ? '4' : '3',
          
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
          (err) => console.log('e',err['message']),
        );
    } catch (error) {
      console.log('eeeeee',error);
    }
  };

  setSelectedValue = (selectedValue) => {
    console.log('selectedValue', selectedValue);
    this.setState({
      selectedValue: selectedValue,
    });
    // global.Ci?ty = selectedValue
  };

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow = () => {
    this.setState({
      keyboardShown: true,
    });
    console.log('Keyboard Shown');
  };

  _keyboardDidHide = () => {
    this.setState({
      keyboardShown: false,
    });

    console.log('Keyboard Hidden');
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



  render() {
    const {
      firstName,
      lastName,
      email,
      pass,
      selectedValue
    } = this.state;

    return (
      <View style={styles.backGround}>
        <StatusBar hidden={false} backgroundColor={themeColor} />
       
          <NavigationHead
            centerComponent={'Create User'}
            rightComponent="Save"
            onPress={() => this.Back()}
            onExit={() => this.callApi()}
          />
          <View
            style={{
              // height: hp(100) - 100,
              flex:1,
              width: wp(96),
              marginHorizontal: wp(2),
              top: hp(0),
            }}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: hp(2),
                  }}>
                 
                  <View
                    style={{
                      marginTop: hp(2),
                    }}>
                    <Input placeholder={'First Name'} textChange ={(text)=>  this.setState({
                          firstName: text,
                        }) }/>
                        <Input placeholder={'Last Name'} textChange ={(text)=>  this.setState({
                          lastName: text,
                        }) }/>
                        <Input placeholder={'Email Address'} textChange ={(text)=>  this.setState({
                          email: text,
                        }) }/>
                        <Input placeholder={'Password'} textChange ={(text)=>  this.setState({
                          pass: text,
                        }) }/>
                         <Input placeholder={'Confirm Password'} textChange ={(text)=>  this.setState({
                          cpass: text,
                        }) }/>
                   
                    <View
                      style={{
                        width: wp(80),
                        height: hp(5),
                        borderRadius: scale(5),
                        borderBottomWidth:1,
                        borderBottomColor:"#eee",
                        backgroundColor: themeWhite,
                        marginTop: scale(10),
                        marginLeft: wp(2.5),
                      }}>
                      <Picker
                        textStyle={{
                          fontSize: 25,
                        }}
                        selectedValue={this.state.selectedValue}
                        style={{
                          width: wp(60),
                          height: hp(5),
                          color: '#333',
                          fontSize: hp(2),
                          fontWeight: 'bold',
                          fontFamily: FontRegular,
                          left: scale(33),
                          transform: [
                            {
                              scaleX: 1.2,
                            },
                            {
                              scaleY: 1.2,
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
            </View>
             {!this.state.keyboardShown && <View style={{
                bottom: 55,
                // position: "absolute",

            }}>
            <TouchableOpacity onPress={this.callApi}>
            <View style={{
                marginHorizontal: wp(8),
                borderRadius: 15,height:hp(6),
                justifyContent:"center",alignItems:"center",backgroundColor:themeColor
            }}>
            <Text style={{
                color: themeWhite,
                fontSize: hp(2.7),
                fontFamily: "Roboto-Bold"
            }}>Create User</Text>
           </View>
            </TouchableOpacity>
            </View> }
      </View>
    );
  }
}

export default UserCreation;