/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { SafeAreaView, Dimensions, StyleSheet, Platform, View, Text, StatusBar, ImageBackground, Image, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { withNavigationFocus } from 'react-navigation';
import styles from '../src/Style';
import { scale } from '../src/Util';
import { left, library, icon, play, leftVid } from '../src/IconManager';
import CustomInput from '../Component/TextInput'
import { Background } from '../Constant/index'

class JobSignup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: ''
        };
    }


    Login = () => {
        this.props.navigation.navigate('TabScreenJob')
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
                name: text
            })} />
       <CustomInput placeholder = {'Password'} textChange = {(text) => this.setState({
                name: text
            })} />
            <TouchableWithoutFeedback style={styles.CompanyLoginOpportunityView} onPress={this.Login}><View  style={[styles.CompanyLoginWithEmailView, {
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