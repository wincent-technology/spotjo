import React, {
  Component
} from 'react';
import {
  SafeAreaView,
  TouchableWithoutFeedback,
  StatusBar,
  ImageBackground,
  Dimensions,
  Platform,
  Text,
  Image,
  View,
  TextInput,
  FlatList,
  Picker,
  ScrollView,
} from 'react-native';
import {
  withNavigationFocus
} from 'react-navigation';
import {
  scale
} from '../src/Util';
import CustomInput from '../Component/Input';
import ToggleSwitch from '../Component/ToggleSwitch';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../Component/responsive-ratio';
import {
  switchColor,
  Background,
  themeColor,
  themeWhite,
  iconSearch,
  darkract,
  cal,
  clock,
  FontBold,
  FontRegular,
} from '../Constant/index';
import styles from '../src/Style';
import DateTimePicker from '@react-native-community/datetimepicker';
import http from '../api';
import {
  play,
  
  library
} from '../src/IconManager';
import Slider from 'rn-range-slider';
import SuggestionView from '../Component/SuggestionView'
import ListOfChoosed from '../Component/ListOfChoosed'
var mg = [];
import Texting from '../Constant/Text'
const SPACE = 0.01;
import MapView, {
  PROVIDER_GOOGLE,
  Circle,
  Marker,
} from 'react-native-maps';
const DEFAULT_PADDING = { top: 100, right: 100, bottom: 100, left: 100 };
const ASPECT_RATIO = wp(96) / hp(23);
const LATITUDE_DELTA = Platform.OS === 'ios' ? 1.5 : 0.5;
let LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
import PlacesInput from '../Component/PlacesInput';
const Lat = 52.520008
  const  Long = 13.404954
import flagBlueImg from '../Img/circle-16.png';

