/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Dimensions, StyleSheet, Platform, View, Text, StatusBar, ImageBackground, Image, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { withNavigationFocus } from 'react-navigation';
import styles from '../src/Style';
import { scale } from '../src/Util';
import { left, library, icon, play, leftVid } from '../src/IconManager';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../Component/responsive-ratio';


class Login extends Component {
    constructor(props) {
        super(props);

    // this.state = {};
    }

    create = () => {
        this.props.navigation.navigate('NoAccount')
    }
    Opportunities = () => {
        // this.props.navigation.navigate('CompanyLogin')
    }
    Login = () => {
        this.props.navigation.navigate('LoginWithEmail')
    }


    render() {
        return (
            <ImageBackground style={styles.ImageBlue}
            source = {
            require('../Img/bg.jpg')
            }
            resizeMode = {
            'stretch'
            } >
        <ImageBackground style={styles.ImageBlue}
            source = {require('../Img/glossy.png')}
            resizeMode={'stretch'}>
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
            }]}>Login to your spotjo account</Text>
            </View>
            <View style={{
                left: wp('10%'),
                marginTop: scale(45)
            }}>
        
        <TouchableWithoutFeedback style={styles.CompanyLoginOpportunityView} onPress={this.Login}><View  style={[styles.CompanyLoginalentView, {
                borderRadius: scale(5),
                justifyContent: "center",
            }]}><View style={{
                marginLeft: scale(-95),
            // marginRight: scale(10)
            }}><Text style={styles.CompanyOppoTalentText}>Your Email</Text></View></View></TouchableWithoutFeedback>
       
        <TouchableWithoutFeedback style={styles.CompanyLoginOpportunityView} onPress={this.talent}><View  style={[styles.CompanyLoginalentView, styles.CompanyLoginButton]}><View style={styles.CompanyLoginIcon}>{leftVid('google', 20, 'red')}</View><Text style={styles.CompanyOppoTalentText}>Gmail</Text></View></TouchableWithoutFeedback>
        <TouchableWithoutFeedback style={styles.CompanyLoginOpportunityView} onPress={this.Opportunities}><View  style={[styles.CompanyLoginalentView, styles.CompanyLoginButton]}><View style={styles.CompanyLoginIcon}>{leftVid('facebook-square', 20, 'rgb(58, 85, 159)')}</View><Text style={styles.CompanyOppoTalentText}>FaceBook</Text></View></TouchableWithoutFeedback>
        <TouchableWithoutFeedback style={styles.CompanyLoginOpportunityView} onPress={this.Opportunities}><View  style={[styles.CompanyLoginalentView, styles.CompanyLoginButton]}><View style={styles.CompanyLoginIcon}>{leftVid('linkedin-square', 20, 'rgb(0, 119, 183)')}</View><Text style={styles.CompanyOppoTalentText}>Linkedin</Text></View></TouchableWithoutFeedback>
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
       </ImageBackground></ImageBackground>

        );
    }
}
;
export default withNavigationFocus(Login);