import React, {Component} from 'react';
import {
  SafeAreaView,
  TouchableWithoutFeedback,
  ScrollView,
  StatusBar,
  ImageBackground,
  Dimensions,
  Text,
  Image,
  View,Platform
} from 'react-native';
import BackNext from '../Component/BackNext';
import SuggestionView from '../Component/SuggestionView';
import {withNavigationFocus, NavigationEvents} from 'react-navigation';
import {scale, snack,HideKeyboard} from './Util';
import CustomInput from '../Component/Input';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../Component/responsive-ratio';
import {Background, themeColor, themeWhite,FontBold} from '../Constant/index';
import styles from './Style';
import http from '../api';
import {library} from './IconManager';
import Texting from '../Constant/Text';
import ListOfChoosed from '../Component/ListOfChoosed';
import PlacesInput from '../Component/PlacesInput'
import MapView, {PROVIDER_GOOGLE, Circle, Marker} from 'react-native-maps';
import flagBlueImg from '../Img/circle-16.png';
import Slider from '@react-native-community/slider';
const DEFAULT_PADDING = {top: 100, right: 100, bottom: 100, left: 100};
import * as Animatable from 'react-native-animatable';
import PermissionHelper from '../Component/PermissionHelper';
import Geolocation from '@react-native-community/geolocation';
const ASPECT_RATIO = wp(96) / wp(65);
const LATITUDE_DELTA = Platform.OS === 'ios' ? 1.5 : 0.5;
let LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;
var mg = [];

const Lat = 52.520008
  const  Long = 13.404954


const defaultProps = {
  name: '',
  dataCheck: [],
  PlaceText:'',
  show: false,
  suggesion: [],
  radius: 5000,
  natHeight: 1,
  circlecenter: [
    {
      latitude:  Lat,
      longitude: Long,
    },
  ],
  region: [
    {
      latitude:  Lat,
      longitude:  Long,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    },
  ],
  coordi: [
    {
      latitude:  Lat,
      longitude: Long,
    },
  ],
  titleCity:[],
  markers: [
    {
      coordinate: {
        latitude:Lat + SPACE,
        longitude: Long + SPACE,
        _id: 0,
      },
    },
    {
      coordinate: {
        latitude:Lat + SPACE,
        longitude: Long - SPACE,
        _id: 1,
      },
    },
  ],
};

class FavoriteLocation extends Component {
  constructor(props) {
    super(props);

    this.state = defaultProps;
    this.arrayholder = [];
    
  }
  

