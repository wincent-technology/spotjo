import React, { PureComponent } from 'react';
import { SafeAreaView, StyleSheet, StatusBar, Platform, Dimensions, FlatList, TouchableWithoutFeedback, TouchableOpacity, ImageBackground, Text, Image, View } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import styles from './Style'
import { left, library, icon, play, leftVid } from './IconManager';
import { themeColor, themeWhite, Background, sort, filter, TRANLINE } from '../Constant/index'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../Component/responsive-ratio';
import { scale } from './Util'
import { NavigationHeader } from '../Component/ViewManager'
import Slider from '@react-native-community/slider';
import ItemMV from './ItemMV'
import MapView, { PROVIDER_GOOGLE, Circle, Marker } from 'react-native-maps';
import flagBlueImg from '../Img/circle-16.png'
import Geolocation from '@react-native-community/geolocation';


const SPACE = 0.01;
let LATITUDE = 37.78825;
let LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
// const LONGITUDE_DELTA = 0.0421;

const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
// const LATITUDE_DELTA = (Platform.OS === global.platformIOS ? 1.5 : 0.5);
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

// Use the below code to zoom to particular location with radius.


var flag = false;

class ScreenMap extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            radius: 5000,
            region: {
                latitude: LATITUDE,
                longitude: LONGITUDE,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            },
            markers: [{
                coordinate: {
                    latitude: LATITUDE + SPACE,
                    longitude: LONGITUDE + SPACE,
                },
            }, {
                coordinate: {
                    latitude: LATITUDE + SPACE,
                    longitude: LONGITUDE - SPACE,
                },

            }, {
                coordinate: {
                    latitude: LATITUDE,
                    longitude: LONGITUDE,
                },

            }, {
                coordinate: {
                    latitude: LATITUDE,
                    longitude: LONGITUDE - SPACE / 2,
                },
                coordinate: {
                    latitude: LATITUDE - SPACE,
                    longitude: LONGITUDE + SPACE,
                },

            }, {
                coordinate: {
                    latitude: LATITUDE - SPACE,
                    longitude: LONGITUDE - SPACE,
                },

            }, {
                coordinate: {
                    latitude: LATITUDE,
                    longitude: LONGITUDE,
                },

            }, {
                coordinate: {
                    latitude: LATITUDE,
                    longitude: LONGITUDE - SPACE / 3,
                },

            },],
        }
    }

    // componentWillMount() {
    //     Geolocation.getCurrentPosition(info => {
    //         LATITUDE = info.coords.latitude
    //         LONGITUDE = info.coords.longitude
    //     })
    // }
    componentDidMount() {
        const {radius} = this.state;
        const {params} = this.props.navigation.state;
        const otherParam = params ? params.otherParam : null;
        this.setState({
            data: otherParam || []
        })
        // this.map.animateToRegion({
        //     latitude: LATITUDE,
        //     longitude: LONGITUDE,
        //     latitudeDelta: LATITUDE_DELTA * Number(radius / 15),
        //     longitudeDelta: LONGITUDE_DELTA * Number(radius / 15)
        // }, 2000);

    }
    Filter = () => {
        this.props.navigation.navigate('Filter')
    }
    push = (item) => {
        // console.log("heelo", item);
        this.props.navigation.navigate('CompanyProfile', {
            item: item
        })
    }
    Back = () => {
        this.props.navigation.goBack()
    }

    render() {
        const {region, redius, markers} = this.state
        return (
        (global.item ?
            <View style={styles.backGround}><ImageBackground style={styles.ImageBlue}
            source = {Background}
            resizeMode = {
            'stretch'
            }>
            <NavigationHeader onPress={() => this.Back()} text='Search Location'/>
             <View style={styles.JoblistSecondViewHeading}>
            <View style={styles.JoblistSecondViewHeadingResult}>
            <Text style={styles.JoblistSecondViewHeadingText}>Results - {this.state.data.length}</Text>
           </View>
            <View style={styles.JobListUpperButtonView}><TouchableWithoutFeedback>
            <View style={[{
                marginRight: scale(15)
            }, styles.JobListUpperButtonIcon]}>
            <Image source ={sort} style={{
                height: scale(20),
                width: scale(16)
            }} resizeMode={'contain'}/>
            <Text style={styles.JoblistUpperButton}>Sort</Text>
            </View>
            </TouchableWithoutFeedback>
             <TouchableWithoutFeedback onPress={this.Filter}>
            <View style={styles.JobListUpperButtonIcon}>
            <Image source ={filter} style={{
                height: scale(19),
                width: scale(14),
                marginTop: scale(1)
            }} resizeMode={'contain'}/>
            <Text style={styles.JoblistUpperButton}>Filter</Text>
            </View>
            </TouchableWithoutFeedback>
   </View></View>
   <View style={{
                width: wp('100%'),
                height: wp('65%'),
            }}>
 <MapView
            ref={ref => {
                this.map = ref;
            }}
            style={styles.MapViewStyle}
            provider={PROVIDER_GOOGLE}
            showsUserLocation
            onRegionChange = {(region) => this.setState({
                region
            })}
            onRegionChangeComplete = {(region) => {
                console.log(" region", region)
            }}
            // initialRegion={region}
            showsUserLocation={true}
            >
           
            {this.state.markers.map(marker => (
                <Marker
                key={marker.index}
                coordinate={marker.coordinate}
                title={marker.title}
                description={marker.description}
                pinColor={"#000"}
                image={flagBlueImg}
                />
            ))}
           <Circle  center=
            {region}
            radius={redius ? redius : 5000}
            strokeColor={themeColor}
            strokeWidth={2}
            fillColor='rgba(255,255,255,0.3)'
            // zIndex={2}
            /></MapView>
   </View>
   <View style={styles.MapSliderText}><View style={styles.FilterMinimumSalaryMin}><Text style={[{
                fontWeight: "bold",
                color: themeWhite
            }, styles.FilterMinText]}>0 KM</Text>
            <Text style={[{
                fontWeight: "bold",
                color: themeWhite
            }, styles.FilterMaxText]}>200 KM</Text></View><Slider
            style={{
                width: wp('90%'),
                marginTop: scale(-5)
            }}
            onSlidingStart={() => {

            }}
            onSlidingComplete={() => {

            }}
            maximumTrackTintColor={themeWhite}
            thumbTintColor={themeWhite}
            onValueChange={ value => {
                this.setState({
                    redius: value * 1000
                })
            }}
            minimumValue={1}
            maximumValue={200}
            minimumTrackTintColor={themeWhite}
            maximumTrackTintColor={themeWhite}
            /></View>
            <FlatList
            style={styles.MapVerticalList}
            data = {this.state.data}
            showsHorizontalScrollIndicator = { false  }
            removeClippedSubviews={true}
            renderItem={({item, index}) => <ItemMV
                item={item}
                index={index}
                push={this.push}
                // getAudioTimeString={this.getAudioTimeString}
                />}
            initialNumToRender={5}
            maxToRenderPerBatch={10}
            updateCellsBatchingPeriod={70}
            getItemLayout={(data, index) => (
            {
                length: hp('33%'),
                offset: hp('33%') * index,
                index
            }
            )}
            keyExtractor = {
            (item, index) => index + ''
            }
            />
            <View style={styles.TranLingImage}>
             <Image
            source={TRANLINE}
            style={styles.imageStyle}
            resizeMode={'stretch'}
            /></View>
            </ImageBackground></View> : null)
        );
    }
}


export default withNavigationFocus(ScreenMap)