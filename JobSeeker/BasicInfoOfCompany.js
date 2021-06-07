//skils need to changes by germen and english
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

const Items = global.language == 'english' ? true:false


class BasicInfoOfCompany extends Component {
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
        console.log('sfsfsfsfsffffffffffffffffffffffffffffffff>>>>>>>>>>>>>>>>>....', global.item.skills);
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
              height: hp('80%'),
              top: wp(14)
            }}
            >
            <View style={{
                alignItems: "center",
                top: hp(1),backgroundColor:"white"
            }}><Text style={{
                color: themeColor,
                fontWeight: 'bold',
                fontSize: scale(18),
                fontFamily: FontBold
            }}>Detail Skills</Text></View>
             <View style={{
                width: '90%',
                top: hp(5),
                height: hp('40%'),
                // backgroundColor: "#eee",
                marginHorizontal: wp('5%'),
                // marginTop: scale(20),
                borderRadius: scale(20),
            // elevation: 7,
            }}>
                <Text style={{fontSize:hp(2.7),color:"#333",fontFamily:FontBold}}>
                    SKILLS
                </Text>
                <ScrollView
                    style={{
                      backgroundColor: themeWhite,
                      // marginTop: '-7%',
                      marginBottom: 30,
                      // alignSelf: 'stretch',
                    }}
                    contentContainerStyle={{
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    //   marginHorizontal: wp(7),
                    }}
                    nestedScrollEnabled={true}>
                   {global.item.skills && global.item.skills.map((item, index) => {
                      return (
                        <View style={{
                flexDirection: "row",
                alignItems: "center",
                width:wp(82),
                    borderBottomWidth: scale(1),paddingVertical:5,
                height:'auto',borderBottomColor:'#eee',
            }} key={index}>
            <View style={{
                flexDirection: 'row',
                justifyContent:"space-between",
                // paddingBottom: hp(1),
                // width:wp(80)
            }}><View style={{width:wp(45)}}>
<Text style={{
                fontFamily: FontBold,
                fontSize: hp(2.5),
                color: themeColor,width:wp(40)
            }} numberOfLines={1}>{global.language == 'english' ? item.english : item.german}</Text>
            </View>
            <View style={{width:wp(39),alignItems:"flex-end"}}>
            <StarRating
                emptyStar={blanks}
                fullStar={Fulls}
                halfStar={'star-half'}
                iconSet={'MaterialIcons'}
                disabled={false}
                maxStars={5}
                starSize={hp(2.5)}
                rating={item.rating}
                starStyle={{marginLeft:2}}
                // selectedStar={(rating) => this.props.onStarRatingPress(rating)}
                fullStarColor={'orange'}
              />
            </View>
                    </View>
            <View style={{
                borderBottomWidth: scale(2),
                borderBottomColor: '#eee',
                width: wp(78),
                alignItems: "center"
            }}/></View>
                      );
                    })}
                  </ScrollView>
                <Text style={{fontSize:hp(2.7),color:"#333",fontFamily:FontBold}}>
                    LANGUAGE SKILLS
                </Text>
                <ScrollView
                    style={{
                      backgroundColor: themeWhite,
                      height:"auto",
                      // marginTop: '-7%',
                      // marginBottom: 30,
                      alignSelf: 'stretch',
                    }}
                    contentContainerStyle={{
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    //   marginHorizontal: wp(7),
                    }}
                    nestedScrollEnabled={true}>
                   {global.item.language1.length && global.item.language1.map((item, index) => {
                      return (
                        <View style={{
                flexDirection: "row",
                alignItems: "center",
                width:wp(82),paddingVertical:5,
                    borderBottomWidth: scale(1),
                height:'auto',borderBottomColor:'#eee',
            }} key={index}>
            <View style={{
                flexDirection: 'row',
                justifyContent:"space-between",
                // paddingBottom: hp(1),
                // width:wp(80)
            }}><View style={{width:wp(45)}}>
<Text style={{
                fontFamily: FontBold,
                fontSize: hp(2.5),
                color: themeColor,width:wp(40)
            }} numberOfLines={1}>{Items ? item.english : item.german}</Text>
            </View>
            <View style={{width:wp(39),alignItems:"flex-end"}}>
            <StarRating
                emptyStar={blanks}
                fullStar={Fulls}
                halfStar={'star-half'}
                iconSet={'MaterialIcons'}
                disabled={false}
                maxStars={5}
                starSize={scale(17)}
                rating={item.rating}
            starStyle={{marginLeft:2}}
                // selectedStar={(rating) => this.props.onStarRatingPress(rating)}
                fullStarColor={'orange'}
              />
            </View>
                    </View>
            <View style={{
                borderBottomWidth: scale(2),
                borderBottomColor: '#eee',
                width: wp(78),
                alignItems: "center"
            }}/></View>
                      );
                    })}
                  </ScrollView>
            </View>
            </View>
            <LinearGradient style={{bottom:48,backgroundColor:"white",justifyContent:"center",
              // zIndex: 5,
              height: 10,
              width: wp(100),}} colors={['white', 'rgba(171,171,171,0.1)', 'rgba(171,171,171,0.4)']}/>
          <View
            style={{
              // top: hp(6),
              bottom:47,backgroundColor:"white",justifyContent:"center",justifyContent:"center",
              // zIndex: 5,
              height: hp(5),
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
                      height: hp(3.5),
                      width: hp(3.5),
                    }}
                    resizeMode={'contain'}
                  />
                </View>
                <View>
                  <Image
                    source={rite}
                    style={{
                      height: hp(3.5),
                      width: hp(3.5),
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

export default withNavigationFocus(BasicInfoOfCompany);