/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Dimensions, StyleSheet, Platform, View, SafeAreaView, Text, StatusBar, ImageBackground, Image, TouchableWithoutFeedback } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
import { withNavigationFocus } from 'react-navigation';
import styles from './Style';
import { scale } from './Util';
import { play } from '../src/IconManager';
import { Background, themeColor } from '../Constant/index'


class MainScreen extends Component {
    constructor(props) {
        super(props);

    // this.state = {};
    }

    talent = () => {
        this.props.navigation.navigate('TalentScreen')
    }
    Opportunities = () => {
        this.props.navigation.navigate('TalentScreen')
    }
    Login = () => {
        this.props.navigation.navigate('LoginFirst')
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
        <View style={styles.Homeplay}><Text style={[{
                fontSize: 15
            }, styles.Hometext]}>Play Now</Text><View style={styles.MainScreenPlayLogo}>{play('logo-youtube', scale(20), '#37c0d3')}</View></View>
        <View style={[styles.Homelogin, {
                borderBottomWidth: scale(0.5),
                borderBottomColor: 'white',
                paddingBottom: scale(0.5)
            }]}><TouchableWithoutFeedback onPress ={this.Login}><Text style={[{
                fontSize: scale(18),
                fontWeight: "bold",
            }, styles.Hometext]}>Login</Text></TouchableWithoutFeedback></View>
        <View style={styles.HomeLogo}><Image source = {require('../Img/logo-spotjo.png')}
            resizeMode={'contain'}
            style={styles.imageStyle}/></View>
        <View style={styles.Homelooking}><Text style={styles.LookingFor}>Looking for</Text></View>
        <View style={styles.Homebut}>
        <TouchableWithoutFeedback style={styles.OpportunityView} onPress={this.Opportunities}><View  style={styles.TalentView}><Text style={styles.OppoTalentText}>Opportunities</Text></View></TouchableWithoutFeedback>
        </View>
        <View style={styles.HomeTel}>
        <TouchableWithoutFeedback style={styles.OpportunityView} onPress={this.talent}><View  style={styles.TalentView}><Text style={styles.OppoTalentText}>Talent</Text></View></TouchableWithoutFeedback>
        </View>
       </ImageBackground></SafeAreaView>
        );
    }
}
;


export default withNavigationFocus(MainScreen);