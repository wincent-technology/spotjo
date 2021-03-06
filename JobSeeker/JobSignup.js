import React, { Component } from 'react';
import { SafeAreaView, Dimensions, StyleSheet, Platform, View, Text, PermissionsAndroid, StatusBar, ImageBackground, Image, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { withNavigationFocus } from 'react-navigation';
import styles from '../src/Style';
import { scale, snack } from '../src/Util';
import { left, library, icon, play, leftVid } from '../src/IconManager';
import CustomInput from '../Component/TextInput';
import { Background } from '../Constant/index';
import http from '../api';
import Geolocation from '@react-native-community/geolocation';
import PermissionHelper from '../Component/PermissionHelper'



class JobSignup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        };
    }

    permission = async () => {
        const granted = await PermissionHelper.Storage.isLocationPermissionGranted();
        if (granted)
           {  Geolocation.getCurrentPosition((info) => {
                  console.log('inf', info);
                  global.let = info.coords.latitude;
                  global.long = info.coords.longitude;
                });
          }
        else
        {const granted = await PermissionHelper.Storage.requestLocationPermission();
            console.log(granted)
            }
      }

    onSignup = async () => {
            this.permission();
        const {email, password} = this.state;
        try {
            if (email.length > 0 && password.length > 0) {
                http.POST('api/user/register', {
                    email: email,
                    password: password,
                    latitude: global.let || 0,
                    longitude: global.long || 0
                }).then((res) => {
                    if (res['data']['status']) {
                        global.Id = res['data']['result']
                        global.UserEmail = this.state.email
                        this.props.navigation.navigate('OtpScreen')
                    } else {
                        snack(res['data']['message'])
                    }
                }, err => snack(err['message']))
            } else {
                snack('Required Email Password')
            }
        } catch ( error ) {
            snack(error)

        }
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
       <CustomInput placeholder = {'Password'} textChange = {(text) => this.setState({
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
export default withNavigationFocus(JobSignup);