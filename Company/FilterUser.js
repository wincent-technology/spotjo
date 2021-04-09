import React, {
  Component
} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  ScrollView,
  ImageBackground,
  TouchableWithoutFeedback,
  TouchableOpacity,
  FlatList,
  Text,
  Keyboard,
  Image,
  View,
} from 'react-native';
import {
  withNavigationFocus
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
  scale,
  snack
} from '../src/Util';
import {
  FontBold,
  iconSearch,
  TRANLINE,
  switchColor,
  themeColor,
  themeWhite,
  Background,
  IC_ARR_UP,
  IC_ARR_DOWN,
  minimumSalary,
  salaryType,
  company,
  skill,
  skillCategory,
  skillLavel,
  Filterjobtype,
  searchType,
  blanks,
  Fulls,
} from '../Constant/index';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../Component/responsive-ratio';
import ToggleSwitch from '../Component/ToggleSwitch';
import CustomInput from '../Component/Input';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
  CheckBox,
  DropDownItem,
  NavigationHead,
  StarRating,
} from '../Component/ViewManager.js';
import http from '../api';
import Itemskill from './Itemskill';
import Icon2 from 'react-native-vector-icons/dist/MaterialIcons';
// import Slider from 'react-native-range-slider'
import Slider from 'rn-range-slider';
import Texting from '../Constant/Text'
import ApplyFilterButton from '../Component/ApplyFilterButton'



var mg = [];

let Items = global.language == 'english' ? true : false
const Categoryskill = ({name,...props}) => {
  return (
            <View
            style={{
              flexDirection: 'row',
              width: wp(35),
              marginLeft: wp(5),
            }}>
            <View
              style={{
                alignItems: 'flex-start',
                width: wp(25),
              }}>
              <Texting
                style={{
                  fontSize: scale(16),
                }} numberOfLines={1} text={name}/>
            </View>
            <View
              style={{
                alignItems: 'flex-end',
                width: wp(10),
              }}>
              <Icon2
                name={
                  props.bool
                    ? 'check-box'
                    : 'check-box-outline-blank'
                }
                size={scale(20)}
                color={themeColor}
                onPress={props.onPress}
              />
            </View>
          </View>
  )
}


class FilterUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Hourly: true,
      Monthly: false,
      Yearly: false,
      ByDistance: false,
      ByLocation: false,
      flag: true,
      name: '',
      company: '',
      addSkill: [],
      FullTime: false,
      PartTime: false,
      salary: 0,
      salaryMax: 150000,
      Employed: false,
      Internship: false,
      StudentJobs: false,
      HelpingVacancies: false,
      Freelancer: false,
      dataCheck: [],
      Trainee: false,
      Novice: false,
      Proficient: false,
      Expert: false,
      suggesion: [],
      show: false,
      skillCheck:[],
      suggestionSkill:[],
      showSkill:false,
      natHeight:1,
      keyboardShown:false
    };
    this.arrayholder = [];
    this.arrayholders = [];

    this.slider = React.createRef();

  }

  save = () => {
    mg = [...new Set(this.state.suggesion)];
    console.log('mg', global.Job_Location);
    console.log('mg', this.state);
    let sk = this.state.addSkill.map(item => {
      let temp = {}
      temp.name = Items ? item.cell.english : item.cell.german,
      temp.rating = item.rating
      return temp
    })

    try {
      http
        .POST('api/user/filter', {
          Hourly: this.state.Hourly,
          Monthly: this.state.Monthly,
          Yearly: this.state.Yearly,
          ByDistance: this.state.ByDistance,
          ByLocation: this.state.ByLocation,
          Company: mg,
          skill: this.state.sk,
          FullTime: this.state.FullTime,
          PartTime: this.state.PartTime,
          salMin: this.state.salary,
          salMax: this.state.salaryMax,
          Employed: this.state.Employed,
          Internship: this.state.Internship,
          StudentJobs: this.state.StudentJobs,
          HelpingVacancies: this.state.HelpingVacancies,
          Freelancer: this.state.Freelancer,
          location: global.Job_Location,
          Trainee: this.state.Trainee,
          Novice: this.state.Novice,
          Proficient: this.state.Proficient,
          Expert: this.state.Expert,
        })
        .then(
          (res) => {
            // console.log('ress', res['data']);
            if (res['data']['status']) {
              console.log('nwe api >>>>>>', res['data']['result']);
              // global.all = res['data']['result'];
              // this.props.navigation.navigate('TabScreen', {
              //     otherParam: res['data']['result'],
              // })
              let data = []
                    let From,
                        To,
                        tmpobj,
                        jobs = res['data']['result'];

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
              console.log("data >>>", data);
              global.all = data
              data && this.props.navigation.goBack();
            } else {
              snack('Data Not Found');
            }
          },
          (err) => snack(err['message']),
        );
    } catch (error) {
      snack(error);
    }
  };
  Back = () => {
    console.log('hi');
    this.props.navigation.goBack();
  };
  Exit = () => {
    this.props.navigation.goBack();
  };

  handleChange = (value, index) => {
    var arr = [];
    arr = this.state.suggestionSkill;
    console.log('suggestionskill',this.state.suggestionSkill,value,index)
    arr[index].rating = value;
    this.setState({
      suggestionSkill: arr,
    });

    console.log('suggestionskill',this.state.suggestionSkill)
  };
  componentWillUnmount () {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }
    
  _keyboardDidShow =  () => {
    this.setState({
      keyboardShown:true
    });
    console.log('Keyboard Shown');
  }
    
  _keyboardDidHide = () => {
    this.setState({
      keyboardShown:false
    });

    console.log('Keyboard Hidden');
  }

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    try {
      http.GET('api/skill/get').then(
        (res) => {
          if (res['data']['status']) {
            this.setState({
              skillCheck: res['data']['result'],
            });
            let p = res['data']['result'];
          this.arrayholders = p.map((cell,i) => {
              let temp = {}
              temp = {cell,right:false,rating:1}
              return temp
            } )
            //            //will get data in this    res['data']['result']
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
  // choose = (choose) => {
  //   console.log('choose');
  //   mg.push(choose);
  //   mg = [...new Set(mg)];
  //   console.log('sfdsff', mg);
  //   let mni = [];
  //   for (let i in mg) {
  //     if (mg[i] != choose || mg[i] != '') mni.push(mg[i]);
  //   }
  //   this.setState({
  //     suggesion: mni,
  //     company: '',
  //     show: !this.state.show,
  //   });
  // };
  // cheks = (text) => {
  //   var data = [];
  //   const newData =
  //     this.arrayholder &&
  //     this.arrayholder.filter((item) => {
  //       console.log('item', item);
  //       const itemData =
  //         item != null &&
  //         `${item.toUpperCase()}   
  //                   ${item.toUpperCase()} ${item.toUpperCase()}`;
  //       const textData = text.toUpperCase();
  //       return itemData != null && itemData.toString().indexOf(textData) > -1;
  //     });
  //   // for (let i in newData) {
  //   //     data.push({
  //   //         'name': newData[i],
  //   //         'backGround': 'white'
  //   //     })
  //   // }
  //   if (newData != '') {
  //     this.setState({
  //       dataCheck: newData,
  //       company: text,
  //     });
  //   } else {
  //     newData.push(text);
  //     this.setState({
  //       dataCheck: newData,
  //       company: text,
  //     });
  //   }
  // };
  chooseskill = (choose,index) => {
    let mgs = this.state.suggestionSkill
     mgs.push(choose);
     mgs = [...new Set(mgs)];
 console.log('mg',mgs)
 
     let mni = [];
     mgs.filter((i) => i.cell != choose.cell || i != '' && mni.push(i) )
 
     this.setState({
       suggestionSkill: mgs,
       name: '',
       showSkill: !this.state.showSkill,
     });
   };
   chekskill = (text) => {

    let newData = this.arrayholders.filter(item => {
      const itemData = Items ? item && item.cell != '' ? item.cell.english : `${item}` : item && item.cell != '' ? item.cell.german : `${item}`
      const textData = text.toUpperCase();
      return itemData != null && itemData.toUpperCase().toString().indexOf(textData) > -1;
    }); 
    console.log('new',newData)
    const {suggestionSkill} = this.state
    newData = newData.filter(item => !suggestionSkill.includes(item))
      newData = newData.length && newData.length < 10 ? newData : newData.slice(0,10);

    if (newData.length) {
      this.setState({
        skillCheck:newData,
        name : text,
      });
    } else {
      this.setState({
        name: text,
      });
    }
};
suggestionTagskill = (elements, index) => {

  const {suggestionSkill} = this.state;
  let m = suggestionSkill;
  for (let i in suggestionSkill) {
    if (m[i] == elements.cell) {
      m.splice(i, 1);
    }
 }
  mg = m;

  this.arrayholders.filter((iterm) => {
    if(iterm.cell == elements.cell)
    iterm.right = false
  })

  let mp =this.arrayholders
  let i = index
    const map = function (mp,index){
      if (index + 2 < mp.length && mp[index + 2].right == true)
          {mp.swap(index,index+2);
          i = index + 2
        i < mp.length && map(mp,i)
        }
    }
    i < this.arrayholders.length ? map(mp,i) : i = index

    this.setState({
    suggestionSkill: m,
    skillCheck:this.arrayholders,
    });
};
  suggestionTag = (elements, index) => {
    const {
      suggesion,
      dataCheck
    } = this.state;
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
  // remove = (item, index) => {
  //   console.log(index, item);
  //   const {
  //     addSkill
  //   } = this.state;
  //   let m = addSkill;
  //   for (let i in m) {
  //     if (m[i].name == item) {
  //       m.splice(i, 1);
  //     }
  //   }
  //   this.setState({
  //     addSkill: m,
  //   });
  // };
  renderItems = (item, index) => {
    return (
      <View
      style={{
        width: 'auto',
        flexWrap:'wrap',flexDirection:"row",margin:2
      }}>
      <TouchableWithoutFeedback onPress={() => !item.right ? this.chooseskill(item,index):this.suggestionTagskill(item,index)}>
          <View
            style={{
              alignItems: 'flex-start',borderWidth:item.cell != '' ? 1 : 0,borderColor:themeColor,
              borderRadius:10,paddingHorizontal:10,
              width: 'auto',backgroundColor:item.right ? 'white':"transparent",borderColor:"#fff",flexDirection:"row",justifyContent:"center",alignItems:"center"
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: scale(18),
                color:item.right ? themeColor : themeWhite,
                width:wp(25)
              }} numberOfLines={1}>
                {Items ? item.cell.english : item.cell.german}
              </Text>
              { item.right && <View
                            style={{
                              // top: scale(-7),
                              right: scale(5),justifyContent:"center",alignItems:"center"
                            }}>
                            {library('highlight-off', scale(17), themeColor)}
                          </View>}
            </View>
        </TouchableWithoutFeedback>
      </View>
    );
  };

  render() {
    const {
      suggesion,
      dataCheck,
      show,
      Trainee,
      Novice,
      Proficient,
      Expert,
      Hourly,
      Monthly,
      Yearly,
      ByDistance,
      ByLocation,
      name,
      addSkill,
      Employed,
      Internship,
      StudentJobs,
      HelpingVacancies,
      Freelancer,
      skillCategorylist,
      FullTime,
      PartTime,showSkill,suggestionSkill
    } = this.state;
    return (
      <SafeAreaView style={styles.backGround}>
        <ImageBackground
          style={styles.ImageBlue}
          source={Background}
          tintColor={themeWhite}
          resizeMode={'stretch'}>
          <StatusBar hidden={false} backgroundColor={themeWhite} />
          <NavigationHead
            centerComponent="Edit Filter"
            rightComponent="Exit"
            onPress={() => this.Back()}
            onExit={() => this.Exit()}
          />
          <View style={{height:1,width:"100%",backgroundColor:'gray',marginTop:10}}/>
          <View style={styles.FilterMainView}>
              <ScrollView
                style={styles.FilterScroll}
                nestedScrollEnabled={true}>
                <DropDownItem
                  style={[
                    styles.FilterDropDown,
                    {
                      marginTop: scale(15),
                    },
                  ]}
                  contentVisible={false}
                  invisibleImage={IC_ARR_DOWN}
                  visibleImage={IC_ARR_UP}
                  header={
                    <View style={styles.FilterDropDownInnerView}>
                      <View style={styles.fliterIcon}>
                        <Image
                          source={minimumSalary}
                          style={styles.imageStyle}
                          resizeMode={'contain'}
                        />
                      </View>
                      <Texting style={styles.DropDownHeader} text='Minimum_Salary' />
                    </View>
                  }>
                  <View style={styles.FilterMinimumSalary}>
                    <View style={styles.FilterMinimumSalaryMin}>
                      <Text style={styles.FilterMinText}>
                        {this.state.salary}
                      </Text>
                      <Text style={styles.FilterMaxText}>
                        {this.state.salaryMax}+
                      </Text>
                    </View>
                    <Slider
                      style={styles.FilterMinimumSalarySlider}
                      gravity={'center'}
                      min={0}
                      max={150000}
                      step={1}
                      ref={this.slider}
                      selectionColor={themeColor}
                      blankColor="#B0b0b0"
                      labelBackgroundColor={themeColor}
                      labelBorderColor={'#b0b0b0'}
                      onValueChanged={(low, high, fromUser) => {
                        this.setState({
                          salary: low,
                          salaryMax: high,
                        });
                      }}
                      // style={styles.FilterMinimumSalarySlider}
                      // minimumValue={0}
                      // maximumValue={150}
                      // onValueChange={ value => {
                      //     this.setState({
                      //         salary: Math.round(value),
                      //     });
                      // }}
                      // minimumTrackTintColor={themeColor}
                      // maximumTrackTintColor={themeColor}
                    />
                  </View>
                </DropDownItem>
                <DropDownItem
                  // key={i}
                  style={styles.FilterDropDown}
                  contentVisible={false}
                  invisibleImage={IC_ARR_DOWN}
                  visibleImage={IC_ARR_UP}
                  HeaderStyle={{ flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'flex-start',}}
                  header={
                    <View style={styles.FilterDropDownInnerView}>
                      <View style={styles.fliterIcon}>
                        <Image
                          source={salaryType}
                          style={styles.imageStyle}
                          resizeMode={'contain'}
                        />
                      </View>
                      <Texting style={styles.DropDownHeader}  text='Salary_Type'/>
                    </View>
                  }>
                  <View style={{
                    flexDirection: 'row',
                    marginBottom: scale(10),
                    marginLeft:scale(10),
                    alignItems:"center",
                    flexWrap:"wrap"
                    // paddingHorizontal:"5%"
                  }}>
                    <View style ={{flexDirection:"row",justifyContent:"space-between",height:40,width:"100%"}}>
                      <TouchableOpacity  onPress={() => {
                        this.setState({
                          Hourly: !Hourly,
                        });
                      }} style={{borderColor: Hourly ? themeColor : '#000', backgroundColor : Hourly ? themeColor : themeWhite ,width:"44%",justifyContent:"center",alignItems:"center",borderRadius:scale(30),borderWidth:1,paddingHorizontal:scale(10)}}>
                        <Texting style={[{color:Hourly ? 'white' : '#000'},styles.CheckBoxLabelFont]} text='Hourly' />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => {
                        this.setState({
                          Monthly: !Monthly,
                        });
                      }} style={{borderColor: Monthly ? themeColor : '#000', backgroundColor : Monthly ? themeColor : themeWhite, width:"44%",borderWidth:1,justifyContent:"center",alignItems:"center",borderRadius:scale(30),paddingHorizontal:scale(10),marginRight:"8%"}}>
                        <Texting style={[{color:Monthly ? 'white' : '#000'},styles.CheckBoxLabelFont]} text='Monthly' />
                      </TouchableOpacity>
                      
                    </View>
                    <View style ={{flexDirection:"row",justifyContent:"space-between",height:40,width:"100%",marginTop:scale(15)}}>
                    <TouchableOpacity onPress={() => {
                        this.setState({
                          Yearly: !Yearly,
                        });
                      }} style={{borderColor: Yearly ? themeColor : '#000', backgroundColor : Yearly ? themeColor : themeWhite ,width:"44%",borderWidth:1,justifyContent:"center",alignItems:"center",borderRadius:scale(30),paddingHorizontal:scale(10)}}>
                        <Texting style={[{color:Yearly ? 'white' : '#000'},styles.CheckBoxLabelFont]} text='Yearly'/>
                      </TouchableOpacity>
                      </View>
                  </View>
                </DropDownItem>
                <DropDownItem
                  // key={i}
                  style={styles.FilterDropDown}
                  contentVisible={false}
                  invisibleImage={IC_ARR_DOWN}
                  visibleImage={IC_ARR_UP}
                  header={
                    <View style={styles.FilterDropDownInnerView}>
                      <View style={styles.fliterIcon}>
                        <Image
                          source={skill}
                          style={styles.imageStyle}
                          resizeMode={'contain'}
                        />
                      </View>
                      <Texting style={styles.DropDownHeader} text='Skill'/>
                    </View>
                  }>
                  <ScrollView style={{alignSelf:"stretch",height:hp(30)}} nestedScrollEnabled
                  >
                    <CustomInput
                      placeholder={'Add Skill'}
                      textChange={(text) => {
                        this.setState({
                          showSkill: text != '' ? true : false,
                        });
                        this.chekskill(text);
                      }}
                      inputContainerStyle={{
                        backgroundColor: themeColor,
                        height: scale(40),
                        // width: "100%",
                        borderColor: themeColor,
                        borderWidth: scale(1),
                        borderRadius: scale(5),
                      }}
                      inputStyle={{
                        color: 'white',
                        fontSize: scale(18),
                        fontFamily: 'Roboto-Bold',
                        fontWeight: 'bold',
                      }}
                      containerStyle={{
                        width: wp(85),
                      }}
                      placeholderTextColor={themeWhite}
                      iconName={iconSearch}
                      iconStyle={{
                        height: 25,
                        width: 25,
                      }}
                      iconColor={'#fff'}
                      // onSubmitEditing={(event) =>
                      //   this.addsSkill(event.nativeEvent.text)
                      // }
                    />
                    {showSkill && (
                      <View
                        style={{
                          alignItems: 'flex-start',
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                          flexGrow:0,
                          flex:1,
                          // height:hp(20),
                          marginTop:this.state.showSkill ? -10 : 1,
                          width: wp(80),
                          // width: wp(80),
                          marginHorizontal: wp(2.5),
                          // borderRadius: scale(5),
                          // height:hp(20),
                          // top: scale(42),
                          // position: 'absolute',
                          backgroundColor: themeColor
                        }}
                        >
                        <FlatList
                        nestedScrollEnabled
                    data={this.state.skillCheck}
                    style={{flex:1}}
                    keyboardShouldPersistTaps="always"
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{justifyContent:"flex-start",flexDirection:'row',paddingLeft:30,flexWrap:"wrap"}}
                    removeClippedSubviews={true}
                    renderItem={({item, index}) => this.renderItems(item, index)}
                    initialNumToRender={5}
                    maxToRenderPerBatch={10}
                    updateCellsBatchingPeriod={70}
                    getItemLayout={(data, index) => ({
                      length: hp('1%'),
                      offset: hp('1%') * index,
                      index,
                    })}
                    keyExtractor={(item, index) => index + ''}
                  />
                      </View>
                    )}
                    {!showSkill && (
                     
                      <FlatList
                    data={this.state.suggestionSkill}
                    extraData={this.state.suggestionSkill}
                    nestedScrollEnabled
                    style={{flex:1}}
                    keyboardShouldPersistTaps="always"
                    contentContainerStyle={{paddingLeft:5}}
                    showsHorizontalScrollIndicator={false}
                    removeClippedSubviews={true}
                    renderItem={({item, index}) => <Itemskill item={item} index={index} handleChange={this.handleChange} remove={this.remove}/>}
                    initialNumToRender={5}
                    maxToRenderPerBatch={10}
                    updateCellsBatchingPeriod={70}
                    getItemLayout={(data, index) => ({
                      length: hp('1%'),
                      offset: hp('1%') * index,
                      index,
                    })}
                    keyExtractor={(item, index) => index + ''}
                  />) }
                    </ScrollView>
                </DropDownItem>
                <DropDownItem
                  // key={i}
                  style={styles.FilterDropDown}
                  contentVisible={false}
                  invisibleImage={IC_ARR_DOWN}
                  visibleImage={IC_ARR_UP}
                  header={
                    <View style={styles.FilterDropDownInnerView}>
                      <View style={styles.fliterIcon}>
                        <Image
                          source={skillCategory}
                          style={styles.imageStyle}
                          resizeMode={'contain'}
                        />
                      </View>
                      <Texting style={styles.DropDownHeader} text='Skill_Category' />
                    </View>
                  }>
                  <View
                    style={{
                      marginHorizontal: '1%',
                      top: 10,
                    }}>
                    <ScrollView
                      style={{
                        marginTop: '-5%',
                        marginBottom: 20,
                        // height: scale(50),
                      }}
                      contentContainerStyle={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      nestedScrollEnabled={true}>
                      <View
                        Style={{
                          flex: 1,
                          flexDirection: 'column',
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            width: wp(80),
                          }}>
                          <Categoryskill name='Employed' bool={Employed} onPress={() =>
                                  this.setState({
                                    Employed: !this.state.Employed,
                                  })} />
                          <Categoryskill name='Internship' bool={Internship} onPress={() =>
                                  this.setState({
                                    Internship: !this.state.Internship,
                                  })} />
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            width: wp(80),
                          }}>
                          <Categoryskill name='StudentJobs' bool={StudentJobs} onPress={() =>
                                  this.setState({
                                    StudentJobs: !this.state.StudentJobs,
                                  })} />
                          <Categoryskill name='Freelancer' bool={Freelancer} onPress={() =>
                                  this.setState({
                                    Freelancer: !this.state.Freelancer,
                                  })} />
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            width: wp(80),
                          }}>
                           <Categoryskill name='HelpingVacancies' bool={HelpingVacancies} onPress={() =>
                                  this.setState({
                                    HelpingVacancies: !this.state.HelpingVacancies,
                                  })} />
                        </View>
                      </View>
                    </ScrollView>
                  </View>
                </DropDownItem>
                <DropDownItem
                  // key={i}
                  style={styles.FilterDropDown}
                  contentVisible={false}
                  invisibleImage={IC_ARR_DOWN}
                  visibleImage={IC_ARR_UP}
                  HeaderStyle={{ flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'flex-start',}}
                  header={
                    <View style={styles.FilterDropDownInnerView}>
                      <View style={styles.fliterIcon}>
                        <Image
                          source={Filterjobtype}
                          style={styles.imageStyle}
                          resizeMode={'contain'}
                        />
                      </View>
                      <Texting style={styles.DropDownHeader} text='Job_Type'/>
                    </View>
                  }>
                  <View style={{
                    flexDirection: 'row',
                    marginBottom: scale(10),
                    marginLeft:scale(10),
                    alignItems:"center",
                    flexWrap:"wrap"
                    // paddingHorizontal:"5%"
                  }}>
                    <View style={styles.PersonalInfoChoose}>
                    <View style ={{flexDirection:"row",justifyContent:"space-between",height:40,width:"100%"}}>
                      <TouchableOpacity  onPress={() => {
                        this.setState({
                          FullTime: !FullTime,
                        });
                      }} style={{borderColor: FullTime ? themeColor : '#000', backgroundColor : FullTime ? themeColor : themeWhite ,width:"44%",justifyContent:"center",alignItems:"center",borderRadius:scale(30),borderWidth:1,paddingHorizontal:scale(10)}}>
                        <Texting style={[{color:FullTime ? 'white' : '#000'},styles.CheckBoxLabelFont]} text='FullTime' />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => {
                        this.setState({
                          PartTime: !PartTime,
                        });
                      }} style={{borderColor: PartTime ? themeColor : '#000', backgroundColor : PartTime ? themeColor : themeWhite, width:"44%",borderWidth:1,justifyContent:"center",alignItems:"center",borderRadius:scale(30),paddingHorizontal:scale(10),marginRight:"8%"}}>
                        <Texting style={[{color:PartTime ? 'white' : '#000'},styles.CheckBoxLabelFont]} text='Part_time' />
                      </TouchableOpacity>
                    </View>
                    </View>
                  </View>
                </DropDownItem>
                <DropDownItem
                  // key={i}
                  flag={true}
                  style={styles.FilterDropDown}
                  contentVisible={false}
                  invisibleImage={IC_ARR_DOWN}
                  visibleImage={IC_ARR_UP}
                  header={
                    <View style={styles.FilterDropDownInnerView}>
                      <View style={styles.fliterIcon}>
                        <Image
                          source={searchType}
                          style={styles.imageStyle}
                          resizeMode={'contain'}
                        />
                      </View>
                      <Texting style={styles.DropDownHeader} text='Search_Type'/>
                    </View>
                  }>
                  <View style={{
                    flexDirection: 'row',
                    marginBottom: scale(10),
                    marginLeft:scale(10),
                    alignItems:"center",
                    flexWrap:"wrap"
                    // paddingHorizontal:"5%"
                  }}>
                    <View style={styles.PersonalInfoChoose}>
                    <View style ={{flexDirection:"row",justifyContent:"space-between",height:40,width:"100%"}}>
                      <TouchableOpacity  onPress={() => {
                        this.setState({
                          ByDistance: !ByDistance,
                        },() => this.props.navigation.navigate('UserScreenMap'));
                      }} style={{borderColor: ByDistance ? themeColor : '#000', backgroundColor : ByDistance ? themeColor : themeWhite ,width:"44%",justifyContent:"center",alignItems:"center",borderRadius:scale(30),borderWidth:1,paddingHorizontal:scale(10)}}>
                        <Texting style={[{color:ByDistance ? 'white' : '#000'},styles.CheckBoxLabelFont]} text='ByDistance' />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => {
                        this.setState({
                          ByLocation: !ByLocation,
                        });
                      }} style={{borderColor: ByLocation ? themeColor : '#000', backgroundColor : ByLocation ? themeColor : themeWhite, width:"44%",borderWidth:1,justifyContent:"center",alignItems:"center",borderRadius:scale(30),paddingHorizontal:scale(10),marginRight:"8%"}}>
                        <Texting style={[{color:ByLocation ? 'white' : '#000'},styles.CheckBoxLabelFont]} text='ByLocation' />
                      </TouchableOpacity>
                    </View>
                    </View>
                  </View>
                </DropDownItem>
                <View style={{height:scale(200),width:"100%",backgroundColor:"transparent"}} />
              </ScrollView>
          </View>
          {this.state.keyboardShown == false && <ApplyFilterButton reset='Reset' apply='Apply' onReset ={()=> this.setState({
                        ...this.defaultState
                    },()=> {
                      this.slider.current.setHighValue(150000)
                      this.slider.current.setLowValue(0)
                    })} onApply={this.save}/> }
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

export default withNavigationFocus(FilterUser);