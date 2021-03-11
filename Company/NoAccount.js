import React, { Component } from 'react';
import { SafeAreaView, Dimensions, StyleSheet, Platform, View, Text, StatusBar, ImageBackground, Image, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { withNavigationFocus } from 'react-navigation';
import styles from '../src/Style';
import { scale } from '../src/Util';
import { left, library, icon, play, leftVid } from '../src/IconManager';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../Component/responsive-ratio';
import { Background } from '../Constant/index'


class NoAccount extends Component {
    constructor(props) {
        super(props);

    // this.state = {};
    }

    talent = () => {
        // this.props.navigation.navigate('Albums')
    }
    Opportunities = () => {
        // this.props.navigation.navigate('CompanyLogin')
    }
    Login = () => {
        this.props.navigation.navigate('Signup')
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
           <Text style={styles.LookingFor}>Create Account</Text>
           <Text style={[styles.LookingFor, {
                fontSize: scale(17)
            }]}>Signup to your  spotjo account</Text>
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
       </ImageBackground></SafeAreaView>

        );
    }
}
;
export default withNavigationFocus(NoAccount);