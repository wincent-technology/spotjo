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
  ScrollView,
} from 'react-native';
import {
  withNavigationFocus
} from 'react-navigation';
import styles from '../src/Style';
import {
  left,
  leftVid
} from '../src/IconManager';
import {
  scale
} from '../src/Util';
import {
  themeColor,
  themeWhite,
  TRANLINE,
  rightWrongBack,
  rite,
  wrong,
} from '../Constant/index';
import {
  Rating,
  NavigationHeader
} from '../Component/ViewManager';
import CustomButton from '../Component/Button';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../Component/responsive-ratio';
import {
  FontBold,
  FontRegular,
  Background
} from '../Constant/index';
import JobDescriptionItemMV from './JobDescriptionItemMV';
import LinearGradient from 'react-native-linear-gradient';

class JobDescription extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: '',
      date: '',
    };
  }

  Back = () => {
    // console.log("hi");
    this.props.navigation.goBack();
  };
  save = () => {
    // alert('video is coming soon');
    this.props.navigation.navigate('JobEditProfile');
  };
  Personal = () => {
    this.props.navigation.navigate('Personal');
  };
  componentDidMount() {
    const {
      params
    } = this.props.navigation.state;
    const item = global.item;
    console.log('sdsdsdsdsdsd', global.item);
    // console.log('other item', item);
    // this.setState({
    //   data: item != undefined || item != null ? item.description.split('\n') : '',
    // });
  }

  render() {
    const {
      data
    } = this.state;

    return (
      <SafeAreaView style={styles.backGround}>
        <ImageBackground
          style={styles.ImageBlue}
          source={Background}
          resizeMode={'stretch'}>
          <StatusBar hidden={false} backgroundColor={themeColor} />
          <View
            style={{
              width: wp('96%'),
              marginHorizontal: wp(2),
              height: hp('100%') - (100 + wp(14) + 50),
              top: wp(14),
            }}
            >
            <View
              style={{
                alignItems: 'center',
                top: hp(1),
              }}>
              <Text
                style={{
                  color: themeColor,
                  fontWeight: 'bold',
                  fontSize: scale(18),
                  fontFamily: FontBold,
                }}>
                Job description
              </Text>
            </View>
            <FlatList
              style={{
                marginTop: scale(10),
                marginBottom: 50,
                backgroundColor: 'transparent',
              }}
              data={
                global.item.description || global.item.description != null && global.item.description.split('\n')
              }
              showsHorizontalScrollIndicator={false}
              removeClippedSubviews={true}
              renderItem={({item, index}) => (
                <JobDescriptionItemMV item={item} index={index} />
              )}
              initialNumToRender={5}
              maxToRenderPerBatch={10}
              updateCellsBatchingPeriod={70}
              getItemLayout={(data, index) => ({
                length: hp('28%'),
                offset: hp('28%') * index,
                index,
              })}
              keyExtractor={(item, index) => index + ''}
            />
            
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
            >
              <View
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
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

export default withNavigationFocus(JobDescription);



{/* <View
              style={{
                alignItems: 'center',
                top: hp(1),
              }}>
              <Text
                style={{
                  color: themeColor,
                  fontWeight: 'bold',
                  fontSize: scale(18),
                  fontFamily: FontBold,
                }}>
                Requirement
              </Text>
            </View>
            <FlatList
              style={{
                marginTop: scale(10),
                marginBottom: 50,
                backgroundColor: 'transparent',
              }}
              data={
                global.item.description1 && global.item.description1.split('\n')
              }
              showsHorizontalScrollIndicator={false}
              removeClippedSubviews={true}
              renderItem={({item, index}) => (
                <JobDescriptionItemMV item={item} index={index} />
              )}
              initialNumToRender={5}
              maxToRenderPerBatch={10}
              updateCellsBatchingPeriod={70}
              getItemLayout={(data, index) => ({
                length: hp('28%'),
                offset: hp('28%') * index,
                index,
              })}
              keyExtractor={(item, index) => index + ''}
            /> */}