  checking = () => {

      // global.reset == true ? this.state = defaultProps : global.region
      console.log('lat',Lat,Long,global.reset,global.region)
      global.reset == false && this.setState(global.region && global.region)
        global.reset == true && this.setState({
          name: '',
          dataCheck: [],
          PlaceText:'',
          show: false,
          suggesion: [],
          radius: 5000,
          natHeight: 1,
          circlecenter: [
            {
              latitude: Lat,
              longitude:  Long,
            },
          ],
          region: [
            {
              latitude: Lat,
              longitude:  Long,
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
          titleCity:[],
          markers: [
            {
              coordinate: {
                latitude:Lat + SPACE,
                longitude: Long + SPACE,
                _id: 0,
              },
            },
            {
              coordinate: {
                latitude:Lat + SPACE,
                longitude: Long - SPACE,
                _id: 1,
              },
            },
          ],
        })

        let p = []

        if (!global.reset && this.state.titleCity.length)
        {
console.log('hasto>>>',global.Job_Location,global.Favorite_Location)

          // let p = global.Job_Location.map(item => item.place)
          // titleCity = p;
          

         p =global.Job_Location.map(item => {
            let temp={}
            // p.push(item.place);
            temp.place = item.place;
            temp.region = {
              latitude: item.latitude,
              longitude: item.longitude,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }
            temp.coordi = {
              latitude: item.latitude,
              longitude: item.longitude,
            }
            return temp
            })

            let coordi = p.map(item => item.coordi);
            let titleCity = p.map(item => item.place);
            let region = p.map(item => item.region);

            // console.log('p',global.Job_Location[0].kilometer * 1000)
            let radius = global.Job_Location && global.Job_Location[0] && +global.Job_Location[0].kilometer * 1000 || 5000

            this.setState({
              coordi,titleCity,region,radius
            },() => {
              const {region,coordi} = this.state;
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

    // this.setState({
    //   ...defaultProps,
    // });
    // mg = [];

    const {region,coordi} = this.state;
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
  };

  // componentWillUnmount () {
  //   global.region = this.state
  // }

  componentDidMount() {
    // console.log('hey init')
    var data = [];
    // console.log('hmmm',hp(100),wp(100))
    // global.reset == true ? global.region = {} : global.region

    global.reset == false ? this.setState(global.region && global.region) : this.setState(
      { name: '',
        dataCheck: [],
        PlaceText:'',
        show: false,
        suggesion: [],
        radius: 5000,
        natHeight: 1,
        circlecenter: [
          {
            latitude: Lat,
            longitude:  Long,
          },
        ],
        region: [
          {
            latitude: Lat,
            longitude:  Long,
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
        titleCity:[],
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
              longitude: Long - SPACE,
              _id: 1,
            },
          },
        ]}
  )
    
    const {region,coordi} = this.state;
    
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

    // try {
    //   http.GET('api/appcityjson/get').then(
    //     (res) => {
    //       if (res['data']['status']) {
    //         console.log('res', res['data']['result']);
    //         this.setState({
    //           dataCheck: res['data']['result'],
    //         });
    //         let p = res['data']['result'];
    //         this.arrayholder = p.map((cell, i) => {
    //           let temp = {};
    //           temp = {cell, right: false};
    //           return temp;
    //         });
    //         //            //will get data in this    res['data']['result']
    //       } else {
    //         snack(res['data']['message']);
    //       }
    //     },
    //     (err) => snack(err['message']),
    //   );
    // } catch (error) {
    //   snack(error);
    // }
  }


  permission = async () => {
    const f = await PermissionHelper.Storage.isLocationPermissionGranted();
    console.log('enable', f);
    if (f) {
      this.setState({granted: true});
      this.LATLong();
    } else {
      const f = await PermissionHelper.Storage.requestLocationPermission();
      !f && alert('please enable location');
      !f && this.permission();
      f && this.LATLong();
    }
  };

  LATLong = async () => {
    try {
      await Geolocation.getCurrentPosition(
        (info) => {
          console.log('inf', info);
          global.let = info.coords.latitude;
          global.long = info.coords.longitude;
          this.setState({
            region: [
              {
                latitude: global.let,
                longitude: global.long,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
              },
            ],
            coordi: [
              {
                latitude: global.let,
                longitude: global.long,
              },
            ],
          });
          console.log('region',this.state.region)
          this.map.animateToRegion(this.state.region[0], 500);
        },
        (error) => snack(error.message + 'please on the the location'),
      );
    } catch (err) {
      console.log('>>>>>>>>>', err);
    }
  };

  choose = (choose, index) => {
    mg.push(choose.cell);
    mg = [...new Set(mg)];
    // console.log('mg', mg);

    let mni = [];
    mg.filter((i) => i != choose.cell || (i != '' && mni.push(i)));
    this.setState(
      {
        suggesion: mg,
        name: '',
        show: !this.state.show,
      },
      () => {
        //   if (this.arrayholder.length /2 == this.state.suggesion.length)
        //   {
        //     // return
        //     this.arrayholder.push({cell : '',right:false})
        //     this.arrayholder.push({cell : '',right:false})
        //   }

        //   let Toind = (((this.state.suggesion.length * 2) / 2 - 1) * 2 / (2-1) + 1)

        //   this.arrayholder.filter((item,index)=> {
        //     if (index == Toind)
        //       {
        //         console.log('item',index)
        //         this.arrayholder[index].right == true  ? Toind + 2 :Toind
        //       }
        //   })

        // this.arrayholder.filter((iterm) => {
        //   if (iterm.cell == choose.cell) iterm.right = true;
        // });

        //   console.log('tpind',Toind)
        //   this.arrayholder.swap(index, Toind)
      },
    );
  };
  cheks = (text) => {
    let newData = this.arrayholder.filter((item) => {
      const itemData =
        item.cell != null &&
        `${item.cell.toUpperCase()}   
                    ${item.cell.toUpperCase()} ${item.cell.toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData.toString().indexOf(textData) > -1;
    });

    newData = newData.filter((item) => !mg.includes(item.cell));

    newData =
      newData.length && newData.length < 10 ? newData : newData.slice(0, 10);
    if (newData.length) {
      this.setState({
        dataCheck: newData,
        name: text,
      });
    } else {
      this.setState({
        name: text,
      });
    }
  };
  suggestionTag = (elements, index) => {
    let {titleCity, region, coordi} = this.state;
    // index = index;
    titleCity = titleCity.filter((item) => item != elements);
    global.Favorite_Location = global.Favorite_Location.filter((item) => item.place != elements)
    region = region.filter((i, id) => id != index);
    coordi = coordi.filter((i, id) => id != index);

     titleCity.length == 0 && 
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
     })

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

    titleCity.length && this.setState({
      titleCity,
      region,
      coordi,
    },()=> {
      global.Job_Location = global.Favorite_Location
      global.region = this.state
    });
    
  };
  // suggestionTag = (elements, index) => {
  //   const {suggesion} = this.state;
  //   let m = suggesion;
  //   for (let i in suggesion) {
  //     if (m[i] == elements) {
  //       m.splice(i, 1);
  //     }
  //   }
  //   mg = m;

  //   this.arrayholder.filter((iterm) => {
  //     if (iterm.cell == elements) iterm.right = false;
  //   });

  //   // let mp =this.arrayholder
  //   // let i = index
  //   //   const map = function (mp,index){
  //   //     if (index + 2 < mp.length && mp[index + 2].right == true)
  //   //         {mp.swap(index,index+2);
  //   //         i = index + 2
  //   //       i < mp.length && map(mp,i)
  //   //       }
  //   //   }
  //   //   i < this.arrayholder.length ? map(mp,i) : i = index

  //   this.setState({
  //     suggesion: m,
  //     //   dataCheck:this.arrayholder,
  //   });
  // };
  next = () => {
    // mg = this.state.name.split(',');
    // mg = [...new Set(this.state.suggesion)];
    // console.log('mg', mg);
    global.region = this.state;
    global.Job_Location = global.Favorite_Location;
    // this.setState({
    //   ...defaultProps,
    // });
    // mg = [];
    global.reset = false
    this.props.navigation.navigate('FavoriteCompany');
    
  };
  back = () => {
    global.region = this.state;
    // console.log('globa',global.region,this.state)
    this.props.navigation.goBack();
  };
  renderItem = (item, index) => {
    return (
      item.cell && (
        <View
          style={{
            width: 'auto',
            flexWrap: 'wrap',
            flexDirection: 'row',
            margin: 2,
          }}>
          <TouchableWithoutFeedback
            onPress={() =>
              !item.right
                ? this.choose(item, index)
                : this.suggestionTag(item, index)
            }>
            <View
              style={{
                alignItems: 'flex-start',
                borderWidth: item.cell != '' ? 1 : 0,
                borderColor: themeColor,
                borderRadius: 10,
                paddingHorizontal: 10,
                width: 'auto',
                backgroundColor: item.right ? 'white' : 'transparent',
                borderColor: '#fff',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: scale(18),
                  color: item.right ? themeColor : themeWhite,
                }}>
                {item.cell}
              </Text>
              {item.right && (
                <View
                  style={{
                    // top: scale(-7),
                    left: scale(5),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  {library('highlight-off', scale(17), themeColor)}
                </View>
              )}
            </View>
          </TouchableWithoutFeedback>
        </View>
      )
    );
  };

  change = async (value) => {
    let given = await this.map.getCamera();
    // console.log('given', given);

    // console.log('longi', value);
    var circum = 40075;
    var ond = 111.32 * 1000;

    global.Favorite_Location = global.Favorite_Location.filter(item =>  item.kilometer = value)

    console.log(global.Favorite_Location)

    var distance = value * 1000;
    var angle = distance / circum;
    let region = this.state.region;
    let r = region.map((reg) => {
      var latitudeDelta = distance / ond;
      var longitudeDelta = Math.abs(
        Math.atan(
          Math.sin(angle) * Math.cos(reg.latitude),
          Math.cos(angle) - Math.sin(reg.latitude) * Math.sin(reg.latitude),
        ),
      );
      return {
        latitude: reg.latitude,
        longitude: reg.longitude,
        latitudeDelta: latitudeDelta + 0.7,
        longitudeDelta: longitudeDelta + 0.7,
      };


    });

    this.setState(
      {
        region: r,
        radius: Math.round(distance),
      },
      () =>
      {if (region.length == 1)
                                      this.map.animateToRegion(region[0], 1000);
                                  else
        this.map.fitToCoordinates(
          this.state.coordi.map((item) => item),
          {
            edgePadding: DEFAULT_PADDING,
            animated: true,
          },
        )
      }
    );
    // this.call();
  };

  render() {
    const {suggesion, dataCheck} = this.state;

    return (
      <HideKeyboard>
      <SafeAreaView style={styles.backGround}>
        <NavigationEvents onDidFocus={this.checking} />
        <ImageBackground
          style={styles.ImageBlue}
          source={Background}
          resizeMode={'stretch'}>
          <StatusBar hidden={true} />
          <View style={styles.MainFlex}>
            <View
              style={[
                {
                  top: hp(5),
                flexDirection:'column',
                },
                styles.CenterLogo,
              ]}>
              <View>
                <Image
                  source={require('../Img/logo-spotjo.png')}
                  resizeMode={'contain'}
                  style={{
                    height: hp(20),
                    width: Dimensions.get('window').width / 2 + scale(80),
                  }}
                />
              </View>
              <View style={styles.HeadingText}>
                <Texting
                  style={[
                    {
                      fontSize: hp(3.7),
                      textAlign: 'center',
                    },
                    styles.FontSty,
                  ]}
                  text="Whats_your_favorite_location"
                />
              </View>
              <PlacesInput
                googleApiKey={'AIzaSyD44YCFNIXiBB411geZjrcQ2v1_knq71Hg'}
                placeHolder={global.language == 'english' ? 'Place to Work' : 'Place to Work'}
                language={'en-US'}
                value={this.state.PlaceText}
                onChangeText={(text)=> this.setState({PlaceText:text})}
                // onFocus={(te) => this.setState({PlaceText:te}) }
                // onBlur={(te) => this.setState({PlaceText:te})}
                calla={() => this.permission()}
                ref={(ref) => {
                    this.input = ref;
                  }}
                clearQueryOnSelect={true}
                onSelect={(place) => {
                  this.setState({PlaceText:''})
                  let region = this.state.region;
                  let coordi = this.state.coordi;
                  let titleCity = this.state.titleCity;

                    if(titleCity.length == 0)
                          {
                            console.log('hi')
                            region = []; 
                            coordi =[];
                            global.Favorite_Location = []
                           }

                           let p = titleCity.find(item => item === place.result.name)

                           if (p)
                            {
                              alert('You have selected same city..please select different city')
                              return
                            }
                            else{
                              titleCity.push(place.result.name);
                  console.log('place',place.result.geometry.viewport,place.result.geometry.location)                  
  // ,latitude , longitude ,kilometer
                  global.Favorite_Location.push({place : place.result.name,kilometer:this.state.radius / 1000,latitude:place.result.geometry.location.lat,
                  longitude:place.result.geometry.location.lng});

                    console.log('global.favorite_location',global.Favorite_Location)
                  region.push({
                    latitude: place.result.geometry.location.lat,
                    longitude: place.result.geometry.location.lng,
                    latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
                  });
                  coordi.push({
                    latitude: place.result.geometry.location.lat,
                    longitude: place.result.geometry.location.lng,
                  });
                  this.setState(
                    {
                      markers: [],
                      data: [],
                      region,
                      coordi,
                      titleCity,
                    },
                    () => {
                      console.log('this.state.region>>>>>', this.state.coordi);
                      // this.map.fitToSuppliedMarkers(
                      //         this.state.coordi.map((item) => item),
                      //         // {
                      //           // edgePadding: DEFAULT_PADDING,
                      //           true
                      //         // },
                      //       );
                      if (region.length == 1)
                                      this.map.animateToRegion(region[0], 1000);
                                  else
                        this.map.fitToCoordinates(
                        this.state.coordi.map((item) => item),
                        {
                          edgePadding: DEFAULT_PADDING,
                          animated: true,
                        },
                      );
                      // this.call();
                    },
                  );
                            }
                  
                }}
                stylesList={{
                  width: wp(100),
                }}
                stylesInput={{
                  backgroundColor: 'transparent',
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
                  // marginBottom: scale(2),
                  height: hp(6),
                  marginHorizontal: wp(8),
                  // marginTop: scale(100),
                  justifyContent: 'center',
                  flexDirection: 'row',
                  // marginTop: hasNotch ? StatusBar.currentHeight : hp(2),
                }}
                mainStyle={true}
              />
              <View
                style={{
                  alignItems: 'flex-start',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  flexGrow: 0,
                  marginTop: this.state.titleCity.length ? 0 : 1,
                  width: wp(87),
                  maxHeight: hp(7.4) + 8,
                }}>
                 <ScrollView
                  contentContainerStyle={{
                    flexDirection: 'row',
                    flexWrap:'wrap',
                    marginHorizontal: 2,
                  }}>
                  {this.state.titleCity &&
                    this.state.titleCity.map((elements, index) => (
                      <SuggestionView
                        // backGroundC={'#afafaf'}
                        // textColor={themeWhite}
                        fontscale={hp(2.6)}
                        onPress={() => this.suggestionTag(elements, index)}
                        elements={elements}
                        index={index}
                      />
                    ))}
                </ScrollView>
              </View>
              {this.state.show && (
                <View
                  style={{
                    width: wp(87),
                    borderRadius: scale(5),
                    height: 'auto',
                    backgroundColor: 'transparent',
                    position: 'absolute',
                    top: scale(290),
                  }}
                  onLayout={(e) =>
                    this.setState({natHeight: e.nativeEvent.layout.height})
                  }>
                  <ListOfChoosed
                    contentContainerStyle={{
                      justifyContent: 'flex-start',
                      paddingLeft: 30,
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                    }}
                    data={this.state.dataCheck}
                    keyboardShouldPersistTaps="always"
                    renderItem={({item, index}) => this.renderItem(item, index)}
                  />
                </View>
              )}
              {this.state.PlaceText.length == 0 ? <Animatable.View
                style={{
                  width: wp('87%'),
                  marginHorizontal:wp(10),
                  height: hp('30%'),
                }} animation={'slideInRight'} useNativeDriver={true}>
                <MapView.Animated
                  ref={(ref) => {
                    this.map = ref;
                  }}
                  style={{
                    height: hp('30%'),
                    width: wp('85%'),
                    marginLeft: wp('1%'),
                    marginTop: 1,
                  }}
                  onMapReady={() => {
                        this.map.fitToCoordinates(
                        this.state.coordi.map((item) => item),
                        {
                          edgePadding: DEFAULT_PADDING,
                          animated: true,
                        },
                      );
                  }}
                 
                  provider={PROVIDER_GOOGLE}
                  initialRegion={this.state.region[0]}
                  showsUserLocation={true}>
                  {this.state.coordi.map((coordi, index) => (
                    <MapView.Marker.Animated
                      draggable
                      coordinate={coordi}
                      pinColor={'red'}
                      key={
                        new Date().getTime().toString() +
                        Math.floor(
                          Math.random() * Math.floor(new Date().getTime()),
                        ).toString()
                      }
                      title={this.state.titleCity[index]}
                      onDragEnd={(e) => {
                        this.onMarkerDrag(e, index);
                        //this.call();
                      }}
                    />
                  ))}
                  {this.state.region.map((cir) => (
                    <Circle
                      center={{
                        latitude: cir.latitude,
                        longitude: cir.longitude,
                      }}
                      radius={this.state.radius}
                      strokeColor={themeColor}
                      strokeWidth={2}
                      fillColor="rgba(255,255,255,0.3)"
                      // zIndex={2}
                    />
                  ))}
                </MapView.Animated>
              </Animatable.View> : <Animatable.View
                style={{
                  width: wp('87%'),
                  marginHorizontal:wp(10),
                  height: wp('65%'),
                }} animation={'slideOutLeft'} useNativeDriver={true}>
                <MapView.Animated
                  ref={(ref) => {
                    this.map = ref;
                  }}
                  style={{
                    height: wp('65%'),
                    width: wp('85%'),
                    marginLeft: wp('1%'),
                    marginTop: wp('2%'),
                  }}
                  onMapReady={() => {
                        this.map.fitToCoordinates(
                        this.state.coordi.map((item) => item),
                        {
                          edgePadding: DEFAULT_PADDING,
                          animated: true,
                        },
                      );
                  }}
                  provider={PROVIDER_GOOGLE}
                  initialRegion={this.state.region[0]}
                  showsUserLocation={true}>
                  {this.state.coordi.map((coordi, index) => (
                    <MapView.Marker.Animated
                      draggable
                      coordinate={coordi}
                      pinColor={'red'}
                      key={
                        new Date().getTime().toString() +
                        Math.floor(
                          Math.random() * Math.floor(new Date().getTime()),
                        ).toString()
                      }
                      title={this.state.titleCity[index]}
                      onDragEnd={(e) => {
                        this.onMarkerDrag(e, index);
                        //this.call();
                      }}
                    />
                  ))}
                  {this.state.markers.map((marker, index) => (
                    <Marker
                      key={
                        new Date().getTime().toString() +
                        Math.floor(
                          Math.random() * Math.floor(new Date().getTime()),
                        ).toString()
                      }
                      coordinate={marker.coordinate}
                      pinColor={'green'}
                      // icon={play('ellipse',15,'red')}
                      image={flagBlueImg}
                    />
                  ))}
                  {this.state.region.map((cir) => (
                    <Circle
                      center={{
                        latitude: cir.latitude,
                        longitude: cir.longitude,
                      }}
                      radius={this.state.radius}
                      strokeColor={themeColor}
                      strokeWidth={2}
                      fillColor="rgba(255,255,255,0.3)"
                      // zIndex={2}
                    />
                  ))}
                </MapView.Animated>
              </Animatable.View> }
              <Animatable.View style={{
                 marginTop: scale(10),
                width: wp('85%'),
                height: scale(20),
                // marginLeft: wp('5%')
              }}
              animation={this.state.PlaceText.length == 0 ? 'slideInRight' : 'slideOutLeft'}
              >
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
                    width: wp('85%'),
                    marginTop: hp(100) < 600 ? 0 : scale(5),
                  }}
                  hitSlop={{top: 20, bottom: 20, left: 50, right: 50}}
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
              </Animatable.View>
            </View>
            <BackNext onBack={this.back} onNext={this.next} show={true}/>
          </View>
        </ImageBackground>
      </SafeAreaView></HideKeyboard>
    );
  }
}

export default withNavigationFocus(FavoriteLocation);