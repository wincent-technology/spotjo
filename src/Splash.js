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
import { Background, themeColor, url, splashVid } from '../Constant/index'
import AsyncStorage from '@react-native-community/async-storage';
import Video from 'react-native-video';
import http from '../api';
import { scale,snack } from './Util';

let navigate = 'MainScreen'

class Splash extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentTime: 0,
            duration: 0,
            isFullScreen: false,
            isLoading: true,
            paused: false,
            screenType: 'cover',
            data: ''
        };
    }



    onLoad = data => this.setState({
        duration: data.duration,
    });

    onEnd = () => this.props.navigation.navigate(navigate)

    componentDidMount = async () => {
        AsyncStorage.clear();
        let keys = []
        try {
            keys = await AsyncStorage.getAllKeys()
        } catch ( e ) {
            // read key error
        }
        if (keys.indexOf("UserLoggedInData") !== -1) {
            var result = await AsyncStorage.getItem('UserLoggedInData');
            result = JSON.parse(result);
            console.log('result',JSON.parse(result))
            console.log('resulteducation',result);
            global.Id = result['id'];
            global.firstName = result['first_name']
            global.lastName = result['last_name']
            global.UserEmail = result['email']
            global.Place = result['place']
            global.UserMobile = result['mobile']
            global.UserProfile = url + '/images/user/' + result['profile']
            global.Video = url + '/images/user/' + result['video']
            global.UserSkill = JSON.parse(result['skills'])
            global.UserLanguage = result['language']
            global.Qualification = (result['qualification'])
            global.UserEducation = JSON.parse(result['education']) || []
            global.salaryrating = result['salaryrating']
            global.salary = result['minSal']
            global.maxSalary =result['maxSal']
            global.Experience = JSON.parse(result['workexp'])
            global.let = parseFloat(result['latitude'])
            global.long = parseFloat(result['longitude'])
            navigate = 'TabScreenJob'
            this.callJob()
        } else if (keys.indexOf("CompanyLoggedInData") !== -1) {
            var result = await AsyncStorage.getItem('CompanyLoggedInData');
            result = JSON.parse(result);
            console.log('id>>>>', result);
            global.Id = result['id'];
            global.Email = result['email']
            global.Branch = result['branch']
            global.uploadUri = url + '/images/company/' + result['logo']
            global.Mobile = result['mobile']
            global.Company = result['name']
            global.Video = url + '/images/company/' + result['video']
            global.WebSite = result['website']
            global.Address = result['address']
            global.long = parseFloat(result['longitude'])
            global.let = parseFloat(result['latitude'])
            navigate = result['isLoggedFirstTime']  == 0 ? 'TalentCom' : 'UserProfile'
        }
    // setTimeout(() => {
    //     this.props.navigation.navigate(navigate)
    // }, this.state.duration)
    }

    callJob = () => {
        try {
          http.POST('api/appjob/get', {
            location: global.Place
          }).then(
            (res) => {
              console.log('resssssssssssssssssssssssssssssssssssssssssssssssss',res['data']['result'])
              if (res['data']['status']) {
                global.all = res['data']['result'];
              } else {
                snack(res['data']['message']);
              }
            },
            (err) => snack(JSON.stringify(err['message'])),
          );
        } catch (error) {
          snack(error);
        }
      }

    render() {
        return (
            <View style={stylee.container}>
            <StatusBar hidden/>
            <Video
            onEnd={this.onEnd}
            onLoad={this.onLoad}
            onLoadStart={this.onLoadStart}
            onProgress={this.onProgress}
            paused={this.state.paused}
            ref={videoPlayer => (this.videoPlayer = videoPlayer)}
            resizeMode={this.state.screenType}
            onFullScreen={this.state.isFullScreen}
            source={splashVid}
            style={stylee.mediaPlayer}
            volume={10}
            /></View>
        );
    }
}
;
const stylee = StyleSheet.create({
    container: {
        flex: 1,
    },
    toolbar: {
        marginTop: 30,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
    },
    mediaPlayer: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: themeColor,
    },
});
export default withNavigation(Splash)