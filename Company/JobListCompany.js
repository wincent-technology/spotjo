import React, { PureComponent } from 'react';
import { SafeAreaView, StyleSheet, StatusBar, FlatList, TouchableWithoutFeedback, TouchableOpacity, ImageBackground, Text, Image, View } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import styles from '../src/Style'
import { left, library, icon, play, leftVid } from '../src/IconManager';
import { themeColor, themeWhite, Background, sort, filter, TRANLINE, male, female, canvas } from '../Constant/index'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../Component/responsive-ratio';
import { scale } from '../src/Util'
// import { Rating, AirbnbRating } from 'react-native-ratings';
import { Rating, NavigationHeader } from '../Component/ViewManager.js'
import ItemMVJob from './ItemMVJob'
import CompanyProfile from '../src/CompanyProfile';
import DeviceInfo from 'react-native-device-info';

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

class JobListCompany extends PureComponent {


    constructor(props) {
        super(props);

        this.state = {

        };
    }

    Filter = () => {
        this.props.navigation.navigate('Filter')
    }

    push = (item) => {
        console.log("heelo", item);
        global.item = item;
        this.props.navigation.navigate('UserProfile')
    }
    Back = () => {
        this.props.navigation.navigate('ChooseTalent')
    }
    render() {
        console.warn(">>", DeviceInfo.hasNotch())

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


export default withNavigationFocus(JobListCompany);