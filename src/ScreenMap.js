import React, {
  PureComponent
} from 'react';
import {
  StatusBar,
  Platform,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ImageBackground,
  Text,
  Image,
  View,ActivityIndicator
} from 'react-native';
import {
  withNavigationFocus,
  NavigationEvents
} from 'react-navigation';
import styles from '../src/Style';
import {
  left,
} from '../src/IconManager';
import {
  themeColor,
  themeWhite,
  Background,
  sort,
  filter,
  FontBold,
  url,
} from '../Constant/index';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../Component/responsive-ratio';
import {
  scale,
  snack,NoData
} from '../src/Util';
import Slider from '@react-native-community/slider';
 import ItemMV from './ItemMV';
import MapView, {
  PROVIDER_GOOGLE,
  Circle,
  Marker,
} from 'react-native-maps';
import flagBlueImg from '../Img/circle-16.png';
import Geolocation from '@react-native-community/geolocation';
import http from '../api';
const SPACE = 0.01;

const DEFAULT_PADDING = { top: 100, right: 100, bottom: 100, left: 100 };
const ASPECT_RATIO = wp(96) / wp(65);
const LATITUDE_DELTA = Platform.OS === 'ios' ? 1.5 : 0.5;
let LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
import PlacesInput from '../Component/PlacesInput';
import PermissionHelper from '../Component/PermissionHelper'
import List from '../Component/List'
// Use the below code to zoom to particular location with radius.

var flag = false;
import Texting from "../Constant/Text";

const colorPin =  ['red','blue','green']

