import React, {
    PureComponent
  } from 'react';
  import {
    SafeAreaView,
    StyleSheet,
    StatusBar,
    FlatList,
    TouchableWithoutFeedback,
    TouchableOpacity,
    ImageBackground,
    Text,
    Image,
    View,
  } from 'react-native';
  import {
    withNavigationFocus,NavigationEvents
  } from 'react-navigation';
  import styles from '../src/Style';
  import {
    left,
    library,
    icon,
    play,
    leftVid
  } from '../src/IconManager';
  import {
    themeColor,
    themeWhite,
    Background,
    sort,
    filter,
    TRANLINE,
    overlayimage,Fulls,createJ
  } from '../Constant/index';
  import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from '../Component/responsive-ratio';
  import {
    scale, snack,NoData
  } from '../src/Util';
  // import { Rating, AirbnbRating } from 'react-native-ratings';
  import {
    Rating,
    NavigationHead
  } from '../Component/ViewManager.js';
import http from '../api';

  // import ItemMV from '../src/ItemMV';
  import DeviceInfo from 'react-native-device-info';
  import JobListCompany from './JobListCompany';
  import JobMatches from './JobMatches';
  import ItemMVJobb from './ItemMVJobb';
  import Texting from '../Constant/Text'
  import List from '../Component/List'

  class Resource extends PureComponent {
    constructor(props) {
      super(props);
  
      this.state = {
        data: [],
      };
    }

    checking = () => {
        http.POST('api/webuser/resume/get', {
            comId: global.Id
        }).then((res) => {
            if (res['data']['status']) {
                console.log('res',res['data']['result'])
        this.setState({
          data: res['data']['result'],
        });
    }
    else {
        console.log('res[data]',res)
    }
      }).catch(err => console.log(err))

    }

    Back = () => this.props.navigation.goBack()
    
    render() {
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
              centerComponent="Admin Dashboard"
              rightComponent="Exit"
              onPress={() => this.Back()}
            />
              {this.state.data.length ? (
        <List style={{marginTop: 4,
                marginBottom: 45,
                backgroundColor: 'transparent',}} data={this.state.data} renderItem={({item, index}) => (
                <ItemMVJobb
                  item={item}
                  index={index}
                  push={this.push}
                  Video={this.Video}
                />
              )} />
          ) : (
            <NoData />
          )}
          </ImageBackground>
        </View>
      );
    }
  }
  
  export default withNavigationFocus(Resource);