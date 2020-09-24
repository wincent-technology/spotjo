import React, { PureComponent } from 'react';
import { SafeAreaView, StyleSheet, StatusBar, FlatList, TouchableWithoutFeedback, TouchableOpacity, ImageBackground, Text, Image, View } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import styles from '../src/Style'
import { left, library, icon, play, leftVid } from '../src/IconManager';
import { themeColor, themeWhite, Background, sort, filter, TRANLINE, canvas } from '../Constant/index'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../Component/responsive-ratio';
import { scale } from '../src/Util'
// import { Rating, AirbnbRating } from 'react-native-ratings';
import { Rating, NavigationHeader } from '../Component/ViewManager.js'
import ItemMV from '../src/ItemMV'
import DeviceInfo from 'react-native-device-info';

// import styles from './Style'
var c = 0;
const data = [{
    Header: 'JAVA DEVELOPER(M/W)',
    image: 'https://turbologo.com/articles/wp-content/uploads/2019/11/Porsche-logo-cover-1280x720.jpg',
    ComPany_Name: 'Porsche AG',
    Working: 'Employed',
    Address: 'Stuttgart',
    skill: ['JAVA', 'J2EE', 'SQL'],
    work_Experience: '5-6 Years',
    salary: '50000$',
    webSite: 'www.example.com'
}, {
    Header: 'Senior Java Devloper',
    image: 'https://cdn.vox-cdn.com/thumbor/2eZPJ-j9zXm5AIro7TIiEBCgNoc=/0x0:640x427/1200x800/filters:focal(0x0:640x427)/cdn.vox-cdn.com/assets/3218223/google.jpg',
    ComPany_Name: 'Google',
    Working: 'Employed',
    Address: 'Stuttgart',
    skill: ['JAVA', 'J2EE', 'SQL'],
    work_Experience: '5-6 Years',
    salary: '50000$',
    webSite: 'www.example.com'
}, {
    Header: 'JAVA DEVELOPER / J2EE',
    image: 'https://logos-world.net/wp-content/uploads/2020/04/Amazon-Logo.png',
    ComPany_Name: 'Amazon',
    Working: 'Employed',
    Address: 'Stuttgart',
    skill: ['JAVA', 'J2EE', 'SQL'],
    work_Experience: '5-6 Years',
    salary: '50000$',
    webSite: 'www.example.com'
}, {
    Header: 'JAVA DEVELOPER(M/W)',
    image: 'https://di-uploads-pod3.dealerinspire.com/porscheoffremont/uploads/2018/09/porsche-logo.jpg',
    ComPany_Name: 'Porsche AG',
    Working: 'Employed',
    Address: 'Stuttgart',
    skill: ['JAVA', 'J2EE', 'SQL'],
    work_Experience: '5-6 Years',
    salary: '50000$',
    webSite: 'www.example.com'
},];

global.item = data[0];

class PostedJobList extends PureComponent {


    constructor(props) {
        super(props);

        this.state = {

        };
    }

    Filter = () => {
        this.props.navigation.navigate('Filter')
    }

    push = (item) => {
        global.item = item;
    // this.props.navigation.navigate('CompanyProfile')
    }
    Back = () => {
        // this.props.navigation.navigate('ChooseTalent')
    }
    createJob = () => {
        console.log('hey');
        this.props.navigation.navigate('CreateJob');
    }
    render() {
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
            <TouchableWithoutFeedback onPress={this.PostedJob} style={{
                alignItems: 'center',
                width: wp(100) / 3,
                height: hp(10),
                borderRadius: scale(20),
            }}><View style={{
                alignItems: 'center',
                width: wp(100) / 3,
                height: hp(10),
                borderRadius: scale(100),
            // marginLeft: wp(1),
            // justifyContent: "center",
            // flexDirection: "column"
            }}><ImageBackground source={canvas} style={{
                height: '100%',
                width: '100%',
                borderRadius: scale(100),
                position: "absolute",
                alignItems: "center",
                justifyContent: "center"
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
            renderItem={({item, index}) => <ItemMV
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
            <View>
            <TouchableWithoutFeedback onPress={this.createJob}>
            <View style={{
                bottom: scale(30),
                position: "absolute",
                marginHorizontal: wp(2),
                // backgroundColor: 'rgba(0,0,0,0.8)',
                borderRadius: wp(15),
            // justifyContent: "center",
            // alignItems: "center"
            }}><ImageBackground source={require('../Img/create-job.png')} style={{
                height: scale(60),
                width: wp(96),
                justifyContent: "center",
                alignItems: "center"
            }} resizeMode={'stretch'}>
            <Text style={{
                color: themeWhite,
                fontSize: scale(20),
                fontFamily: "Roboto-Bold"
            }}>Create Job</Text>
           </ImageBackground></View>
            </TouchableWithoutFeedback>
            </View>
        </View>
        )
    }
}

export default withNavigationFocus(PostedJobList);