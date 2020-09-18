import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, StatusBar, ScrollView, FlatList, TouchableWithoutFeedback, TouchableOpacity, ImageBackground, Text, Image, View, } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import styles from '../src/Style';
import { left, library, icon, play, leftVid } from '../src/IconManager';
import { themeColor, themeWhite, home, place, screen, edit, earth, dollor, user, bag, Background, sort, filter, TRANLINE } from '../Constant/index';
import { widthPercentageToDP as wp, heightPercentageToDP as hp, } from '../Component/responsive-ratio';
import { scale } from '../src/Util';
// import { Rating, AirbnbRating } from 'react-native-ratings';
import { Rating, NavigationHeader } from '../Component/ViewManager.js';
// import ItemMV from './ItemMV'
import Swiper from 'react-native-swiper';
import BasicInfoOfCompany from './BasicInfoOfCompany';
import JobDescription from './JobDescription';
import JobAboutCompany from './JobAboutCompany'

class JobCompanyProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            changedindex: 0
        }
    }

    Back = () => {
        this.props.navigation.goBack();
    };

    render() {
        // const {item} = global.item
        return global.item ? (
            <SafeAreaView style={styles.backGround}>
            <ImageBackground style={styles.ImageBlue}
            source = {Background}
            resizeMode={'stretch'}>
            <NavigationHeader onPress={() => this.Back()} text='Fresher Java Devloper'/>
            <Swiper
            onIndexChanged ={(index) => this.setState({
                changedindex: index == 0 ? 0 : 1
            })}
            dotColor={themeWhite}
            paginationStyle={{
                top: hp(-82),
                position: "absolute",
                opacity: this.state.changedindex
            }} >
            <View>
       <View style={styles.JoblistSecondViewHeading}>
            <View style={styles.JoblistSecondViewHeadingResult}>
            <Text style={styles.JoblistSecondViewHeadingText}>Results - 200</Text>
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
   <ImageBackground style={{

                width: wp('96%'),
                height: hp('100%') - (StatusBar.currentHeight + scale(100) + hp(5)),

            }} source={require('../Img/ract.png')} resizeMode={'stretch'}>
  <View style={styles.CompanyProfileImageSize}>
    <Image
            source={{
                uri: global.item.image,
            }}
            style={styles.imageStyle}
            resizeMode={'stretch'}
            />
  </View>
  <View style={styles.CompanyProfileSecongImage}>
    <Image
            source={{
                uri: global.item.image,
            }}
            style={styles.imageStyle}
            resizeMode={'stretch'}
            />
  </View>
  <View style={styles.CompanyProfileDetail}>
    <View style={styles.CompanyDetailIcon}>
      <View style={styles.CompanyDetailProfileIcon}>
        <Image source={home} style={styles.imageStyle} resizeMode={'contain'}/>
      </View>
      <Text style={styles.ItemDetailLabel1}>
        {global.item.ComPany_Name}
      </Text>
    </View>
    <View style={styles.CompanyDetailIcon}>
      <View style={styles.CompanyDetailProfileIcon}>
        <Image source={user} style={styles.imageStyle} resizeMode={'contain'}/>
      </View>
      <Text style={styles.ItemDetailLabel1}>{global.item.Working}</Text>
    </View>
    <View style={styles.CompanyDetailIcon}>
      <View style={styles.CompanyDetailProfileIcon}>
        <Image source={screen} style={styles.imageStyle} resizeMode={'contain'}/>
      </View>
      <Text style={styles.ItemDetailLabel1}>{global.item.Header}</Text>
    </View>
    <View style={styles.CompanyDetailIcon}>
      <View style={styles.CompanyDetailProfileIcon}>
        <Image source={edit} style={styles.imageStyle} resizeMode={'contain'}/>
      </View>
      <Text
            style={{
                marginLeft: scale(10),
            }}>
        {global.item.skill.map((item, index) => {
                return (
                    <Text key={index}
                    style={{
                        fontSize: scale(18),
                        fontFamily: 'Roboto-Regular',
                    }}>
              {item} /
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
        {global.item.work_Experience} / 
      </Text>
      <Text style={styles.CompanyProfileDetailLabel100}> 100%</Text>
    </View>
    <View style={styles.CompanyDetailIcon}>
      <View style={styles.CompanyDetailProfileIcon}>
        <Image source={place} style={styles.imageStyle} resizeMode={'contain'}/>
      </View>
      <Text style={styles.ItemDetailLabel1}>
        {global.item.Address} /
      </Text>
      <Text style={styles.CompanyProfileDetailLabel100}> 100%</Text>
    </View>
    <View style={styles.CompanyDetailIcon}>
      <View style={styles.CompanyDetailProfileIcon}>
        <Image source={dollor} style={styles.imageStyle} resizeMode={'contain'}/>
      </View>
      <Text style={styles.ItemDetailLabel1}>{global.item.salary}</Text>
    </View>
    <View style={styles.CompanyDetailIcon}>
      <View style={styles.CompanyDetailProfileIcon}>
        <Image source={earth} style={styles.imageStyle} resizeMode={'contain'}/>
      </View>
      <Text style={styles.ItemDetailLabel1}>{global.item.webSite}</Text>
    </View>
  </View>
</ImageBackground>
        </ScrollView>

      
        
        
        </View>
            </View>
            <View><BasicInfoOfCompany /></View>
            <View><JobDescription /></View>
            <View><JobAboutCompany /></View>
            </Swiper>
            <View style={styles.TranLingImage}>
             <Image
            source={TRANLINE}
            style={styles.imageStyle}
            resizeMode={'stretch'}
            /></View>
        </ImageBackground>
      </SafeAreaView>
            ) : null
    }
}

export default withNavigationFocus(JobCompanyProfile);