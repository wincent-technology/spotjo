import React, {
    Component
  } from 'react';
  
  import {
    StyleSheet,
    View,
    Platform,TouchableWithoutFeedback
  } from 'react-native';
  import {
    WebView
  } from 'react-native-webview';
  import {scale} from '../src/Util'
  import Icon2 from 'react-native-vector-icons/dist/MaterialIcons';
  const INJECTED_JAVASCRIPT = `(function() {
    window.ReactNativeWebView.postMessage(JSON.stringify(window.location));
  })();`;
  
  export default class CompanyService extends Component {

    constructor (props){
        super(props)
    }

    render() {
      console.log('global',global.WebSite)
      return (
        <View style={{flex: 1, height: 300}}>
        <View
            style={{
              zIndex: 1,
              top: scale(20),
              left: scale(15),
              height: scale(25),
              width: scale(25),
              position: 'absolute',backgroundColor:"#eee",justifyContent:"center",alignItems:"center"
            }}>
            <TouchableWithoutFeedback
              onPress={() => this.props.navigation.navigate('UserProfile')}>
              <View
                style={{
                  height: scale(25),
                  width: scale(25),
                  zIndex: 1,
                  justifyContent:"center",alignItems:"center"
                }}
                hitSlop={{
                  top: 15,
                  bottom: 15,
                  left: 15,
                  right: 15,
                }}>
                <Icon2 name={'clear'} size={scale(20)} color={'#000'} />
              </View>
            </TouchableWithoutFeedback>
          </View>
          <WebView
            style={styles.WebViewContainer}
            javaScriptEnabled={true}
            injectedJavaScript=
                    {INJECTED_JAVASCRIPT}
                    onMessage={this.onMessage}
            domStorageEnabled={true}
            source={{
              uri: 'https://' + global.WebSite || 'https://www.wikipedia.com',
                // 'https://www.youtube.com/embed?v=jnLSYfObARA&list=PLGmxyVGSCDKvmLInHxJ9VdiwEb82Lxd2E',
            }}
            mediaPlaybackRequiresUserAction={((Platform.OS !== 'android') || (Platform.Version >= 17)) ? false : undefined}
  userAgent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36"
          />
        </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
    WebViewContainer: {
      marginTop: Platform.OS == 'ios' ? 20 : 0,
    },
  });
  
  {/* <iframe width="560" height="315" src="https://www.youtube.com/embed/5d8uRJ2kAeU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}