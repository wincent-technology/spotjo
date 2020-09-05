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

class AllSongs extends Component {
    constructor(props) {
        super(props);

    // this.state = {};
    }

    talent = () => {
        this.props.navigation.navigate('CompanyLogin')
    }
    Opportunities = () => {
        this.props.navigation.navigate('JobLogin')
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
        <View style={styles.Homelooking}><Text style={styles.LookingFor}>Looking for</Text></View>
        <View style={styles.Homebut}>
        <TouchableWithoutFeedback style={styles.OpportunityView} onPress={this.Opportunities}><View  style={styles.TalentView}><Text style={styles.OppoTalentText}>Opportunities</Text></View></TouchableWithoutFeedback>
        </View>
        <View style={styles.HomeTel}>
        <TouchableWithoutFeedback style={styles.OpportunityView} onPress={this.talent}><View  style={styles.TalentView}><Text style={styles.OppoTalentText}>Talent</Text></View></TouchableWithoutFeedback>
        </View>
       </ImageBackground></View>
        );
    }
}
;


export default withNavigationFocus(AllSongs);