import React, { Component } from 'react';
import { SafeAreaView, Dimensions, View, Text, StatusBar, ImageBackground, Image, TouchableWithoutFeedback } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import styles from '../src/Style';
import { scale, snack } from '../src/Util';
import CustomInput from '../Component/TextInput'
import { Background, url } from '../Constant/index'
import http from '../api';
import AsyncStorage from '@react-native-community/async-storage';


class LoginWithEmail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        };
    }

    onLogin = async () => {
        const {email, password} = this.state;
        try {
            if (email.length > 0 && password.length > 0) {
                http.POST('api/user/login', {
                    email: email,
                    password: password
                }).then((res) => {
                    if (res['data']['status']) {
                        console.log('responce user', res['data']['result'])
                        global.Id = res['data']['result']['id'];
                        // will get data in this    res['data']['result'] 
                        global.firstName = res['data']['result']['first_name']
                        global.lastName = res['data']['result']['last_name']
                        global.UserEmail = res['data']['result']['email']
                        global.Place = res['data']['result']['place']
                        global.UserMobile = res['data']['result']['mobile']
                        global.UserProfile = url + '/images/user/' + res['data']['result']['profile']
                        global.Video = res['data']['result']['video']
                        global.UserSkill = res['data']['result']['skills']
                        global.UserLanguage = res['data']['result']['language']
                        global.Qualification = res['data']['result']['qualification']
                        global.UserEducation = res['data']['result']['education']
                        global.salaryrating = res['data']['result']['salaryrating']
                        global.salary = res['data']['result']['minSal']
                        global.Experience = res['data']['result']['workexp']
                        AsyncStorage.setItem('UserLoggedInData', JSON.stringify(res['data']['result']));

                        this.props.navigation.navigate('TabScreenJob')
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

    forgat = () => {
        this.props.navigation.navigate('JobEmailSend')
    }

    create = () => {
        this.props.navigation.navigate('JobNoAccount')
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
           <Text style={styles.LookingFor}>Login</Text>
           <Text style={[styles.LookingFor, {
                fontSize: scale(17)
            }]}>Login with your email address</Text>
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
            })}/>
       <TouchableWithoutFeedback onPress={this.forgat}><Text style={{
                marginTop: scale(-8),
                marginLeft: scale(115),
                marginBottom: scale(40),
                color: '#fff'
            }}>Forget Password?</Text></TouchableWithoutFeedback>
            <TouchableWithoutFeedback style={styles.CompanyLoginOpportunityView} onPress={this.onLogin}><View  style={[styles.CompanyLoginWithEmailView, {
                borderRadius: scale(5),
                justifyContent: "center",
            }]}><View style={{
                // marginLeft: scale(-45),
                // marginRight: scale(10)
            }}><Text style={styles.CompanyOppoTalentText}>Login</Text></View></View></TouchableWithoutFeedback>
        </View>
        <View style={styles.CompanyLoginAccountText}><Text style={[{
                fontSize: scale(23),
            }, styles.FontSty]}>Don't Have Account?</Text>
             <View style={{
                flexDirection: "row"
            }}>
            <Text  style={[{
                fontSize: scale(19),
            }, styles.FontSty]}>Create new account </Text><TouchableWithoutFeedback onPress={this.create}><Text style={[{
                textDecorationLine: "underline",
                // textDecorationColor: "#fff",
                fontSize: scale(19),
            }, styles.FontSty]}>Click here</Text></TouchableWithoutFeedback></View></View>
       </ImageBackground></SafeAreaView>

        );
    }
}
;
export default withNavigationFocus(LoginWithEmail);