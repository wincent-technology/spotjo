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
  View,ActivityIndicator
} from 'react-native';
import {withNavigationFocus, NavigationEvents} from 'react-navigation';
import styles from '../src/Style';
import {left, library, icon, play, leftVid} from '../src/IconManager';
import {
  themeColor,
  themeWhite,
  Background,
  sort,
  filter,
  TRANLINE,
  FontBold,
  url,compass
} from '../Constant';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../Component/responsive-ratio';
import {scale, snack} from '../src/Util';
import {NavigationHeader} from '../Component/ViewManager';
import Slider from '@react-native-community/slider';
import ItemMV from '../src/ItemMV';
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
import PlacesInput from '../Component/PlacesInput';
import DeviceInfo from 'react-native-device-info';
import PermissionHelper from '../Component/PermissionHelper'
let hasNotch = DeviceInfo.hasNotch();

var flag = false;

class ScreenMapJS extends PureComponent {
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
      granted:false,
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
    this.watchId = '';
    this.onMarkerDrag = this.onMarkerDrag.bind(this);
  }
  async onMarkerDrag(e) {
    this.setState(
      {
        circlecenter: e.nativeEvent.coordinate,
        markers: [],
        data: [],
        coordi: {
          latitude: e.nativeEvent.coordinate.latitude,
          longitude: e.nativeEvent.coordinate.longitude,
        },
        region: {
          latitude: e.nativeEvent.coordinate.latitude,
          longitude: e.nativeEvent.coordinate.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        },
      },
      () => {
        this.call();
      },
    );
  }
  // componentWillMount() {
  //     Geolocation.getCurrentPosition(info => {
  //         LATITUDE = info.coords.latitude
  //         LONGITUDE = info.coords.longitude
  //     })
  // }

  componentWillUnmount() {
    Geolocation.clearWatch(this.watchID);
  }

  componentDidMount() {
    this.permission()
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
    console.log(this.state.region);
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
              //console.log('rrrrrrrrr >>>>>>>>>>>> 210', res['data']['result']);
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
                this.setState(
                  {
                    markers: array,
                  },
                  () => console.log('asfsf 177', this.state.markers),
                );
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

  LATLong = () => {
    try {
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
    } catch (err) {
      console.warn(err);
    }
  }


  permission = async () => {
    const granted = await PermissionHelper.Storage.isLocationPermissionGranted();
    if (granted)
       { this.setState({granted:true})
    console.log('granted')
          this.LATLong()
      }
    else
    {const granted = await PermissionHelper.Storage.requestLocationPermission();
        !granted && this.permission();  }
  }

  checking = () => {
    this.permission()
    console.log('hey - 159 map', global.all);
    const {params} = this.props.navigation.state;
    const otherParam = params ? params.otherParam : null;
    // console.log('other item', otherParam);
    this.setState({
      data: global.all,
    });
    this.call();
  };

  Video = (item) => {
    console.log('hels');
    let m = url + '/images/company/' + item.video;
    if (item)
      this.props.navigation.navigate('VideoPlayer', {
        vid: m,
      });
    else alert('not uploaded');
    // this.props.navigation.navigate('VideoResume');
  };
  Filter = () => {
    this.props.navigation.navigate('JobSeekerFilter');
  };
  push = (item, index) => {
    console.log('heelo', item, index);

    this.props.navigation.navigate('JobCompanyProfile', {
      item: item,
      index: index,
    });
    // global.item = item;
    // this.props.navigation.navigate('JobCompanyProfile');
  };
  Back = () => {
    this.props.navigation.goBack();
  };
  change = async (value) => {
    let given = await this.map.getCamera();

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
    const {region, redius, markers} = this.state;
        if(!this.state.granted)
            return <ActivityIndicator size={'large'} color={themeColor} />
      else
    return  (
      <View style={styles.backGround}>
        <ImageBackground
          style={styles.ImageBlue}
          source={Background}
          tintColor={'#fff'}
          resizeMode={'stretch'}>
          <View
            style={{
              // height: scale(40),
              flexDirection: 'row',
              width: 30,
              backgroundColor: 'transparent',
              alignItems: 'center',
              marginTop: scale(5),
              
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: 'transparent',
                alignItems: 'flex-start',
                marginTop: scale(7),
                zIndex: 10,
              }}
              onPress={() => this.Back()}>
              {left(scale(32), themeColor)}
            </TouchableOpacity>
          </View>
          <PlacesInput
            // googleApiKey={'AIzaSyD44YCFNIXiBB411geZjrcQ2v1_knq71Hg'}
            googleApiKey={'AIzaSyDVScOwopPXw_Seu28wNHVo0UJAukwqo3E'}
            placeHolder={'Search Place'}
            language={'en-US'}
            onSelect={(place) => {
              console.log('Place Input: ', place.result.geometry.location);
              this.setState(
                {
                  markers: [],
                  data: [],
                  region: {
                    latitude: place.result.geometry.location.lat,
                    longitude: place.result.geometry.location.lng,
                    latitudeDelta: this.state.region.latitudeDelta,
                    longitudeDelta: this.state.region.longitudeDelta,
                  },
                  coordi: {
                    latitude: place.result.geometry.location.lat,
                    longitude: place.result.geometry.location.lng,
                  },
                },
                () => {
                  this.map.animateToRegion(this.state.region, 500);
                  this.call();
                },
              );
            }}
            stylesList={{
              marginTop: scale(40),
              width: wp('100%'),
            }}
            stylesInput={{
              backgroundColor: 'transparent',
              // alignItems:"center",
              // marginLeft: scale(10),
              justifyContent: 'center',
              fontSize: scale(17),
              height: scale(40),
              width: wp(80),
              fontFamily: FontBold,
              fontWeight: 'bold',
              color: '#000',
            }}
            stylesContainer={{
              alignItems: 'center',
              backgroundColor: '#ecfbfe',
              width: wp(86),
              borderRadius: wp(10),
              marginBottom: scale(2),
              height: scale(40),
              marginLeft: wp(7),
              marginTop: scale(5),
              justifyContent: 'center',flexDirection:"row",
              // marginTop: hasNotch ? StatusBar.currentHeight : hp(2),
            }}
          />
          <View
            style={[{marginTop: scale(5)}, styles.JoblistSecondViewHeading]}>
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
            }}>
            <MapView.Animated
              ref={(ref) => {
                this.map = ref;
              }}
              style={styles.MapViewStyle}
              provider={PROVIDER_GOOGLE}
              onMapReady={() => {
                //alert('dfdf');
                this.map.animateToRegion(
                  {
                    latitude: global.let,
                    longitude: global.long,
                    latitudeDelta: this.state.region.latitudeDelta,
                    longitudeDelta: this.state.region.longitudeDelta,
                  },
                  1000,
                );
              }}
              onRegionChange={(region) => {
                this.setState({
                  region,
                  coordi: {
                    latitude: region.latitude,
                    longitude: region.longitude,
                  },
                  markers: [],
                  data: [],
                });
              }}
              onRegionChangeComplete={async (region) => {
                //this.call();
                let given = await this.map.getCamera();
                console.log('this.state', this.state.region);
                this.setState({
                  region,
                  markers: [],
                  data: [],
                  zoom: given.zoom,
                  coordi: {
                    latitude: region.latitude,
                    longitude: region.longitude,
                  },
                  circlecenter: region,
                });
                this.call();
              }}
              initialRegion={region}
              showsUserLocation={true}>
              <MapView.Marker.Animated
                draggable
                coordinate={this.state.coordi}
                onDragEnd={(e) => {
                  console.log('dragEnd', e.nativeEvent.coordinate);
                  this.onMarkerDrag(e);
                  //this.call();
                }}
                ref={(marker) => {
                  this.marker = marker;
                }}
              />
              {this.state.markers.map((marker) => (
                <Marker.Animated
                  key={marker.index}
                  coordinate={marker.coordinate}
                  pinColor={'#000'}
                  image={flagBlueImg}
                />
              ))}
              <Circle
                center={this.state.circlecenter}
                radius={this.state.radius}
                strokeColor={themeColor}
                strokeWidth={2}
                fillColor="rgba(255,255,255,0.3)"
                // zIndex={2}
              />
            </MapView.Animated>
          </View>
          <View style={styles.MapSliderText}>
            <View style={styles.FilterMinimumSalaryMin}>
              <Text
                style={[
                  {
                    fontWeight: 'bold',
                    color: '#333',
                  },
                  styles.FilterMinText,
                ]}>
                {this.state.radius / 1000} KM
              </Text>
              <Text
                style={[
                  {
                    fontWeight: 'bold',
                    color: '#333',
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
              onSlidingStart={() => {}}
              onSlidingComplete={() => {}}
              maximumTrackTintColor={'#000'}
              thumbTintColor={'#333'}
              onValueChange={(value) => {
                this.change(value);
              }}
              minimumValue={1}
              maximumValue={200}
              minimumTrackTintColor={'#000'}
              maximumTrackTintColor={'#333'}
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
                  color: themeColor,
                  fontSize: scale(18),
                  width: wp(60),
                }}>
                No Data found 😞
              </Text>
              <NavigationEvents onDidFocus={this.checking} />
            </View>
          )}
        </ImageBackground>
      </View>
    )
  }
}

export default withNavigationFocus(ScreenMapJS);
