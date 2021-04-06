import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  ScrollView,
  FlatList,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ImageBackground,
  Text,
  Image,
  View,
  ActivityIndicator,
} from 'react-native';
import {withNavigationFocus, NavigationEvents} from 'react-navigation';
import styles from './Style';
import {left, library, icon, play, leftVid} from './IconManager';
import {
  themeColor,
  themeWhite,
  place,
  screen,
  edit,
  earth,
  dollor,
  user,
  bag,
  Background,
  sort,
  filter,
  TRANLINE,
  url,
  Companyavtar,
  FontBold,
} from '../Constant/index';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../Component/responsive-ratio';
import {scale} from './Util';
// import { Rating, AirbnbRating } from 'react-native-ratings';
import {Rating, NavigationHeader} from '../Component/ViewManager.js';
// import ItemMV from './ItemMV'
import Swipers from 'react-native-swiper';
import Texting from '../Constant/Text'
import TopHeader from '../Component/TopHeader'
import * as Animatable from 'react-native-animatable';
class CompanyProfiles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
    };
  }

  checking = () => {
    // console.log('hey')
    this.props.navigation.navigate('LoginFirst')

  };
  Back = () => {
    console.log('global.all>>>>>>>>>>>>', global.all);
    this.props.navigation.goBack();
  };

  

  render() {
    const {data} = this.state;
    return (
      <SafeAreaView style={styles.backGround}>
        <NavigationEvents onDidFocus={this.checking} />
        <ImageBackground
        tintColor={themeWhite}
          style={styles.ImageBlue}
          source={Background}
          resizeMode={'stretch'}>
          {/* <NavigationHeader onPress={() => this.Back()} text={data.title} /> */}
         {/* <TopHeader data={data && data.length} /> */}
          <View style={[styles.CompanyProfileMainImage1],{flex:1}}>
          <TouchableWithoutFeedback onPress={()=> this.props.navigation.navigate('LoginFirst')}><Animatable.View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flex: 1,
                  // height:
                    // hp('100%') - (StatusBar.currentHeight + scale(100)),
                }} animation="pulse" easing="ease-out" duration = {1500} useNativeDriver={true} iterationCount="infinite">
                <Texting
                  style={{
                    textAlign: 'center',
                    fontFamily: FontBold,
                    color: themeColor,
                    fontSize: scale(18),
                    width: wp(60),
                  }} text='Please_login_to_our_app' />
              </Animatable.View></TouchableWithoutFeedback>
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

export default withNavigationFocus(CompanyProfiles);
