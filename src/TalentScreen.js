import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, TouchableWithoutFeedback, StatusBar, ImageBackground, Dimensions, Text, Image, View, TextInput } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import { scale } from './Util';
import CustomInput from '../Component/Input'
import { widthPercentageToDP as wp, heightPercentageToDP as hp, vw, vh } from '../Component/responsive-ratio';
import { Background, themeColor } from '../Constant/index'

import styles from './Style'

class TalentScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ''
        };
    }

    next = () => {
        this.props.navigation.navigate('FavoriteLocation')
    }

    render() {
        return (
            <SafeAreaView style={styles.backGround}>
            <ImageBackground style={styles.ImageBlue}
            source = {Background}
            resizeMode = {'stretch'}>
        <StatusBar hidden ={true}/>
            <View style={{
                flex: 1
            }}>
        <View style={[{
                top: scale(30)
            }, styles.CenterLogo]}><View><Image source = {require('../Img/logo-spotjo.png')}
            resizeMode={'contain'}
            style={{
                height: scale(150),
                width: Dimensions.get('window').width / 2 + scale(80),
            }}/></View><View style={{
                top: scale(20)
            }}><Text style={[{
                fontSize: scale(24),
                fontFamily: 'Roboto-Bold'
            }, styles.FontSty]}>What's your Talent?</Text></View><View style={{
                top: scale(20)
            }}><CustomInput placeholder = {'Java Software'} textChange = {(text) => this.setState({
                name: text
            })} inputStyle={{
                fontWeight: "bold",
                fontSize: scale(18)
            }}
            iconStyle={{
                height: 25,
                width: 25
            }}
            /></View></View>
            <View style={styles.Next}><TouchableWithoutFeedback style={styles.Size} onPress={this.next}><View  style={[styles.Size, {
                alignItems: 'flex-end'
            }]}><Text style={[{
                fontSize: scale(20),
            }, styles.FontSty]}>Next</Text></View></TouchableWithoutFeedback></View></View>
        </ImageBackground></SafeAreaView>
        )
    }
}
;

export default withNavigationFocus(TalentScreen);