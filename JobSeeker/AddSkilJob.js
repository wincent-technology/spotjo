import React, {
    Component
} from 'react';
import {
    SafeAreaView,
    StatusBar,
    ImageBackground,
    FlatList,
    Text,
    Image,
    View,
    ScrollView
} from 'react-native';
import {
    withNavigationFocus
} from 'react-navigation';
import styles from '../src/Style'
import {
    left,
    leftVid
} from '../src/IconManager';
import {
    scale,
    snack
} from '../src/Util'
import {
    themeColor,
    themeWhite,
    TRANLINE,
    skill,
    iconSearch,
    blanks,
    Fulls,
} from '../Constant/index'
import {
    Rating,
    StarRating,
    NavigationHead,
    DropDownItem
} from '../Component/ViewManager'
import CustomButton from '../Component/Button'
import CustomInput from '../Component/Input'
import Slider from 'rn-range-slider';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from '../Component/responsive-ratio';
import {
    FontBold,
    FontRegular,
    Background
} from '../Constant/index'
import Items from './Items'
import http from '../api';
import Icon2 from 'react-native-vector-icons/dist/MaterialIcons';


class AddskilJob extends Component {
    constructor(props) {
        super(props);

        this.state = {
            addSkill: [],
            Education: [],
            Language: [],
            salary: 0,
            salaryMax: 0,
            salaryrating: 1
        };
    }

