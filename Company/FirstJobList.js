
import React, {
  PureComponent
} from 'react';
import {
  StatusBar,
  ImageBackground,TouchableOpacity,
  View,Text
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
  url,FontBold
} from '../Constant/index';
import {
  NoData
} from '../src/Util';
import {play} from '../src/IconManager'
import {
  NavigationHeader
} from '../Component/ViewManager.js';
import ItemMVJobb from './ItemMVJobb';
import TopHeader from '../Component/TopHeader'
import List from '../Component/List'
import AsyncStorage from '@react-native-community/async-storage';
import Modal from 'react-native-modal'
import { widthPercentageToDP as wp} from '../Component/responsive-ratio';
import ModalSort from '../Component/ModalSort'
import WebRegisterCompanyCheck from '../Component/WebRegisterCompanyCheck'

var c = 0;

class FirstJobList extends PureComponent {
  mounted = false

    state = {
      data: [],
      fil :false,
      srt : false,
      detailed:false,
      openModal:false,
      relevance:false,
      Date:false,
      role:false,
      message:'No_data'
    };

  Filter = () => {
    if (global.role === 'Super Admin'){
    this.setState({
      fil:true
    })
    this.props.navigation.navigate('FilterUser');}
    else
    this.setState({role:true})
  };
  Sort = () => {
    global.role === 'Super Admin' ? 
    this.setState({
      srt:true,
      openModal:!this.state.openModal
    }) : 
    this.setState({role:true})

  }

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

  push = (item, index) => {

    if (global.role == 'Super Admin') 
{

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
                  }else{
                  tmpobj = JSON.parse(JSON.stringify(jobs[i]));
                  data.push(tmpobj)
                  }
              }
              global.all = data
// console.log('data',global.all.length)
    global.ig = global.all;
              // console.log('lrngth',global.ig.length)
    global.ig && this.props.navigation.navigate('UserPro', {
      item: item,
      index: index,
      status: 'undefined',
    }); }
    else {
      this.setState({role:true})
    }
  };
  pushy = () => {
    if (global.role == 'Super Admin') 
    {
    let data = []
    let From,
        To,
        tmpobj,
        jobs = global.all;

for (let i =0; i<jobs.length;i++) {

  if (jobs[i]['workexp']) {
      for (let j=0; j<jobs[i]['workexp'].length;j++) {
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
  }
  else 
  this.setState({role:true})
  };
  Back = () => {
    // console.log('hmm')
    this.props.navigation.navigate('CompanyEditProfile');
  };
  componentDidMount() {
    this.mounted = true
    this.checking();
  }
  Video = (item) => {
    console.log('hels');
    let m = url + 'images/user/' + item.video;
    if (item.video)
      this.props.navigation.navigate('VideoPlayer', {
        vid: m,
      });
    else alert('Video is not uploaded');
    // this.props.navigation.navigate('VideoResume');
  };
  checking = async () => {
    // if (this.state.fil)
    //   {
    //     global.Role.length != 0 && this.setState({message:"no data found please try with another Role"})
    //     global.CompanyGuest.length != 0 && this.setState({message:"no data found please try with another skill"})
    //   }
    //   global.Role = []
    //   global.CompanyGuest = []

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
        // data = [...new Set(data)]
        // data.filter(item => result.filter(items => items.id === item.id && item.heart == true))
        //   if (result.includes(item))
        //    item.heart = true 
        //    else
        //    item.heart = false
        //   return item})
          
    this.mounted  && this.setState({ 
      data,
      fil:false,
      srt:false,
      detailed:false
    });
  };
  componentWillUnmount(){
    this.mounted = false ;

  }
  render() {
    const {
      data
    } = this.state;
    return (
      <View style={styles.backGround} onStartShouldSetResponder={() => global.role != 'Super Admin' && this.setState({role:true})}>
        <WebRegisterCompanyCheck onPress={()=> this.setState({role:false})} role={this.state.role} />
        <NavigationEvents onDidFocus={this.checking} />
          <StatusBar hidden={true} backgroundColor={themeWhite} />
          <ModalSort isVisible={this.state.openModal} onBackdropPress={()=>this.setState({openModal:false})} 
          relevance={()=>this.relevance()} bydate={()=> this.date()} date={this.state.Date} rel={this.state.relevance}/>
        <ImageBackground
          style={styles.ImageBlue}
          source={Background}
          tintColor={themeWhite}
          resizeMode={'stretch'}>
          <NavigationHeader
            onPress={() => this.Back()}
            text={data && this.state.data.length + ' Job Seeker Found'}
            Search={this.Filter}

          />
          <TopHeader data={data && this.state.data.length} sort={this.Sort} srtTint={this.state.srt} filTint={this.state.fil} Filter={this.Filter} detailedTint={this.state.detailed} detailed={this.pushy} />
          {this.state.data != '' ? (
        <List style={{marginTop: 4,
                marginBottom: 45,
                backgroundColor: 'transparent',}} 
                extraData={data}
                data={data} renderItem={({item, index}) => (
                <ItemMVJobb
                  item={item}
                  index={index}
                  push={this.push}
                  Video={this.Video}
                  select={this.select}
                />
              )} />
            
          ) : (
            <NoData text={this.state.message}/>
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