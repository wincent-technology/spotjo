import React, {
  Component
} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  ScrollView,
  FlatList,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ImageBackground,
  Text,
  Image,
  View,
  ActivityIndicator,
} from 'react-native';
import {
  withNavigationFocus,
  NavigationEvents,
  ThemeColors
} from 'react-navigation';
import styles from './Style';
import {
  left,
  library,
  icon,
  play,
  leftVid
} from './IconManager';
import {
  themeColor,
  company,icons_jobType_blue,skillCategory,workExp,placeIcon,icons_salerytype,
  place,
  screen,
  edit,
  Mail,
  dollor,
  user,
  bag,
  Background,
  themeWhite,
  sort,
  filter,
  TRANLINE,
  url,
  Companyavtar,facebook,linkedin,whatsapp,web,
  FontBold,
  Listed,blanks,Fulls,
  detailed,backgroundCorner,settingTab,WhiteVideo
} from '../Constant/index';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../Component/responsive-ratio';
import {
  scale
} from './Util';
// import { Rating, AirbnbRating } from 'react-native-ratings';
import {
  Rating,
  NavigationHeader,StarRating
} from '../Component/ViewManager.js';
// import ItemMV from './ItemMV'
import Swipers from 'react-native-swiper';
import ListShow from '../Component/ListShow'
import Texting from '../Constant/Text'
import TopHeader from '../Component/TopHeader'
import Swiper from 'react-native-deck-swiper';

class CompanyProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      length:'',id:''
    };
  }

  checking = () => {
    const {
      params
    } = this.props.navigation.state;
    const item = params ? params.item : null;
    console.log('length',params.length)
    this.setState({
      data: item != undefined || '' ? item : '',
      length : params.length,
      id:params.index
    });
    

    // console.log('<<<<<<<<<<<<<',this.state.data.city.map(item => console.log(item)))
  };
  Back = () => {
    console.log('global.all>>>>>>>>>>>>', global.all);
    this.props.navigation.goBack();
  };
  Filter = () => {
    this.props.navigation.navigate('Filter');
  };

  renderCard = (data, index) => {
    // this.setState({
    //     id: index
    // })

    return (
      <ScrollView
        style={{
          alignSelf: 'stretch',
        }}>
        <View onStartShouldSetResponder={() => true}>
          <ImageBackground
            style={{
              width: wp('96%'),
              height: hp('100%') - (StatusBar.currentHeight + scale(100) + hp(5)),
              paddingBottom:15
            }}
            source={require('../Img/ract.png')}
            resizeMode={'stretch'}>
            <ScrollView removeClippedSubviews={true} keyboardShouldPersistTaps={'handled'} style={{height:hp('100%') - (StatusBar.currentHeight + scale(100) + hp(5)),alignSelf:"stretch",marginBottom:15}} nestedScrollEnabled = {true}>
            <View style={{
                top: hp(2),
                marginHorizontal: wp(7)
            }}><Text style={{
                color: '#333',
                fontSize: scale(23),
                fontFamily: "Roboto-Bold"
            }}>{data.title}</Text></View>
                    <View style={{
                flexDirection: "row",
                alignItems: "flex-start",
            }}>
   <ImageBackground style={{
                marginTop: hp(4.5),
                marginLeft: wp(7),
                width: wp(32),
                height: wp(32),
                justifyContent: "center",
                alignItems: "center",
                zIndex: 5
            }}
            source={backgroundCorner}><Image 
            source={data.logo
                    ? {
                        uri: url + 'images/company/' + data.logo,
                      }
                    : Companyavtar
                          }
            style={{
                height: wp('29'),
                width: wp('29'),
            // alignItems: "stretch",
            // backgroundColor: "transparent"
            }} resizeMode={'contain'}/></ImageBackground>
            <View style={{
                flexDirection: "column",
                height: wp(32),
                width: wp(50),justifyContent:"center",alignItems:"center",
                marginTop: hp(3),marginHorizontal:wp(2),
            }}>
            <TouchableWithoutFeedback onPress = {() => this.props.navigation.navigate('VideoPlayer', {
                vid: url + '/images/company/' + data.video
            })}><View style={{
                flexDirection: "column",
                // height: hp(9),
                width: wp(26),
                alignItems: "center",
                justifyContent: "center"
            }}><Image source={WhiteVideo}  tintColor={themeColor}resizeMode={'contain'} style={{
                height: scale(65),
                width: scale(65),
            }}/><View style={{marginTop:scale(-10)}}><Text style={{
                color: themeColor,
                fontFamily: "Roboto-Regular",
                fontSize: scale(10)
            }}>Company Profile</Text></View>
            </View></TouchableWithoutFeedback>
            <View style={{height:1,width:wp(40),backgroundColor:"#333",marginVertical:scale(7)}}/>
            <View style={{marginTop:scale(5)}}>
            <StarRating
            emptyStar={blanks}
            starStyle={{marginLeft:5}}
            fullStar={Fulls}
            halfStar={'star-half'}
            iconSet={'MaterialIcons'}
            disabled={false}
            maxStars={5}
            starSize={scale(15)}
            rating={3}
            // selectedStar={(rating) => this.handleLanguage(rating, index)}
            fullStarColor={'orange'}
            /></View>
            </View>
            </View>
            <View style={{
                marginLeft: wp(7),
                marginTop: hp(1),
                height: hp(3),
                width: wp(32),
                alignItems: "center",
                justifyContent: "center",
                flexDirection: 'row'
            }}><Image source={facebook} resizeMode={'contain'} style={{
                height: scale(25),
                width: scale(25)
            }}/><Image source={linkedin} resizeMode={'contain'} style={{
                height: scale(25),
                width: scale(25),
                marginHorizontal: wp(1)
            }}/><Image source={whatsapp} resizeMode={'contain'} style={{
                height: scale(25),
                width: scale(25)
            }}/>
            </View>
            <View style={styles.CompanyProfileDetail}>
            <ListShow name={data.name} image={company} />
                    <ListShow name={data.isEmployed ? 'Employed' : 'Fresher' } image={icons_jobType_blue} />
                    <ListShow name={data.title} image={skillCategory} />
                      <View style={styles.CompanyDetailIcon}>
                        <View style={styles.CompanyDetailProfileIcon}>
                          <Image
                            source={workExp}
                            style={styles.imageStyle}
                            resizeMode={'contain'}
                          />
                        </View>
                        <Text style={styles.ItemDetailLabel1}>
                        {data.minExp != '' && data.minExp != null
                  ? data.minExp
                  : 0 } 
                 -{ data.maxExp != '' && data.maxExp != null
                  ? data.maxExp
                  : 0 }
                {' '}Years /{' '}
                        </Text>
                        <Text style={styles.CompanyProfileDetailLabel100}>
                          100%
                        </Text>
                      </View>
                      <View style={{height:0.5,width:wp(80)-24,backgroundColor:themeColor,marginLeft:5,marginTop:3,}}/>
                      <View style={styles.CompanyDetailIcon}>
                        <View style={styles.CompanyDetailProfileIcon}>
                          <Image
                            source={placeIcon}
                            style={styles.imageStyle}
                            resizeMode={'contain'}
                          />
                        </View>
                        <Text style={styles.ItemDetailLabel1}>
                        {data != null || data && data.city.map((item, index) => {
                      return (
                        <Text key={index} style={styles.ItemDetailLabel1}>
                          {item} /
                        </Text>
                      );
                    })}</Text>
                        <Text style={styles.CompanyProfileDetailLabel100}>
                          {' '}
                          100%
                        </Text>
                      </View>
                      <View style={{height:0.5,width:wp(80)-24,backgroundColor:themeColor,marginLeft:5,marginTop:3,}}/>
                      <View style={styles.CompanyDetailIcon}>
                        <View style={styles.CompanyDetailProfileIcon}>
                          <Image
                            source={icons_salerytype}
                            style={styles.imageStyle}
                            resizeMode={'contain'}
                          />
                        </View>
                        <Text style={styles.ItemDetailLabel1}>
                          {data.salMin} - {data.salMax},000$
                        </Text>
                      </View>
                      <View style={{height:0.5,width:wp(80)-24,backgroundColor:themeColor,marginLeft:5,marginTop:3,}}/>
                    <ListShow name={data.website} image={web} />
            </View>
            </ScrollView>
          </ImageBackground></View>
      </ScrollView>
    );
  };

  onSwiped = (type, index) => {
      this.props.navigation.navigate('LoginFirst')
  };


  render() {
    const {
      data,id
    } = this.state;
    return data != '' ? (
      <SafeAreaView style={styles.backGround}>
        <NavigationEvents onDidFocus={this.checking} />

        <ImageBackground
          style={styles.ImageBlue}
          source={Background}
          tintColor={themeWhite}
          resizeMode={'stretch'}>
          <NavigationHeader onPress={() => this.Back()} text={data.title} />
          <TopHeader data={this.state.length && this.state.length} Listed = {this.Back} Filter={this.Filter} detailed={this.pushy}/>
          <View style={styles.CompanyProfileMainImage1}>
          <Swiper
                    ref={(swiper) => {
                      this.swiper = swiper;
                    }}
                    cardStyle={{
                      width: wp('96%'),
                      flex:1,marginBottom:10
                    }}
                    inputOverlayLabelsOpacityRangeX={[wp(-100) / 3, -1, 0, 1, wp(100) / 3]}
                  overlayOpacityHorizontalThreshold={1}
                    backgroundColor={'transparent'}
                    cardHorizontalMargin={0}
                    cardVerticalMargin={0}
                    onSwiped={(g) => this.onSwiped('general',g)}
                    onSwipedLeft={(index) => this.onSwiped('left', index)}
                    onSwipedRight={(index) => this.onSwiped('right', index)}
                    onSwipedTop={(index) => this.onSwiped('top', index)}
                    onSwipedBottom={(index) => this.onSwiped('bottom', index)}
                    cards={global.all}
                    cardIndex={id}
                    stackSize={2}
                    showSecondCard={true}
                    renderCard={this.renderCard}
                    animateOverlayLabelsOpacity
                    animateCardOpacity
                    swipeBackCard
                    overlayLabels={{
                      bottom: {
                        title: 'Save',
                        style: {
                          label: {
                            borderColor: themeColor,
                            color: themeColor,
                            borderWidth: 5,
                            fontSize: 32,
                            borderRadius: 5,
                            textAlign: 'center',
                          },
                          wrapper: {
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                          },
                        },
                      },

                      left: {
                        title: 'Not Interested',
                        style: {
                          label: {
                            borderColor: 'red',
                            color: 'red',
                            borderWidth: 5,
                            fontSize: 32,
                            borderRadius: 5,
                            textAlign: 'center',
                          },
                          wrapper: {
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                          },
                        },
                      },
                      right: {
                        title: 'Applied',
                        style: {
                          label: {
                            borderColor: 'green',
                            color: 'green',
                            borderWidth: 5,
                            fontSize: 32,
                            borderRadius: 5,
                            textAlign: 'center',
                          },
                          wrapper: {
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                          },
                        },
                      },
                      top: {
                        title: 'Share',
                        style: {
                          label: {
                            borderColor: '#fcba03',
                            color: '#fcba03',
                            borderWidth: 5,
                            fontSize: 32,
                            borderRadius: 5,
                            textAlign: 'center',
                          },
                          wrapper: {
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            // marginTop: (hp('100%') - (StatusBar.currentHeight + scale(100) + hp(5)))/2,
                            // marginLeft: -48,
                          },
                        },
                      },
                    }}
                  />
          </View>
        </ImageBackground>
      </SafeAreaView>
    ) : (
      <SafeAreaView style={styles.backGround}>
        <ImageBackground
          style={[
            styles.ImageBlue,
            {
              justifyContent: 'center',
              alignItems: 'center',
            },
          ]}
          source={Background}
          tintColor={themeWhite}
          resizeMode={'stretch'}>
          <ActivityIndicator size="large" color={themeColor} />
          <NavigationEvents onDidFocus={this.checking} />
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

export default withNavigationFocus(CompanyProfile);