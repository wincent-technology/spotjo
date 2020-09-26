import React, { Component } from 'react';
import { SafeAreaView, StatusBar, ImageBackground, FlatList, Text, Image, View, ScrollView } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import styles from '../src/Style'
import { left, leftVid } from '../src/IconManager';
import { scale, snack } from '../src/Util'
import { themeColor, themeWhite, TRANLINE, editTheme, iconSearch } from '../Constant/index'
import { Rating, NavigationHead, DropDownItem } from '../Component/ViewManager'
import CustomButton from '../Component/Button'
import CustomInput from '../Component/Input'
import Slider from '@react-native-community/slider';

import { widthPercentageToDP as wp, heightPercentageToDP as hp, } from '../Component/responsive-ratio';
import { FontBold, FontRegular, Background } from '../Constant/index'
import Items from './Items'
import http from '../api';


class AddskilJob extends Component {
    constructor(props) {
        super(props);

        this.state = {
            addSkill: [],
            Education: [],
            Language: [],
            salary: 0,
            salaryrating: 1
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
        try {
            http.POST('api/user/editskill', {
                id: global.Id,
                skills: global.UserSkill,
                qualification: global.Qualification,
                language: global.UserLanguage,
                salRatting: global.salaryrating,
                minSal: Math.round(global.salary)
            }).then((res) => {
                if (res['data']['status']) {
                    console.log('responce user', res['data']['result'])
                    this.props.navigation.navigate('JobEditProfile');
                } else {
                    snack(res['data']['message'])
                }
            }, err => snack(err['message']))
        } catch ( error ) {
            snack(error)

        }
        // alert('video is coming soon');

    }
    Personal = () => {
        this.props.navigation.navigate('Personal');
    }
    componentDidMount() {
        // console.log('this.lang', global.UserLanguage);
        // console.log('this.skill', global.UserSkill);
        // console.log('this.edu', global.Qualification);

        this.setState({
            addSkill: global.UserSkill || [],
            Education: global.Qualification || [],
            Language: global.UserLanguage || [],
            salary: global.salary || 0,
            salaryrating: global.salaryrating || 1
        })
        console.log(this.state)
    }
    addsSkill = (text) => {
        let gems = this.state.addSkill || []
        // var in =  this.state.addSkill; 
        console.log('gems', gems, text);
        gems.push({
            name: text,
            rating: 1
        });
        this.setState({
            addSkill: gems
        }, () => {
            global.UserSkill = this.state.addSkill
        });
    }
    Education = (text) => {
        var i = text;
        let gems = this.state.Education
        // var in =  this.state.addSkill; 
        gems.push({
            name: i,
            rating: 1
        });
        this.setState({
            Education: gems
        }, () => {
            global.Qualification = this.state.Education
        });
    }
    Language = (text) => {
        var i = text;
        let gems = this.state.Language
        // var in =  this.state.addSkill; 
        gems.push({
            name: i,
            rating: 1
        });
        this.setState({
            Language: gems
        }, () => {
            global.UserLanguage = this.state.Language
        });
    }

    handleChange = (value, index) => {

        console.log("item", value, index);
        var arr = [];
        arr = this.state.addSkill;
        arr[index].rating = value;
        this.setState({
            addSkill: arr
        }, () => {
            global.UserSkill = this.state.addSkill
        });
    }

    handleEducation = (value, index, item) => {

        console.log("item", value);
        var arr = [];
        arr = this.state.Education;
        arr[index].rating = value;
        this.setState({
            Education: arr
        }, () => {
            global.Qualification = this.state.Education
        });
    }
    handleLanguage = (value, index, item) => {

        console.log("item", value);
        var arr = [];
        arr = this.state.Language;
        arr[index].rating = value;
        this.setState({
            Language: arr
        }, () => {
            global.UserLanguage = this.state.Language
        });
    }

    handlesalary = (value, index, item) => {
        this.setState({
            salaryrating: value
        }, () => {
            global.salaryrating = this.state.salaryrating
        });
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
                top: hp(-3),
            }} nestedScrollEnabled={true}>
          <View style={{
                width: '90%',
                alignItems: "center",
                alignSelf: "center",
                top: hp(0),
                height: hp('22%'),
                backgroundColor: 'transparent',
                marginHorizontal: wp('1%'),
                borderRadius: scale(20),
            }}>
           <CustomInput placeholder = {'Select Skill'} textChange = {(text) => this.setState({
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
            iconColor={themeWhite}
            iconStyle={{
                height: 25,
                width: 25
            }}
            onSubmitEditing={(event) => this.addsSkill(event.nativeEvent.text)}
            />
             <FlatList
            nestedScrollEnabled={true}
            style={{
                backgroundColor: themeWhite,
                marginTop: '-7%',
                marginBottom: 25,
            }}
            contentContainerStyle={{
                alignItems: "center",
                justifyContent: "center",
                width: wp(85),
                flexGrow: 1
            }}
            data = {this.state.addSkill}
            extraData={this.state.addSkill}
            showsHorizontalScrollIndicator = { false  }
            removeClippedSubviews={true}
            renderItem={({item, index}) => <Items
                item={item}
                index={index}
                handleChange={this.handleChange}
                />}
            initialNumToRender={5}
            maxToRenderPerBatch={10}
            updateCellsBatchingPeriod={70}
            getItemLayout={(data, index) => (
            {
                length: hp('4%'),
                offset: hp('4%') * index,
                index
            }
            )}
            keyExtractor = {
            (item, index) => index + ''
            }
            />
            </View>
            <View style={{
                width: '90%',
                alignItems: "center",
                alignSelf: "center",
                top: hp(-5),
                height: hp('22%'),
                backgroundColor: 'transparent',
                marginHorizontal: wp('2%'),
                // marginTop: scale(20),
                borderRadius: scale(20),
            // elevation: 7,
            }}>
           <CustomInput placeholder = {'Select Salary Range'} textChange = {(text) => this.setState({
                name: text
            })} inputContainerStyle={{
                height: scale(40),
                backgroundColor: themeColor,
                // width: "100%",
                borderColor: themeColor,
                borderWidth: scale(1),
                borderRadius: scale(5),
            }} inputStyle={{
                color: themeWhite,
                fontSize: scale(18),
                fontFamily: "Roboto-Bold",
                fontWeight: "bold"
            }}
            containerStyle={{
                width: wp(85)
            }}
            placeholderTextColor={themeWhite}
            iconName={iconSearch}
            iconColor={themeWhite}
            iconStyle={{
                height: 0,
                width: 0
            }}
            onSubmitEditing={(event) => this.addsSkill(event.nativeEvent.text)}
            /><ScrollView  nestedScrollEnabled={true} style={{
                marginTop: '-7%',
                marginBottom: 15,
            // height: scale(100),
            }} contentContainerStyle={{
                alignItems: "center",
                justifyContent: "center",
                width: wp(85),
            }} nestedScrollEnabled={true}>
           <View style={{
                width: wp('85%'),
                height: scale(50),
            }}><View style={styles.FilterMinimumSalaryMin}><Text style={[styles.FilterMinText, {
                color: themeColor
            }]}>{Math.round(this.state.salary)}</Text>
            <Text style={[styles.FilterMaxText, {
                color: themeColor
            }]}>150k+</Text></View><Slider
            style={{
                width: wp('85%'),
                height: scale(10),
                flex: 1,
                alignSelf: 'center',
            }}
            minimumValue={0}
            maximumValue={150}
            onValueChange={ value => {
                this.setState({
                    salary: value,
                }, () => global.salary = this.state.salary);
            }}
            thumbTintColor={themeColor}
            minimumTrackTintColor={themeColor}
            maximumTrackTintColor={themeColor}
            /></View>
                    <View style={{
                flexDirection: 'row',
                width: wp(85),
                justifyContent: "center",
                marginTop: scale(-3),
                // marginLeft: '3%',
                height: scale(22)
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
            defaultRating={this.state.salaryrating}
            readonly={false}
            ratingBackgroundColor='transparent'
            startingValue={this.state.salaryrating}
            onFinishRating={(value, index, item) => this.handlesalary(value, index, item)}

            // ratingColor={"#f1ee40"}
            // tintColor={themeWhite}
            /></View></View>
            </ScrollView></View>
            <View style={{
                width: '90%',
                alignItems: "center",
                alignSelf: "center",
                top: hp(-7),
                height: hp('22%'),
                backgroundColor: 'transparent',
                marginHorizontal: wp('2%'),
                // marginTop: scale(20),
                borderRadius: scale(20),
            // elevation: 7,
            }}>
           <CustomInput placeholder = {'Select Education'} textChange = {(text) => this.setState({
                name: text
            })} inputContainerStyle={{
                height: scale(40),
                backgroundColor: themeColor,
                // width: "100%",
                borderColor: themeColor,
                borderWidth: scale(1),
                borderRadius: scale(5),
            }} inputStyle={{
                color: themeWhite,
                fontSize: scale(18),
                fontFamily: "Roboto-Bold",
                fontWeight: "bold"
            }}
            containerStyle={{
                width: wp(85)
            }}
            placeholderTextColor={themeWhite}
            iconName={iconSearch}
            iconColor={themeWhite}
            iconStyle={{
                height: 25,
                width: 25
            }}
            onSubmitEditing={(event) => this.Education(event.nativeEvent.text)}
            />
            <FlatList
            nestedScrollEnabled={true}
            style={{
                backgroundColor: themeWhite,
                marginTop: '-7%',
                marginBottom: 30,
            }}
            contentContainerStyle={{
                alignItems: "center",
                justifyContent: "center",
                width: wp(85),
                flexGrow: 1
            }}
            data = {this.state.Education}
            extraData={this.state.Education}
            showsHorizontalScrollIndicator = { false  }
            removeClippedSubviews={true}
            renderItem={({item, index}) => <Items
                item={item}
                index={index}
                handleChange={this.handleEducation}
                />}
            initialNumToRender={5}
            maxToRenderPerBatch={10}
            updateCellsBatchingPeriod={70}
            getItemLayout={(data, index) => (
            {
                length: hp('4%'),
                offset: hp('4%') * index,
                index
            }
            )}
            keyExtractor = {
            (item, index) => index + ''
            }
            />
            </View>
            <View style={{
                width: '90%',
                alignItems: "center",
                alignSelf: "center",
                top: hp(-12),
                height: hp('22%'),
                backgroundColor: 'transparent',
                marginHorizontal: wp('2%'),
                // marginTop: scale(20),
                borderRadius: scale(20),
            // elevation: 7,
            }}>
           <CustomInput placeholder = {'Select Languages'} textChange = {(text) => this.setState({
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
            iconColor={themeWhite}
            iconStyle={{
                height: 25,
                width: 25
            }}
            onSubmitEditing={(event) => this.Language(event.nativeEvent.text)}
            />
            <FlatList
            nestedScrollEnabled={true}
            style={{
                backgroundColor: themeWhite,
                marginTop: '-7%',
                marginBottom: 15,
            }}
            contentContainerStyle={{
                alignItems: "center",
                justifyContent: "center",
                width: wp(85),
                flexGrow: 1
            }}
            data = {this.state.Language}
            extraData={this.state.Language}
            showsHorizontalScrollIndicator = { false  }
            removeClippedSubviews={true}
            renderItem={({item, index}) => <Items
                item={item}
                index={index}
                handleChange={this.handleLanguage}
                />}
            initialNumToRender={5}
            maxToRenderPerBatch={10}
            updateCellsBatchingPeriod={70}
            getItemLayout={(data, index) => (
            {
                length: hp('4%'),
                offset: hp('4%') * index,
                index
            }
            )}
            keyExtractor = {
            (item, index) => index + ''
            }
            />
           </View></ScrollView>
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