import React, { Component } from 'react';
import { SafeAreaView, StatusBar, ImageBackground, FlatList, Text, Image, View, ScrollView } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import styles from '../src/Style'
import { left, leftVid } from '../src/IconManager';
import { scale } from '../src/Util'
import { themeColor, themeWhite, TRANLINE, editTheme, iconSearch } from '../Constant/index'
import { Rating, NavigationHead, DropDownItem } from '../Component/ViewManager'
import CustomButton from '../Component/Button'
import CustomInput from '../Component/Input'
import Slider from '@react-native-community/slider';

import { widthPercentageToDP as wp, heightPercentageToDP as hp, } from '../Component/responsive-ratio';
import { FontBold, FontRegular, Background } from '../Constant/index'
import ItemMV from './ItemMV'


class AddskilJob extends Component {
    constructor(props) {
        super(props);

        this.state = {
            addSkill: ['J2EE', 'SQL,Mysql', 'Java'],
        };
    }

    static navigationOptions = ({navigation}) => ({
        tabBarVisible: true,
        animationEnabled: true
    })
    Back = () => {
        // console.log("hi");
        this.props.navigation.goBack()
    }
    save = () => {
        // alert('video is coming soon');
        this.props.navigation.navigate('JobEditProfile');
    }
    Personal = () => {
        this.props.navigation.navigate('Personal');
    }
    addsSkill = (text) => {
        var i = text;
        let gems = this.state.addSkill
        // var in =  this.state.addSkill; 
        gems.push(i);
        this.setState({
            addSkill: gems
        });
        console.log('adskil', this.state.addSkill);
    }


