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



class CompanyProfile extends Component {
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
    return data != '' ? (
      <SafeAreaView style={styles.backGround}>

            <NavigationEvents onDidFocus={this.checking}/>
          
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
  <Swipers
            scrollEnabled={true}
            showsPagination={false}
            onIndexChanged ={(index) => console.log('index',index)}
            ref={'swiper'}
            index={this.state.changedindex}
           >
   <ScrollView>
   
            <View>
   <ImageBackground style={{

                width: wp('96%'),
                height: hp('100%') - (StatusBar.currentHeight + scale(100) + hp(5)),
                overflow: 'hidden'
            }} source={require('../Img/ract.png')} resizeMode={'stretch'}>
  <View style={styles.CompanyProfileImageSize}>
    <Image
            source = {data.logo ? {
                uri: url + 'images/company/' + data.logo
            } :
                Companyavtar
            }
            style={styles.imageStyle}
            resizeMode={'stretch'}
            />
  </View>
  <View style={styles.CompanyProfileSecongImage}>
    <Image
            source = {data.logo ? {
                uri: url + 'images/company/' + data.logo
            } :
                Companyavtar
            }
            style={styles.imageStyle}
            resizeMode={'cover'}
            />
  </View>
  <View style={styles.CompanyProfileDetail}>
    <View style={styles.CompanyDetailIcon}>
      <View style={styles.CompanyDetailProfileIcon}>
        <Image source={home} style={styles.imageStyle} resizeMode={'contain'}/>
      </View>
      <Text style={styles.ItemDetailLabel1}>
        {data.name}
      </Text>
    </View>
    <View style={styles.CompanyDetailIcon}>
      <View style={styles.CompanyDetailProfileIcon}>
        <Image source={user} style={styles.imageStyle} resizeMode={'contain'}/>
      </View>
      <Text style={styles.ItemDetailLabel1}>{data.isEmployed ? <Text>Employed</Text> : <Text>Fresher</Text>}</Text>
    </View>
    <View style={styles.CompanyDetailIcon}>
      <View style={styles.CompanyDetailProfileIcon}>
        <Image source={screen} style={styles.imageStyle} resizeMode={'contain'}/>
      </View>
      <Text style={styles.ItemDetailLabel1}>{data.title}</Text>
    </View>
    <View style={styles.CompanyDetailIcon}>
      <View style={styles.CompanyDetailProfileIcon}>
        <Image source={edit} style={styles.imageStyle} resizeMode={'contain'}/>
      </View>
      <Text
            style={{
                marginLeft: scale(10),
                marginTop:scale(-2)
            }}>
        {data != '' && data.skills.map((item, index) => {
                return (
                    <Text key={index}
                    style={styles.ItemDetailLabel1}>
              {item.name} /
            </Text>
                );
            })}
      </Text>
      <Text style={styles.CompanyProfileDetailLabel100}> 100%</Text>
    </View>
    <View style={styles.CompanyDetailIcon}>
      <View style={styles.CompanyDetailProfileIcon}>
         <Image source={bag} style={styles.imageStyle} resizeMode={'contain'}/>
      </View>
      <Text style={styles.ItemDetailLabel1}>
        {data.minExp} - {data.maxExp} Years / 
      </Text>
      <Text style={styles.CompanyProfileDetailLabel100}> 100%</Text>
    </View>
    <View style={styles.CompanyDetailIcon}>
      <View style={styles.CompanyDetailProfileIcon}>
        <Image source={place} style={styles.imageStyle} resizeMode={'contain'}/>
      </View>
      <Text style={styles.ItemDetailLabel1}>
        {data.city} /
      </Text>
      <Text style={styles.CompanyProfileDetailLabel100}> 100%</Text>
    </View>
    <View style={styles.CompanyDetailIcon}>
      <View style={styles.CompanyDetailProfileIcon}>
        <Image source={dollor} style={styles.imageStyle} resizeMode={'contain'}/>
      </View>
      <Text style={styles.ItemDetailLabel1}>{data.salMin} - {data.salMax},000$</Text>
    </View>
    <View style={styles.CompanyDetailIcon}>
      <View style={styles.CompanyDetailProfileIcon}>
        <Image source={earth} style={styles.imageStyle} resizeMode={'contain'}/>
      </View>
      <Text style={styles.ItemDetailLabel1}>{data.website}</Text>
    </View>
  </View>
</ImageBackground>
</View>
        </ScrollView>
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
        </Swipers>
        </View>
         <View style={styles.TranLingImage}>
             <Image
            source={TRANLINE}
            style={styles.imageStyle}
            resizeMode={'stretch'}
            /></View>
        </ImageBackground>
        
      </SafeAreaView>
    ) : <SafeAreaView style={styles.backGround}>
            <ImageBackground style={[styles.ImageBlue, {
                justifyContent: "center",
                alignItems: "center"
            }]}
            source = {Background}
            resizeMode={'stretch'}><ActivityIndicator size="large" color="#fff" /><NavigationEvents onDidFocus={this.checking}/>
            <View style={styles.TranLingImage}>
             <Image
            source={TRANLINE}
            style={styles.imageStyle}
            resizeMode={'stretch'}
            /></View></ImageBackground></SafeAreaView>;
  }
}

export default withNavigationFocus(CompanyProfile);