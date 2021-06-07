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
  ScrollView,
  View,ActivityIndicator
} from 'react-native';
import {
  withNavigationFocus,
  NavigationEvents
} from 'react-navigation';
import styles from '../src/Style';
import {
  left,play
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
import ItemMVJobb from './ItemMVJobb';
import AsyncStorage from '@react-native-community/async-storage';
import ModalSort from '../Component/ModalSort'
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
import TopHeader from '../Component/TopHeader'
import SuggestionView from '../Component/SuggestionView'
import Modal from 'react-native-modal'
import WebRegisterCompanyCheck from '../Component/WebRegisterCompanyCheck'
// Use the below code to zoom to particular location with radius.

var flag = false;
import Texting from "../Constant/Text";

const colorPin =  ['red','blue','green']
const Lat = 52.520008
  const  Long = 13.404954
class UserScreenMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fil: false,
      role:false,
      srt: false,
      data: [],
      detailed: false,
      message:'No_data',
      openModal:false,
      radius: 5000,
      zoom: 0,
      granted:true,
      circlecenter: [{
        latitude: Lat,
        longitude:  Long,
      }],
      region: [{
        latitude:  Lat,
        longitude:  Long,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }],
      titleCity : [],
      coordi: [{
        latitude:  Lat,
        longitude:  Long,
      }],
      markers: [{
        coordinate: {
          latitude: Lat + SPACE,
          longitude: Long + SPACE,
          _id:0
        },
      }, {
        coordinate: {
          latitude: Lat + SPACE,
          longitude:  Long - SPACE,
          _id:1
        },
      }],
    };
    this.watchId = '';
    this.onMarkerDrag = this.onMarkerDrag.bind(this);
    this.navigationWillFocusListener = props.navigation.addListener('willFocus', () => {
      this.checking()
      // do something like this.setState() to update your view
    })
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
  suggestionTag = (elements, index) => {

    let {titleCity, region, coordi} = this.state;
    index = index;
    titleCity = titleCity.filter((item) => item != elements);
    global.Favorite_Location = global.Favorite_Location.filter((item) => item.place != elements)
    region = region.filter((i, id) => id != index);
    coordi = coordi.filter((i, id) => id != index);

    console.log ('tile',titleCity,region,coordi)
    if (titleCity.length == 0)
     {
     this.setState({
      circlecenter: [
        {
          latitude: Lat,
          longitude:  Long,
        },
      ],
      region: [
        {
          latitude:  Lat,
          longitude: Long,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        },
      ],
      coordi: [
        {
          latitude: Lat,
          longitude:  Long,
        },
      ],
      titleCity:[]
     },() => {
      global.Job_Location = global.Favorite_Location
    this.map.animateToRegion(region[0], 1000);
     });
    }
    else {
      this.setState({
        titleCity,
        region,
        coordi,
      },()=> {
        global.Job_Location = global.Favorite_Location
        if (region.length == 1)
        this.map.animateToRegion(region[0], 1000);
        else
        this.map.fitToCoordinates(
          coordi.map((item) => item),
       { 
         edgePadding: DEFAULT_PADDING,
         animated: true,
       },
     );
      });
    }


//     if (this.state.region.length == 1)
//     this.map.animateToRegion(region[0], 1000);
// else
//    this.map.fitToCoordinates(
//      coordi.map((item) => item),
//        { 
//          edgePadding: DEFAULT_PADDING,
//          animated: true,
//        },
//      );

   


  };

  permission = async () => {
    const f = await PermissionHelper.Storage.isLocationPermissionGranted();
    if (f) {
      this.setState({granted: true});
      this.LATLong();
    } else {
      const f = await PermissionHelper.Storage.requestLocationPermission();
      !f && alert('please enable location');
      !f && this.permission();
      f && this.LATLong();
    }
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
          console.log('region',this.state.region)
          this.map.animateToRegion(this.state.region[0], 500);
        },
        (error) => snack(error.message + 'please on the the location'),
      );
    } catch (err) {
      console.warn(err);
    }
  }


   componentDidMount() {
      //  this.permission() 
    let {
      radius,
      zoom,region,titleCity,coordi
    } = this.state;
    // this.checking();
    
    console.log('global.joblocation',global.Job_Location)

    if (global.Job_Location.length){
    region = global.Job_Location.length && global.Job_Location.map(item => {
      let temp = {}
      temp.latitude=item.latitude
      temp.longitude=item.longitude
      temp.latitudeDelta=LATITUDE_DELTA
      temp.longitudeDelta=LONGITUDE_DELTA
      return temp;
    })

    titleCity = global.Job_Location.length && global.Job_Location.map(item => item.place)

    coordi =  global.Job_Location.length && global.Job_Location.map(item => {
      let temp = {}
      temp.latitude=item.latitude
      temp.longitude=item.longitude
      return temp;
    })
  }

    if (region.length == 1)
    this.map.animateToRegion(region[0], 1000);
else
   this.map.fitToCoordinates(
     coordi.map((item) => item),
       { 
         edgePadding: DEFAULT_PADDING,
         animated: true,
       },
     );

    this.setState({
      titleCity,
      region,
      coordi,
    });
  }
  call = () => {
    try {
      http
        .POST('api/user/radius', {
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
              console.log('datas',totalJob.length)

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
              console.log("data >>>", data);
              global.all = data
              // global.all = res['data']['result'];
              data && this.setState({
                data: global.all,
                markers: array,

              },() => 
              {if (this.state.region.length == 1)
                this.map.animateToRegion(this.state.region[0], 1000);
            else
              this.map.fitToCoordinates(
                this.state.coordi.map((item) => item),
                  { 
                    edgePadding: DEFAULT_PADDING,
                    animated: true,
                  },
                )}
                // this.map.fitToCoordinates(this.state.markers.map(item => item.coordinate), {
                // edgePadding: DEFAULT_PADDING,
                // animated: true,
              // })
              )
             
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
  checking = async () => {

    global.reset == true && this.setState({
      fil: false,
      srt: false,
      message:'No_data',
      openModal:false,
      relevance:false,
      Date:false,
      data: [],
      detailed: false,
      radius: 5000,
      zoom: 0,
      granted: true,
      circlecenter: [
        {
          latitude: Lat,
          longitude: Long,
        },
      ],
      region: [
        {
          latitude: Lat,
          longitude: Long,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        },
      ],
      titleCity: [],
      coordi: [
        {
          latitude: Lat,
          longitude: Long,
        },
      ],
      markers: [
        {
          coordinate: {
            latitude: Lat + SPACE,
            longitude: Long + SPACE,
            _id: 0,
          },
        },
        {
          coordinate: {
            latitude: Lat + SPACE,
            longitude:Long - SPACE,
            _id: 1,
          },
        },
      ],
    },() => this.map.animateToRegion(region[0], 1000))

  console.log('after', this.state,global.reset);

    // global.reset && this.map.animateToRegion(region[0], 1000);


    // console.log('hey', global.Job_Location);
    // let {region,titleCity,coordi} = this.state

    // if (global.Job_Location.length){
    //   region = global.Job_Location.map(item => {
    //     let temp = {}
    //     temp.latitude=item.latitude
    //     temp.longitude=item.longitude
    //     temp.latitudeDelta=LATITUDE_DELTA
    //     temp.longitudeDelta=LONGITUDE_DELTA
    //     return temp;
    //   })
  
    //   titleCity = global.Job_Location.map(item => item.place)
  
    //   coordi =  global.Job_Location.map(item => {
    //     let temp = {}
    //     temp.latitude=item.latitude
    //     temp.longitude=item.longitude
    //     return temp;
    //   })
    // }


    if (this.state.region.length == 1)
    this.map.animateToRegion(this.state.region[0], 1000);
    else
this.map.fitToCoordinates(
this.state.coordi.map((item) => item),
{
  edgePadding: DEFAULT_PADDING,
  animated: true,
},
)

    if (this.state.fil)
      {
        global.Role.length != 0 && this.setState({message:"no data found please try with another Role"})
        global.CompanyGuest.length != 0 && this.setState({message:"no data found please try with another Skill"})
      }
      global.Role = []
      global.CompanyGuest = []

      let keys = []
      var result = []
          try {
              keys = await AsyncStorage.getAllKeys()
              if (keys.indexOf("SelectUserList") !== -1) {
                result = await AsyncStorage.getItem('SelectUserList');
                result = JSON.parse(result);
              }
          } catch ( e ) {
              // read key error
          }

          console.log('result',result)
        let data = JSON.parse(JSON.stringify(global.all));
        data = data.filter((elem) => !result.find(({ id }) => elem.id === id) ? elem : elem.heart = true);

    this.setState({
      data,
      fil: false,
      srt: false,
      detailed: false,
      // region,titleCity,coordi
    });
    this.call();
  };

  Video = (item) => {
    console.log('hels');
    let m = url + '/images/user/' + item.video;
    if (item.video)
      this.props.navigation.navigate('VideoPlayer', {
        vid: m,
      });
    else alert('video snot uploaded');
    // this.props.navigation.navigate('VideoResume');
  };
  Filter = () => {
    this.setState({
      fil: true,
    });
    setTimeout(() => {
      this.props.navigation.navigate('FilterUser');
    }, 300);
  };

  date = () => {
    this.setState({
      Date:!this.state.Date,
      relevance:false
    })
       let data = this.state.data;
    data = this.state.Date ? data.sort((a,b) => a.createdAt > b.createdAt ? 1 : -1) : data.sort((a,b) => a.createdAt < b.createdAt ? 1 : -1);
    
    this.setState({data,openModal:!this.state.openModal})
    
  }
  relevance = () => {

    this.setState({relevance:!this.state.relevance,Date:false})
    let data = this.state.data;
    if (global.CompanyGuest.length === 0)
    {
    
      alert('please select some skills for relevance search')
      this.props.navigation.navigate('FilterUser')
      
    }
     else
     { 
    data = global.CompanyGuest.map(skill => data.filter(item => item.skills.filter(item => item.english === skill.cell.english)))
    console.log('data',data[0]);
    data = data[0];
     }
    this.setState({data,openModal:false})
  }

  Sort = () => {
    this.setState({
      srt: true,
      openModal:!this.state.openModal

    });
    // let data = this.state.data;
    // data = this.state.srt ? data.sort((a,b) => a.createdAt > b.createdAt ? 1 : -1) : data.sort((a,b) => a.createdAt < b.createdAt ? 1 : -1);
    // this.setState({data})
  };

  select = async (item,index) =>{

    let d = JSON.parse(JSON.stringify(this.state.data))
    d[index].heart = !d[index].heart
    this.setState({data:JSON.parse(JSON.stringify(d))});

    var result = []

        try {
              result = await AsyncStorage.getItem('SelectUserList');
              result = JSON.parse(result) || [];
              if (d[index].heart)
                result.push(item)
                else
                result = result.filter(item => !item == d[index])

            await AsyncStorage.setItem(
              'SelectUserList',
              JSON.stringify(result),
            );
        } catch ( e ) {
            // read key error
        }
  }

  pushy = (item,index) => {
    this.setState({
      detailed: true,
    });
    setTimeout(() => {
      this.props.navigation.navigate('UserPro', {
        item: global.all[0],
        length: this.state.data.length,
      });
    }, 300);
}


  push = (item, index) => {
    // console.log("heelo", item);
    global.ig = global.all;
    global.role == 'Super Admin' ? this.props.navigation.navigate('UserPro', {
      item: item,
      index: index,
      status: 'undefined',
    }) : this.setState({role:true}) 
    
      
  };


  Back = () => {
    this.props.navigation.navigate('FilterUser');
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
      () => this.map.fitToCoordinates(this.state.markers.map(item => item.coordinate), {
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
      region.latitude!= NaN && <View style={styles.backGround} onStartShouldSetResponder={()=> global.role != 'Super Admin' && this.setState({role:true})}>
        <WebRegisterCompanyCheck onPress={()=> this.setState({role:false})} role={this.state.role} />
        <ImageBackground
          style={styles.ImageBlue}
          source={Background}
          tintColor={themeWhite}
          resizeMode={'stretch'}>
          <StatusBar hidden={true} backgroundColor={themeWhite} />
          <NavigationEvents onDidFocus={this.checking} />
          <ModalSort isVisible={this.state.openModal} onBackdropPress={()=>this.setState({openModal:false})} 
          relevance={()=>this.relevance()} bydate={()=> this.date()} date={this.state.Date} rel={this.state.relevance}/>
          <View
            style={{
              // height:  scale(40),
              // flexDirection: 'row',
              height:'auto',
                  width:wp(6),
              backgroundColor: 'transparent',
              alignItems: 'center',
              marginTop: scale(5),
              zIndex: 500,
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: 'transparent',
                alignItems: 'flex-start',
                marginTop: scale(8),
              }}
              onPress={()=> this.Back()}
                   hitSlop={{top:20,bottom:20,left:20,right:20}}>
              {left(hp(4), themeColor)}
            </TouchableOpacity>
          </View>
          <PlacesInput
            googleApiKey={'AIzaSyD44YCFNIXiBB411geZjrcQ2v1_knq71Hg'}
            placeHolder={'Search Place'}
            language={'en-US'}
            mainStyle={false}
            clearQueryOnSelect={true}
            calla={() => this.permission()}
            onSelect={(place) => {
              console.log('place', place.result.name);
              let region = this.state.region
              let titleCity = this.state.titleCity;
              let coordi = this.state.coordi;
              let markers = this.state.markers;


              if(titleCity.length == 0)
                          {
                            // let coordi = this.state.coordi;
              // let markers = this.state.markers;
                            region = []; 
                            coordi = [];
                            global.Favorite_Location = [];
                            markers = [];
                           }

                           let p = titleCity.find(item => item === place.result.name)
                                          if (p)
                                          {
                                            alert('You have selected same city..please select different city')
                                            return
                                          }
                                          else{
                                            titleCity.push(place.result.name);

                           global.Favorite_Location.push({place : place.result.name,kilometer:this.state.radius / 1000,latitude:place.result.geometry.location.lat,
                  longitude:place.result.geometry.location.lng});

              // titleCity.push(place.result.name)

              region.push({
                    latitude: place.result.geometry.location.lat,
                    longitude: place.result.geometry.location.lng,
                    latitudeDelta:  LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                  })

                  // let coordi = this.state.coordi
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
                  global.Job_Location = global.Favorite_Location
                  console.log('this.state.region>>>>>',this.state.region)
                  this.map.fitToCoordinates(this.state.coordi.map(item => item), {
                  edgePadding: DEFAULT_PADDING,
                  animated: true,
                })
                  // this.map.animateToRegion(this.state.region[0], 500);
                  this.call();
                },
              );
                                          }
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
              fontSize: hp(2.6),
                  height: hp(8),
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
              height: hp(6),
              marginHorizontal: wp(8),
              marginTop: scale(3),
              justifyContent: 'center',flexDirection:"row",
              // marginTop: hasNotch ? StatusBar.currentHeight : hp(2),
            }}
          />
          <View
                style={[
                  {marginTop: scale(5)},
                  styles.JoblistSecondViewHeading,
                ]}>
                <TopHeader
                  data={this.state.data && this.state.data.length}
                  sort={this.Sort}
                  srtTint={this.state.srt}
                  filTint={this.state.fil}
                  Filter={this.Filter}
                  detailedTint={this.state.detailed}
                  detailed={this.pushy}
                />
              </View>
          <View
                style={{
                  alignItems: 'flex-start',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  flexGrow: 0,
                  marginTop: this.state.titleCity.length ? 0 : 1,
                  width: wp(98),
                  paddingHorizontal: wp(2),
                  marginHorizontal: wp(1),
                  height: this.state.titleCity.length === 0 ? 0 : 'auto',
                  borderRadius: this.state.titleCity.length === 0 ? 0 : 30,
                  borderWidth: this.state.titleCity.length === 0 ? 0 : 1,
                  padding: 2,
                  marginTop: 2,
                }}>
                <ScrollView
                  horizontal
                  contentContainerStyle={{
                    flexDirection: 'row',
                    marginHorizontal: 2,
                  }}>
                  {this.state.titleCity &&
                    this.state.titleCity.map((elements, index) => (
                      <SuggestionView
                        backGroundC={'#afafaf'}
                        textColor={themeWhite}
                        onPress={() => this.suggestionTag(elements, index)}
                        elements={elements}
                        index={index}
                      />
                    ))}
                </ScrollView>
              </View>
          <View
            style={{
              width: wp('100%'),
              height: hp(30),
            }}>
            <MapView.Animated
              ref={(ref) => {
                this.map = ref;
              }}
              style={styles.MapViewStyle}
              provider={PROVIDER_GOOGLE}
              onMapReady={() => {
              this.map.fitToCoordinates(
                        this.state.coordi.map((item) => item),
                        {
                          edgePadding: DEFAULT_PADDING,
                          animated: true,
                        },
                      );
              this.call();

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
                marginTop: hp(1),
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
            <List style={styles.MapVerticalList} data={this.state.data} 
                extraData={this.state.data}
            renderItem={({item, index}) => (
                  <ItemMVJobb
                  item={item}
                  index={index}
                  push={this.push}
                  Video={this.Video}
                  select= {this.select}
                />
              )} />
          ) : (
            <NoData text={this.state.message}/>
          )}
        </ImageBackground>
      </View>
    )
  }
}

export default withNavigationFocus(UserScreenMap);