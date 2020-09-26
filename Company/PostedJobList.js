import React, { PureComponent } from 'react';
import { SafeAreaView, StyleSheet, StatusBar, FlatList, TouchableWithoutFeedback, TouchableOpacity, ImageBackground, Text, Image, View } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import styles from '../src/Style'
import { left, library, icon, play, leftVid } from '../src/IconManager';
import { themeColor, themeWhite, Background, sort, filter, TRANLINE, canvas } from '../Constant/index'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../Component/responsive-ratio';
import { scale, snack } from '../src/Util'
// import { Rating, AirbnbRating } from 'react-native-ratings';
import { Rating, NavigationHeader } from '../Component/ViewManager.js'
import ItemMV from './ItemMV'
import DeviceInfo from 'react-native-device-info';
import http from '../api'

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
}];

global.item = data[0];

class PostedJobList extends PureComponent {


    constructor(props) {
        super(props);

        this.state = {
            dataitem: []
        };
        this._isMounted = false;

    }

    Filter = () => {
        this.props.navigation.navigate('Filter')
    }

    push = (item) => {
        console.log('ji');
    // global.item = item;
    // this.props.navigation.navigate('CompanyProfile')
    }
    Back = () => {
        // this.props.navigation.navigate('ChooseTalent')
    }

    componentWillUnmount() {
        this._isMounted = false;
    }
    componentDidUpdate() {

        try {
            this._isMounted && http.POST('api/applogcom/job', {
                companyId: global.Id,
            }).then((res) => {
                if (res['data']['status']) {
                    console.log('rrrrrrrrr', res['data']['result']);
                    this._isMounted = false
                    this.setState({
                        dataitem: res['data']['result']
                    })
                    // this.props.navigation.navigate('AdminDashboard');
                    // this.postedJob(res['data']['result']);

                } else {
                    snack(res['data']['message'])

                }
            }, err => alert(JSON.stringify(err)));
        } catch ( error ) {
            snack(error)
        }
    }

    componentDidMount() {
        this._isMounted = true
        try {
            this._isMounted && http.POST('api/applogcom/job', {
                companyId: global.Id,
            }).then((res) => {
                if (res['data']['status']) {
                    console.log('rrrrrrrrr', res['data']['result']);
                    this.setState({
                        dataitem: res['data']['result']
                    })
                    // this.props.navigation.navigate('AdminDashboard');
                    // this.postedJob(res['data']['result']);

                } else {
                    snack(res['data']['message'])

                }
            }, err => alert(JSON.stringify(err)));
        } catch ( error ) {
            snack(error)
        }
    }

    Video = (item) => {
        console.log('hels');
        global.Video = item.video
        if (global.Video)
            this.props.navigation.navigate('VideoPlayer')
        else
            alert('video coming soon');
    // this.props.navigation.navigate('VideoResume');
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
            }}>{this.state.dataitem.length}</Text><View><Text style={{
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
            data = {this.state.dataitem}
            showsHorizontalScrollIndicator = { false  }
            removeClippedSubviews={true}
            renderItem={({item, index}) => <ItemMV
                item={item}
                index={index}
                push={this.push}
                Video={this.Video}
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

export default withNavigationFocus(PostedJobList);