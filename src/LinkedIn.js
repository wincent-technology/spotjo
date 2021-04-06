import React, { Component } from 'react';
import { View, Platform, Text } from 'react-native';
import {WebView} from 'react-native-webview';
import axios from 'axios';
let userInfo = {}
import http from '../api';
import AsyncStorage from '@react-native-community/async-storage';
import { scale, snack } from './Util';
let sent = false;
let isLoggedin : 0;
const INJECTED_JAVASCRIPT = `(function() {
    window.ReactNativeWebView.postMessage(JSON.parse(JSON.stringify(window.location)));
})();`;

export default class LinkedIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            sent: false,
            source:'',
            name:'',id:'',email:''
        }
        this._onLoad = this._onLoad.bind(this);
    }
    componentDidMount() {
        // console.log('this.props',this.props.navigation.state.params.source)
        this.setState({
            loading: true,
            source:this.props.navigation.state.params.source
        });
    }


    _onLoad(state) {
    
        console.log('state',state);
        var n = state.url.startsWith('https://www.spotjo.com/?code');
        if (n) {
                // console.log(state.url.split('='))
                let m = state.url.split('=');
                let g = m[1].split('&');
                console.log('g',g);
                // this.props.navigation.navigate('CompanyLogin',{
                //     code:g[0]
                // });
                let url = 'https://www.linkedin.com/oauth/v2/accessToken'
              let grant_type ='authorization_code'
              let redirect_uri='https://www.spotjo.com'
              let client_id = '78mifddvdhglgg'
              let client_secret='jr1l0ZHXFVWPgXig'

              let source = `${url}?grant_type=${grant_type}&code=${g[0]}&redirect_uri=${redirect_uri}&client_id=${client_id}&client_secret=${client_secret}`

              axios.post(source,{
                headers: {
                    'Content-Type': 'application/json' 
                  }
              }).then(function (res) {
                                //API response
                                console.log('resss',res.data.access_token);
                                axios.get('https://api.linkedin.com/v2/me',{
                                      headers : {
                                          'Content-Type': 'application/json',
                                          'Authorization': 'Bearer ' + res.data.access_token
                                      }
                                  }).then(function (response) {
                                                    //API response
                                                    console.log('tokengenerate',response.data);
                                                        userInfo = {
                                                            name:response.data.localizedFirstName + ' ' + response.data.localizedLastName,
                                                            id:response.data.id,
                                                        }
                                    axios.get('https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))',{
                                      headers : {
                                          'Content-Type': 'application/json',
                                          'Authorization': 'Bearer ' + res.data.access_token
                                        
                                      }
                                            }).then(function (responsive) {
                                                    //API response
                                                        userInfo = {
                                                            ...userInfo,
                                                            email:responsive.data.elements[0]['handle~'].emailAddress
                                                        }
                                                    
                                                    http.POST('api/company/social/login', {
                                                        socialuserId: userInfo.id,
                                                        name: userInfo.name,
                                                        email: userInfo.email,
                                                        latitude:global.let || 0,
                                                        longitude:global.long || 0
                                                    }).then((res) => {
                                                        if (res['data']['status']) {
                                                            isLoggedin = res['data']['result']['isLoggedFirstTime'];
                                                            console.log('response', res['data']['result'], res['data']['result']);
                                                            global.Id = res['data']['result']['id']
                                                            global.Email = res['data']['result']['email']
                                                            global.role = res['data']['result']['role'] == '2' || res['data']['result']['role'] == '3' ? 'Super Admin' : 'Staff'
                                                            AsyncStorage.setItem('CompanyLoggedInData', JSON.stringify(res['data']['result']));
                                                            sent = true;
                                                        // console.log('this.props',this.props);
                                                        } else {
                                                            snack(res['data']['message'])
                                                        }
                                                }), err => snack(err['message'])
                                                    
                                                })
                                                .catch(function (error) {
                                                    //API error
                                                    console.log('e',error);
                                                });
                                                   
                                                })
                                                .catch(function (error) {
                                                    //API error
                                                    console.log('e',error);
                                                });
                            })
                            .catch(function (error) {
                                //API error
                                console.log('e',error);
                            });
                    if (sent = true)
                    if (isLoggedin == 0) {
                        this.props.navigation.navigate('TalentCom');
                      } else {
                        this.props.navigation.navigate('ComEdit');
                      }
                            

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