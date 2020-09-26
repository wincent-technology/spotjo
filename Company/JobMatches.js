import React, { PureComponent } from 'react';
import { SafeAreaView, StyleSheet, StatusBar, FlatList, TouchableWithoutFeedback, TouchableOpacity, ImageBackground, Text, Image, View } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import styles from '../src/Style'
import { left, library, icon, play, leftVid } from '../src/IconManager';
import { themeColor, themeWhite, Background, sort, filter, TRANLINE, male, female, canvas, darkract, FontBold } from '../Constant/index'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../Component/responsive-ratio';
import { scale } from '../src/Util'
// import { Rating, AirbnbRating } from 'react-native-ratings';
import { Rating, NavigationHeader } from '../Component/ViewManager.js'
import ItemMVJob from './ItemMVJob'
import CompanyProfile from '../src/CompanyProfile';
import DeviceInfo from 'react-native-device-info';
import DateTimePicker from '@react-native-community/datetimepicker';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';

// import styles from './Style'
var c = 0;
const data = [{
    name: 'Suresh Kumar',
    Header: 'JAVA DEVELOPER(M/W)',
    image: male,
    ComPany_Name: 'Porsche AG',
    Working: 'Employed',
    Address: 'Stuttgart',
    skill: ['JAVA', 'J2EE', 'SQL'],
    work_Experience: '5-6 Years',
    salary: '50000$',
    cell: '00-00-000',
    email: 'Email@email.com'
}, {
    name: 'Kusuma Kulkarni',
    Header: 'JAVA DEVELOPER(M/W)',
    image: female,
    ComPany_Name: 'Google',
    Working: 'Employed',
    Address: 'Stuttgart',
    skill: ['JAVA', 'J2EE', 'SQL'],
    work_Experience: '5-6 Years',
    salary: '50000$',
    cell: '00-00-000',
    email: 'Email@email.com'
}, {
    name: 'Ramya Priya',
    Header: 'JAVA DEVELOPER(M/W)',
    image: female,
    ComPany_Name: 'Amazon',
    Working: 'Employed',
    Address: 'Stuttgart',
    skill: ['JAVA', 'J2EE', 'SQL'],
    work_Experience: '5-6 Years',
    salary: '50000$',
    cell: '00-00-000',
    email: 'Email@email.com'
}, {
    name: 'Suresh Kumar',
    Header: 'JAVA DEVELOPER(M/W)',
    image: male,
    ComPany_Name: 'Porsche AG',
    Working: 'Employed',
    Address: 'Stuttgart',
    skill: ['JAVA', 'J2EE', 'SQL'],
    work_Experience: '5-6 Years',
    salary: '50000$',
    cell: '00-00-000',
    email: 'Email@email.com'
},];

global.item = data[0];

class JobMatches extends PureComponent {


    constructor(props) {
        super(props);

        this.state = {
            show: false,
            show1: false,
            currentDate: Date.now(),
            selectedValue: 'City',
            selectedValue1: 'Languages',
            dark: false,
            gestureName: 'none'

        };
    }

    onSwipeUp = (gestureState, item) => {
        console.log('item', item)
        alert(' Matched ' + item)
    }

    onSwipeDown = (gestureState, item) => {
        alert(' Short Listed ' + item)

    }

    onSwipeLeft = (gestureState, item) => {
        alert(' Not Interested ' + item)

    }

    onSwipeRight = (gestureState, item) => {
        alert(' Interested ' + item)

    }
    onSwipe = (gestureName, gestureState) => {
        console.log('gesture', gestureName);
        const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
        this.setState({
            gestureName: gestureName
        });
        switch (gestureName) {
        case SWIPE_UP:
            break;
        case SWIPE_DOWN:
            break;
        case SWIPE_LEFT:
            break;
        case SWIPE_RIGHT:
            break;
        }
    }

    Filter = () => {
        this.props.navigation.navigate('Filter')
    }