class JobPreference extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show1: false,
      show: false,
      currentDate: Date.now(),
      End_date: 'End Date',
      From_date: 'From Date',
      selectedValue: '',
      minYear: '0',
      maxYear: '20',
      lang: [],
      city: [],
      name: '',
      suggesion: [],
      citys: false,
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
    this.arrayholder = [];
  }

  onChange1 = (event, selectedDate) => {
    if (selectedDate === undefined) {
      this.setState({
        show1: !this.state.show1,
      });
      return;
    } else {
      this.setState({
        show1: !this.state.show1,
        End_date: new Date(selectedDate).toLocaleDateString(),
      });
      global.End_date = new Date(selectedDate).toLocaleDateString();
    }
  };

  componentWillUnmount(){
    this.setState({
        show1: false,
        show: false,
        currentDate: Date.now(),
        End_date: 'End Date',
        From_date: 'From Date',
        selectedValue: '',
        minYear: '0',
        maxYear: '20',
        lang: [],
        city: [],
        name: '',
        suggesion: [],
        citys: false,
    });
    mg = [];
  }

  onChange = (event, selectedDate) => {
    if (selectedDate === undefined) {
      this.setState({
        show: !this.state.show,
      });
      return;
    } else {
      this.setState({
        show: !this.state.show,
        From_date: new Date(selectedDate).toLocaleDateString(),
      });
      // global.End_date = new Date(selectedDate).toLocaleDateString()
    }
  };
  // next = () => {
  //   this.props.navigation.navigate('TabScreen');
  // };

  setSelectedValue = (selectedValue) => {
    console.log('selectedValue', selectedValue);
    this.setState({
      selectedValue: selectedValue,
    });
    // global.City = selectedValue
  };

  choose(choose) {
    console.log('choose');
    mg.push(choose);
    mg = [...new Set(mg)];
    console.log('sfdsff', mg);
    global.City = mg;
    let mni = [];

    mg.filter((i) => i != choose || (i != '' && mni.push(i)));

    // for (let i in mg) {
    //   if (mg[i] != choose || mg[i] != '') mni.push(mg[i]);
    // }
    this.setState({
      suggesion: mg,
      name: '',
      citys: !this.state.citys,
    });
  }
  cheks = (text) => {
    var data = [];
    const newData = this.arrayholder.filter((item) => {
      const itemData =
        item != null &&
        `${item.toUpperCase()}   
                    ${item.toUpperCase()} ${item.toUpperCase()}`;
      const textData = text.toUpperCase();
      console.log('itemdata', itemData);
      return itemData != null && itemData.toString().indexOf(textData) > -1;
    });
    
    if (newData != '') {
      this.setState({
        city: newData,
        name: text,
      });
    } else {
      newData.push(text);
      this.setState({
        city: newData,
        name: text,
      });
    }
  };
  renderItem = (item,) => {
    return (
      <View
      style={{
        width: 'auto',
        flexWrap: 'wrap',
        flexDirection: 'row',
        margin: 2,
      }}>
      <TouchableWithoutFeedback
        onPress={() =>this.choose(item)}>
        <View
          style={{
            alignItems: 'flex-start',
            // borderWidth: item.cell != '' ? 1 : 0,
            borderColor: themeColor,
            borderRadius: 10,
            paddingHorizontal: 10,
            width: 'auto',
            backgroundColor: themeColor,
            borderColor:themeColor,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: hp(2.7),
              color: themeWhite,
            }}>
           {item}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
    );
  };
  suggestionTag = (elements, index) => {
    // console.log('this.state',this.state.city)
    let {titleCity, region, coordi,city} = this.state;
    index = index;
    titleCity = titleCity.filter((item) => item != elements);
   city =city.filter((item) => item.place != elements)
    region = region.filter((i, id) => id != index);
    coordi = coordi.filter((i, id) => id != index);

    global.City = city
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
    this.map.animateToRegion(region[0], 1000);
     });
    }
    else {
      this.setState({
        titleCity,
        region,
        coordi,
        city
      },()=> {
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
  };
}
  componentDidMount() {
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
      titleCity:[],
      city:[]
     },() => {
    this.map.animateToRegion(region[0], 1000);
     });
    // try {
    //   http.GET('api/applanguage/get').then(
    //     (res) => {
    //       if (res['data']['status']) {
    //         //            //will get data in this    res['data']['result']
    //         this.setState({
    //           lang: res['data']['result'],
    //         });
    //       } else {
    //         console.log('res', res);
    //         alert(res['data']['message']['message']);
    //       }
    //     },
    //     (err) => alert(JSON.stringify(err)),
    //   );

    //   http.GET('api/appcity/get').then(
    //     (res) => {
    //       if (res['data']['status']) {
    //         //            //will get data in this    res['data']['result']
    //         console.log('res>>>>>>>>>>>>>>city', res['data']['result']);

    //         let mn = [];

    //         for (let i in res['data']['result'])
    //           mn.push(res['data']['result'][i]['title']);

    //         this.setState({
    //           city: mn,
    //         });
    //         this.arrayholder = mn;
    //       } else {
    //         alert(res['data']['message']['message']);
    //       }
    //     },
    //     (err) => alert(JSON.stringify(err)),
    //   );
    // } catch (error) {
    //   console.log('error while register' + error);
    // }
  }
  render() {
    const {
      
      show,
      selectedValue,
      show1,
      suggesion,
    } = this.state;

    return (
      <>
            <StatusBar hidden={false} backgroundColor={themeColor} />
            <ScrollView removeClippedSubviews={true} 
          style={{height:hp('72%'),
          alignSelf:"stretch",marginBottom:200}} nestedScrollEnabled = {true} persistentScrollbar={true}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              alignItems: 'center',
              width: wp(96),
              marginTop: hp(3),
            }}>
            <Text
              style={{
                fontSize:hp(2.7),
                fontFamily: 'Roboto-Bold',
                color: '#333',
              }}>
              Job Preferences
            </Text>
          </View>
          <View
            style={{
              marginTop: hp(2),
            }}></View>
          <View
            style={{
              marginTop: hp(2),
            }}>
            <View
              style={{
                flexDirection: 'row',
                height: hp(5),
                alignItems: 'center',
                borderBottomWidth:1,
                borderColor:"#eee",
                marginBottom: hp(2),
                width: wp(70),
              }}>
              <View style={{alignItems: 'center', marginLeft: scale(10)}}>
                <Text
                  style={{
                    color: "#333",
                    fontSize: hp(2.6),
                    fontWeight: 'bold',
                    fontFamily: FontRegular,
                  }}>
                  Type
                </Text>
              </View>
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Picker
                  selectedValue={this.state.selectedValue}
                  style={{
                    width: wp(50),
                    height: hp(4),
                    color: '#333',
                    fontSize: hp(1),
                    fontWeight: 'bold',
                    fontFamily: FontRegular,
                    left: scale(20),
                    transform: [
                      {
                        scaleX: 1,
                      },
                      {
                        scaleY: 1,
                      },
                    ],
                  }}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setSelectedValue(itemValue)
                  }>
                  <Picker.Item label={'Select Job Type'} value={''} />
                  <Picker.Item label={'Limited'} value={'Limited'} />
                  <Picker.Item label={'Unlimited'} value={'Unlimited'} />
                </Picker>
              </View>
            </View>
            <View
              style={{
                width: wp(70),
                height: hp(5),
                borderBottomWidth:1,
                borderColor:"#eee",
                alignItems: 'center',
                borderRadius: scale(5),
                flexDirection: 'row',
              }}
              onStartShouldSetResponder={() =>
                this.setState({
                  show: !this.state.show,
                })
              }>
              <View
                style={{
                  marginLeft: 10,
                  width: wp(50),
                  alignItems: 'flex-start',
                }}>
                <Text
                  style={{
                    color: '#333',
                    fontSize: hp(2.6),
                    fontFamily: 'Roboto-Regular',
                    fontWeight: 'bold',
                  }}>
                  {this.state.From_date}
                </Text>
              </View>
              <View
                style={{
                  marginLeft: scale(20),
                  width: hp(2.6),
                  height: hp(2.6),
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={cal}
                  tintColor={themeColor}
                  style={{
                    height: hp(2.6),
                    width: hp(2.6),
                  }}
                  resizeMode={'contain'}
                />
              </View>
            </View>
            {selectedValue == 'Limited' && (
              <View
                style={{
                  borderBottomWidth:1,
                borderColor:"#eee",
                  width: wp(70),
                  height: hp(5),
                  marginTop: hp(2),
                  alignItems: 'center',
                  borderRadius: scale(5),
                  flexDirection: 'row',
                }}
                onStartShouldSetResponder={() =>
                  this.setState({
                    show1: !this.state.show1,
                  })
                }>
                <View
                  style={{
                    marginLeft: 10,
                    width: wp(50),
                    alignItems: 'flex-start',
                  }}>
                  <Text
                    style={{
                      color: '#333',
                      fontSize: hp(2.6),
                      fontFamily: 'Roboto-Bold',
                      fontWeight: 'bold',
                    }}>
                    {this.state.End_date}
                  </Text>
                </View>
                <View
                  style={{
                    marginLeft: scale(20),
                    width: hp(2.6),
                    height: hp(2.6),
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={cal}
                    tintColor={themeColor}
                    style={{
                      height: hp(2.6),
                      width: hp(2.6),
                    }}
                    resizeMode={'contain'}
                  />
                </View>
              </View>
            )}
          </View>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={
                new Date(new Date(this.state.currentDate).toLocaleDateString())
              }
              mode={'date'}
              is24Hour={true}
              display="default"
              onChange={this.onChange}
            />
          )}
          {show1 && (
            <DateTimePicker
              testID="dateTimePicker"
              value={
                new Date(new Date(this.state.currentDate).toLocaleDateString())
              }
              mode={'date'}
              is24Hour={true}
              display="default"
              onChange={this.onChange1}
            />
          )}
          
          <View
            style={{
              width: wp(70),
              height: hp(13),
              marginTop: hp(1),
              borderRadius: scale(5),
              borderBottomWidth:1,
              borderColor:"#eee",paddingBottom:15,
              // backgroundColor: themeColor,
            }}>
            <Texting
                style={{
                  left: scale(15),
                  fontSize: hp(2.5),
                  fontFamily: FontRegular,
                  color: '#333',alignItems:"flex-start",
                  fontWeight: 'bold',marginBottom:5,
                }} text='Select_Experience'/>
            <View style={{
              justifyContent:"space-between",width:wp(70),flexDirection:"row"
            }}>
              <Text
                style={{
                  // left: scale(15),
                  fontSize: hp(2),
                  fontFamily: FontRegular,
                  color: '#333',
                  fontWeight: 'bold',
                }}>
                {' '}
                {this.state.minYear} <Texting text='Min_Exp' />
              </Text>
              <Text
                style={{
                  // right: scale(5),
                  // position: 'absolute',
                  fontSize: hp(2),
                  fontFamily: FontRegular,
                  color: '#333',
                  fontWeight: 'bold',
                }}>
                <Texting text='Max_Exp'/> {this.state.maxYear}y+
              </Text>
            </View>
            <Slider
              style={{
                width: wp(70),
                flex: 1,
                height: hp(10),justifyContent:"center",
                alignSelf: 'center',
                marginTop: scale(-40),
              }}
              gravity={'center'}
              floatingLabel
              min={0}
              max={20}
              lineWidth={5}
              step={1}
              selectionColor={themeColor}
              blankColor="#333"
              labelBackgroundColor={themeWhite}
              labelTextColor="#333"
              labelBorderColor={themeWhite}
              onValueChanged={(low, high, fromUser) => {
                global.minYear = low;
                global.maxYear = high;
                this.setState({
                  minYear: low,
                  maxYear: high,
                });
              }}
            />
          </View>
          <View style={{alignItems:'center',width:wp(70)}}>
          <PlacesInput
            googleApiKey={'AIzaSyD44YCFNIXiBB411geZjrcQ2v1_knq71Hg'}
            placeHolder={'Search Place'}
            language={'en-US'}
            mainStyle={true}
            clearQueryOnSelect={true}
            ref={(ref) => {
                    this.input = ref;
                  }}
            calla={(place) => console(place)}
            preferance={true}
            onSelect={(place) => {
              console.log('place>>>>>>>>>>>', place.result.name);
              let region = this.state.region
              let titleCity = this.state.titleCity;
              let city = this.state.city;
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

                           city.push({place : place.result.name,kilometer:this.state.radius / 1000,latitude:place.result.geometry.location.lat,
                  longitude:place.result.geometry.location.lng});
                            global.City = city
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
                  // global.Job_Location = global.Favorite_Location
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
                })
                  // this.map.animateToRegion(this.state.region[0], 500);
                  // this.call();
                                          }
            }}
            stylesList={{
              width: wp('70%'),
            }}
            stylesInput={{
              backgroundColor: 'transparent',
              justifyContent: 'center',
              fontSize: hp(2.6),
                  height: hp(8),
              width: wp(65),
              fontFamily: FontBold,
              fontWeight: 'bold',
              color: '#000',
            }}
            stylesContainer={{
              alignItems: 'center',
              backgroundColor: '#ecfbfe',
              width: wp(70),
              borderRadius: wp(10),
              marginBottom: scale(2),
              height: hp(6),
              marginHorizontal: wp(8),
              // marginTop: scale(3),
              justifyContent: 'center',flexDirection:"row",
              // marginTop: hasNotch ? StatusBar.currentHeight : hp(2),
            }}
          />
          </View>
          <View
                style={{
                  alignItems: 'flex-start',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  flexGrow: 0,
                  marginTop: this.state.titleCity.length ? 0 : 1,
                  width: wp(70),
                  paddingHorizontal: wp(2),
                  marginHorizontal: wp(1),
                  height: this.state.titleCity.length === 0 ? 0 : 'auto',
                  // borderRadius: this.state.titleCity.length === 0 ? 0 : 30,
                  // borderWidth: this.state.titleCity.length === 0 ? 0 : 1,
                  padding: 2,
                  marginTop: 2,
                  maxHeight:hp(10)
                }}>
                <ScrollView
                  contentContainerStyle={{
                    flexDirection: 'row',
                    flexWrap:'wrap',
                    marginHorizontal: 2,
                    width:wp(70)
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
              width: wp('70%'),
              height: hp(23),
            }}>
            <MapView.Animated
              ref={(ref) => {
                this.map = ref;
              }}
              style={{ width: wp('70%'),
              height: hp(23),}}
              provider={PROVIDER_GOOGLE}
              onMapReady={() => {
              this.map.fitToCoordinates(
                        this.state.coordi.map((item) => item),
                        {
                          edgePadding: DEFAULT_PADDING,
                          animated: true,
                        },
                      );
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
        </View></ScrollView>
      </>
    );
  }
}

export default withNavigationFocus(JobPreference);
// {this.state.lang && this.state.lang.map(({item, key}) => {
//                return (
//                    <Picker.Item label = {this.state.lang ? item.title : ''} value = {this.state.lang ? item.title : ''} key={key} />
//                )
//            })}