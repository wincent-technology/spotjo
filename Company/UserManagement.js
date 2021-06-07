import React, {
    PureComponent
} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    StatusBar,
    FlatList,
    TouchableWithoutFeedback,
    TouchableOpacity,
    ImageBackground,
    Text,
    Image,
    View
} from 'react-native';
import {
    withNavigationFocus,
    NavigationEvents
} from 'react-navigation';
import styles from '../src/Style'
import {
    left,
    library,
    icon,
    play,
    leftVid
} from '../src/IconManager';
import {
    themeColor,
    themeWhite,
    Background,
    sort,
    filter,
    TRANLINE,
    overlayimage,
    url,
    FontBold
} from '../Constant/index'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from '../Component/responsive-ratio';
import {
    scale,snack
} from '../src/Util'
// import { Rating, AirbnbRating } from 'react-native-ratings';
import {
    Rating,
    NavigationHead
} from '../Component/ViewManager.js'
import DeviceInfo from 'react-native-device-info';
// import UserCreation from './UserCreation';
import User from './User'
import http from '../api'


class UserManagement extends PureComponent {


    constructor(props) {
        super(props);

        this.state = {
            data: []
        };
        this._isMounted = false

    }


    Video = (item) => {
        // console.log('hels');
        // let m = url + 'images/company/' + item.video
        if (global.Video)
            this.props.navigation.navigate('VideoPlayer', {
                vid: global.Video
            })
        else
            alert('not uploaded');
        // this.props.navigation.navigate('VideoResume');
    }
    push = (item) => {
        console.log('item', item)
        this.props.navigation.navigate('UserEdit', {
            UserChange: item
        });
    }
    Filter = () => {
        this.props.navigation.navigate('Filter')
    }
    Back = () => {
        this.props.navigation.navigate('UserProfile')
    }
    createJob = () => {
        console.log('hey');

        this.props.navigation.navigate('UserCreation');
    }
    componentWillUnmount() {
        this._isMounted = false

    }
    componentDidMount() {
        this._isMounted = true

        this.checking();
    }

    onStarRatingPress(rating) {
        // this.setState({
        //     starCount: rating
        // });
    }

    checking = () => {
        console.log('isfsdf');
        this._isMounted = true

        try {
            this._isMounted && http.POST('api/comuser/get', {
                companyId: global.Id,
                role:'4'
            }).then((res) => {
                if (res['data']['status']) {
                    console.log('user 59', res['data']['result']);
                    this.setState({
                        data: res['data']['result'],
                    })
                } else {
                    snack(res['data']['message'])

                }
            }, err => snack(JSON.stringify(err)));
        } catch (error) {
            snack(error)
        }

    }
    render() {
        const {
            data
        } = this.state;
        return (
            <View style={styles.backGround}>
                <StatusBar hidden={false} backgroundColor={themeColor} />
                <ImageBackground style={styles.ImageBlue}
            source={Background}
            tintColor={themeWhite}
            resizeMode={'stretch'}>
        <NavigationEvents onDidFocus={this.checking}/>
                    <NavigationHead centerComponent='User Management' creauser = {true} rightComponent='edit' onPress={() => this.Back()} onExit={() => this.createJob()} />
                    <View style={{
                // height: hp(100) - scale(100)
                flex:1
            }}>
            {data != '' ? (<FlatList
            style={{
                marginTop: 4,
                marginBottom: 50,
                backgroundColor: 'transparent',
            }}
            data = {data}
            showsHorizontalScrollIndicator = { false  }
            removeClippedSubviews={true}
            renderItem={({item, index}) => <User
                item={item}
                index={index}
                Video={this.Video}
                push={this.push}
                onStarRatingPress={this.onStarRatingPress}
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
            />) : (<View  style = {{
                    justifyContent: "center",
                    alignItems: "center",
                height: hp(100) - scale(100),
                    width:wp(100)
                }}>
            <Text style={{
                    textAlign: 'center',
                    fontFamily: FontBold,
                    color: themeColor,
                    fontSize: scale(18),
                    width: wp(60)
                }}>No Data found 😞</Text>
            </View>) }
            </View>
            
                </ImageBackground>
            </View>
        )
    }
};

export default withNavigationFocus(UserManagement);


// <View style={{
//                 bottom: 50,
//                 // position: "absolute",

//             }}>
//             <TouchableWithoutFeedback onPress={this.createJob}>
//             <View style={{
//                 marginHorizontal: wp(8),
//                 borderRadius: 15,height:50,
//                 justifyContent:"center",alignItems:"center",backgroundColor:themeColor
//             }}>
//             <Text style={{
//                 color: themeWhite,
//                 fontSize: scale(20),
//                 fontFamily: "Roboto-Bold"
//             }}>Create User</Text>
//            </View>
//             </TouchableWithoutFeedback>
            
//             </View>