    push = (item) => {
        global.item = item;
        this.setState({
            dark: !this.state.dark
        })
    // this.props.navigation.navigate('UserProfile')
    }
    Back = () => {
        this.props.navigation.navigate('ChooseTalent')
    }
    Shadule = () => {
        this.setState({
            dark: !this.state.dark
        })
    }
    render() {
        const {show, show1, dark} = this.state

        return (
            <View>
        <StatusBar hidden={true}/>
             <View style={{
                flexDirection: 'row',
                width: wp('100%'),
                backgroundColor: 'transparent',
                height: hp(12),
                marginTop: hp(1),
                alignItems: 'center',
            }}>
            <TouchableWithoutFeedback onPress={this.PostedJob}><View style={{
                alignItems: 'center',
                width: wp(100) / 3,
                height: hp(10),
                // marginLeft: wp(1),
                // justifyContent: "center",
                flexDirection: "column"
            }}><ImageBackground source={canvas} style={{
                height: '100%',
                width: '100%',
                position: "absolute",
                alignItems: "center",
                justifyContent: "center",
            }} resizeMode={'cover'}><Text style={{
                fontSize: scale(20),
                fontFamily: 'Roboto-Regular',
                color: themeWhite
            }}>10</Text><View><Text style={{
                fontSize: scale(16),
                fontFamily: 'Roboto-Regular',
                color: themeWhite
            }}>Published</Text></View></ImageBackground></View></TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={this.Interviews}><View style={{
                alignItems: 'center',
                width: wp(100) / 3,
                height: hp(10),
                justifyContent: "center",
                // marginHorizontal: wp(1),
                flexDirection: "column"
            }}><ImageBackground source={canvas} style={{
                height: '100%',
                width: '100%',
                position: "absolute",
                alignItems: "center",
                justifyContent: "center"

            }} resizeMode={'cover'}><Text style={{
                fontSize: scale(20),
                fontFamily: 'Roboto-Regular',
                color: themeWhite
            }}>15</Text><View><Text style={{
                fontSize: scale(16),
                fontFamily: 'Roboto-Regular',
                color: themeWhite
            }}>Expired</Text></View></ImageBackground></View></TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={this.Matches}><View style={{
                alignItems: 'center',
                width: wp(100) / 3,
                height: hp(10),
                justifyContent: "center",
                flexDirection: "column"
            }}><ImageBackground source={canvas} style={{
                height: '100%',
                width: '100%',
                position: "absolute",
                alignItems: "center",
                justifyContent: "center"

            }} resizeMode={'cover'}><Text style={{
                fontSize: scale(20),
                fontFamily: 'Roboto-Regular',
                color: themeWhite
            }}>3</Text><View><Text style={{
                fontSize: scale(16),
                fontFamily: 'Roboto-Regular',
                color: themeWhite
            }}>Active</Text></View></ImageBackground></View></TouchableWithoutFeedback>
            </View>
   <FlatList
            style={{
                marginTop: 4,
                marginBottom: 50,
                backgroundColor: 'transparent',
            }}
            data = {data}
            showsHorizontalScrollIndicator = { false  }
            removeClippedSubviews={true}
            renderItem={({item, index}) => <ItemMVJob
                item={item}
                index={index}
                push={this.push}
                onSwipe={this.onSwipe}
                onSwipeUp={this.onSwipeUp}
                onSwipeDown={this.onSwipeDown}
                onSwipeLeft={this.onSwipeLeft}
                onSwipeRight={this.onSwipeRight}
                // getAudioTimeString={this.getAudioTimeString}
                />}
            initialNumToRender={5}
            maxToRenderPerBatch={10}
            updateCellsBatchingPeriod={70}
            getItemLayout={(data, index) => (
            {
                length: hp('28%'),
                offset: hp('28%') * index,
                index
            }
            )}
            keyExtractor = {
            (item, index) => index + ''
            }
            />
            {dark && (<ImageBackground style={{
                width: wp('100%'),
                height: hp('100%') - (StatusBar.currentHeight + 100 + hp(4)),
                position: "absolute"
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
            }}>Schedule InterView</Text></View>
            <View style={{
                marginTop: hp(10)
            }}><CustomInput placeholder = {'InterView Date'} textChange = {(text) => this.setState({
                name: text
            })} inputContainerStyle={{
                backgroundColor: themeColor,
                // width: "100%",
                height: scale(40),
                borderColor: themeColor,
                justifyContent: "center",
                borderWidth: scale(1),
                borderRadius: scale(5),
            }} inputStyle={{
                color: 'white',
                fontSize: scale(18),
                fontFamily: "Roboto-Bold",
                fontWeight: "bold"
            }}
            placeholderTextColor={themeWhite}
            containerStyle={{
                width: wp(75),
                height: scale(45)
            }}
            iconName={'calendar-outline'}
            iconColor={themeWhite}
            onFocus={() => this.setState({
                show: !this.state.show
            })}
            /></View>
             <View style={{
                marginTop: hp(2)
            }}><CustomInput placeholder = {'InterView Time'} textChange = {(text) => this.setState({
                name: text
            })} inputContainerStyle={{
                backgroundColor: themeColor,
                // width: "100%",
                height: scale(40),
                borderColor: themeColor,
                justifyContent: "center",
                borderWidth: scale(1),
                borderRadius: scale(5),
            }} inputStyle={{
                color: 'white',
                fontSize: scale(18),
                fontFamily: "Roboto-Bold",
                fontWeight: "bold"
            }}
            placeholderTextColor={themeWhite}
            containerStyle={{
                width: wp(75),
                height: scale(45)
            }}
            iconName={'time-outline'}
            iconColor={themeWhite}
            onFocus={() => this.setState({
                show1: !this.state.show1
            })}
            /></View>
            {show && (
            <DateTimePicker
            testID="dateTimePicker"
            value={this.state.currentDate}
            mode={'date'}
            is24Hour={true}
            display="default"
            onChange={this.onChange}
            />
            )}{show1 && (
            <DateTimePicker
            testID="dateTimePicker"
            value={this.state.currentDate}
            mode={'time'}
            is24Hour={false}
            display="default"
            onChange={this.onChange}
            />
            )}
            <View style={{
                marginTop: hp(30)
            }}><TouchableWithoutFeedback style={styles.OpportunityView} onPress={this.Shadule}>
            <View  style={{
                height: scale(40),
                width: scale(250),
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: themeColor,
                borderRadius: scale(5)
            }}><Text style={{
                fontSize: scale(18),
                fontFamily: FontBold,
                color: themeWhite,
                fontWeight: 'bold',
            }}>Schedule Now</Text></View>
            </TouchableWithoutFeedback></View>
           </View>
            </ImageBackground>)}
        </View>
        )
    }
}
;


// class CompanyProfile extends Component {
//     render() {
//         return <View><Text>{this.props.item.header}</Text></View>;
//     }
// }


export default withNavigationFocus(JobMatches);