import React, {
  PureComponent
} from 'react';
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
import {
  withNavigationFocus,
  NavigationEvents
} from 'react-navigation';
import styles from '../src/Style';
import {
  left,
  library,
  icon,
  play,
  leftVid
} from '../src/IconManager';
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
  detailed,FontBold
} from '../Constant';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../Component/responsive-ratio';
import {
  scale,
  snack,NoData
} from '../src/Util';
// import { Rating, AirbnbRating } from 'react-native-ratings';
import {
  Rating,
  NavigationHeader
} from '../Component/ViewManager.js';
import ItemMV from '../src/ItemMV';
import CompanyProfile from '../src/CompanyProfile';
import DeviceInfo from 'react-native-device-info';
// import JobCompanyProfile from './JobCompanyProfile';
import http from '../api';
import TopHeader from '../Component/TopHeader'
import List from '../Component/List'
import ModalSort from '../Component/ModalSort'
global.back = false;
// import styles from './Style'

// global.item = data[0];

class JobSeekerlist extends React.Component {
  mounted = false

  constructor(props) {
    super(props);

    this.state = {
      userdata: '',
      fil :false,
      srt : false,
      detailed:false,
      openModal:false,
      relevance:false,
      Date:false,
      message:'No_data',
      load:false
    };
    this.navigationWillFocusListener = props.navigation.addListener('willFocus', () => {
      this.checking()
      // do something like this.setState() to update your view
    })
  }

  Filter = () => {
    this.setState({
      fil:true
    })
    this.props.navigation.navigate('JobSeekerFilter');
  };
  
  componentDidMount() {
    this.mounted = true ;
   
  }
  
  checking = () => {
    // console.log('hey - 159 map', global.all)
    // const {params} = this.props.navigation.state;
    // const otherParam = params ? params.otherParam : null;
    // console.log('other item', otherParam);
    // let userdata  = global.all;
    let userdata =global.all.map(item => {
      return {
        ...item,
        heart:false
      }
    })

    this.mounted  && this.setState({ 
      userdata: JSON.parse(JSON.stringify(userdata)),
      fil:false,
      srt:false,
      load:false,
      detailed:false,
      
    });
   
  };

  componentWillUnmount(){
    this.mounted = false ;

  }

  Sort = () => {
    this.setState({
      srt:!this.state.srt,
       openModal:!this.state.openModal
    })
    // let data = this.state.data;
    // data = this.state.srt ? data.sort((a,b) => a.createdAt > b.createdAt ? 1 : -1) : data.sort((a,b) => a.createdAt < b.createdAt ? 1 : -1);
    // this.setState({data})
  }
  date = () => {
    this.setState({
      Date:!this.state.Date,
      relevance:false
    })
       let userdata = this.state.userdata;
    userdata = this.state.Date ? userdata.sort((a,b) => a.createdAt > b.createdAt ? 1 : -1) : userdata.sort((a,b) => a.createdAt < b.createdAt ? 1 : -1);
    
    this.setState({userdata,openModal:!this.state.openModal})
    
  }
  relevance = () => {

    this.setState({relevance:!this.state.relevance,Date:false})
    let userdata = this.state.userdata;
    if (global.addSkill.length === 0)
    {
    
      alert('please select some skills for relevance search')
      this.props.navigation.navigate('Filter')
      
    }
     else
     { 
    userdata = global.addSkill.map(skill => userdata.filter(item => item.skills.filter(item => item.english === skill.cell.english)))
    console.log('userdata',userdata[0]);
    userdata = userdata[0];
     }
    this.setState({userdata,openModal:false})
  }

  heart = (index) => {
    console.log('index',index)
    let d = this.state.userdata
    d[index].heart = !d[index].heart
    this.setState({userdata:d});
  }

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
    this.setState({detailed:true})
    setTimeout(() => {

    this.props.navigation.navigate('JobCompanyProfile', {
      item: global.all[0],
      index: 0,
    });
  }, 300);

    // global.item = item;
    // this.props.navigation.navigate('JobCompanyProfile');
  };
  Video = (item) => {
    console.log('hels');
    let m = url + '/images/company/' + item.video;
    if (item.video)
      this.props.navigation.navigate('VideoPlayer', {
        vid: m,
      });
      else alert('Video is not uploaded');

    // this.props.navigation.navigate('VideoResume');
  };
  Back = () => {
    this.props.navigation.navigate('ChooseTalent');
  };
  render() {
    let {userdata} = this.state
    return (
      <View style={styles.backGround}>
        <StatusBar hidden={true} backgroundColor={themeWhite}/>
        <NavigationEvents onDidFocus={this.checking} />
        <ModalSort isVisible={this.state.openModal} onBackdropPress={()=>this.setState({openModal:false})} 
          relevance={()=>this.relevance()} bydate={()=> this.date()} date={this.state.Date} rel={this.state.relevance}/>
        <ImageBackground
          style={styles.ImageBlue}
          tintColor={themeWhite}
          source={Background}
          resizeMode={'stretch'}>
           <NavigationHeader
            onPress={() => this.Back()}
            text={userdata && this.state.userdata.length + ' Jobs Found'}
            Search={this.Filter}
          />
           <TopHeader data={userdata && this.state.userdata.length} sort={this.Sort} srtTint={this.state.srt} filTint={this.state.fil} Filter={this.Filter} detailedTint={this.state.detailed} detailed={this.pushy}/>
          {this.state.userdata != '' ? (
            <List style={{marginTop: 3,
                marginBottom: 45,
                backgroundColor: 'transparent',}} data={userdata} renderItem={({item, index}) => (
                  <ItemMV
                  item={item}
                  index={index}
                  push={this.push}
                  heart={this.heart}
                  Video={this.Video}
                />
              )} />
          ) : (
           <NoData text= {this.state.message}/>
          )}
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