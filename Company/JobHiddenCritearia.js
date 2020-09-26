import React, { Component } from 'react';
import { SafeAreaView, TouchableWithoutFeedback, StatusBar, FlatList, ImageBackground, Dimensions, Text, Image, View, TextInput, ScrollView } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import { scale } from '../src/Util';
import CustomInput from '../Component/Input'
import ToggleSwitch from '../Component/ToggleSwitch'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../Component/responsive-ratio';
import { switchColor, Background, themeColor, themeWhite, iconSearch, darkract } from '../Constant/index'
import styles from '../src/Style';
import Slider from '@react-native-community/slider';
import { Rating, NavigationHead, DropDownItem } from '../Component/ViewManager'
import Items from './Items'


class JobHiddenCritearia extends Component {
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


    next = () => {
        this.props.navigation.navigate('TabScreen')
    }
    addsSkill = (text) => {
        var i = text;
        let gems = this.state.addSkill
        // var in =  this.state.addSkill; 
        gems.push({
            name: i,
            rating: 1
        });
        this.setState({
            addSkill: gems
        }, () => {
            global.addSkill = this.state.addSkill
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
            global.Education = this.state.Education
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
            global.LanguageSkill = this.state.Language
        });
    }

    handleChange = (value, index) => {

        var arr = [];
        arr = this.state.addSkill;
        arr[index].rating = value;
        this.setState({
            addSkill: arr
        }, () => {
            global.addSkill = this.state.addSkill
        });
    }

    handleEducation = (value, index) => {

        var arr = [];
        arr = this.state.Education;
        arr[index].rating = value;
        this.setState({
            Education: arr
        }, () => {
            global.Education = this.state.Education
        });
    }
    handleLanguage = (value, index) => {

        var arr = [];
        arr = this.state.Language;
        arr[index].rating = value;
        this.setState({
            Language: arr
        }, () => {
            global.LanguageSkill = this.state.Language
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
        const {FullTime, PartTime, Employed, Internship, StudentJobs, HelpingVacancies, Freelancer, name} = this.state
        return (

            <ImageBackground style={{
                width: wp('96%'),
                height: hp('100%') - (StatusBar.currentHeight + 100 + hp(4)),
            // justifyContent: "center",
            // alignItems: 'center'
            }} source={darkract} resizeMode={'stretch'}>
            <View style={{
                justifyContent: "center",
                alignItems: "center"
            }}>
            <View style={{
                alignItems: "center",
                width: wp(96),
                marginVertical: hp(4)

            }}><Text style={{
                fontSize: scale(18),
                fontFamily: "Roboto-Bold",
                color: themeWhite
            }}>Hidden Critearia</Text></View>
                    <ScrollView style={{
                alignSelf: 'stretch',
                height: hp('100%') - (StatusBar.currentHeight + 100 + hp(22))
            }} nestedScrollEnabled={true}>
          <View style={{
                width: '90%',
                alignItems: "center",
                alignSelf: "center",
                top: hp(0),
                height: hp('20%'),
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
            iconStyle={{
                height: 25,
                width: 25
            }}
            iconColor={themeWhite}
            onSubmitEditing={(event) => this.addsSkill(event.nativeEvent.text)}
            />
            <FlatList
            nestedScrollEnabled={true}
            style={{
                backgroundColor: 'transparent',
                marginTop: '-7%',
                marginBottom: 27,
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
            iconStyle={{
                height: 0,
                width: 0
            }}

            onSubmitEditing={(event) => this.addsSkill(event.nativeEvent.text)}
            /><ScrollView  nestedScrollEnabled={true} style={{
                marginTop: '-5%',
                marginBottom: 20,
            // height: scale(100),
            }} contentContainerStyle={{
                alignItems: "center",
                justifyContent: "center",
                width: wp(85),
            }} nestedScrollEnabled={true}>
            <View style={[styles.FilterMinimumSalary, {
                width: wp(85)
            }]}><View style={styles.FilterMinimumSalaryMin}><Text style={[styles.FilterMinText, {
                color: '#fff'
            }]}>{Math.round(this.state.salary)}</Text>
            <Text style={[styles.FilterMaxText, {
                color: '#fff'
            }]}>150k+</Text></View><Slider
            style={[styles.FilterMinimumSalarySlider, {
                width: wp(85)
            }]}
            minimumValue={0}
            maximumValue={150}
            onValueChange={ value => {
                this.setState({
                    salary: value,
                }, () => global.salary = this.state.salary);
            }}
            minimumTrackTintColor={'#fff'}
            maximumTrackTintColor={'#fff'}
            /></View>
                    <View style={{
                flexDirection: 'row',
                flex: 1,
                width: wp(85),
                justifyContent: "center",
                marginTop: scale(5),

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
                color: themeWhite,
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
            startingValue={0}
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
            iconStyle={{
                height: 25,
                width: 25
            }}
            iconColor={themeWhite}

            onSubmitEditing={(event) => this.Education(event.nativeEvent.text)}
            />
            <FlatList
            nestedScrollEnabled={true}
            style={{
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
                height: hp('20%'),
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
            iconStyle={{
                height: 25,
                width: 25
            }}
            iconColor={themeWhite}

            onSubmitEditing={(event) => this.Language(event.nativeEvent.text)}
            />
            <FlatList
            nestedScrollEnabled={true}
            style={{
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
            /></View></ScrollView>
           </View>
            </ImageBackground>
        )
    }
}
;

export default withNavigationFocus(JobHiddenCritearia);