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
    Text,
    Image,
    View,Dimensions,ScrollView
} from 'react-native';
import {
    withNavigationFocus,
    NavigationEvents
} from 'react-navigation';
import styles from '../src/Style'
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
    sort,
    filter,
    TRANLINE,
    overlayimage,
    url,FontRegular,
    FontBold,Companyavtar
} from '../Constant/index'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from '../Component/responsive-ratio';
import {
    scale,snack
} from '../src/Util'
// import { Rating, AirbnbRating } from 'react-native-ratings';
import {
    Rating,
    NavigationHead
} from '../Component/ViewManager.js'
import DeviceInfo from 'react-native-device-info';
// import UserCreation from './UserCreation';
import User from './User'
import http from '../api'
import SuggestionView from '../Component/SuggestionView'
import CustomInput from '../Component/Input';
import ListOfChoosed from '../Component/ListOfChoosed';
var mg = [];
import Texting from '../Constant/Text'


class Chat extends React.Component {
  static navigationOptions = {
    header: null,
    title: 'Login',
    };

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            name: '',
            dataCheck: [],
            show: false,
            add:false,
            suggesion: [],
            dataChecks:[]
          };
          this.arrayholder = [];

    }


    Video = (item) => {
        // console.log('hels');
        // let m = url + 'images/company/' + item.video
        if (global.Video)
            this.props.navigation.navigate('VideoPlayer', {
                vid: global.Video
            })
        else
            alert('not uploaded');
        // this.props.navigation.navigate('VideoResume');
    }
    push = (item) => {
        console.log('item', item)
        this.props.navigation.navigate('UserEdit', {
            UserChange: item
        });
    }
    Filter = () => {
        this.props.navigation.navigate('Filter')
    }
    Back = () => {
        this.props.navigation.navigate('ComEdit')
    }
    createJob = () => {
        console.log('hey');

        this.props.navigation.navigate('UserCreation');
    }
    dateDiffInDays(dt) {
      const a = Date.parse(new Date(Date.now()));
      const b = Date.parse(new Date(dt));
      // global.CompanyExp = Math.floor(b - a)
      return Math.floor(a - b);
    }
    componentDidMount() {
        this.checking();
    }
    renderItem = (item, index) => {
        return <TouchableOpacity
        onPress={() => this.props.navigation.navigate('ChatOne', { thread: item })}
      >
       <View style={{marginTop:5,justifyContent:"center",alignItems:"center"}}>
        <View style={{flexDirection:'row',justifyContent:"center",alignItems:"center",width:wp(87),padding:7,}}>
            <View style={{borderWidth:1,borderRadius:10,borderColor:themeColor,padding:1}}>
            <Image style={{height:55,width:65}} source={ item.logo
                    ? {
                        uri: url + 'images/company/' + item.logo,
                      }
                    : Companyavtar
                          
            } resizeMode={'contain'}/>
            </View>
            <View style={{flexDirection:"column",flex:1,marginLeft:7}}>
            <Text style={{color:themeColor,fontSize:16,fontFamily:FontBold}}>
                {item.firstName} {item.lastName}
            </Text>
            </View>
        </View>
       </View>
      </TouchableOpacity>
      };
    
      choose = (choose) => {
        console.log('choose', choose);
        mg.push(choose);
        mg = [...new Set(mg)];
        console.log('sfdsff', mg);
        let mni = [];
        for (let i in mg) {
          if (mg[i] != choose || mg[i] != '') mni.push(mg[i]);
        }
        this.setState({
          suggesion: mni,
          name: '',
          show: !this.state.show,
        });
      };

      checking = () => {
        var data = [];
        console.log(global.Id)
        try {
          http.POST('api/chat/stafflist',{
            companyId : global.Id
          }).then(
            (res) => {
              // console.log('res>>>>>>>>><<<<<<<<',res['data']['result']);
              if (res['data']['status']) {
                console.log('result', res['data']['result']);
                this.setState({
                  dataCheck: res['data']['result']
                });
                let total = res['data']['result'].reduce((tot, arr) => tot + arr.totalunRead,0)
                console.log('total',total)
                global.msgUnreadTotal = total != 0 && total 
                // this.arrayholder = res['data']['result'];
              } else {
                snack(res['data']['message']);
              }
            },
            (err) => snack(err['message']),
          );
        } catch (error) {
          snack(error);
        }
      }

      cheks = (text) => {
        if (text != '') {
          const newData = this.arrayholder.filter((item) => {
            const itemData =
              item.firstName != null &&
              `${item.firstName.toUpperCase()}   
                        ${item.firstName.toUpperCase()} ${item.firstName.toUpperCase()}`;
            const textData = text.toUpperCase();
            return itemData != null && itemData.toString().indexOf(textData) > -1;
          });
          if (newData != '') {
            this.setState({
              dataCheck: newData != null && newData,
              name: text,
            });
          } else {
            newData.push(text);
            this.setState({
              name: text,
              dataCheck: newData != null && newData,
            });
          }
        } else {
          this.setState({
            name: text,
          });
        }
      };
      suggestionTag = (elements, index) => {
        const {suggesion, dataCheck} = this.state;
        let m = suggesion;
        for (let i in suggesion) {
          if (m[i] == elements) {
            m.splice(i, 1), mg.splice(i, 1);
          }
        }
        this.setState({
          suggesion: m,
        });
      };

    onStarRatingPress(rating) {
        // this.setState({
        //     starCount: rating
        // });
    }
    timeConversion = (millisec) => {
      console.log('millisec',millisec)
      const a = Date.parse(new Date(Date.now()));
      const b = Date.parse(new Date(millisec));
      // let today = new Date(millisec);
      console.log('a',a,b)
      if (a > b){
        let c = new Date(b).toLocaleTimeString();
        console.log('c',c)
        c = c.split(':');
        console.log(c)
        return parseInt(c[0]) > 12 ? (parseInt(c[0]) - 12 ) + ':' + c[1] : c[0] + ':' + c[1]
      }else{
        return new Date(b).toDateString();
      }
    };

    renderItems = (item) => {
      console.log('item',item);
       return <TouchableOpacity
        onPress={() => this.props.navigation.navigate('ChatOne', { thread: item })}
      >
       <View style={{marginTop:5,justifyContent:"center",alignItems:"center"}}>
        <View style={{flexDirection:'row',justifyContent:"center",alignItems:"center",width:wp(100),padding:7,}}>
            <View style={{borderWidth:1,borderRadius:10,borderColor:themeColor,padding:1}}>
            {item.hasOwnProperty('profile')? <Image style={{height:55,width:65}} source={ item.profile ? {
                        uri: url + 'images/user/' + item.profile,
                      }
                    : Companyavtar } resizeMode={'contain'}/> :<Image style={{height:55,width:65}} source={ item.logo ? {
                        uri: url + 'images/company/' + item.logo,
                      }
                    : Companyavtar } resizeMode={'contain'}/>}
                     
            </View>
            {item.totalunRead != 0 && <View style={{height:22,width:22,left:2,top:5,position:"absolute",borderRadius:11,
            justifyContent:"center",alignItems:"center",backgroundColor:'red'}}>
                <Text style={{color:"#fff",fontSize:10}}>{item.totalunRead}</Text>
            </View> }
            <View style={{flexDirection:"column",flex:1,marginLeft:7}}>
            <View style={{flexDirection:"row",justifyContent:"space-between"}}>
            <Text style={{color:item.isBlock == 1 ? 'red' : 'gray'}}>
                {item.isBlock == 1 ? 'Blocked' : 'Private'}
            </Text>
            <Text style={{color:themeColor,fontSize:14,fontFamily:FontBold}}>
                {new Date(item.updatedAt).toDateString()}
            </Text>
            </View>
            <Text style={{color:themeColor,fontSize:16,fontFamily:FontBold}}>
                {item.firstName} {item.lastName}
            </Text>
            <Text numberOfLines={2} style={{color:'#333',fontSize:13,fontFamily:FontRegular}}>
            {item.lastMessage }
            </Text>
            </View>
        </View>
       </View>
      </TouchableOpacity>
    }

    FindChat = () => {
        this.setState({
            add:true
        })

        try {
          http.POST('api/chat/allstafflist',{
            companyId : global.Id
          }).then(
            (res) => {
              console.log('res>>>>>>>>>',res['data']['result']);
              if (res['data']['status']) {
                // console.log('result', res['data']['result']);
                this.setState({
                  dataChecks: res['data']['result']
                });
                this.arrayholder = res['data']['result'];
              } else {
                snack(res['data']['message']);
              }
            },
            (err) => snack(err['message']),
          );
        } catch (error) {
          snack(error);
        }
        
    }
    Back = () => {
      this.setState({
        add:false
    })
      this.props.navigation.goBack();
    };

    // sum = (total,num) =>{
    //   return total + num
    // }

    render() {
        const {
            suggesion,dataChecks
        } = this.state;
       

        return (
            <View style={styles.backGround}>
                <StatusBar hidden={false} backgroundColor={'#eee'} />
                <ImageBackground style={styles.ImageBlue}
            source={Background}
            tintColor={themeWhite}
            resizeMode={'stretch'}>
        <NavigationEvents onDidFocus={this.checking}/>
                    <NavigationHead centerComponent='Messages' color ={true} rightComponent='edit' onPress={() => this.Back()} onExit={() => this.FindChat()} />
                    <View style={{width:"100%",paddingTop:5,backgroundColor:"#eeee",borderBottomWidth:1,
                    borderBottomColor:'#eee',paddingBottom:3,justifyContent:"center",alignItems:"center",flexDirection:"row"}}>
                            <Text>
                            {this.state.dataCheck.reduce((tot, arr) => tot + arr.totalunRead,0)} {''}
                            </Text>
                            <Texting text='Message_Unread' />
                        </View>
                    <View style={{
                height: hp(100) - scale(100)
            }}>
            {!this.state.add ? (
                <FlatList
                style={{flex:1,marginBottom:30}}
                extraData={this.state.dataCheck}
        data={this.state.dataCheck}
        keyExtractor={item => new Date().getTime().toString() + (Math.floor(Math.random() * Math.floor(new Date().getTime()))).toString()}
        ItemSeparatorComponent={() => <View style={{height:1,backgroundColor:"#eee",marginLeft:7+65+7,marginRight:7}}/>}
        renderItem={({ item }) => this.renderItems(item)}
      />
            ):
            (
                    <View style={{flex:1}}>
                    <View
              style={[
                {
                  top: scale(10),
                },
                styles.CenterLogo,
              ]}>
              
                <Text
                  style={
                    {
                      fontSize: scale(24),
                      fontFamily: 'Roboto-Bold',
                      color:themeColor
                    }
                  }>
                  Find Your Friends
                </Text>
              <View
                style={{
                  top: scale(20),
                }}>
                <CustomInput
                  value={this.state.name}
                  placeholder={'E.g (Java Developer)'}
                  inputContainerStyle={{borderRadius:scale(20),height:scale(45),width:'92%',backgroundColor:"#fff",borderBottomWidth:0,elevation:5,}}
                  textChange={(text) => {
                    this.setState({
                      show: text != '' ? true : false,
                    });
                    this.cheks(text);
                  }}
                  // autoCompleteType='name'
                  inputStyle={{
                    fontWeight: 'bold',
                    fontSize: scale(18),
                    color: themeColor,
                  }}
                  iconStyle={{
                    height: 25,
                    width: 25,
                  }}
                />
              </View>
              <View
                style={{
                  alignItems: 'flex-start',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  marginTop: scale(1),
                  width: wp(87),
                //   height: suggesion != [] && scale(95),
                }}>
                <ScrollView
                  contentContainerStyle={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                  }}>
                  {suggesion &&
                    suggesion.map((elements, index) => (
                      <SuggestionView onPress={() => this.suggestionTag(elements, index)} elements={elements} index={index} />
                    ))}
                </ScrollView>
              </View>
              {this.state.show && (
                <View
                  style={{
                    width: wp(87),
                    borderRadius: scale(5),
                    top: scale(5),marginBottom:20,
                    height:hp(100) - scale(255)
                  }}>
                  <ListOfChoosed data={dataChecks} keyboardShouldPersistTaps="always" renderItem={({item, index}) => this.renderItem(item, index)}/>
                </View>
              )}
            </View>
                    </View>
            )
            }
      </View>
                </ImageBackground>
            </View>
        )
    }
};  

export default withNavigationFocus(Chat);