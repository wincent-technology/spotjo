import React, {PureComponent} from 'react';
import {
  StatusBar,
  ImageBackground,
  View,
  ActivityIndicator,
} from 'react-native';
import {withNavigationFocus, NavigationEvents} from 'react-navigation';
import styles from '../src/Style';

import {themeColor, themeWhite, Background} from '../Constant/index';
import {NoData} from '../src/Util';
import {NavigationHead} from '../Component/ViewManager.js';
import http from '../api';

import ItemMVJobb from './ItemMVJobb';
import List from '../Component/List';

class Resource extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      load: false,
    };
  }

  checking = () => {
    http
      .POST('api/webuser/resume/get', {
        comId: global.Id,
      })
      .then((res) => {
        if (res['data']['status']) {
          console.log('res', res['data']['result']);
          this.setState({
            load: true,
            data: res['data']['result'],
          });
        } else {
          console.log('res[data]', res);
        }
      })
      .catch((err) => console.log(err));
  };

  Back = () => this.props.navigation.goBack();

  render() {
    if (!this.state.load)
      return <View style={{flex:1,justifyContent:"center"}}><NavigationEvents onDidFocus={this.checking} /><ActivityIndicator size={'large'} color={themeColor} /></View>;
    else
      return (
        <View style={styles.backGround}>
          <StatusBar hidden={false} backgroundColor={themeWhite} />
          <NavigationEvents onDidFocus={this.checking} />
          <ImageBackground
            style={styles.ImageBlue}
            tintColor={themeWhite}
            source={Background}
            resizeMode={'stretch'}>
            <NavigationHead
              centerComponent="Resource Profile"
              rightComponent="Exit"
              onPress={() => this.Back()}
            />
            {this.state.data.length ? (
              <List
                style={{
                  marginTop: 4,
                  marginBottom: 45,
                  backgroundColor: 'transparent',
                }}
                data={this.state.data}
                renderItem={({item, index}) => (
                  <ItemMVJobb
                    item={item}
                    index={index}
                    push={this.push}
                    Video={this.Video}
                  />
                )}
              />
            ) : (
              <NoData />
            )}
          </ImageBackground>
        </View>
      );
  }
}

export default withNavigationFocus(Resource);
