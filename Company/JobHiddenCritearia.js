import React, { Component } from 'react';
import { SafeAreaView, TouchableWithoutFeedback, StatusBar, ImageBackground, Dimensions, Text, Image, View, TextInput, ScrollView } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import { scale } from '../src/Util';
import CustomInput from '../Component/Input'
import ToggleSwitch from '../Component/ToggleSwitch'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../Component/responsive-ratio';
import { switchColor, Background, themeColor, themeWhite, iconSearch, darkract } from '../Constant/index'
import styles from '../src/Style';
import Slider from '@react-native-community/slider';
import { Rating, NavigationHead, DropDownItem } from '../Component/ViewManager'



class JobHiddenCritearia extends Component {
    constructor(props) {
        super(props);

        this.state = {
            addSkill: [{
                name: 'J2EE',
                rating: 1
            }, {
                name: 'SQL,Mysql',
                rating: 1
            }, {
                name: 'Java',
                rating: 1
            }],
            Education: [{
                name: 'MBA',
                rating: 1
            }, {
                name: 'BE',
                rating: 1
            }],
            Language: [{
                name: 'English',
                rating: 1
            }, {
                name: 'Kannada',
                rating: 1
            }, {
                name: 'Telugu',
                rating: 1
            }],
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

    handleChange = (value, index, item) => {

        console.log("item", value);
        var arr = [];
        arr = this.state.addSkill;
        arr[0].rating = value;
        this.setState({
            addSkill: arr
        }, () => {
            global.addSkill = this.state.addSkill
        });
    }

    handleEducation = (value, index, item) => {

        console.log("item", value);
        var arr = [];
        arr = this.state.Education;
        arr[0].rating = value;
        this.setState({
            Education: arr
        }, () => {
            global.Education = this.state.addSkill
        });
    }
    handleLanguage = (value, index, item) => {

        console.log("item", value);
        var arr = [];
        arr = this.state.Language;
        arr[0].rating = value;
        this.setState({
            Language: arr
        }, () => {
            global.LanguageSkill = this.state.addSkill
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
            onSubmitEditing={(event) => this.addsSkill(event.nativeEvent.text)}
            /><ScrollView  style={{
                marginTop: '-5%',
                marginBottom: 20,
                height: scale(100),
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
                        color: themeWhite,
                        fontFamily: 'Roboto-Regular',
                    }}>
                      {item.name}
                    </Text></View><View style={{
                        alignItems: "flex-end",
                        justifyContent: "center",
                        width: '35%'

                    }}><Rating
                    type='custom'
                    imageSize={18}
                    ratingCount={5}
                    defaultRating={item.rating}
                    readonly={false}
                    ratingBackgroundColor='transparent'
                    startingValue={0}
                    onFinishRating={(value, index, item) => this.handleChange(value, index, item)}
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
                height: scale(100),
            }} contentContainerStyle={{
                alignItems: "center",
                justifyContent: "center",
                width: wp(85)
            }} nestedScrollEnabled={true}>
            <View style={{
                width: wp('85%'),
                height: scale(27),
            }}><View style={styles.FilterMinimumSalaryMin}><Text style={[styles.FilterMinText, {
                color: themeWhite
            }]}>{Math.round(this.state.salary)}</Text>
            <Text style={[styles.FilterMaxText, {
                color: themeWhite
            }]}>150k+</Text></View><Slider
            style={{
                width: wp('80%'),
                height: scale(5),
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
            minimumTrackTintColor={themeWhite}
            maximumTrackTintColor={themeWhite}
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
                height: hp('20%'),
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
            onSubmitEditing={(event) => this.Education(event.nativeEvent.text)}
            /><ScrollView  nestedScrollEnabled={true} style={{
                marginTop: '-5%',
                marginBottom: 40,
                height: scale(100),
            }} contentContainerStyle={{
                alignItems: "center",
                justifyContent: "center",
                width: wp(85)
            }} nestedScrollEnabled={true}>
            {this.state.Education.map((item, index) => {
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
                        color: themeWhite,
                        fontFamily: 'Roboto-Regular',
                    }}>
                      {item.name}
                    </Text></View><View style={{
                        alignItems: "flex-end",
                        justifyContent: "center",
                        width: '35%'

                    }}><Rating
                    type='custom'
                    imageSize={18}
                    ratingCount={5}
                    defaultRating={item.rating}
                    readonly={false}
                    ratingBackgroundColor='transparent'
                    startingValue={0}
                    onFinishRating={(value, index, item) => this.handleEducation(value, index, item)}

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
            onSubmitEditing={(event) => this.Language(event.nativeEvent.text)}
            /><ScrollView  nestedScrollEnabled={true} style={{
                marginTop: '-5%',
                marginBottom: 30,
                height: scale(100),
            }} contentContainerStyle={{
                alignItems: "center",
                justifyContent: "center",
                width: wp(85)
            }} nestedScrollEnabled={true}>
            {this.state.Language.map((item, index) => {
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
                        color: themeWhite,
                        fontFamily: 'Roboto-Regular',
                    }}>
                      {item.name}
                    </Text></View><View style={{
                        alignItems: "flex-end",
                        justifyContent: "center",
                        width: '35%'

                    }}><Rating
                    type='custom'
                    imageSize={18}
                    ratingCount={5}
                    defaultRating={item.rating}
                    readonly={false}
                    ratingBackgroundColor='transparent'
                    startingValue={0}
                    onFinishRating={(value, index, item) => this.handleLanguage(value, index, item)}

                    // ratingColor={"#f1ee40"}
                    // tintColor={themeWhite}
                    /></View></View>
                )
            })}
            </ScrollView></View></ScrollView>
           </View>
            </ImageBackground>
        )
    }
}
;

export default withNavigationFocus(JobHiddenCritearia);