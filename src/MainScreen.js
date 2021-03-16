/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {
  Component
} from 'react';
import {
  Dimensions,
  StyleSheet,
  Platform,
  View,
  SafeAreaView,
  Text,
  StatusBar,
  PermissionsAndroid,
  ImageBackground,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity
} from 'react-native';
  // import Text from '../Constant/Text'

// import Icon from 'react-native-vector-icons/Ionicons';
import {
  withNavigationFocus
} from 'react-navigation';
import styles from './Style';
import {
  scale,
  snack
} from './Util';
import {
  play
} from '../src/IconManager';
import {
  Background,
  themeColor
} from '../Constant/index';
import LanguageProvider, { LanguageContext } from '../Constant/LanguageContext';

import Geolocation from '@react-native-community/geolocation';
import RNNotchInfo from 'react-native-notch-info';

class MainScreen extends Component {
  constructor(props) {
    super(props);

    // this.state = {};
  }

  talent = async () => {
    RNNotchInfo.hasNotch((hasNotch) => console.log('hasnotch', hasNotch))
    // this.props.navigation.navigate('TalentScreen');

    // try {
    //   const granted = await PermissionsAndroid.request(
    //     PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    //   );
    //   if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //     console.log('???', granted);
    //     Geolocation.getCurrentPosition(
    //       (info) => {
    //         console.log('inf', info);
    //         global.let = info.coords.latitude;
    //         global.long = info.coords.longitude;
    //         this.props.navigation.navigate('TalentScreen');
    //       },
    //       (err) => {
    //         snack('Please Enable Location');
    //       },
    //     );
    //   } else {
    //     snack('Location permission denied');
    //   }
    // } catch (err) {
    //   console.log('>>>>>>>', err);
    // }
  };
  Opportunities = async () => {
    // try {
    //   const granted = await PermissionsAndroid.request(
    //     PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    //   );
    //   console.log('???', granted);
    //   if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //     console.log('???', granted);

    //     Geolocation.getCurrentPosition(
    //       (info) => {
    //         console.log('inf', info);
    //         global.let = info.coords.latitude;
    //         global.long = info.coords.longitude;
    // DevSettings.reload()
            this.props.navigation.navigate('TalentScreen');
            
    //       },
    //       (err) => {
    //         snack('Please Enable Location');
    //       },
    //     );
    //   } else {
    //     snack('Location permission denied');
    //   }
    // } catch (err) {
    //   console.log('>>>>>>>', err);
    // }
  };

  Login = async () => {
    // try {
    //   const granted = await PermissionsAndroid.request(
    //     PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    //   );
    //   console.log('???', granted);
    //   if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //     Geolocation.getCurrentPosition((info) => {
    //       console.log('inf', info);
    //       global.let = info.coords.latitude;
    //       global.long = info.coords.longitude;
    //     });
        this.props.navigation.navigate('LoginFirst');
    //   } else {
    //     snack('Location permission denied');
    //   }
    // } catch (err) {
    //   console.log('>>>>>>>', err);
    // }
  };

  playVideo = () => {
    this.props.navigation.navigate('Youtube');
  };
  create = () => {
    this.props.navigation.navigate('NoAccount');
  };

  render() {
    return (
      <SafeAreaView style={styles.backGround}>
        <ImageBackground
          style={styles.ImageBlue}
          source={Background}
          resizeMode={'stretch'}>
          <StatusBar hidden={true} />
          <TouchableOpacity style={styles.Homeplay} onPress={this.playVideo}>
            <Text
              style={[
                {
                  fontSize: 15,
                },
                styles.Hometext,
              ]}>
              Play Now
            </Text>
            <View style={styles.MainScreenPlayLogo}>
              {play('logo-youtube', scale(20), '#37c0d3')}
            </View>
          </TouchableOpacity>
          <View
            style={[
              styles.Homelogin,
              {
                borderBottomWidth: scale(0.5),
                borderBottomColor: 'white',
                paddingBottom: scale(0.5),
              },
            ]}>
            <TouchableWithoutFeedback onPress={this.Login}>
              <Text
                style={[
                  {
                    fontSize: scale(20),
                    fontWeight: 'bold',
                  },
                  styles.Hometext,
                ]}>
                Login
              </Text>
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.HomeLogo}>
            <Image
              source={require('../Img/logo-spotjo.png')}
              resizeMode={'contain'}
              style={styles.imageStyle}
            />
          </View>
          
          <View style={styles.HomebutGuest}>
            <TouchableWithoutFeedback
              style={styles.OpportunityView}
              onPress={this.Opportunities}>
              <View style={styles.TalentView}>
                <Text style={styles.OppoTalentText}>Guest</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.CompanyLoginAccountText}>
            <Text
              style={[
                {
                  fontSize: scale(23),
                },
                styles.FontSty,
              ]}>
              Don't Have Account?
            </Text>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Text
                style={[
                  {
                    fontSize: scale(19),
                  },
                  styles.FontSty,
                ]}>
                Create new account{' '}
              </Text>
              <TouchableWithoutFeedback onPress={this.create}>
                <Text
                  style={[
                    {
                      textDecorationLine: 'underline',
                      // textDecorationColor: "#fff",
                      fontSize: scale(19),
                    },
                    styles.FontSty,
                  ]}>
                  Click here
                </Text>
              </TouchableWithoutFeedback>
            </View>
          </View>
         
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

export default withNavigationFocus(MainScreen);



// <View style={styles.Homelooking}>
//             <Text style={styles.LookingFor}>Looking for</Text>
//           </View>
{/* <View style={styles.HomeTel}>
<TouchableWithoutFeedback
  style={styles.OpportunityView}
  onPress={this.talent}>
  <View style={styles.TalentView}>
    <Text style={styles.OppoTalentText}>Talent</Text>
  </View>
</TouchableWithoutFeedback>
</View> */}