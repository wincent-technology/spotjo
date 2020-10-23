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
import { Background } from '../Constant/index'
import http from '../api'
class EmailSend extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: ''
        };
    }

    talent = () => {
        // this.props.navigation.navigate('Albums')
    }
    Opportunities = () => {
        // this.props.navigation.navigate('CompanyLogin')
    }
    Reset = () => {
        const {name} = this.state;

        try {
            if (name.length > 0) {
                http.POST('api/user/forgotpass', {
                    email: name,
                }).then((res) => {
                    if (res['data']['status']) {
                        alert('please kindly check your mail')
                        this.props.navigation.navigate('JobForgatPass')
                    } else {
                        snack(res['data']['message'])
                    }
                }, err => snack(err['message']))
            } else {
                snack('Required Email Password')

            }
        } catch ( error ) {
            snack("error while register" + error)
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
            }]}>We will send you a link reset your password to this email address</Text>
            </View>
            <View style={{
                // left: Dimensions.get('window').width / 7,
                marginTop: hp(50) / 2,
                // position: "absolute",
                justifyContent: "center",
                alignItems: "center"
            }}>
       <CustomInput placeholder = {'Email Address'} textChange = {(text) => this.setState({
                name: text
            })}
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
export default withNavigationFocus(EmailSend);