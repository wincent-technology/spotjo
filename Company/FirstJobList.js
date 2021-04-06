
import React, {
  PureComponent
} from 'react';
import {
  StatusBar,
  FlatList,
  TouchableWithoutFeedback,
  ImageBackground,
  Text,
  Image,
  View,
} from 'react-native';
import {
  withNavigationFocus,
  NavigationEvents
} from 'react-navigation';
import styles from '../src/Style';
import {
  themeColor,
  themeWhite,
  Background,
  sort,
  filter,
  FontBold,
  url,
  Listed,
  detailed,
} from '../Constant/index';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../Component/responsive-ratio';
import {
  scale,NoData
} from '../src/Util';
import {
  NavigationHeader
} from '../Component/ViewManager.js';
import ItemMVJobb from './ItemMVJobb';
import TopHeader from '../Component/TopHeader'
import List from '../Component/List'
var c = 0;

class FirstJobList extends PureComponent {
    state = {
      data: [],
    };

  Filter = () => {
    this.props.navigation.navigate('FilterUser');
  };

  push = (item, index) => {

    let data = []
                    let From,
                        To,
                        tmpobj,
                        jobs = global.all;

              for (let i =0; i<jobs.length; i++) {

                  if (jobs[i]['workexp']) {
                    
                      for (let j = 0; j<jobs[i]['workexp'].length;j++) {

                              tmpobj = JSON.parse(JSON.stringify(jobs[i]));

                              From = jobs[i]['workexp'][j]['From'].split(' ');
                              To = jobs[i]['workexp'][j]['To'].split(' ');

                              tmpobj.Company = jobs[i]['workexp'][j]['Company'];
              tmpobj.Role = jobs[i]['workexp'][j]['Role'];
              tmpobj.totalExp = To[1] - From[1];
                              data.push(tmpobj);
                      }
                  }
                  tmpobj = JSON.parse(JSON.stringify(jobs[i]));
                  data.push(tmpobj)
              }
              global.all = data

    global.ig = global.all;

    global.ig && this.props.navigation.navigate('UserPro', {
      item: item,
      index: index,
      status: 'undefined',
    });
  };
  pushy = () => {
    let data = []
    let From,
        To,
        tmpobj,
        jobs = global.all;

for (let i in jobs) {

  if (jobs[i]['workexp']) {
      for (let j in jobs[i]['workexp']) {
              tmpobj = JSON.parse(JSON.stringify(jobs[i]));

              From = jobs[i]['workexp'][j]['From'].split(' ');
              To = jobs[i]['workexp'][j]['To'].split(' ');

              tmpobj.Company = jobs[i]['workexp'][j]['Company'];
              tmpobj.Role = jobs[i]['workexp'][j]['Role'];
              tmpobj.totalExp = To[1] - From[1];

              data.push(tmpobj);
      }
  }
  tmpobj = JSON.parse(JSON.stringify(jobs[i]));
  data.push(tmpobj)
}
console.log("data >>>", data);
global.all = data

global.ig = global.all;

    data && this.props.navigation.navigate('UserPro', {
      item: global.all || [],
      status: 'undefined',
    });
  };
  Back = () => {
    // console.log('hmm')
    this.props.navigation.goBack();
  };
  componentDidMount() {
    this.checking();
  }
  Video = (item) => {
    console.log('hels');
    let m = url + 'images/user/' + item.video;
    if (item)
      this.props.navigation.navigate('VideoPlayer', {
        vid: m,
      });
    else alert('not uploaded');
    // this.props.navigation.navigate('VideoResume');
  };
  checking = () => {
    this.setState({
      data: global.all,
    });
  };
  render() {
    const {
      data
    } = this.state;
    return (
      <View style={styles.backGround}>
        <NavigationEvents onDidFocus={this.checking} />
          <StatusBar hidden={false} backgroundColor={themeColor} />
        <ImageBackground
          style={styles.ImageBlue}
          source={Background}
          tintColor={themeWhite}
          resizeMode={'stretch'}>
          <NavigationHeader
            onPress={() => this.Back()}
            text={global.Job_Title}
          />
          <TopHeader data={data && this.state.data.length} Filter={this.Filter} detailed={this.pushy}/>
          {this.state.data != '' ? (
        <List style={{marginTop: 4,
                marginBottom: 45,
                backgroundColor: 'transparent',}} data={data} renderItem={({item, index}) => (
                <ItemMVJobb
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
    );
  }
} 

export default withNavigationFocus(FirstJobList);



// <FlatList
//               style={{
                
//               }}
//               data={data}
//               showsHorizontalScrollIndicator={false}
//               removeClippedSubviews={true}
//               renderItem={({item, index}) => (
//                 <ItemMVJobb
//                   item={item}
//                   index={index}
//                   push={this.push}
//                   Video={this.Video}
//                 />
//               )}
//               initialNumToRender={5}
//               maxToRenderPerBatch={10}
//               updateCellsBatchingPeriod={70}
//               getItemLayout={(data, index) => ({
//                 length: hp('28%'),
//                 offset: hp('28%') * index,
//                 index,
//               })}
//               keyExtractor={(item, index) => index + ''}
//             />