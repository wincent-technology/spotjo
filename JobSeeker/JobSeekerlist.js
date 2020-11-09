import React, {PureComponent} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  FlatList,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Text,
  Image,
  View,
} from 'react-native';
import {withNavigationFocus, NavigationEvents} from 'react-navigation';
import styles from '../src/Style';
import {left, library, icon, play, leftVid} from '../src/IconManager';
import {
  themeColor,
  themeWhite,
  Background,
  TRANLINE,
  place,
  screen,
  edit,
  earth,
  dollor,
  user,
  bag,
  sort,
  filter,
  url,
  Listed,
  detailed,
} from '../Constant/index';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../Component/responsive-ratio';
import {scale, snack} from '../src/Util';
// import { Rating, AirbnbRating } from 'react-native-ratings';
import {Rating, NavigationHeader} from '../Component/ViewManager.js';
import ItemMV from '../src/ItemMV';
import CompanyProfile from '../src/CompanyProfile';
import DeviceInfo from 'react-native-device-info';
// import JobCompanyProfile from './JobCompanyProfile';
import http from '../api';

global.back = false;
// import styles from './Style'

// global.item = data[0];

class JobSeekerlist extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      userdata: '',
    };
  }

  Filter = () => {
    this.props.navigation.navigate('JobSeekerFilter');
  };
  componentDidMount() {
    try {
      http.GET('api/appjob/get').then(
        (res) => {
          if (res['data']['status']) {
            global.all = res['data']['result'];
            this.setState({
              userdata: res['data']['result'],
            });
          } else {
            snack(res['data']['message']);
          }
        },
        (err) => alert(JSON.stringify(err['message'])),
      );
    } catch (error) {
      alert(error);
    }
  }
  checking = () => {
    // console.log('hey - 159 map', global.all)
    // const {params} = this.props.navigation.state;
    // const otherParam = params ? params.otherParam : null;
    // console.log('other item', otherParam);
    this.setState({
      userdata: global.all,
    });
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
  pushy = () => {
    this.props.navigation.navigate('JobCompanyProfile', {
      item: global.all[0],
      index: 0,
    });
    // global.item = item;
    // this.props.navigation.navigate('JobCompanyProfile');
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
  Back = () => {
    this.props.navigation.navigate('ChooseTalent');
  };
  render() {
    console.warn('>>', DeviceInfo.hasNotch());

    return (
      <View style={styles.backGround}>
        <StatusBar hidden={true} />
        <NavigationEvents onDidFocus={this.checking} />
        <ImageBackground
          style={styles.ImageBlue}
          source={Background}
          resizeMode={'stretch'}>
          <NavigationHeader
            onPress={() => this.Back()}
            text="Fresher Java Developer"
          />
          <View style={styles.JoblistSecondViewHeading}>
            <View style={styles.JoblistSecondViewHeadingResult}>
              <Text style={styles.JoblistSecondViewHeadingText}>
                Results - {this.state.userdata.length}
              </Text>
            </View>
            <View style={styles.JobListUpperButtonView}>
              <View style={{marginRight: scale(5), flexDirection: 'row'}}>
                <TouchableWithoutFeedback>
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
                <TouchableWithoutFeedback onPress={this.pushy}>
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

          <FlatList
            style={{
              marginTop: 4,
              marginBottom: 50,
              backgroundColor: 'transparent',
            }}
            data={this.state.userdata}
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
          <View style={styles.TranLingImage}>
            <Image
              source={TRANLINE}
              style={styles.imageStyle}
              resizeMode={'stretch'}
            />
          </View>
        </ImageBackground>
      </View>
    );
  }
}

// class CompanyProfile extends Component {
//     render() {
//         return <View><Text>{this.props.item.header}</Text></View>;
//     }
// }

export default withNavigationFocus(JobSeekerlist);
