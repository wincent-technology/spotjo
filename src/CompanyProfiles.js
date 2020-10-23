import React, {
  Component
} from 'react';
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
  ActivityIndicator
} from 'react-native';
import {
  withNavigationFocus,
  NavigationEvents
} from 'react-navigation';
import styles from './Style';
import {
  left,
  library,
  icon,
  play,
  leftVid
} from './IconManager';
import {
  themeColor,
  themeWhite,
  home,
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
  FontBold
} from '../Constant/index';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../Component/responsive-ratio';
import {
  scale
} from './Util';
// import { Rating, AirbnbRating } from 'react-native-ratings';
import {
  Rating,
  NavigationHeader
} from '../Component/ViewManager.js';
// import ItemMV from './ItemMV'
import Swipers from 'react-native-swiper';



class CompanyProfiles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: ''
    }
  }

  checking = () => {
    // console.log('hey')
    const {
      params
    } = this.props.navigation.state;
    const item = params ? params.item : null;
    // console.log('other item', item);
    this.setState({
      data: item != undefined || '' ? item : ''
    })
  }
  Back = () => {
    console.log('global.all>>>>>>>>>>>>', global.all)
    this.props.navigation.goBack();
  };


  render() {
    const {
      data
    } = this.state
    return (
      <SafeAreaView style={styles.backGround}>
            <ImageBackground style={styles.ImageBlue}
            source = {Background}
            resizeMode={'stretch'}>
            <NavigationHeader onPress={() => this.Back()} text={data.title}/>
       <View style={styles.JoblistSecondViewHeading}>
            <View style={styles.JoblistSecondViewHeadingResult}>
            <Text style={styles.JoblistSecondViewHeadingText}>Results - {data.length}</Text>
           </View>
            <View style={styles.JobListUpperButtonView}><TouchableWithoutFeedback>
            <View style={[{
                marginRight: scale(15)
            }, styles.JobListUpperButtonIcon]}>
            <Image source ={sort} style={{
                height: scale(20),
                width: scale(16)
            }} resizeMode={'contain'}/>
            <Text style={styles.JoblistUpperButton}>Sort</Text>
            </View>
            </TouchableWithoutFeedback>
             <TouchableWithoutFeedback onPress={this.Filter}>
            <View style={styles.JobListUpperButtonIcon}>
            <Image source ={filter} style={{
                height: scale(19),
                width: scale(14),
                marginTop: scale(1)
            }} resizeMode={'contain'}/>
            <Text style={styles.JoblistUpperButton}>Filter</Text>
            </View>
            </TouchableWithoutFeedback>
   </View></View><View style={styles.CompanyProfileMainImage1}>
  
   <ScrollView>
  <View  style = {{
                    justifyContent: "center",
                    alignItems: "center",
                    // flex: 1,
                  height: hp('100%') - (StatusBar.currentHeight + scale(100) + hp(5)),
                }}>
            <Text style={{
                    textAlign: 'center',
                    fontFamily: FontBold,
                    color: themeWhite,
                    fontSize: scale(18),
                    width: wp(60)
                }}>Please login to our app</Text>
            </View>
        </ScrollView>
        </View>
         <View style={styles.TranLingImage}>
             <Image
            source={TRANLINE}
            style={styles.imageStyle}
            resizeMode={'stretch'}
            /></View>
        </ImageBackground>
      </SafeAreaView>
    )
  }
}

export default withNavigationFocus(CompanyProfiles);