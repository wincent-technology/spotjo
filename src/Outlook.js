import React, { Component } from 'react';
import { View, Platform, Text,Alert } from 'react-native';
import {WebView} from 'react-native-webview';
import axios from 'axios';
let userInfo = {}
import http from '../api';
import AsyncStorage from '@react-native-community/async-storage';
import { scale, snack } from './Util';
let sent = false;
// let isLoggedin : 0;
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
        console.log('this.props',this.props.navigation.state.params.event)
        this.setState({
            loading: true,
            source:this.props.navigation.state.params.source,
            event:this.props.navigation.state.params.event
        });
    }


    _onLoad(state) {
        const event = this.state.event
        console.log('state',state);
        var n = state.url.startsWith('https://login.microsoftonline.com/common/oauth2/nativeclient?code=');
        if (n) {
                let m = state.url.split('=');
                let g = m[1].split('&');
                let url = 'https://login.microsoftonline.com/common/oauth2/v2.0/token?scope=user.read%20mail.read%20Calendars.ReadWrite'
              let source = url
              const params = new URLSearchParams()
              params.append('grant_type', 'authorization_code')
              params.append('redirect_uri', 'https://login.microsoftonline.com/common/oauth2/nativeclient')
              params.append('client_id', '78055508-f184-40cd-bc71-56a8d908ce16')
              params.append('code', g[0])
              const config = {
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
                }
              }
              axios.post(source,params,config).then(function (res) {
                                console.log('Access Token',res.data.access_token);
                                axios.get('https://graph.microsoft.com/v1.0/me',{
                                      headers : {
                                          'Content-Type': 'application/json',
                                          'Authorization': 'Bearer ' + res.data.access_token
                                      }
                                  }).then(function (response) {
                                      console.log("response>>>>>>>>>>>>>>>>",response.data,res.data.access_token)
                                          let s =`https://graph.microsoft.com/v1.0/me/calendar/events`
                                          let c = {
                                            headers : {
                                                'Content-Type': 'application/json',
                                                'Authorization': 'Bearer ' + res.data.access_token
                                            }
                                          }
                                          axios.post(s,event,c).then(function (res) {
                                              console.log('ressssssssssssssmi>',res);
                                              Alert.alert(
                                                "Microsoft Outlook",
                                                "Your Event is Created",
                                                [
                                                  {
                                                    text: "Cancel",
                                                    onPress: () => {},
                                                    style: "cancel",
                                                  },
                                                  { text: "OK", onPress: () => sent=true }
                                                ],
                                                {
                                                  cancelable: true,
                                                  onDismiss: () => {}
                                                 }
                                              );

                                          }).catch(e => console.log('errrr',JSON.stringify(e)));


                                  }).catch(e => console.log('e>>>>>> error 114',e))
                            })
                            .catch(function (error) {
                                //API error
                                console.log('e>>>>>>>>>>>> error Last 118',JSON.stringify(error));
                            });

                            if (sent = true)
                                this.props.navigation.goBack();
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