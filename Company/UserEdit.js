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
    Image,
    View,
    Keyboard
} from 'react-native';
import {
    withNavigationFocus
} from 'react-navigation';
import styles from '../src/Style'
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
    FontRegular
} from '../Constant/index'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from '../Component/responsive-ratio';
import {
    scale,
    snack
} from '../src/Util'
import CustomInput from '../Component/Input'
import {
    Rating,
    NavigationHead
} from '../Component/ViewManager.js'
import ItemMV from '../src/ItemMV'
import DeviceInfo from 'react-native-device-info';
import http from '../api'

// import PostedJobList from './PostedJobList';
// import styles from './Style'

const Input = ({...props}) => {
    return (<View
                style={{
                  marginTop: scale(10),
                }}>
                <CustomInput
                  value={props.placeholder}
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
            id: '',
            cpass:'',
            keyboardShown:false
        };
    }


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

        const {
            params
        } = this.props.navigation.state;
        var par = params.UserChange;
        this.setState({
            selectedValue: par.role == 4 ? 'Staff' :'Admin',
            firstName: par.firstName,
            lastName: par.lastName,
            email: par.email,
            pass: par.password,
            id: par.id,
            cpass:par.password
        })
        // const UserChange = params ? params.vid : null;
        console.log('other params', this.state.firstName)
    }

    Back = () => {
        this.props.navigation.goBack()
    }

    callApi = () => {
        console.log('hellow');
        const {
            firstName,
            lastName,
            email,
            pass,
            selectedValue,
            id
        } = this.state;
        try {
            http.POST('api/comuser/edit', {
                Id: id,
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: pass,
                role: selectedValue == 'Staff' ? '4' : '3'
            }).then((res) => {
                if (res['data']['status']) {
                    console.log('rrrrrrrrr', res['data']['result']);
                    this.props.navigation.goBack()
                } else {
                    snack(res['data']['message'])
                }
            }, err => snack(err['message']));
        } catch (error) {
            snack(error)

        }
    }


    setSelectedValue = (selectedValue) => {
        console.log('selectedValue', selectedValue);
        this.setState({
            selectedValue: selectedValue
        })
        // global.Ci?ty = selectedValue

    }
    render() {
        const {
            firstName,
            lastName,
            email,
            pass,
            selectedValue,cpass
        } = this.state;

        return (
            <View style={styles.backGround}>
            <StatusBar hidden={false} backgroundColor={themeColor} />
              <NavigationHead
                centerComponent={'Create User'}
                rightComponent="Save"
                onPress={() => this.Back()}
              />
              <View style={{
              alignItems: "center",
              width: wp(100),
              marginTop:hp(2)
          }}><Text style={{
              fontSize: hp(2.7),
              fontFamily: "Roboto-Bold",
              textAlign: "center",
              color: themeColor
          }}>Please provide all the information mentioned below</Text></View>
              <View
                style={{
                  // height: hp(100) - (150 + hp(5)),
                  flex:1,
                  width: wp(96),
                  marginHorizontal: wp(2),
                  top: hp(0),
                }}>
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: hp(100) < 600  ? hp(0) : hp(3),
                      }}>
                      <View
                        style={{
                          marginTop: hp(2),
                        }}>
                        <Input placeholder={firstName} textChange ={(text)=>  this.setState({
                              firstName: text,
                            }) }/>
                            <Input placeholder={lastName} textChange ={(text)=>  this.setState({
                              lastName: text,
                            }) }/>
                            <Input placeholder={email} textChange ={(text)=>  this.setState({
                              email: text,
                            }) }/>
                            <Input placeholder={pass} textChange ={(text)=>  this.setState({
                              pass: text,
                            }) }/>
                             <Input placeholder={cpass} textChange ={(text)=>  this.setState({
                              cpass: text,
                            }) }/>
                        <View
                          style={{
                            width: wp(80),
                            height: scale(40),
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
                }}>Edit User</Text>
               </View>
                </TouchableOpacity>
                </View> }
          </View>
        )
    }
};

export default UserCreation;