    render() {
        const {Hourly, Monthly, Yearly} = this.state
        return (
            <SafeAreaView style={styles.backGround}>
            <ImageBackground style={styles.ImageBlue}
            source={Background}
            resizeMode={'stretch'}>
                <StatusBar hidden={true} />
            <NavigationHead centerComponent='Skills' rightComponent="Save" onPress={() => this.Back()} onExit={() => this.save()}/>
                    <ImageBackground style={{
                width: wp('96%'),
                marginHorizontal: wp(2),
                height: hp('100%') - (StatusBar.currentHeight + 100 + hp(5)),
                top: wp(15)
            }} source={require('../Img/ract.png')} resizeMode={'stretch'}>
            <View style={{
                justifyContent: "flex-end",
                flexDirection: 'column',
                height: wp(22),
                width: wp(35),
                borderRadius: scale(20),
                borderColor: themeColor,
                borderWidth: wp(0.6),
                alignItems: "center",
                backgroundColor: themeWhite,
                left: wp(30.5),
                top: wp(-11),
            }}><View><Image source={editTheme} style={{
                height: scale(60),
                width: scale(60)
            }} resizeMode={'contain'}/></View></View>
            <View style={{
                alignItems: "center",
                top: hp(-5)
            }}><Text style={{
                color: '#000',
                fontWeight: 'bold',
                fontSize: scale(18),
                fontFamily: FontBold
            }}>Edit Skills</Text></View>
            <ScrollView style={{
                alignSelf: 'stretch',
            }} nestedScrollEnabled={true}>
          <View style={{
                width: '90%',
                alignItems: "center",
                alignSelf: "center",
                top: hp(0),
                height: hp('19%'),
                backgroundColor: themeWhite,
                marginHorizontal: wp('1%'),
                borderRadius: scale(20),
            }}>
           <CustomInput placeholder = {'Add Skill'} textChange = {(text) => this.setState({
                name: text
            })} inputContainerStyle={{
                height: scale(40),
                backgroundColor: themeColor,
                // width: "100%",
                borderColor: themeColor,
                borderWidth: scale(1),
                borderRadius: scale(5),
            }} inputStyle={{
                color: 'white',
                fontSize: scale(18),
                fontFamily: "Roboto-Bold",
                fontWeight: "bold"
            }}
            containerStyle={{
                width: wp(85)
            }}
            placeholderTextColor={themeWhite}
            iconName={iconSearch}
            iconStyle={{
                height: 25,
                width: 25
            }}
            onSubmitEditing={(event) => this.addsSkill(event.nativeEvent.text)}
            /><ScrollView  style={{
                marginTop: '-5%',
                marginBottom: 20,
                height: scale(50),
            }} contentContainerStyle={{
                alignItems: "center",
                justifyContent: "center",
                width: wp(85)
            }} nestedScrollEnabled={true}>
            {this.state.addSkill.map((item, index) => {
                return (
                    <View style={{
                        flexDirection: 'row',
                        width: wp(85),
                        justifyContent: "center",
                        marginBottom: scale(2),
                        // marginLeft: '3%',
                        height: scale(15)
                    }}><View style={{
                        alignItems: "flex-start",
                        justifyContent: "center",
                        width: '35%'
                    }}><Text key={index}
                    style={{
                        fontSize: scale(16),
                        color: themeColor,
                        fontFamily: 'Roboto-Regular',
                    }}>
                      {item}
                    </Text></View><View style={{
                        alignItems: "flex-end",
                        justifyContent: "center",
                        width: '35%'

                    }}><Rating
                    type='custom'
                    imageSize={18}
                    ratingCount={5}
                    defaultRating={20}
                    readonly={false}
                    ratingBackgroundColor='transparent'
                    startingValue={0}
                    // ratingColor={"#f1ee40"}
                    // tintColor={themeWhite}
                    /></View></View>
                )
            })}
            </ScrollView></View>
            <View style={{
                width: '90%',
                alignItems: "center",
                alignSelf: "center",
                top: hp(-5),
                height: hp('17%'),
                backgroundColor: themeWhite,
                marginHorizontal: wp('2%'),
                // marginTop: scale(20),
                borderRadius: scale(20),
            // elevation: 7,
            }}>
           <CustomInput placeholder = {'Add Salary Range'} textChange = {(text) => this.setState({
                name: text
            })} inputContainerStyle={{
                height: scale(40),
                backgroundColor: themeColor,
                // width: "100%",
                borderColor: themeColor,
                borderWidth: scale(1),
                borderRadius: scale(5),
            }} inputStyle={{
                color: 'white',
                fontSize: scale(18),
                fontFamily: "Roboto-Bold",
                fontWeight: "bold"
            }}
            containerStyle={{
                width: wp(85)
            }}
            placeholderTextColor={themeWhite}
            iconName={iconSearch}
            onSubmitEditing={(event) => this.addsSkill(event.nativeEvent.text)}
            /><ScrollView  nestedScrollEnabled={true} style={{
                marginTop: '-5%',
                marginBottom: 20,
                height: scale(50),
            }} contentContainerStyle={{
                alignItems: "center",
                justifyContent: "center",
                width: wp(85)
            }} nestedScrollEnabled={true}>
            <View style={{
                width: wp('85%'),
                height: scale(27),
            }}><View style={styles.FilterMinimumSalaryMin}><Text style={styles.FilterMinText}>0</Text>
            <Text style={styles.FilterMaxText}>150k+</Text></View><Slider
            style={{
                width: wp('85%'),
                height: scale(5),
                flex: 1,
                alignSelf: 'center',
            }}
            minimumValue={0}
            maximumValue={1}
            minimumTrackTintColor={themeColor}
            maximumTrackTintColor={themeColor}
            /></View>
                    <View style={{
                flexDirection: 'row',
                width: wp(85),
                justifyContent: "center",
                marginBottom: scale(2),
                // marginLeft: '3%',
                height: scale(15)
            }}>
            <View style={{
                alignItems: "flex-start",
                justifyContent: "center",
                width: '35%'
            }}><Text
            style={{
                fontSize: scale(16),
                color: themeColor,
                fontFamily: 'Roboto-Regular',
            }}>
                      Salary Rating
                    </Text></View><View style={{
                alignItems: "flex-end",
                justifyContent: "center",
                width: '35%'

            }}><Rating
            type='custom'
            imageSize={18}
            ratingCount={5}
            defaultRating={20}
            readonly={false}
            ratingBackgroundColor='transparent'
            startingValue={0}
            // ratingColor={"#f1ee40"}
            // tintColor={themeWhite}
            /></View></View>
            </ScrollView></View>
            <View style={{
                width: '90%',
                alignItems: "center",
                alignSelf: "center",
                top: hp(-7),
                height: hp('20%'),
                backgroundColor: themeWhite,
                marginHorizontal: wp('2%'),
                // marginTop: scale(20),
                borderRadius: scale(20),
            // elevation: 7,
            }}>
           <CustomInput placeholder = {'Add Education'} textChange = {(text) => this.setState({
                name: text
            })} inputContainerStyle={{
                height: scale(40),
                backgroundColor: themeColor,
                // width: "100%",
                borderColor: themeColor,
                borderWidth: scale(1),
                borderRadius: scale(5),
            }} inputStyle={{
                color: 'white',
                fontSize: scale(18),
                fontFamily: "Roboto-Bold",
                fontWeight: "bold"
            }}
            containerStyle={{
                width: wp(85)
            }}
            placeholderTextColor={themeWhite}
            iconName={iconSearch}
            onSubmitEditing={(event) => this.addsSkill(event.nativeEvent.text)}
            /><ScrollView  nestedScrollEnabled={true} style={{
                marginTop: '-5%',
                marginBottom: 40,
                height: scale(50),
            }} contentContainerStyle={{
                alignItems: "center",
                justifyContent: "center",
                width: wp(85)
            }} nestedScrollEnabled={true}>
            {this.state.addSkill.map((item, index) => {
                return (
                    <View style={{
                        flexDirection: 'row',
                        width: wp(85),
                        justifyContent: "center",
                        marginBottom: scale(2),
                        // marginLeft: '3%',
                        height: scale(15)
                    }}><View style={{
                        alignItems: "flex-start",
                        justifyContent: "center",
                        width: '35%'
                    }}><Text key={index}
                    style={{
                        fontSize: scale(16),
                        color: themeColor,
                        fontFamily: 'Roboto-Regular',
                    }}>
                      {item}
                    </Text></View><View style={{
                        alignItems: "flex-end",
                        justifyContent: "center",
                        width: '35%'

                    }}><Rating
                    type='custom'
                    imageSize={18}
                    ratingCount={5}
                    defaultRating={20}
                    readonly={false}
                    ratingBackgroundColor='transparent'
                    startingValue={0}
                    // ratingColor={"#f1ee40"}
                    // tintColor={themeWhite}
                    /></View></View>
                )
            })}
            </ScrollView></View>
            <View style={{
                width: '90%',
                alignItems: "center",
                alignSelf: "center",
                top: hp(-12),
                height: hp('18%'),
                backgroundColor: themeWhite,
                marginHorizontal: wp('2%'),
                // marginTop: scale(20),
                borderRadius: scale(20),
            // elevation: 7,
            }}>
           <CustomInput placeholder = {'Add Languages'} textChange = {(text) => this.setState({
                name: text
            })} inputContainerStyle={{
                height: scale(40),
                backgroundColor: themeColor,
                // width: "100%",
                borderColor: themeColor,
                borderWidth: scale(1),
                borderRadius: scale(5),
            }} inputStyle={{
                color: 'white',
                fontSize: scale(18),
                fontFamily: "Roboto-Bold",
                fontWeight: "bold"
            }}
            containerStyle={{
                width: wp(85)
            }}
            placeholderTextColor={themeWhite}
            iconName={iconSearch}
            onSubmitEditing={(event) => this.addsSkill(event.nativeEvent.text)}
            /><ScrollView  nestedScrollEnabled={true} style={{
                marginTop: '-5%',
                marginBottom: 30,
                height: scale(50),
            }} contentContainerStyle={{
                alignItems: "center",
                justifyContent: "center",
                width: wp(85)
            }} nestedScrollEnabled={true}>
            {this.state.addSkill.map((item, index) => {
                return (
                    <View style={{
                        flexDirection: 'row',
                        width: wp(85),
                        justifyContent: "center",
                        marginBottom: scale(2),
                        // marginLeft: '3%',
                        height: scale(15)
                    }}><View style={{
                        alignItems: "flex-start",
                        justifyContent: "center",
                        width: '35%'
                    }}><Text key={index}
                    style={{
                        fontSize: scale(16),
                        color: themeColor,
                        fontFamily: 'Roboto-Regular',
                    }}>
                      {item}
                    </Text></View><View style={{
                        alignItems: "flex-end",
                        justifyContent: "center",
                        width: '35%'

                    }}><Rating
                    type='custom'
                    imageSize={18}
                    ratingCount={5}
                    defaultRating={20}
                    readonly={false}
                    ratingBackgroundColor='transparent'
                    startingValue={0}
                    // ratingColor={"#f1ee40"}
                    // tintColor={themeWhite}
                    /></View></View>
                )
            })}
            </ScrollView></View></ScrollView>
             </ImageBackground>
            <View style={styles.TranLingImage}>
             <Image
            source={TRANLINE}
            style={styles.imageStyle}
            resizeMode={'stretch'}
            /></View>
                </ImageBackground></SafeAreaView>
        )
    }
}

export default withNavigationFocus(AddskilJob);