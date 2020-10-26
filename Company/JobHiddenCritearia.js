import React, {
    Component
} from 'react';
import {
    SafeAreaView,
    TouchableWithoutFeedback,
    StatusBar,
    FlatList,
    ImageBackground,
    Dimensions,
    Text,
    Image,
    View,
    TextInput,
    ScrollView
} from 'react-native';
import {
    withNavigationFocus
} from 'react-navigation';
import {
    scale
} from '../src/Util';
import CustomInput from '../Component/Input'
import ToggleSwitch from '../Component/ToggleSwitch'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from '../Component/responsive-ratio';
import {
    switchColor,
    Background,
    themeColor,
    themeWhite,
    iconSearch,
    darkract,
    blanks,
    Fulls
} from '../Constant/index'
import styles from '../src/Style';
import Slider from 'rn-range-slider';
import {
    Rating,
    NavigationHead,
    DropDownItem,
    StarRating
} from '../Component/ViewManager'
import Items from './Items'
import Icon2 from 'react-native-vector-icons/dist/MaterialIcons';


class JobHiddenCritearia extends Component {
    constructor(props) {
        super(props);

        this.state = {
            addSkill: [],
            Education: [],
            Language: [],
            salary: 0,
            salaryMax: 150,
            salaryrating: 1
        };
    }


    next = () => {
        this.props.navigation.navigate('TabScreen')
    }
    addsSkill = (text) => {
        var i = text.toUpperCase();
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
            global.Education = this.state.Education
        });
    }
    Language = (text) => {
        var i = text.toUpperCase();
        let gems = this.state.Language
        // var in =  this.state.addSkill; 
        this.state.Language && gems.push({
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
        console.log('value', value, index);
        var arr = [];
        arr = this.state.addSkill;
        arr[index].rating = value;
        return this.setState({
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
            FullTime,
            PartTime,
            Employed,
            Internship,
            StudentJobs,
            HelpingVacancies,
            Freelancer,
            name
        } = this.state
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
             <ScrollView nestedScrollEnabled={true}
            style={styles.itemsHiddenViewScr}
            contentContainerStyle={styles.itemsHiddenViewCont}>
             { this.state.addSkill.map((item, index) => {
                console.log('index', index);
                return (<View style={styles.itemsHiddenView}>
                    <View style={styles.itemsHiddenSView}>
                    <Icon2 name={'highlight-off'} size={scale(20)} color={themeWhite} onPress={() => {
                        this.remove(item.name, index)
                    }}/></View><View style={styles.itemsHiddenTView}><Text
                    style={styles.itemsHiddenFont} numberOfLines={1}>
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
                    starSize={scale(20)}
                    rating={item.rating}
                    selectedStar={(rating) => this.handleChange(rating, index)}
                    fullStarColor={'orange'}
                    />
            </View></View>)
            }
            )}
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
            }]}>{this.state.salaryMax},000+</Text></View><Slider
            style={[styles.FilterMinimumSalarySlider, {
                width: wp(75)
            }]}
            gravity={'center'}
            min={0}
            max={150}
            step={1}
            selectionColor={themeWhite}
            blankColor="#B0b0b0"
            labelBackgroundColor={themeColor}
            labelBorderColor={'#b0b0b0'}
            onValueChanged={(low, high, fromUser) => {
                global.minSalary = low;
                global.maxSalary = high;
                this.setState({
                    salary: low,
                    salaryMax: high
                })
            }}
            /></View>
                    <View style={styles.itemsHiddenView}>
            <View style={styles.itemsHiddenTView}><Text
            style={{
                fontSize: scale(16),
                color: themeWhite,
                fontFamily: 'Roboto-Regular',
            }} numberOfLines={1}>
                      Salary Rating
                    </Text></View><View style={{
                alignItems: "flex-end",
                justifyContent: "center",
                width: '35%'

            }}><StarRating
           emptyStar={blanks}
            fullStar={Fulls}
            halfStar={'star-half'}
            iconSet={'MaterialIcons'}
            disabled={false}
            maxStars={5}
            starSize={scale(18)}
            rating={this.state.salaryrating}
            selectedStar={(rating, index) => this.handlesalary(rating, index)}
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
            /><ScrollView nestedScrollEnabled={true}
            style={{
                marginTop: '-7%',
                marginBottom: 30,
            }}
            contentContainerStyle={styles.itemsHiddenViewCont}>
             { this.state.Education.map((item, index) => {
                console.log('index', index);
                return (<View style={styles.itemsHiddenView}>
                    <View style={styles.itemsHiddenSView}>
                    <Icon2 name={'highlight-off'} size={scale(20)} color={themeWhite} onPress={() => {
                        this.remove(item.name, index)
                    }}/></View><View style={styles.itemsHiddenTView}><Text
                    style={styles.itemsHiddenFont} numberOfLines={1}>
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
                    starSize={scale(20)}
                    rating={item.rating}
                    selectedStar={(rating) => this.handleEducation(rating, index)}
                    fullStarColor={'orange'}
                    />
            </View></View>)
            }
            )}
            </ScrollView>
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
            <ScrollView nestedScrollEnabled={true}
            style={{
                marginTop: '-7%',
                marginBottom: 15,
            }}
            contentContainerStyle={styles.itemsHiddenViewCont}>
             { this.state.Language.map((item, index) => {
                console.log('index', index);
                return (<View style={styles.itemsHiddenView}>
                    <View style={styles.itemsHiddenSView}>
                    <Icon2 name={'highlight-off'} size={scale(20)} color={themeWhite} onPress={() => {
                        this.remove(item.name, index)
                    }}/></View><View style={styles.itemsHiddenTView}><Text
                    style={styles.itemsHiddenFont} numberOfLines={1}>
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
                    starSize={scale(20)}
                    rating={item.rating}
                    selectedStar={(rating) => this.handleLanguage(rating, index)}
                    fullStarColor={'orange'}
                    />
            </View></View>)
            }
            )}
            </ScrollView>
            </View></ScrollView>
           </View>
            </ImageBackground>
        )
    }
};

export default withNavigationFocus(JobHiddenCritearia);