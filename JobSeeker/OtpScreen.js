/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { SafeAreaView, Dimensions, View, Text, StatusBar, ImageBackground, Image, TouchableWithoutFeedback } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import styles from '../src/Style';
import { scale, snack } from '../src/Util';
import CustomInput from '../Component/Input'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../Component/responsive-ratio';
import { Background,url } from '../Constant/index'
import http from '../api'
import AsyncStorage from '@react-native-community/async-storage';

class OtpScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: ''
        };
    }

    Reset = () => {
        const {name} = this.state;

        try {
            if (name.length > 0) {
                http.POST('api/user/verifiedotp', {
                    userId: global.Id,
                    otp:name
                }).then((res) => {
                    if (res['data']['status']) {
                        console.log('hmmmmmmm<<<',res['data']['result'])
                        global.Id = res['data']['result']['id'];
                        // will get data in this    res['data']['result'] 
                        global.firstName = res['data']['result']['first_name']
                        global.lastName = res['data']['result']['last_name']
                        global.UserEmail = res['data']['result']['email']
                        global.Place = res['data']['result']['place']
                        global.UserMobile = res['data']['result']['mobile']
                        global.UserProfile = url + 'images/user/' + res['data']['result']['profile']
                        global.Video = url + 'images/user/' + res['data']['result']['video']
                        global.UserSkill = res['data']['result']['skills']
                        global.UserLanguage = res['data']['result']['language']
                        global.Qualification = res['data']['result']['qualification']
                        global.UserEducation = res['data']['result']['education']
                        global.salaryrating = res['data']['result']['salRatting']
                        global.minSalary = res['data']['result']['minSal']
                        global.maxSalary = res['data']['result']['maxSal']
                        global.Experience = res['data']['result']['workexp']
                        global.let = parseFloat(res['data']['result']['latitude'])
                        global.long = parseFloat(res['data']['result']['longitude'])
                        AsyncStorage.setItem('UserLoggedInData', JSON.stringify(res['data']['result']));
                        if (res['data']['result']['isLoggedFirstTime'] == 0) {
                        this.props.navigation.navigate('JobTalentScreen');
                        } else {
                        this.props.navigation.navigate('TabScreenJob');
                        }
                        // alert('please kindly check your mail')
                        // this.props.navigation.navigate('JobForgatPass')
                    } else {
                        snack(res['data']['message'])
                    }
                }, err => snack(err['message']))
            } else {
                snack('Required otp')

            }
        } catch ( error ) {
            snack("error while verifacation" + error)
        }
    // this.props.navigation.navigate('ForgatPass')
    // this.props.navigation.navigate('JobForgatPass')
    }

    render() {
        return (
            <SafeAreaView style={styles.backGround}>
            <ImageBackground style={styles.ImageBlue}
            source = {Background}
            resizeMode = {
            'stretch'
            } >
       
        <StatusBar hidden ={true}/>
         <View style={[{
                top: scale(30)
            }, styles.CenterLogo]}><View><Image source = {require('../Img/logo-spotjo.png')}
            resizeMode={'contain'}
            style={{
                height: scale(150),
                width: Dimensions.get('window').width / 2 + scale(80),
            }}/></View>
           <Text style={[styles.LookingFor, {
                textAlign: "center",
                width: wp('80%'),
                fontSize: scale(17)
            }]}>We have sent you  otp in your registered email address</Text>
            </View>
            <View style={{
                // left: Dimensions.get('window').width / 7,
                marginTop: hp(50) / 2,
                // position: "absolute",
                justifyContent: "center",
                alignItems: "center"
            }}>
       <CustomInput placeholder = {'Enter Otp'} textChange = {(text) => this.setState({
                name: text
            })}
            keyboardType={"numeric"}
            leftIconContainerStyle={{
                opacity: 0,
                height: 0,
                width: 0
            }}
            containerStyle={{
                elevation: 7,
                // alignSelf: "center",
                width: wp(100)
            }}
            inputStyle={{
                // width: wp(100),
                // alignSelf: "center",
                // alignItems: "center",
                textAlign: "center"
            }}
            />
      <View style={{
                top: scale(150),
                right: scale(20),
                position: "absolute"
            }}><TouchableWithoutFeedback style={styles.Size} onPress={this.Reset}><View  style={[styles.Size, styles.CenterLogo]}><Text style={[{
                fontSize: scale(20),
            }, styles.FontSty]}>Send</Text></View></TouchableWithoutFeedback></View>
        </View>
       </ImageBackground></SafeAreaView>

        );
    }
}
;
export default withNavigationFocus(OtpScreen);