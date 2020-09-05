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
import { scale } from '../src/Util';
import CustomInput from '../Component/TextInput'
import { Background } from '../Constant/index'


class LoginWithEmail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: ''
        };
    }


    forgat = () => {
        this.props.navigation.navigate('JobEmailSend')
    }
    Login = () => {
        this.props.navigation.navigate('TabScreenJob')
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
                name: text
            })} />
       <CustomInput placeholder = {'Password'} textChange = {(text) => this.setState({
                name: text
            })}/>
       <TouchableWithoutFeedback onPress={this.forgat}><Text style={{
                marginTop: scale(-8),
                marginLeft: scale(115),
                marginBottom: scale(40),
                color: '#fff'
            }}>Forget Password?</Text></TouchableWithoutFeedback>
            <TouchableWithoutFeedback style={styles.CompanyLoginOpportunityView} onPress={this.Login}><View  style={[styles.CompanyLoginWithEmailView, {
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