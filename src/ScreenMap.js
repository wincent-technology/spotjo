import React, {PureComponent} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Platform,
  Dimensions,
  FlatList,
  PermissionsAndroid,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ImageBackground,
  Text,
  Image,
  View,
} from 'react-native';
import {withNavigationFocus, NavigationEvents} from 'react-navigation';
import styles from './Style';
import {left, library, icon, play, leftVid} from './IconManager';
import {
  themeColor,
  themeWhite,
  Background,
  sort,
  filter,
  TRANLINE,
  FontBold,
  url,
} from '../Constant/index';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../Component/responsive-ratio';
import {scale, snack} from './Util';
import {NavigationHeader} from '../Component/ViewManager';
import Slider from '@react-native-community/slider';
import ItemMV from './ItemMV';
import MapView, {
  PROVIDER_GOOGLE,
  Circle,
  Marker,
  AnimatedRegion,
} from 'react-native-maps';
import flagBlueImg from '../Img/circle-16.png';
import Geolocation from '@react-native-community/geolocation';
import http from '../api';
// import Svg, { Circle } from 'react-native-svg';
const SPACE = 0.01;

// let LATITUDE_DELTA = 0.0922;
// const LONGITUDE_DELTA = 0.0421;

// const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = wp(96) / wp(65);
const LATITUDE_DELTA = Platform.OS === 'ios' ? 1.5 : 0.5;
let LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

// Use the below code to zoom to particular location with radius.

var flag = false;

