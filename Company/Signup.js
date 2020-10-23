/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { SafeAreaView, Dimensions, StyleSheet, Platform, View, Text, StatusBar, PermissionsAndroid, ImageBackground, Image, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { withNavigationFocus } from 'react-navigation';
import styles from '../src/Style';
import { scale, snack } from '../src/Util';
import { left, library, icon, play, leftVid } from '../src/IconManager';
import CustomInput from '../Component/TextInput'
import { Background } from '../Constant/index'
import http from '../api';
import SnackBar from '../Component/SnackBar'
import Geolocation from '@react-native-community/geolocation';
import AsyncStorage from '@react-native-community/async-storage';


class Signup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        };
        console.log('global', global.let, global.long)
    }



    onSignup = async () => {
        const {email, password} = this.state;
        try {
            if (email.length > 0 && password.length > 0) {
                http.POST('api/company/register', {
                    email: email,
                    password: password,
                    latitude: global.let || 0,
                    longitude: global.long || 0
                }).then((res) => {
                    if (res['data']['status']) {
                        console.log('response', res['data']['result'], res['data']['result']);
                        global.Id = res['data']['result'][0]['id']
                        global.Email = res['data']['result'][0]['email']
                        global.role = res['data']['result'][0]['role']
                        AsyncStorage.setItem('CompanyLoggedInData', JSON.stringify(res['data']['result']));
                        this.props.navigation.navigate('ComEdit')
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
    }


    forgat = () => {
        this.props.navigation.navigate('EmailSend')
    }


    render() {
        return (
            <SafeAreaView style={styles.backGround}>
            <ImageBackground style={styles.ImageBlue}
            source = {Background}
            resizeMode = {
            'stretch'
            }><StatusBar hidden ={true}/>
         <View style={[{
                top: scale(30)
            }, styles.CenterLogo]}><View><Image source = {require('../Img/logo-spotjo.png')}
            resizeMode={'contain'}
            style={{
                height: scale(150),
                width: Dimensions.get('window').width / 2 + scale(80),
            }}/></View>
           <Text style={styles.LookingFor}>Signup</Text>
           <Text style={[styles.LookingFor, {
                fontSize: scale(17)
            }]}>Signup with your email address</Text>
            </View>
            <View style={{
                // left: Dimensions.get('window').width / 7,
                marginTop: scale(45),
                justifyContent: "center",
                alignItems: "center"
            }}>
       <CustomInput placeholder = {'Email or Username'} textChange = {(text) => this.setState({
                email: text
            })} />
       <CustomInput secureTextEntry={true} placeholder = {'Password'} textChange = {(text) => this.setState({
                password: text
            })} />
            <TouchableWithoutFeedback style={styles.CompanyLoginOpportunityView} onPress={this.onSignup}><View  style={[styles.CompanyLoginWithEmailView, {
                borderRadius: scale(5),
                justifyContent: "center",
            }]}><View><Text style={styles.CompanyOppoTalentText}>Signup</Text></View></View></TouchableWithoutFeedback>
        </View>
      </ImageBackground></SafeAreaView>

        );
    }
}
;
export default withNavigationFocus(Signup);