    static navigationOptions = ({
        navigation
    }) => ({
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
                minSal: Math.round(this.state.salary),
                maxSal: Math.round(this.state.salaryMax)
            }).then((res) => {
                if (res['data']['status']) {
                    console.log('responce user', res['data']['result'])
                    this.props.navigation.navigate('JobEditProfile');
                } else {
                    snack(res['data']['message'])
                }
            }, err => snack(err['message']))
        } catch (error) {
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
        console.log('this.edu', global.minSalary, global.maxSalary);

        this.setState({
            addSkill: global.UserSkill || [],
            Education: global.Qualification || [],
            Language: global.UserLanguage || [],
            salary: parseInt(global.minSalary) || 0,
            salaryMax: parseInt(global.maxSalary) || 0,
            salaryrating: global.salaryrating || 1
        })
        console.log(this.state)
    }
    addsSkill = (text) => {
        let gems = this.state.addSkill || []
        // var in =  this.state.addSkill; 
        console.log('gems', gems, text, gems.length);
        if (gems.length <= 4) {
            gems.push({
                name: text.toUpperCase(),
                rating: 1
            });
            this.setState({
                addSkill: gems
            }, () => {
                global.UserSkill = this.state.addSkill
            });
        } else alert('You can upload upto 5 Skills')
    }
    Education = (text) => {
        var i = text.toUpperCase();
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
        var i = text.toUpperCase();
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

    handlesalary = (value) => {
        this.setState({
            salaryrating: value
        }, () => {
            global.salaryrating = this.state.salaryrating
        });
    }
    remove = (item, index) => {
        console.log(index, item);
        const {
            addSkill,
            Education,
            Language
        } = this.state;
        let m = addSkill
        let j = Education
        let n = Language
        for (let i in m) {
            if (m[i].name == item) {
                m.splice(i, 1)
            }
        }
        for (let i in j) {
            if (j[i].name == item) {
                j.splice(i, 1)
            }
        }
        for (let i in n) {
            if (n[i].name == item) {
                n.splice(i, 1)
            }
        }
        this.setState({
            addSkill: m,
            Education: j,
            Language: n
        })
    }


    render() {
        const {
            Hourly,
            Monthly,
            Yearly
        } = this.state
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
                borderColor: 'gray',
                borderWidth: wp(0.6),
                alignItems: "center",
                backgroundColor: themeWhite,
                left: wp(30.5),
                top: wp(-11),
            }}><View><Image source={skill} style={{
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
           <CustomInput placeholder = {'Upto 5 Skills'} textChange = {(text) => this.setState({
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
            <ScrollView style={{
                backgroundColor: themeWhite,
                marginTop: '-7%',
                marginBottom: 30,
                alignSelf: "stretch"
            }}
            contentContainerStyle={{
                alignItems: "center",
                justifyContent: "center",
                width: wp(85),
            }} nestedScrollEnabled={true}>
            {
            this.state.addSkill.map((item, index) => {
                return (
                    <View style={styles.itemsHiddenView}>
                    <View style={styles.itemsHiddenSView}>
                    <Icon2 name={'highlight-off'} size={scale(20)} color={themeColor} onPress={() => {
                        this.remove(item.name, index)
                    }}/></View><View style={styles.itemsHiddenTView}><Text
                    style={styles.addSkillFont} numberOfLines={1}>
                      {item.name}
                    </Text></View>
                    <View style={styles.itemsHiddenViewRate}>
            <StarRating
                    emptyStar={blanks}
                    fullStar={Fulls}
                    halfStar={'star-half'}
                    iconSet={'MaterialIcons'}
                    disabled={false}
                    maxStars={5}
                    starSize={scale(18)}
                    rating={item.rating}
                    selectedStar={(rating) => this.handleChange(rating, index)}
                    fullStarColor={'orange'}
                    />
            </View></View>
                )
            })
            }
            </ScrollView>
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
            }]}>{this.state.salary}</Text>
            <Text style={[styles.FilterMaxText, {
                color: themeColor
            }]}>{this.state.salaryMax},000+</Text></View>
            <Slider
            style={styles.FilterMinimumSalarySlider}
            gravity={'center'}
            min={0}
            max={150}
            step={1}
            initialLowValue={parseInt(global.minSalary)}
            initialHighValue={parseInt(global.maxSalary)}
            selectionColor={themeColor}
            blankColor="#B0b0b0"
            labelBackgroundColor={themeColor}
            labelBorderColor={'#b0b0b0'}
            onValueChanged={(low, high, fromUser) => {
                // global.minSalary = low;
                // global.maxSalary = high;
                this.setState({
                    salary: low,
                    salaryMax: high
                })
            }}
            /></View>
                    <View style={styles.itemsHiddenView}>
            <View style={styles.itemsHiddenSView} />
            <View style={styles.itemsHiddenTView}><Text
                    style={styles.addSkillFont} numberOfLines={1}>
                      Salary Rating
                    </Text></View>
            <View style={styles.itemsHiddenViewRate}>
            <StarRating
            emptyStar={blanks}
            fullStar={Fulls}
            halfStar={'star-half'}
            iconSet={'MaterialIcons'}
            disabled={false}
            maxStars={5}
            starSize={scale(18)}
            rating={this.state.salaryrating}
            selectedStar={(rating) => this.handlesalary(rating)}
            fullStarColor={'orange'}
            />
            </View></View>
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
            <ScrollView style={{
                backgroundColor: themeWhite,
                marginTop: '-7%',
                marginBottom: 35,
                alignSelf: "stretch"
            }}
            contentContainerStyle={{
                alignItems: "center",
                justifyContent: "center",
                width: wp(85),
            }} nestedScrollEnabled={true}>
            {
            this.state.Education.map((item, index) => {
                return (
                    <View style={styles.itemsHiddenView}>
                    <View style={styles.itemsHiddenSView}>
                    <Icon2 name={'highlight-off'} size={scale(20)} color={themeColor} onPress={() => {
                        this.remove(item.name, index)
                    }}/></View><View style={styles.itemsHiddenTView}><Text
                    style={styles.addSkillFont} numberOfLines={1}>
                      {item.name}
                    </Text></View>
                    <View style={styles.itemsHiddenViewRate}>
            <StarRating
                    emptyStar={blanks}
                    fullStar={Fulls}
                    halfStar={'star-half'}
                    iconSet={'MaterialIcons'}
                    disabled={false}
                    maxStars={5}
                    starSize={scale(18)}
                    rating={item.rating}
                    selectedStar={(rating) => this.handleEducation(rating, index)}
                    fullStarColor={'orange'}
                    />
            </View></View>
                )
            })
            }
            </ScrollView>
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
            <ScrollView style={{
                backgroundColor: themeWhite,
                marginTop: '-7%',
                marginBottom: 15,
                alignSelf: "stretch"
            }}
            contentContainerStyle={{
                alignItems: "center",
                justifyContent: "center",
                width: wp(85),
            }} nestedScrollEnabled={true}>
            {
            this.state.Language.map((item, index) => {
                return (
                    <View style={styles.itemsHiddenView}>
                    <View style={styles.itemsHiddenSView}>
                    <Icon2 name={'highlight-off'} size={scale(20)} color={themeColor} onPress={() => {
                        this.remove(item.name, index)
                    }}/></View><View style={styles.itemsHiddenTView}><Text
                    style={styles.addSkillFont} numberOfLines={1}>
                      {item.name}
                    </Text></View>
                    <View style={styles.itemsHiddenViewRate}>
            <StarRating
                    emptyStar={blanks}
                    fullStar={Fulls}
                    halfStar={'star-half'}
                    iconSet={'MaterialIcons'}
                    disabled={false}
                    maxStars={5}
                    starSize={scale(18)}
                    rating={item.rating}
                    selectedStar={(rating) => this.handleLanguage(rating, index)}
                    fullStarColor={'orange'}
                    />
            </View></View>
                )
            })
            }
            </ScrollView>
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