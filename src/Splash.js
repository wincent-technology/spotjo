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
import { Background, themeColor, url } from '../Constant/index'
import AsyncStorage from '@react-native-community/async-storage';


class Splash extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount = async () => {
        let navigate = 'MainScreen'
        let keys = []
        try {
            keys = await AsyncStorage.getAllKeys()
        } catch ( e ) {
            // read key error
        }
        if (keys.indexOf("UserLoggedInData") !== -1) {
            var result = await AsyncStorage.getItem('UserLoggedInData');
            result = JSON.parse(result);
            global.Id = result['id'];
            global.firstName = result['first_name']
            global.lastName = result['last_name']
            global.UserEmail = result['email']
            global.Place = result['place']
            global.UserMobile = result['mobile']
            global.UserProfile = url + '/images/user/' + result['profile']
            global.Video = result['video']
            global.UserSkill = result['skills']
            global.UserLanguage = result['language']
            global.Qualification = result['qualification']
            global.UserEducation = result['education']
            global.salaryrating = result['salaryrating']
            global.salary = result['minSal']
            global.Experience = result['workexp']
            navigate = 'TabScreenJob'
        } else if (keys.indexOf("CompanyLoggedInData") !== -1) {
            var result = await AsyncStorage.getItem('CompanyLoggedInData');
            result = JSON.parse(result);
            console.log('id>>>>', result['id']);
            global.Id = result['id'];
            global.Email = result['email']
            global.Branch = result['branch']
            global.uploadUri = url + '/images/company/' + result['logo']
            global.Mobile = result['mobile']
            global.Company = result['name']
            global.Video = result['video']
            global.WebSite = result['website']
            global.Address = result['address']
            navigate = 'TabScreenCompany'
        }
        setTimeout(() => {
            this.props.navigation.navigate(navigate)
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