/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { SafeAreaView, Dimensions, StyleSheet, Platform, View, Text, StatusBar, PermissionsAndroid, ImageBackground, Image, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { withNavigationFocus } from 'react-navigation';
import styles from '../src/Style';
import { scale, snack } from '../src/Util';
import { left, library, icon, play, leftVid } from '../src/IconManager';
import CustomInput from '../Component/TextInput'
import { Background,url } from '../Constant/index'
import http from '../api';
import SnackBar from '../Component/SnackBar'
import Geolocation from '@react-native-community/geolocation';
import AsyncStorage from '@react-native-community/async-storage';
import PermissionHelper from '../Component/PermissionHelper'
import {WebView} from 'react-native-webview';

const INJECTED_JAVASCRIPT = `(function() {
    window.ReactNativeWebView.postMessage(JSON.parse(JSON.stringify(window.location)));
})();`;

class Signup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            source:'',
            socialuserId:'',
            name:''
        };
        console.log('global', global.let, global.long)
    }


    permission = async () => {
        const granted = await PermissionHelper.Storage.isLocationPermissionGranted();
        if (granted)
           {  Geolocation.getCurrentPosition((info) => {
                  console.log('inf', info);
                  global.let = info.coords.latitude;
                  global.long = info.coords.longitude;
                });
          }
        else
        {const granted = await PermissionHelper.Storage.requestLocationPermission();
            !granted && this.permission();  }
      }

    onSignup = async () => {
      // this.permission();

        const {email, password} = this.state;


        let social = http.POST('api/company/social/login', {
            socialuserId: this.state.socialuserId,
            name: this.state.name,
            email: this.state.email,
            latitude:global.let || 1,
            longitude:global.long || 1
        })

        let self = http.POST('api/company/login', {
            email: email,
            password: password,
          })
          let Singup = this.state.socialuserId != 'null' ? social : self ;

            try {
               Singup.then(
            (res) => {
              if (res['data']['status']) {
                if (res['data']['result']['role'] == '2' || res['data']['result']['role'] == '3') {
                  global.role = res['data']['result']['role'] ? 'Super Admin' : ''
                  global.Service = res['data']['result']['services'];
                  global.Id = res['data']['result']['id'];
                  global.Email = res['data']['result']['email'];
                  global.Branch = res['data']['result']['branch'];
                  global.uploadUri =res['data']['result']['logo'] != null ? url + 'images/company/' + res['data']['result']['logo'] : null;
                  global.Mobile = res['data']['result']['mobile'];
                  global.Company = res['data']['result']['name'];
                  global.Video = res['data']['result']['video'] != null ? url + 'images/company/' + res['data']['result']['video'] : null;
                  global.WebSite = res['data']['result']['website'];
                  global.Address = res['data']['result']['address'];
                  global.let = parseFloat(res['data']['result']['latitude']) || 1;
                  global.long = parseFloat(res['data']['result']['longitude']) || 1;
                  console.log('glo', global.let, global.long);
                  
                  AsyncStorage.setItem(
                    'CompanyLoggedInData',
                    JSON.stringify(res['data']['result']),
                  );
                    this.props.navigation.navigate('TalentCom');
                } 
              } else {
                snack(res['data']['message']);
              }
            },
            (err) => snack(err['message']),
          );
        } catch ( error ) {
            snack("error while register" + error)
        }
    }


    componentDidMount() {
        // console.log('this.props',this.props.navigation.state.params.source)
        this.setState({
            loading: true,
            source:this.props.navigation.state.params.source
        });
    }


    _onLoad = (state) => {
        console.log('state',state);
        // https://test-web.envspotjo.com/#/authentication/signup
        var n = state.url.startsWith('https://spotjo-test.envspotjo.com/#/authentication/signup?');
        if (n) {
          
                let m = state.url.split('?');
                let g = m[1].split('&');
                let i = g.map(i => i.split('='))
                let b = i.map(i => i[1])
                this.setState({
                    email:b[0],
                    password:b[1],
                    socialuserId:b[2],
                    name:b[3]
                });
                console.log('this.state',this.state);
                this.onSignup()
        }
        else{

        }
    }
    

    render() {
        const {source} = this.state;
        return (
            <View style={{
                flex: 1
            }}>
             <WebView
            style={{
                overflow: 'scroll'
            }}
            source={{
                uri: source
            }}
            onNavigationStateChange={this._onLoad}
            useWebKit={Platform.OS == 'ios'}
            injectedJavaScript={INJECTED_JAVASCRIPT}
            onMessage={this.onMessage}
            />
         </View>
        );

    }
}
export default withNavigationFocus(Signup);