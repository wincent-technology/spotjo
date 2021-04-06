import React, {
  PureComponent
} from 'react';
import {
  StatusBar,
  ImageBackground,
  View,
} from 'react-native';
import {
  withNavigationFocus,
  NavigationEvents
} from 'react-navigation';
import styles from './Style';

import {
  themeWhite,
  Background,
  url,
} from '../Constant/index';
import {
  NoData
} from './Util';
import {
  NavigationHeader
} from '../Component/ViewManager.js';
import ItemMV from './ItemMV';
import DeviceInfo from 'react-native-device-info';
import TopHeader from '../Component/TopHeader'
import List from '../Component/List'
class JobList extends PureComponent {
    state = {
      data: [],
      fil :false,
      srt : false
    };

    componentDidMount() {
    this.checking();
  }
  checking = () => {
    console.log('globalsdf',global.all)
    this.setState({ 
      data: JSON.parse(JSON.stringify(global.all)),
      fil:false,
      srt:false
    });
  };

  Filter = () => {
    this.setState({
      fil:true
    },()=> this.props.navigation.navigate('Filter'))
  };

  Sort = () => {
    this.setState({
      srt:true
    })
  }

  push = (item, index) => {
    //  global.all  = 
    

    this.props.navigation.navigate('CompanyProfile', {
      item: item,
      length:this.state.data.length,
      index:index
    });
  };
  heart = (index) => {
    let d = this.state.data
    d[index].heart = true
    this.setState({data:d});
    setTimeout(() => {
    this.props.navigation.navigate('LoginFirst')
    }, 500);
  }

  pushy = () => {
    this.props.navigation.navigate('CompanyProfile', {
      item: global.all[0],
      length:this.state.data.length
    });
  };
  Video = (item) => {
    let m = url + 'images/company/' + item.video;
    if (item)
      this.props.navigation.navigate('VideoPlayer', {
        vid: m,
      });
    else alert('not uploaded');
  };
  Back = () => {
    this.props.navigation.navigate('ChooseTalent');
  };
  render() {
    const {
      data
    } = this.state;
    console.warn('>> false', DeviceInfo.getBrand());

    return (
      <View style={styles.backGround}>
        <StatusBar hidden={false} backgroundColor={themeWhite} />
        <NavigationEvents onDidFocus={this.checking} />
        <ImageBackground
          style={styles.ImageBlue}
          source={Background}
          tintColor={'#fff'}
          resizeMode={'stretch'}>
          <NavigationHeader
            onPress={() => this.Back()}
            text={global.Job_Title}
          />
          <TopHeader data={data && this.state.data.length} sort={this.Sort} srtTint={this.state.srt} filTint={this.state.fil} Filter={this.Filter} detailed={this.pushy}/>
          {this.state.data != '' ? (
            <List style={{marginTop: 4,
                marginBottom: 45,
                backgroundColor: 'transparent',}} data={data} renderItem={({item, index}) => (
                  <ItemMV
                  item={item}
                  index={index}
                  push={this.push}
                  heart={this.heart}
                  Video={this.Video}
                />
              )} />
          ) : (
           <NoData/>
          )}
        </ImageBackground>
      </View>
    );
  }
}
export default withNavigationFocus(JobList);