class ScreenMap extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      radius: 5000,
      zoom: 0,
      granted:false,
      circlecenter: [{
        latitude: global.let || 10,
        longitude: global.long || 10,
      }],
      region: [{
        latitude: global.let || 10,
        longitude: global.long || 10,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }],
      titleCity : [
        'unknown'
      ],
      coordi: [{
        latitude: global.let || 10,
        longitude: global.long || 10,
      }],
      markers: [{
        coordinate: {
          latitude: global.let+SPACE,
          longitude: global.long + SPACE,
          _id:0
        },
      }, {
        coordinate: {
          latitude: global.let+SPACE,
          longitude: global.long - SPACE,
          _id:1
        },
      }],
    };
    this.watchId = '';
    this.onMarkerDrag = this.onMarkerDrag.bind(this);
  }

  async onMarkerDrag(e,index) {
    console.log('index',index)

let coordi = this.state.coordi
coordi[index] = {
  latitude: e.nativeEvent.coordinate.latitude,
          longitude: e.nativeEvent.coordinate.longitude,
}
let circlecenter = this.state.circlecenter
circlecenter[index] = {
  latitude: e.nativeEvent.coordinate.latitude,
          longitude: e.nativeEvent.coordinate.longitude,
}

let region = this.state.region
region[index]={
  latitude: e.nativeEvent.coordinate.latitude,
          longitude: e.nativeEvent.coordinate.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
}

    this.setState({
        circlecenter,
        markers: [],
        data: [],
        coordi,
        region,
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
  permission = async () => {
    const granted = await PermissionHelper.Storage.isLocationPermissionGranted();
    if (granted)
       { this.setState({granted:true})
          this.LATLong()
      }
    else
    {const granted = await PermissionHelper.Storage.requestLocationPermission();
      !granted &&  alert('please enable location')
        !granted && this.permission();  }
  }

  LATLong = async () => {
    try {
        await Geolocation.getCurrentPosition((info) => {
          console.log('inf', info);
          global.let = info.coords.latitude;
          global.long = info.coords.longitude;
          this.setState({
            region: [{
              latitude: global.let,
              longitude: global.long,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }],
            coordi: [{
              latitude: global.let,
              longitude: global.long,
            }],
          });
        });
        console.log('this.state>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',this.state)
    } catch (err) {
      console.warn(err);
    }
  }


   componentDidMount() {
       this.permission()
    const {
      radius,
      zoom
    } = this.state;
    this.checking();
  }
  call = () => {
    try {
      http
        .POST('api/location/radius', {
          kilometer: this.state.radius / 1000,
          location:this.state.region
          // latitude: this.state.region.latitude,
          // longitude: this.state.region.longitude,
        })
        .then(
          (res) => {
            if (res['data']['status']) {
              // console.log('rrrrrrrrr >>>>>>>>>>>> 210', res['data']['result']);
              
              let array = [];
              // let datas = [];
              let totalJob =[]
              for (let i=0; i<res['data']['result'].length; i++) {
              for (let j=0;j<res['data']['result'][i]['data'].length;j++) {
                 array.push({
                  coordinate: {
                    latitude: parseFloat(
                      res['data']['result'][i]['data'][j]['latitude'] || 0,
                    ),
                    longitude: parseFloat(
                      res['data']['result'][i]['data'][j]['longitude'] || 0,
                    ),
                  },
                  _id:j
                });
                totalJob.push(res['data']['result'][i]['data'][j]);
                                }
              }
              let data = []
                    let From,
                        To,
                        tmpobj,
                        jobs = totalJob;

              for (let i =0; i<jobs.length; i++) {

                  if (jobs[i]['workexp']) {
                      for (let j = 0; j<jobs[i]['workexp'].length;j++) {
                              tmpobj = JSON.parse(JSON.stringify(jobs[i]));

                              From = jobs[i]['workexp'][j]['From'].split(' ');
                              To = jobs[i]['workexp'][j]['To'].split(' ');

                              tmpobj.Company = jobs[i]['workexp'][j]['Company'];
                                    tmpobj.Role = jobs[i]['workexp'][j]['Role'];
                                    tmpobj.totalExp = To[1] - From[1];
                      }
                  }
                  tmpobj = JSON.parse(JSON.stringify(jobs[i]));
                  data.push(tmpobj)
              }
              global.all = data
              // global.all = res['data']['result'];
              data && this.setState({
                data: global.all,
                markers: array,

              },() => this.map.fitToCoordinates(this.state.markers.map(item => item.coordinate), {
                edgePadding: DEFAULT_PADDING,
                animated: true,
              }))
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
    this.permission()
    console.log('hey', global.all);
    this.setState({
      data: global.all,
    });
    this.call();
  };

  Video = (item) => {
    console.log('hels');
    let m = url + '/images/user/' + item.video;
    if (item)
      this.props.navigation.navigate('VideoPlayer', {
        vid: m,
      });
    else alert('not uploaded');
    // this.props.navigation.navigate('VideoResume');
  };
  Filter = () => {
    this.props.navigation.navigate('FilterUser');
  };
  push = (item, index) => {
    // console.log("heelo", item);
    global.ig = global.all;
    this.props.navigation.navigate('UserPro', {
      item: item,
      index: index,
      status: 'undefined',
    });
  };
  Back = () => {
    this.props.navigation.goBack();
  };
  change = async (value) => {
    let given = await this.map.getCamera();
    console.log('given', given);


    console.log('longi', this.state.region);
    var circum = 40075;
    var ond = 111.32 * 1000;
    var distance = value * 1000;
    var angle = distance / circum;
    let region = this.state.region
    let r = region.map(reg => {
      var latitudeDelta = distance / ond;
      var longitudeDelta = Math.abs(
        Math.atan(
          Math.sin(angle) * Math.cos(reg.latitude),
          Math.cos(angle) -
          Math.sin(reg.latitude) *
          Math.sin(reg.latitude),
        ),
      );
    return {
      latitude: reg.latitude,
      longitude: reg.longitude,
      latitudeDelta: latitudeDelta + 0.7,
      longitudeDelta: longitudeDelta + 0.7,
     } 
    });

    this.setState({
        region:r,
        radius: Math.round(distance),
      },
      () => this.map.fitToCoordinates(this.state.coordi.map(item => item), {
        edgePadding: DEFAULT_PADDING,
        animated: true,
      }),
    );
    this.call();
  };

  render() {
    const {
      region,
    } = this.state;
    if(!this.state.granted || region.latitude == NaN)
    return <ActivityIndicator size={'large'} color={themeColor} />
else
    return (
      region.latitude!= NaN && <View style={styles.backGround}>
        <ImageBackground
          style={styles.ImageBlue}
          source={Background}
          tintColor={themeWhite}
          resizeMode={'stretch'}>
          <StatusBar hidden={false} backgroundColor={themeWhite} />
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
              {left(scale(30), themeColor)}
            </TouchableOpacity>
          </View>
          <PlacesInput
            googleApiKey={'AIzaSyD44YCFNIXiBB411geZjrcQ2v1_knq71Hg'}
            placeHolder={'Search Place'}
            language={'en-US'}
            onSelect={(place) => {
              console.log('place', place.result.name);
              let region = this.state.region
              let titleCity = this.state.titleCity;
              titleCity.push(place.result.name)

              region.push({
                    latitude: place.result.geometry.location.lat,
                    longitude: place.result.geometry.location.lng,
                    latitudeDelta: this.state.region[0].latitudeDelta,
                    longitudeDelta: this.state.region[0].longitudeDelta,
                  })

                  let coordi = this.state.coordi
                  coordi.push({
                    latitude: place.result.geometry.location.lat,
                    longitude: place.result.geometry.location.lng,
                  })
              this.setState(
                {
                  markers: [],
                  data: [],
                  region,
                  coordi,titleCity
                },
                () => {
                  console.log('this.state.region>>>>>',this.state.region)
                  this.map.fitToCoordinates(this.state.coordi.map(item => item), {
                  edgePadding: DEFAULT_PADDING,
                  animated: true,
                })
                  // this.map.animateToRegion(this.state.region[0], 500);
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
            <View style={[styles.JoblistSecondViewHeadingResult,{flexDirection:"row"}]}>
              <Texting style={styles.JoblistSecondViewHeadingText} text='Results'/>
              <Text style={styles.JoblistSecondViewHeadingText}>
                - {this.state.data ? this.state.data.length : 0}
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
                    tintColor={'#333'}
                    resizeMode={'contain'}
                  />
                  <Texting style={styles.JoblistUpperButton} text='Sort' />
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
                    tintColor={'#333'}
                    resizeMode={'contain'}
                  />
                  <Texting style={styles.JoblistUpperButton} text='Filter'/>
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
              // onMapReady={() => {
              //   this.map.animateToRegion(
              //     [{
              //       latitude: global.let || 10,
              //       longitude: global.long || 10,
              //       latitudeDelta: this.state.region.latitudeDelta,
              //       longitudeDelta: this.state.region.longitudeDelta,
              //     }],
              //     1000,
              //   );
              // }}
              onRegionChange={(reg) => {
                // console.log(519,reg)
                // let region = this.state.region
                // region.push(reg)

                //   let coordi = this.state.coordi
                //   coordi.push = ({
                //     latitude: reg.letitude,
                //     longitude: reg.longitude,
                //   })
                // this.setState({
                //   region,
                //   coordi,
                //   markers: [],
                //   data: [],
                // });
              }}
              onRegionChangeComplete={async (reg) => {
                // let given = await this.map.getCamera();
                console.log('this.state', reg);
                // let region = this.state.region
                // region.push(reg)
                // let coordi = this.state.coordi
                // coordi.push({latitude: reg.latitude,
                //     longitude: reg.longitude});
                // this.setState({
                //   region : region,
                //   markers: [],
                //   data: [],
                //   zoom: given.zoom,
                //   coordi,
                // });
                // this.call();
              }}
              initialRegion={region[0]}
              showsUserLocation={true}>
                 {
                this.state.coordi.map((coordi,index) => 
                (<MapView.Marker.Animated
                draggable
                coordinate={coordi}
                pinColor={'red'}
                title={this.state.titleCity[index]}
                onDragEnd={(e) => {
                  console.log('dragEnd', e.nativeEvent.coordinate);
                  console.log('this.state.coordi',this.state.coordi)
                  this.onMarkerDrag(e,index);
                  //this.call();
                }}
              />)
                )}
              {this.state.markers.map((marker,index) => (
                  <Marker
                    key={new Date().getTime().toString() + (Math.floor(Math.random() * Math.floor(new Date().getTime()))).toString()}
                    coordinate={marker.coordinate}
                    pinColor={'green'}
                    // icon={play('ellipse',15,'red')}
                    image={flagBlueImg}
                  />
                )
              )}
              {this.state.region.map(cir => 
                   (
                  <Circle
                center ={{latitude: cir.latitude,
                      longitude: cir.longitude}}
                radius={this.state.radius}
                strokeColor={themeColor}
                strokeWidth={2}
                fillColor="rgba(255,255,255,0.3)"
                // zIndex={2}
              />)
             )}
             
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
                marginTop: hp(100) < 600 ? 0 : scale(5),
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
          {this.state.data.length ? (
            <List style={styles.MapVerticalList} data={this.state.data} renderItem={({item, index}) => (
                  <ItemMV
                  item={item}
                  index={index}
                  push={this.push}
                  Video={this.Video}
                />
              )} />
          ) : (
            <NoData />
          )}
        </ImageBackground>
      </View>
    )
  }
}

export default withNavigationFocus(ScreenMap);