class ScreenMap extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      radius: 5000,
      zoom: 0,
      circlecenter: {
        latitude: global.let,
        longitude: global.long,
      },
      region: {
        latitude: global.let,
        longitude: global.long,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      coordi: {
        latitude: global.let,
        longitude: global.long,
      },
      markers: [
        {
          coordinate: {
            latitude: global.let + SPACE,
            longitude: global.long + SPACE,
          },
        },
        {
          coordinate: {
            latitude: global.let + SPACE,
            longitude: global.long - SPACE,
          },
        },
      ],
    };
    this.markerDrag = this.markerDrag.bind(this);
    this.Mount = false;
  }

  // componentWillMount() {
  //     Geolocation.getCurrentPosition(info => {
  //         LATITUDE = info.coords.latitude
  //         LONGITUDE = info.coords.longitude
  //     })
  // }

  componentWillUnmount() {
    this.Mount = false;

    // Geolocation.clearWatch(this.watchID);
  }

  markerDrag(e) {
    this.setState({
      circlecenter: e.nativeEvent.coordinates,
    });
    console.log(e);
  }

  async componentDidMount() {
    try {
      var granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // this.watchID = Geolocation.watchPosition(info => {
        //     console.log('inf', info);
        //     global.let = info.coords.latitude;
        //     global.long = info.coords.longitude;
        //     this.setState({
        //         region: {
        //             latitude: info.coords.latitude,
        //             longitude: info.coords.longitude,
        //             latitudeDelta: LATITUDE_DELTA,
        //             longitudeDelta: LONGITUDE_DELTA,
        //         },
        //         coordi: {
        //             latitude: info.coords.latitude,
        //             longitude: info.coords.longitude
        //         }
        //     });

        // }, (error) => alert(error.message), {
        //     enableHighAccuracy: true,
        //     timeout: 20000,
        //     maximumAge: 1000
        // })
        this.Mount = true;
        this.Mount &&
          Geolocation.getCurrentPosition((info) => {
            console.log('inf', info);
            global.let = info.coords.latitude;
            global.long = info.coords.longitude;
            this.setState({
              region: {
                latitude: info.coords.latitude,
                longitude: info.coords.longitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
              },
              coordi: {
                latitude: info.coords.latitude,
                longitude: info.coords.longitude,
              },
            });
          });
      } else {
        snack('Location permission denied');
      }
    } catch (err) {
      console.warn('err', err);
    }
    const {radius, zoom} = this.state;
    this.checking();
    // this.map.animateToRegion({
    //     latitude: global.let,
    //     longitude: global.long,
    //     latitudeDelta: this.state.region.latitudeDelta,
    //     longitudeDelta: this.state.region.longitudeDelta
    // }, 500);
  }
  call = () => {
    try {
      http
        .POST('api/location/radius', {
          kilometer: this.state.radius / 1000,
          latitude: this.state.region.latitude,
          longitude: this.state.region.longitude,
        })
        .then(
          (res) => {
            if (res['data']['status']) {
              // console.log('rrrrrrrrr >>>>>>>>>>>> 210', res['data']['result']);
              // global.all = res['data']['result'];
              this.setState({
                data: res['data']['result'],
              });
              let array = [];
              for (let i in res['data']['result']) {
                array.push({
                  coordinate: {
                    latitude: parseFloat(
                      res['data']['result'][i]['latitude'] || 0,
                    ),
                    longitude: parseFloat(
                      res['data']['result'][i]['longitude'] || 0,
                    ),
                  },
                });
              }
              array &&
                this.setState({
                  markers: array,
                });
              // global.all = res['data']['result']
              // will get data in this    res['data']['result']
            } else {
              snack(res['data']['message']);
            }
          },
          (err) => snack(err['message']),
        );
    } catch (error) {
      snack(error);
    }
  };
  checking = () => {
    // console.log('hey - 159 map', global.all)
    const {params} = this.props.navigation.state;
    const otherParam = params ? params.otherParam : null;
    // console.log('other item', otherParam);
    this.setState({
      data: global.all,
    });
    this.call();
  };

  Video = (item) => {
    // console.log('hels');
    let m = url + '/images/company/' + item.video;
    if (item)
      this.props.navigation.navigate('VideoPlayer', {
        vid: m,
      });
    else alert('not uploaded');
    // this.props.navigation.navigate('VideoResume');
  };
  Filter = () => {
    this.props.navigation.navigate('Filter');
  };
  push = (item) => {
    // console.log("heelo", item);
    // global.ig = item
    this.props.navigation.navigate('CompanyProfile', {
      item: item,
    });
  };
  Back = () => {
    this.props.navigation.goBack();
  };
  change = async (value) => {
    let given = await this.map.getCamera();
    console.log('given', given);

    // this.setState({
    //     zoom: given.zoom,
    // })
    // console.log('zoom', this.state.zoom);
    // const {
    //     zoom,
    //     radius
    // } = this.state
    // console.log('zoom', zoom);
    // if (value < (radius / 1000)) {
    //     this.setState({
    //         radius: Math.round(value) * 1000
    //     }, () => {
    //         let reg = {
    //             latitude: this.state.region.latitude,
    //             longitude: this.state.region.longitude,
    //             latitudeDelta: this.state.region.latitudeDelta / zoom,
    //             longitudeDelta: this.state.region.longitudeDelta / zoom
    //         }
    //         console.log('reg <<<<<<', reg);
    //         this.setState({
    //             region: reg
    //         }, () => this.map.animateToRegion(this.state.region, 500))
    //         this.call();
    //     })

    // } else {
    //     this.setState({
    //         radius: Math.round(value) * 1000
    //     }, () => {
    //         let reg = {
    //             latitude: this.state.region.latitude,
    //             longitude: this.state.region.longitude,
    //             latitudeDelta: this.state.region.latitudeDelta * zoom,
    //             longitudeDelta: this.state.region.longitudeDelta * zoom
    //         }
    //         console.log('reg >>>>>>>', reg);
    //         this.setState({
    //             region: reg
    //         }, () => this.map.animateToRegion(this.state.region, 500))
    //         this.call();
    //     })
    // }
    console.log('longi', this.state.region);
    var circum = 40075;
    var ond = 111.32 * 1000;
    var distance = value * 1000;
    var angle = distance / circum;

    var latitudeDelta = distance / ond;
    var longitudeDelta = Math.abs(
      Math.atan(
        Math.sin(angle) * Math.cos(this.state.region.latitude),
        Math.cos(angle) -
          Math.sin(this.state.region.latitude) *
            Math.sin(this.state.region.latitude),
      ),
    );

    var result = {
      latitude: this.state.region.latitude,
      longitude: this.state.region.longitude,
      latitudeDelta: latitudeDelta + 0.7,
      longitudeDelta: longitudeDelta + 0.7,
    };
    this.setState(
      {
        region: result,
        radius: Math.round(distance),
      },
      () => this.map.animateToRegion(this.state.region, 500),
    );
    this.call();
  };

  render() {
    const {region, radius, markers} = this.state;
    return this.state.data ? (
      <View style={styles.backGround}>
        <ImageBackground
          style={styles.ImageBlue}
          source={Background}
          resizeMode={'stretch'}>
          <NavigationHeader
            onPress={() => this.Back()}
            text="Search Location"
          />
          <View style={styles.JoblistSecondViewHeading}>
            <View style={styles.JoblistSecondViewHeadingResult}>
              <Text style={styles.JoblistSecondViewHeadingText}>
                Results - {this.state.data ? this.state.data.length : 0}
              </Text>
            </View>
            <View style={styles.JobListUpperButtonView}>
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
          <View
            style={{
              width: wp('100%'),
              height: wp('65%'),
            }}></View>
          <View style={styles.MapSliderText}>
            <View style={styles.FilterMinimumSalaryMin}>
              <Text
                style={[
                  {
                    fontWeight: 'bold',
                    color: themeWhite,
                  },
                  styles.FilterMinText,
                ]}>
                {Math.round(this.state.radius) / 1000} KM
              </Text>
              <Text
                style={[
                  {
                    fontWeight: 'bold',
                    color: themeWhite,
                  },
                  styles.FilterMaxText,
                ]}>
                200 KM
              </Text>
            </View>
            <Slider
              style={{
                width: wp('90%'),
                marginTop: scale(5),
              }}
              onSlidingComplete={() => {}}
              maximumTrackTintColor={themeWhite}
              thumbTintColor={themeWhite}
              onValueChange={(value) => {
                this.change(value);
              }}
              minimumValue={1}
              maximumValue={200}
              minimumTrackTintColor={themeWhite}
              maximumTrackTintColor={themeWhite}
            />
          </View>
          {this.state.data != '' ? (
            <FlatList
              style={styles.MapVerticalList}
              data={this.state.data}
              showsHorizontalScrollIndicator={false}
              removeClippedSubviews={true}
              renderItem={({item, index}) => (
                <ItemMV
                  item={item}
                  index={index}
                  push={this.push}
                  Video={this.Video}
                />
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
          ) : (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontFamily: FontBold,
                  color: themeWhite,
                  fontSize: scale(18),
                  width: wp(60),
                }}>
                No Data found 😞
              </Text>
              <NavigationEvents onDidFocus={this.checking} />
            </View>
          )}
          <View style={styles.TranLingImage}>
            <Image
              source={TRANLINE}
              style={styles.imageStyle}
              resizeMode={'stretch'}
            />
          </View>
        </ImageBackground>
      </View>
    ) : null;
  }
}

export default withNavigationFocus(ScreenMap);
