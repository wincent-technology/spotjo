import React, {
  Component
} from 'react';

import {
  StyleSheet,
  View,
  Platform
} from 'react-native';
import {
  WebView
} from 'react-native-webview';

export default class Youtube extends Component {
  render() {
    return (
      <View style={{flex: 1, height: 300}}>
        <WebView
          style={styles.WebViewContainer}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          source={{
            uri:
              'https://www.youtube.com/embed?v=jnLSYfObARA&list=PLGmxyVGSCDKvmLInHxJ9VdiwEb82Lxd2E',
          }}
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