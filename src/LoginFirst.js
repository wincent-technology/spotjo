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
import styles from './Style';
import { scale } from './Util';
import { Background } from '../Constant/index'
import Texting from '../Constant/Text'
import BackNext from '../Component/BackNext';
import * as Animatable from 'react-native-animatable';

// const {
//     height,
//     width
//   } = Dimensions.get('window');
  const {
    height,
  } = Dimensions.get('screen');

class LoginFirst extends Component {
    constructor(props) {
        super(props);

    // this.state = {};
    this.text = React.createRef()
    this.texts = React.createRef()
    console.log('>>>>>>>>',height);
    }

    talent = () => {
        this.props.navigation.navigate('CompanyLogin')
    }
    Opportunities = () => {
        this.props.navigation.navigate('JobLogin')
    }

    next = () => {
        this.texts.current.zoomIn(800)
        this.text.current.zoomIn(1000)
  
      }

    render() {
        return (
            <View style={styles.backGround}>
            <ImageBackground style={styles.ImageBlue}
            source = {Background}
            resizeMode = {
            'stretch'
            } >
        <StatusBar hidden ={true}/>
        <View style={styles.HomeLogo}><Image source = {require('../Img/logo-spotjo.png')}
            resizeMode={'contain'}
            style={styles.imageStyle}/></View>
        <View style={styles.Homelooking}><Texting style={styles.LookingFor} text='Looking_for'/></View>
        <View style={styles.Homebut}>
        <TouchableWithoutFeedback style={styles.OpportunityView} onPress={this.Opportunities}><Animatable.View ref={this.texts} style={styles.TalentView}><Texting style={styles.OppoTalentText} text='Opportunities'/></Animatable.View></TouchableWithoutFeedback>
        </View>
        <View style={styles.HomeTel}>
        <TouchableWithoutFeedback style={styles.OpportunityView} onPress={this.talent}><Animatable.View ref={this.text} style={styles.TalentView}><Texting style={styles.OppoTalentText} text='Talent'/></Animatable.View></TouchableWithoutFeedback>
        </View>
        <BackNext onBack={()=> this.props.navigation.goBack()} onNext={this.next} show={true}/>
       </ImageBackground></View>
        );
    }
}
;


export default withNavigationFocus(LoginFirst);