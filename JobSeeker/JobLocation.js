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
    withNavigationFocus,
    NavigationEvents
} from 'react-navigation';
import styles from '../src/Style'
import {
    left,
    leftVid
} from '../src/IconManager';
import {
    scale
} from '../src/Util'
import {
    themeColor,
    themeWhite,
    TRANLINE,
    rightWrongBack,
    rite,
    wrong,
    Companyavtar,
    url,Fulls,blanks
} from '../Constant/index'
import {
    StarRating,
    NavigationHeader
} from '../Component/ViewManager'
import CustomButton from '../Component/Button'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from '../Component/responsive-ratio';
import {
    FontBold,
    FontRegular,
    Background
} from '../Constant/index'
import LinearGradient from 'react-native-linear-gradient';
import MapView, {
  PROVIDER_GOOGLE,
  Circle,
  Marker,
  AnimatedRegion,
} from 'react-native-maps';

class JobLocation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: ''
        };
    }

    Back = () => {
        // console.log("hi");
        this.props.navigation.goBack()
    }
    save = () => {
        // alert('video is coming soon');
        this.props.navigation.navigate('JobEditProfile');
    }
    Personal = () => {
        this.props.navigation.navigate('Personal');
    }
    componentDidMount() {
        this.checking();
    }

    checking = () => {
        console.log('sfsfsfsfsffffffffffffffffffffffffffffffff>>>>>>>>>>>>>>>>>....');
        const {
            params
        } = this.props.navigation.state;
        const item = global.item;
        // console.log('other item', item);
        this.setState({
            data: global.item
        })
    }
    render() {
        const {
            data
        } = this.state
        return (
            <SafeAreaView style={styles.backGround}>
            <NavigationEvents onDidFocus={this.checking}/>
            <ImageBackground style={styles.ImageBlue}
            source={Background}
            resizeMode={'stretch'}>
                <StatusBar hidden={true} />
                <View
            style={{
              width: wp('96%'),
              marginHorizontal: wp(2),
              height: hp('100%') - (100 + wp(14) + 50),
              top: wp(14)
            }}
            >
            <View style={{
                alignItems: "center",
                top: hp(1)
            }}><Text style={{
                color: themeColor,
                fontWeight: 'bold',
                fontSize: scale(18),
                fontFamily: FontBold
            }}>Location</Text></View>
              <MapView.Animated
              ref={(ref) => {
                this.map = ref;
              }}
              style={{
                width: '100%',
              // marginHorizontal: wp(2),
              marginTop:"2%",
              height: '100%',
              // top: wp(14)
              }}
              provider={PROVIDER_GOOGLE}
              onMapReady={() => {
                //alert('dfdf');
                this.map.animateToRegion(
                  {
                    latitude: global.item.latitude,
                    longitude: global.item.longitude,
                  },
                  100,
                );
              }}
              showsUserLocation={true}>
            </MapView.Animated>
            </View>
            <LinearGradient style={{top:hp('100%') - (100 + wp(14)),position:"absolute",backgroundColor:"white",justifyContent:"center",
              // zIndex: 5,
              height: 10,
              width: wp(100),}} colors={['white', 'rgba(171,171,171,0.1)', 'rgba(171,171,171,0.4)']}/>
          <View
            style={{
              // top: hp(6),
              top:hp('100%') - (90 + wp(14)),position:"absolute",backgroundColor:"white",justifyContent:"center",
              // zIndex: 5,
              height: 50,
              width: wp(100),
              // left: wp(-2),
              // transform: [{ rotate: "90deg" }]
            }}
            ><View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    marginRight: wp(25),
                  }}>
                  <Image
                    source={wrong}
                    style={{
                      height: scale(30),
                      width: scale(30),
                    }}
                    resizeMode={'contain'}
                  />
                </View>
                <View>
                  <Image
                    source={rite}
                    style={{
                      height: scale(35),
                      width: scale(35),
                    }}
                    resizeMode={'contain'}
                  />
                </View>
              </View>
          </View>
                </ImageBackground></SafeAreaView>
        )
    }
}

export default withNavigationFocus(JobLocation);