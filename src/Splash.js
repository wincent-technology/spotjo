/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, StatusBar, ImageBackground, Text, Image, View } from 'react-native';
import { withNavigation } from 'react-navigation';
import styles from './Style'
import { Background, themeColor } from '../Constant/index'

class Splash extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {
        setTimeout(() => {
            this.props.navigation.navigate('MainScreen')
        }, 5000)
    }
    render() {
        return (
            <SafeAreaView style={styles.backGround}>
            <ImageBackground style={styles.ImageBlue}
            source = {Background}
            resizeMode={'stretch'}>
        <StatusBar hidden ={true}/>
       
        <View style={styles.SplashLogoSpotjo}><View><Image source = {require('../Img/logo-spotjo.png')}
            resizeMode={'contain'}
            style={{
                height: 100,
                width: 200
            }}/></View><View><Image source = {require('../Img/app-icon-full-wt.png')}
            resizeMode={'contain'}
            style={{
                height: 100,
                width: 100
            }}/></View></View>
        </ImageBackground></SafeAreaView>
        );
    }
}
;
export default withNavigation(Splash)