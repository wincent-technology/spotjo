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
  earth,
  dollor,
  user,
  bag,
  Background,
  themeWhite,
  sort,
  filter,
  TRANLINE,
  url,
  Companyavtar,facebook,linkedin,whatsapp,
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
class CompanyProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
    };
  }

  checking = () => {
    // console.log('hey')
    const {
      params
    } = this.props.navigation.state;
    const item = params ? params.item : null;
    // console.log('other item', item);
    this.setState({
      data: item != undefined || '' ? item : '',
    });
  };
  Back = () => {
    console.log('global.all>>>>>>>>>>>>', global.all);
    this.props.navigation.goBack();
  };


  render() {
    const {
      data
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
          <View style={styles.JoblistSecondViewHeading}>
            <View style={styles.JoblistSecondViewHeadingResult}>
              <Text style={styles.JoblistSecondViewHeadingText}>
                Results - {data.length}
              </Text>
            </View>
            <View style={styles.JobListUpperButtonView}>
              <View style={{marginRight: scale(5), flexDirection: 'row'}}>
                <TouchableWithoutFeedback onPress={this.Back}>
                  <View style={styles.JobListUpperButtonIcon}>
                    <Image
                      source={Listed}
                      style={{
                        height: scale(26),
                        width: scale(26),
                        marginTop: scale(2),
                        marginHorizontal: scale(10),
                      }}
                      resizeMode={'contain'}
                    />
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback>
                  <View style={styles.JobListUpperButtonIcon}>
                    <Image
                      source={detailed}
                      style={{
                        height: scale(26),
                        width: scale(26),
                        marginTop: scale(2),
                      }}
                      resizeMode={'contain'}
                    />
                  </View>
                </TouchableWithoutFeedback>
              </View>
              <TouchableWithoutFeedback>
                <View
                  style={[
                    {
                      marginRight: scale(15),
                    },
                    styles.JobListUpperButtonIcon,
                  ]}>
                  <Image
                    source={sort}
                    style={{
                      height: scale(20),
                      width: scale(16),
                    }}
                    resizeMode={'contain'}
                  />
                  <Text style={styles.JoblistUpperButton}>Sort</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={this.Filter}>
                <View style={styles.JobListUpperButtonIcon}>
                  <Image
                    source={filter}
                    style={{
                      height: scale(19),
                      width: scale(14),
                      marginTop: scale(1),
                    }}
                    resizeMode={'contain'}
                  />
                  <Text style={styles.JoblistUpperButton}>Filter</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
          <View style={styles.CompanyProfileMainImage1}>
            <Swipers
              scrollEnabled={true}
              showsPagination={false}
              onIndexChanged={(index) => console.log('index', index)}
              ref={'swiper'}
              index={this.state.changedindex}>
              <ScrollView>
                <View>
                  <ImageBackground
                    style={{
                      width: wp('96%'),
                      height:
                        hp('100%') -
                        (StatusBar.currentHeight + scale(100) + hp(5)),
                      overflow: 'hidden',
                    }}
                    source={require('../Img/ract.png')}
                    resizeMode={'stretch'}>
                    <View style={{
                top: hp(4),
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
            source={
                            data.logo
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
                vid: global.Video
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
                    <View style={[styles.CompanyProfileDetail,{marginTop:10}]}>
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
                          {data.minExp} - {data.maxExp} Years /
                        </Text>
                        <Text style={styles.CompanyProfileDetailLabel100}>
                          {' '}
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
                          {data.city} /
                        </Text>
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
                    <ListShow name={data.website} image={earth} />
                    </View>
                  </ImageBackground>
                </View>
              </ScrollView>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  // flex: 1,
                  height:
                    hp('100%') - (StatusBar.currentHeight + scale(100) + hp(5)),
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontFamily: FontBold,
                    color: themeWhite,
                    fontSize: scale(18),
                    width: wp(60),
                  }}>
                  Please login to our app
                </Text>
              </View>
            </Swipers>
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