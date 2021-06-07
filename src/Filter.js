import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  ScrollView,
  ImageBackground,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  FlatList,
  Text,
  Image,
  View,
  Alert
} from 'react-native';
import {withNavigationFocus} from 'react-navigation';
import styles from './Style';
import {library,play} from './IconManager';
import {scale, snack, p} from './Util';
import {
  iconSearch,
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
  Filterjobtype,
  searchType,FontBold
} from '../Constant/index';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../Component/responsive-ratio';
import CustomInput from '../Component/Input';
import {DropDownItem, NavigationHead,CheckBox} from '../Component/ViewManager.js';
import http from '../api';
import Icon2 from 'react-native-vector-icons/dist/MaterialIcons';
import Slider from 'rn-range-slider';
import Texting from '../Constant/Text';
import ApplyFilterButton from '../Component/ApplyFilterButton';
import Itemskill from '../Company/Itemskill';
import SuggestionView from '../Component/SuggestionView';
import ListOfChoosed from '../Component/ListOfChoosed';
import Modal from 'react-native-modal'

var mg = [];

Array.prototype.swap = function (x, y) {
  var b = this[x];
  this[x] = this[y];
  this[y] = b;
  return this;
};

const Compon = ({...props}) => {
  return (
    <ScrollView style={{alignSelf: 'stretch'}} nestedScrollEnabled>
      <CustomInput
        value={props.value}
        Company={global.language == 'english' ? 'All' : 'All'}
        Anywhere={props.Anywhere}
        onPress={props.onPress}
        placeholder={
          global.language == 'english' ? 'Select Company' : 'Select Company'
        }
        textChange={props.textChange}
        inputContainerStyle={{
          borderRadius: hp(3),
          height: hp(6.5),
          width: '100%',
          backgroundColor: themeColor,
          borderBottomColor: '#E5E5E5',
          borderBottomWidth: 0.3,
        }}
        inputStyle={{
          color: 'white',
          fontSize: hp(2.7),
          fontFamily: 'Roboto-Bold',
          fontWeight: 'bold',
        }}
        placeholderTextColor={themeWhite}
        containerStyle={{
          width: wp(85),
          marginBottom: scale(-17),
        }}
        iconName={iconSearch}
        iconStyle={{
          height: hp(3),
          width: hp(3),
        }}
        iconColor={'#fff'}
      />
      <View style={props.style}>
        <ScrollView
          nestedScrollEnabled
          keyboardShouldPersistTaps={'always'}
          contentContainerStyle={{
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}>
          {props.scrl}
        </ScrollView>
      </View>
      {props.show && (
        <View style={props.styleFlat} onLayout={props.onLayout}>
          <FlatList
            nestedScrollEnabled
            style={{flex: 1}}
            data={props.dataCheck}
            contentContainerStyle={{
              justifyContent: 'flex-start',
              paddingLeft: 30,
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}
            keyboardShouldPersistTaps="always"
            showsHorizontalScrollIndicator={false}
            removeClippedSubviews={true}
            renderItem={props.renderItem}
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
    </ScrollView>
  );
};

const Items = global.language == 'english' ? true : false;

const Categoryskill = ({name, ...props}) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{
        borderColor: props.bool ? themeColor : '#000',
        backgroundColor: props.bool ? themeColor : themeWhite,
        width: name == 'Helping_Vacancies' ? 'auto' : '44%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: scale(30),
        borderWidth: 1,
        paddingHorizontal: scale(10),
      }}>
      <Texting
        style={[
          {color: !props.bool ? '#000' : '#fff'},
          styles.CheckBoxLabelFont,
        ]}
        text={name}
      />
    </TouchableOpacity>
  );
};

const defaultState = {
  Hourly: false,
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
  enableScrollViewScroll: true,
  skillCheck: [],
  suggestionSkill: [],
  showSkill: false,
  natHeight: 1,
  Anywhere: false,
  keyboardShown: false,
  RollCheck: [],
  showRole: false,
  suggesionRole: [],
  // bottomModal: true,
  modalData:[]
};


class Filter extends Component {
  
  constructor(props) {
    super(props);

    this.state = JSON.parse(JSON.stringify(defaultState));
    this.arrayholder = [];
    this.arrayholders = [];
    this.arrayholderRole = [];
    this.slider = React.createRef();
    this.navigationWillFocusListener = props.navigation.addListener('willFocus', () => {
      this.checking()
      // do something like this.setState() to update your view
    })
  }


  componentWillUnmount () {
    this.navigationWillFocusListener.remove()
  }

  checking = () => {
    let temp = {}
    let modalData = global.Job_Location.map(item => {
      temp={
      ...item,
      flag:true
      }
return temp
    })
    this.setState({modalData})
    // global.reset = false
  }

  save = () => {
    mg = [...new Set(this.state.suggesion)];
    // console.log('mg', mg);
    global.addSkill = this.state.suggestionSkill 
    global.Job_Title = this.state.suggestionSkill 
    // global.Job_Title.length !=  this.state.suggestionSkill.length 
    global.Role = this.state.suggesionRole
    global.CompanyGuest = mg
    // console.log('mg', this.state.suggestionSkill);
    
    // console.log('mg', global.Job_Title);

    let sk = this.state.suggestionSkill.map((item) => {
      let temp = {};
      (temp.name = global.language == 'english' ? item.cell.english : item.cell.german),
        (temp.rating = item.rating);
      return temp;
    });

    // global.objective = this.state;

    global.Company = this.state.suggesion,
    global.Anywhere = this.state.Anywhere,
    global.FullTime = this.state.FullTime
    global.PartTime = this.state.PartTime
    global.Employed = this.state.Employed
    global.Internship = this.state.Internship
    global.StudentJobs = this.state.StudentJobs
    global.HelpingVacancies =this.state.HelpingVacancies
    global.Freelancer = this.state.Freelancer

    let {modalData} = this.state;
    let d = modalData.filter(item => item.flag === true);
    // console.log('d',d)

    console.log('this.suggestion.skil', this.state,sk,mg,d,global.language);

    try {
      http
        .POST('api/json/filter', {
          Hourly: this.state.Hourly,
          Monthly: this.state.Monthly,
          Yearly: this.state.Yearly,
          ByDistance: this.state.ByDistance,
          ByLocation: this.state.ByLocation,
          Company: mg,
          Anywhere: this.state.Anywhere,
          skill: sk,
          selectLanguage: global.language,
          FullTime: this.state.FullTime,
          PartTime: this.state.PartTime,
          salary: this.state.salary,
          salaryMax: this.state.salaryMax,
          Employed: this.state.Employed,
          Internship: this.state.Internship,
          StudentJobs: this.state.StudentJobs,
          HelpingVacancies: this.state.HelpingVacancies,
          Freelancer: this.state.Freelancer,
          location: d,
          Role:this.state.suggesionRole
          // Trainee: this.state.Trainee,
          // Novice: this.state.Novice,
          // Proficient: this.state.Proficient,
          // Expert: this.state.Expert,
        })
        .then(
          (res) => {
            // console.log('ress', res['data']);
            if (res['data']['status']) {
              console.log('nwe api >>>>>>', res['data']['result'].length);
              global.all = res['data']['result'];
              // this.props.navigation.navigate('TabScreen', {
              //   otherParam: res['data']['result'],
              // });
              this.props.navigation.goBack();
            } else {
              snack('Data Not Found');
            }
          },
          (err) => snack(err['message']),
        );
    } catch (error) {
      c
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
    console.log('suggestionskill', this.state.suggestionSkill, value, index);
    arr[index].rating = value;
    this.setState({
      suggestionSkill: arr,
    });

    console.log('suggestionskill', this.state.suggestionSkill);
  };

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow = () => {
    this.setState({
      keyboardShown: true,
    });
    console.log('Keyboard Shown');
  };

  _keyboardDidHide = () => {
    this.setState({
      keyboardShown: false,
    });

    console.log('Keyboard Hidden');
  };

  remove = (item, index) => {
    console.log('hi', item);
    const {suggestionSkill} = this.state;
    let m = suggestionSkill;
    console.log('m', m);
    for (let i in suggestionSkill) {
      if (m[i].cell == item) {
        m.splice(i, 1);
      }
    }
    mg = m;
    this.setState({
      suggestionSkill: m,
      // skillCheck: this.arrayholders,
    });
  };

  componentDidMount() {

    // this.setState({
    //   suggestionSkill:global.Job_Title,
    //   company:global.Company,
    // })
    // this.setState(global.objective);
    this.setState({
      suggestionSkill:global.Job_Title,
      suggesion:Array.isArray(global.Company) && global.Company || [],
      Anywhere:global.Anywhere,
      FullTime: global.FullTime,
      PartTime: global.PartTime,
      Employed: global.Employed,
      Internship: global.Internship,
      StudentJobs: global.StudentJobs,
      HelpingVacancies: global.HelpingVacancies,
      Freelancer: global.Freelancer,
    })
    let temp = {}
    let modalData = global.Job_Location.map(item => {
      temp={
      ...item,
      flag:false
      }
return temp
    })
    this.setState({modalData})
    console.log('this.slid',this.slider.current)
     this.slider.current.high = this.state.salaryMax;
     this.slider.current.low = this.state.salary;
    //  this.slider.current.updater.enqueueForceUpdate()
   

    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow,
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide,
    );
    let data = [];
    try {
      http.GET('api/appcomjson/get').then(
        (res) => {
          if (res['data']['status']) {
            this.setState({
              dataCheck: res['data']['result'],
            });
            let p = res['data']['result'];
            this.arrayholder = p.map((cell, i) => {
              let temp = {};
              temp = {cell, right: false};
              return temp;
            });
            //will get data in this    res['data']['result']
          } else {
            snack(res['data']['message']);
          }
        },
        (err) => snack(err['message']),
      );
    } catch (error) {
      snack(error);
    }
    try {
      http.GET('api/skill/get').then(
        (res) => {
          if (res['data']['status']) {
            this.setState({
              skillCheck: res['data']['result'],
            });
            let p = res['data']['result'];
            this.arrayholders = p.map((cell, i) => {
              let temp = {};
              temp = {cell, right: false, rating: 5};
              return temp;
            });
            //will get data in this    res['data']['result']
          } else {
            snack(res['data']['message']);
          }
        },
        (err) => snack(err['message']),
      );
    } catch (error) {
      snack(error);
    }
    try {
      http.GET('api/apptaljson/get').then(
        (res) => {
          if (res['data']['status']) {
            console.log('result', res['data']['result']);
            this.setState({
              RollCheck: res['data']['result'],
            });
            let p = res['data']['result'];
            this.arrayholderRole = p.map((cell, i) => {
              let temp = {};
              temp = {cell, right: false};
              return temp;
            });

            // console.log('this.srray',this.arrayholder);
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
  ///////////////////
  //Modal Function//
  //////////////////

  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "96%",
          marginHorizontal:'2%',
          backgroundColor: "#ccc",
        }}
      />
    );
  }
  ListHeader = () => {
    //View to set in Header
    let headerFooterStyle = {
      width: '100%',
      height: hp(6.5),
      backgroundColor:themeColor,
      borderTopRightRadius: scale(20),
                  borderTopLeftRadius: scale(20),
      // backgroundColor: '#606070',
    }
    let textStyle = {
      textAlign: 'center',
      color: '#fff',
      fontSize: hp(2.7),
      padding: 7,
    }
    return (
      <View style={headerFooterStyle}>
        <Text style={textStyle}>
            {this.state.modalData.length  ? 'Please Select Location From List' : 'Not location found'} 
        </Text>
      </View>
    );
  };

  renderItemModal = (item, index) => {
    return (
      <View
        style={{
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          margin: 5,
        }}>
        <View style={{flexDirection:'row',alignItems:'center'}}>
        <Text style={{fontFamily: FontBold, color: themeColor,fontSize:hp(2.7)}}>{index + 1} ) </Text>
        <CheckBox text={item.place} textStyle={{fontFamily: FontBold, color: themeColor,fontSize:hp(2.8)}} size={hp(3)} style={{justifyContent:'space-between',width:wp(90)}} selected={item.flag} onPress={()=> this.selectcity(item,index)} />
        </View>
      </View>
    );
  };

  selectcity = (item,index) => {
    let {modalData} = this.state;
    modalData[index].flag = !modalData[index].flag
    this.setState({modalData})
  }

  //for a Role Suggestion
  renderItemRole = (item, index) => {
    return (
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
              ? this.chooseRole(item, index)
              : this.suggestionTagRole(item, index)
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
                fontSize: hp(2.7),
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
                {library('highlight-off', hp(2.6), themeColor)}
              </View>
            )}
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  };

  cheksRole = (text) => {
    try {
    if (text != '') {
      let newData = this.arrayholderRole.filter((item) => {
        const itemData =
          item != null &&
          `${item.cell.toUpperCase()}   
                  ${item.cell.toUpperCase()} ${item.cell.toUpperCase()}`;
        const textData = text.toUpperCase();
        return itemData != null && itemData.toString().indexOf(textData) > -1;
      });

      newData = newData.filter((item) => !mg.includes(item.cell));
      console.log('newDa',newData)
      newData =
        newData.length && newData.length < 10 ? newData : newData.slice(0, 10);
      if (newData.length) {
        this.setState({
          RollCheck: newData,
          nameRole: text,
        });
      } else {
        this.setState({
          nameRole: text,
          RollCheck: [{cell:text,right:false}],
        });
      }
    } else {
      this.setState({
        nameRole: text,
      });
    }
  }
  catch(e){
    console.log('e',e);
  }
  };

  suggestionTagRole = (elements, index) => {
    try{
    console.log('el', elements);
    if (typeof elements == 'object') {
      elements = elements.cell;
    }

    const {suggesionRole} = this.state;
    let m = suggesionRole;
    for (let i in suggesionRole) {
      if (m[i] == elements) {
        m.splice(i, 1);
      }
    }
    mg = m;

    this.arrayholderRole.filter((iterm) => {
      if (iterm.cell == elements) iterm.right = false;
    });
    this.setState({
      suggesionRole: m,
    });
  }
  catch(e){
    console.log('e',e);
  }
}

  chooseRole = (choose, index) => {
    try {
    let mgs = this.state.suggesionRole;
    mgs.push(choose.cell);
    mgs = [...new Set(mgs)];
    console.log('mg', mgs);

    let mni = [];
    mgs.filter((i) => i != choose.cell || (i != '' && mni.push(i)));
    this.setState(
      {
        suggesionRole: mgs,
        nameRole: '',
        showRole: !this.state.showRole,
      },
      () => {
        this.arrayholderRole.filter((iterm) => {
          if (iterm.cell == choose.cell) iterm.right = true;
        });
      },
    );
    }
    catch(e){
      console.log('e',e);
    }
  };

  // for a Comapny Suggestion
  choose = (choose, index) => {
    try{
    mg = this.state.suggesion;
    mg.push(choose.cell);
    mg = [...new Set(mg)];

    let mni = [];
    mg.filter((i) => i != choose.cell || (i != '' && mni.push(i)));
    this.setState(
      {
        suggesion: mg,
        company: '',
        show: !this.state.show,
      },
      () => {
        // if (this.arrayholder.length /2 == this.state.suggesion.length)
        // {
        //   // return
        //   this.arrayholder.push({cell : '',right:false})
        //   this.arrayholder.push({cell : '',right:false})
        // }
        // let Toind = (((this.state.suggesion.length * 2) / 2 - 1) * 2 / (2-1) + 1)

        // this.arrayholder.filter((item,index)=> {
        //   if (index == Toind)
        //     {
        //       console.log('item',index)
        //       this.arrayholder[index].right == true  ? Toind + 2 :Toind
        //     }
        // })

        this.arrayholder.filter((iterm) => {
          if (iterm.cell == choose.cell) iterm.right = false;
        });

        // console.log('tpind',Toind)
        //     this.arrayholder.swap(index, Toind)
      },
    );
    }
    catch(e){
      console.log('e',e);
    }
  };

  chooseskill = (choose, index) => {
    try {
    if (this.state.suggestionSkill.length >=5)
    {
      Alert.alert("Detail", "You have added 5 Skill", [{
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
    }, {
        text: "Done",
        onPress: () => this.setState({showSkill:false})
    }], {
        cancelable: false
    });
      return

    }
else{
    let mgs = this.state.suggestionSkill;
    mgs.push(choose);
    mgs = [...new Set(mgs)];

    let {skillCheck } = this.state

    skillCheck.filter((iterm) => {
      if (iterm.cell == choose.cell) iterm.right = true;
    });
    let mni = [];
    mgs.filter((i) => i.cell != choose.cell || (i != '' && mni.push(i)));

    this.setState({
      suggestionSkill: mgs,
      name: '',
      skillCheck,
      showSkill: !this.state.showSkill,
    });
  }
}
catch(e){
  console.log('e',e);
}
  };

  cheks = (text) => {
    try {
    let newData = this.arrayholder.filter((item) => {
      console.log('item', item);
      const itemData =
        item.cell != null &&
        item.cell &&
        `${item.cell.toUpperCase()}   
                    ${item.cell.toUpperCase()} ${item.cell.toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData != null && itemData.toString().indexOf(textData) > -1;
    });
    newData = newData.filter(
      (item) => !this.state.suggesion.includes(item.cell),
    );

    newData =
      newData.length && newData.length < 10 ? newData : newData.slice(0, 10);
    if (newData.length) {
      this.setState({
        dataCheck: newData,
        company: text,
      });
    } else {
      this.setState({
        company: text,
      });
    }
  }
  catch(e){
    console.log('e',e);
  }
  };
  chekskill = (text) => {
    try{
    if (text != ''){
if (this.state.suggestionSkill.length >=5)
  {
    Alert.alert("Detail", "You have added 5 Skill", [{
      text: "Cancel",
      onPress: () => console.log("Cancel Pressed"),
      style: "cancel"
  }, {
      text: "Done",
      onPress: () => this.setState({showSkill:false})
  }], {
      cancelable: false
  });
  this.setState({showSkill:false})
  return
  } else {
    let newData = this.arrayholders.filter((item) => {
      const itemData = global.language == 'english'
        ? item.cell
          ? item.cell.english
          : `${item}`
        : item.cell
        ? item.cell.german
        : `${item}`;
      const textData = text.toUpperCase();
      return (
        itemData != null &&
        itemData.toUpperCase().toString().indexOf(textData) > -1
      );
    });
    const {suggestionSkill} = this.state;
    newData = newData.filter((item) => !suggestionSkill.includes(item));
    newData =
      newData.length && newData.length < 10 ? newData : newData.slice(0, 10);

    if (newData.length) {
      this.setState({
        skillCheck: newData,
        name: text,
      });
    } else {
      let d = [{
        'cell' : {
          'english':text,
          'german':text  
        },
        'rating':5,
        'right':false
      }]
      this.setState({
        name: text,
        skillCheck:d
      });
    }
  }
}
else {
  this.setState({
    name: text,
  });
}
    }
    catch(e){
      console.log('e',e);
    }
  };

  suggestionTag = (elements, index) => {
    try{
    const {suggesion} = this.state;
    let m = suggesion;
    for (let i in suggesion) {
      if (m[i] == elements) {
        m.splice(i, 1);
      }
    }
    mg = m;
    this.arrayholder.filter((iterm) => {
      if (iterm.cell == elements.cell) iterm.right = false;
    });

    // let mp =this.arrayholder
    // let i = index
    //   const map = function (mp,index){
    //     if (index + 2 < mp.length && mp[index + 2].right == true)
    //         {mp.swap(index,index+2);
    //         i = index + 2
    //       i < mp.length && map(mp,i)
    //       }
    //   }
    //   i < this.arrayholder.length ? map(mp,i) : i = index

    this.setState({
      suggesion: m,
      // dataCheck:this.arrayholder,
    });
  }
  catch(e){
    console.log('e',e);
  }
  };

  suggestionTagskill = (elements, index) => {
    try {
    const {suggestionSkill} = this.state;
    let m = suggestionSkill;
    for (let i in suggestionSkill) {
      if (m[i] == elements.cell) {
        m.splice(i, 1);
      }
    }
    mg = m;

    this.arrayholders.filter((iterm) => {
      if (iterm.cell == elements.cell) iterm.right = false;
    });

    let mp = this.arrayholders;
    let i = index;
    const map = function (mp, index) {
      if (index + 2 < mp.length && mp[index + 2].right == true) {
        mp.swap(index, index + 2);
        i = index + 2;
        i < mp.length && map(mp, i);
      }
    };
    i < this.arrayholders.length ? map(mp, i) : (i = index);

    this.setState({
      suggestionSkill: m,
      skillCheck: this.arrayholders,
    });
  }
  catch(e){
    console.log('e',e);
  }
  };

  renderItem = (item, index) => {
    return (
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
    );
  };

  renderItems = (item, index) => {
    return (
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
              ? this.chooseskill(item, index)
              : this.suggestionTagskill(item, index)
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
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: hp(2.7),
                color: item.right ? themeColor : themeWhite,
                width: 'auto',
              }}
              >
              {global.language == 'english' ? item.cell && item.cell.english != undefined ? item.cell.english : '' :
               item.cell && item.cell.german != undefined ? item.cell.german : ''}
            </Text>
            {item.right && (
              <View
                style={{
                  // top: scale(-7),
                  right: scale(5),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {library('highlight-off', hp(2.5), themeColor)}
              </View>
            )}
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  };

  render() {
    const {
      suggesion,
      dataCheck,
      Hourly,
      Monthly,
      Yearly,
      ByDistance,
      ByLocation,
      Employed,
      Internship,
      StudentJobs,
      HelpingVacancies,
      Freelancer,
      FullTime,
      PartTime,
      showSkill,
      showRole,
      suggesionRole,
      RollCheck,
    } = this.state;

    return (
      <SafeAreaView style={styles.backGround}>
        <ImageBackground
          style={styles.ImageBlue}
          tintColor={'#fff'}
          source={Background}
          resizeMode={'stretch'}>
          <StatusBar hidden={true} backgroundColor={themeWhite} />
          <Modal
              testID={'modal'}
              isVisible={this.state.ByLocation}
              onBackdropPress={() =>
                this.setState({
                  ByLocation: false,
                })
              }
              onBackButtonPress={() =>
                this.setState({
                  ByLocation: false,
                })
              }
              swipeDirection={['down']}
              // scrollOffsetMax={400 - 300} // content height - eight
              propagateSwipe={true}
              animationInTiming={500}
              animationOutTiming={500}
              style={{justifyContent: 'flex-end', margin: 0}}
              useNativeDriver={true}>
              <View
                style={{
                  // height: hp(70),
                  backgroundColor: 'rgba(255,255,255,1)',
                  borderTopRightRadius: scale(20),
                  borderTopLeftRadius: scale(20),
                }}>
                <View style={{alignItems:"center",top:-40,marginBottom : -34,backgroundColor:"transparent"}}>
                <TouchableOpacity 
                style={{height:hp(4),width:hp(4),justifyContent:"center",
                alignItems:'center',backgroundColor:"white",
                borderRadius:hp(2),borderWidth:1,borderColor:"white"}} onPress={()=> this.setState({bottomModal:false})} hitSlop={{left:100,right:100,top:20,bottom:20}}>
                {play('close',hp(3),'gray')}
                </TouchableOpacity>
                </View>
                <FlatList
                  data={this.state.modalData}
                  removeClippedSubviews={true}
                  initialNumToRender={5}
                  maxToRenderPerBatch={10}
                  ItemSeparatorComponent = { this.FlatListItemSeparator }
                  ListHeaderComponent={this.ListHeader}
                  updateCellsBatchingPeriod={70}
                  getItemLayout={(data, index) => ({
                    length: hp('10%'),
                    offset: hp('10%') * index,
                    index,
                  })}
                  renderItem={({item, index}) => this.renderItemModal(item, index)}
                  keyExtractor={(item, index) => index + ''}
                />
              </View>
            </Modal>
          <NavigationHead
            centerComponent="Edit Filter"
            rightComponent="Exit"
            onPress={() => this.Back()}
          />
          <View
            style={{
              borderBottomWidth: scale(1),
              borderColor: 'rgba(169,169,169,0.8)',
              width: '100%',
              marginTop: 3,
            }}
          />
          <View style={styles.FilterMainView}>
            <ScrollView
              style={
                ([styles.FilterScroll],
                {marginBottom: hp(100) <= 600 ? scale(100) : scale(100)})
              }
              scrollEnabled={this.state.enableScrollViewScroll}
              ref={(myScroll) => (this._myScroll = myScroll)}
              onScroll={(e) =>
                console.log('e.nativeEvent.contentOffset.x / w', e.nativeEvent)
              }
              nestedScrollEnabled={true}>
              <DropDownItem
                style={[
                  styles.FilterDropDown,
                  {
                    marginTop: scale(5),
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
                    <Texting
                      style={styles.DropDownHeader}
                      text="Minimum_Salary"
                    />
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
                    initialHighValue={this.state.salaryMax}
                    initialLowValue={this.state.salary}
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
                HeaderStyle={{
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                }}
                header={
                  <View style={styles.FilterDropDownInnerView}>
                    <View style={styles.fliterIcon}>
                      <Image
                        source={salaryType}
                        style={styles.imageStyle}
                        resizeMode={'contain'}
                      />
                    </View>
                    <Texting style={styles.DropDownHeader} text="Salary_Type" />
                  </View>
                }>
                <View
                  style={{
                    flexDirection: 'row',
                    marginBottom: scale(10),
                    marginLeft: scale(10),
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    // paddingHorizontal:"5%"
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      height: hp(6),
                      width: '100%',
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({
                          Hourly: !Hourly,
                        });
                      }}
                      style={{
                        borderColor: Hourly ? themeColor : '#000',
                        backgroundColor: Hourly ? themeColor : themeWhite,
                        width: '44%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: scale(30),
                        borderWidth: 1,
                        paddingHorizontal: scale(10),
                      }}>
                      <Texting
                        style={[
                          {color: Hourly ? 'white' : '#000'},
                          styles.CheckBoxLabelFont,
                        ]}
                        text="Hourly"
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({
                          Monthly: !Monthly,
                        });
                      }}
                      style={{
                        borderColor: Monthly ? themeColor : '#000',
                        backgroundColor: Monthly ? themeColor : themeWhite,
                        width: '44%',
                        borderWidth: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: scale(30),
                        paddingHorizontal: scale(10),
                        marginRight: '8%',
                      }}>
                      <Texting
                        style={[
                          {color: Monthly ? 'white' : '#000'},
                          styles.CheckBoxLabelFont,
                        ]}
                        text="Monthly"
                      />
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      height: hp(6),
                      width: '100%',
                      marginTop: scale(15),
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({
                          Yearly: !Yearly,
                        });
                      }}
                      style={{
                        borderColor: Yearly ? themeColor : '#000',
                        backgroundColor: Yearly ? themeColor : themeWhite,
                        width: '44%',
                        borderWidth: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: scale(30),
                        paddingHorizontal: scale(10),
                      }}>
                      <Texting
                        style={[
                          {color: Yearly ? 'white' : '#000'},
                          styles.CheckBoxLabelFont,
                        ]}
                        text="Yearly"
                      />
                    </TouchableOpacity>
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
                        source={company}
                        style={styles.imageStyle}
                        resizeMode={'contain'}
                      />
                    </View>
                    <Texting style={styles.DropDownHeader} text="Company" />
                  </View>
                }>
                <Compon
                  onPress={() =>
                    this.setState({
                      Anywhere: !this.state.Anywhere,
                    })
                  }
                  textChange={(text) => {
                    this.setState({
                      show: text != '' ? true : false,
                    });
                    this.cheks(text);
                  }}
                  Anywhere={this.state.Anywhere}
                  value={this.state.company}
                  style={{
                    alignItems: 'flex-start',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    flex: 1,
                    height: hp(30),
                    marginTop: this.state.show ? 50 : 1,
                    width: wp(87),
                    height: suggesion != [] && 100,
                    paddingLeft: 7,
                  }}
                  suggesion={suggesion}
                  show={this.state.show}
                  styleFlat={{
                    width: wp(80),
                    marginHorizontal: wp(2.5),
                    borderRadius: scale(5),
                    height: hp(22),
                    flex: 1,
                    top: scale(50),
                    marginBottom: 30,
                    position: 'absolute',
                    backgroundColor: themeColor,
                  }}
                  onLayout={(e) =>
                    this.setState({natHeight: e.nativeEvent.layout.height})
                  }
                  dataCheck={dataCheck}
                  renderItem={({item, index}) => this.renderItem(item, index)}
                  scrl={
                    suggesion &&
                    suggesion.map((elements, index) => (
                      <SuggestionView
                        textColor={'white'}
                        backGroundC={themeColor}
                        onPress={() => this.suggestionTag(elements, index)}
                        elements={elements}
                        index={index}
                      />
                    ))
                  }
                />
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
                        source={skill}
                        style={styles.imageStyle}
                        resizeMode={'contain'}
                      />
                    </View>
                    <Texting style={styles.DropDownHeader} text="Skill" />
                  </View>
                }>
                <ScrollView
                  style={{alignSelf: 'stretch', height: hp(30)}}
                  nestedScrollEnabled>
                  <CustomInput
                    placeholder={'Add Skill'}
                    value={this.state.name}
                    textChange={(text) => {
                      this.setState({
                        showSkill: text != '' ? true : false,
                      });
                      this.chekskill(text);
                    }}
                    inputContainerStyle={{
                      backgroundColor: themeColor,
                      height: hp(6.5),
                      // width: "100%",
                      borderColor: themeColor,
                      borderWidth: scale(1),
                      borderRadius: scale(5),
                    }}
                    onSubmitEditing={() => this.setState({showSkill:false})}
                    inputStyle={{
                      color: 'white',
                      fontSize: hp(2.7),
                      fontFamily: 'Roboto-Bold',
                      fontWeight: 'bold',
                    }}
                    containerStyle={{
                      width: wp(85),
                    }}
                    placeholderTextColor={themeWhite}
                    iconName={iconSearch}
                    iconStyle={{
                      height: hp(3),
                      width: hp(3),
                    }}
                    iconColor={'#fff'}
                    // onSubmitEditing={(event) =>
                    //   this.addsSkill(event.nativeEvent.text)
                    // }
                  />
                  {showSkill && (
                    <SafeAreaView
                      style={{
                        alignItems: 'flex-start',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        flexGrow: 0,
                        flex: 1,
                        marginTop: this.state.showSkill ? -10 : 1,
                        width: wp(80),
                        marginHorizontal: wp(2.5),
                        backgroundColor: themeColor,
                      }}>
                      <FlatList
                        nestedScrollEnabled
                        data={this.state.skillCheck}
                        style={{flex: 1}}
                        keyboardShouldPersistTaps="always"
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{
                          justifyContent: 'flex-start',
                          flexDirection: 'row',
                          paddingLeft: 30,
                          flexWrap: 'wrap',
                        }}
                        removeClippedSubviews={true}
                        renderItem={({item, index}) =>
                          this.renderItems(item, index)
                        }
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
                    </SafeAreaView>
                  )}
                  {!showSkill && (
                    <FlatList
                      data={this.state.suggestionSkill}
                      extraData={this.state.suggestionSkill}
                      nestedScrollEnabled
                      style={{flex: 1}}
                      keyboardShouldPersistTaps="always"
                      contentContainerStyle={{paddingLeft: 5}}
                      showsHorizontalScrollIndicator={false}
                      removeClippedSubviews={true}
                      renderItem={({item, index}) => (
                        <Itemskill
                          item={item}
                          index={index}
                          handleChange={this.handleChange}
                          remove={this.remove}
                        />
                      )}
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
                  )}
                </ScrollView>
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
                        source={skillCategory}
                        style={styles.imageStyle}
                        resizeMode={'contain'}
                      />
                    </View>
                    <Texting
                      style={styles.DropDownHeader}
                      text="Skill_Category"
                    />
                  </View>
                }>
                <ScrollView
                  style={{alignSelf: 'stretch', height: hp(30)}}
                  nestedScrollEnabled>
                  <CustomInput
                    value={this.state.nameRole}
                    placeholder={'Search for Role'}
                    textChange={(text) => {
                      this.setState({
                        showRole: text != '' ? true : false,
                      });
                      this.cheksRole(text);
                    }}
                    inputContainerStyle={{
                      backgroundColor: themeColor,
                      height: hp(6.5),
                      // width: "100%",
                      borderColor: themeColor,
                      borderWidth: scale(1),
                      borderRadius: scale(5),
                    }}
                    inputStyle={{
                      color: 'white',
                      fontSize: hp(2.7),
                      fontFamily: 'Roboto-Bold',
                      fontWeight: 'bold',
                    }}
                    containerStyle={{
                      width: wp(85),
                    }}
                    placeholderTextColor={themeWhite}
                    iconName={iconSearch}
                    iconStyle={{
                      height: hp(3),
                      width: hp(3),
                    }}
                    iconColor={'#fff'}
                    // onSubmitEditing={(event) =>
                    //   this.addsSkill(event.nativeEvent.text)
                    // }
                  />
                  {!showRole && (
                    <SafeAreaView
                      style={{
                        alignItems: 'flex-start',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        flexGrow: 0,
                        marginTop: this.state.showRole
                          ? this.state.natHeight
                          : 1,
                        width: wp(80),
                        height: suggesion != [] && scale(95),
                      }}>
                      <ScrollView
                        contentContainerStyle={{
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                        }}>
                        <>
                          {suggesionRole &&
                            suggesionRole.map((elements, index) => (
                              <SuggestionView
                                textColor={'#fff'}
                                backGroundC={themeColor}
                                onPress={() =>
                                  this.suggestionTagRole(elements, index)
                                }
                                elements={elements}
                                index={index}
                              />
                            ))}
                        </>
                      </ScrollView>
                    </SafeAreaView>
                  )}
                  {this.state.showRole && (
                    <View
                      style={{
                        width: wp(80),
                        borderRadius: scale(5),
                        height: 'auto',
                        marginHorizontal: wp(2),
                        backgroundColor: themeColor,
                        top: this.state.showRole ? scale(-10) : 1,
                      }}
                      onLayout={(e) =>
                        this.setState({natHeight: e.nativeEvent.layout.height})
                      }>
                      <ListOfChoosed
                        contentContainerStyle={{
                          flexGrow: 1,
                          justifyContent: 'flex-start',
                          paddingLeft: 30,
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                        }}
                        data={RollCheck}
                        keyboardShouldPersistTaps="always"
                        renderItem={({item, index}) =>
                          this.renderItemRole(item, index)
                        }
                      />
                    </View>
                  )}
                </ScrollView>
              </DropDownItem>
              <DropDownItem
                // key={i}
                style={styles.FilterDropDown}
                contentVisible={false}
                invisibleImage={IC_ARR_DOWN}
                visibleImage={IC_ARR_UP}
                HeaderStyle={{
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                }}
                header={
                  <View style={styles.FilterDropDownInnerView}>
                    <View style={styles.fliterIcon}>
                      <Image
                        source={Filterjobtype}
                        style={styles.imageStyle}
                        resizeMode={'contain'}
                      />
                    </View>
                    <Texting style={styles.DropDownHeader} text="Job_Type" />
                  </View>
                }>
                <ScrollView
                  style={{alignSelf: 'stretch', height: 'auto'}}
                  nestedScrollEnabled>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      height: hp(6),
                      width: '100%',
                      marginBottom: 3,
                    }}>
                    <Categoryskill
                      name="FullTime"
                      bool={FullTime}
                      onPress={() =>
                        this.setState({
                          FullTime: !FullTime,
                        })
                      }
                    />
                    <Categoryskill
                      name="Part_time"
                      bool={PartTime}
                      onPress={() =>
                        this.setState({
                          PartTime: !PartTime,
                        })
                      }
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      height: hp(6),
                      width: '100%',
                      marginBottom: 3,
                    }}>
                    <Categoryskill
                      name="Employed"
                      bool={Employed}
                      onPress={() =>
                        this.setState({
                          Employed: !this.state.Employed,
                        })
                      }
                    />
                    <Categoryskill
                      name="Internship"
                      bool={Internship}
                      onPress={() =>
                        this.setState({
                          Internship: !this.state.Internship,
                        })
                      }
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      height: hp(6),
                      width: '100%',
                      marginBottom: 3,
                    }}>
                    <Categoryskill
                      name="Student_jobs"
                      bool={StudentJobs}
                      onPress={() =>
                        this.setState({
                          StudentJobs: !this.state.StudentJobs,
                        })
                      }
                    />
                    <Categoryskill
                      name="Freelancers"
                      bool={Freelancer}
                      onPress={() =>
                        this.setState({
                          Freelancer: !this.state.Freelancer,
                        })
                      }
                    />
                  </View>
                  <View
                    style={{flexDirection: 'row', height: hp(6), width: '100%',justifyContent:'center'}}>
                    <Categoryskill
                      name="Helping_Vacancies"
                      bool={HelpingVacancies}
                      onPress={() =>
                        this.setState({
                          HelpingVacancies: !this.state.HelpingVacancies,
                        })
                      }
                    />
                  </View>
                </ScrollView>
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
                    <Texting style={styles.DropDownHeader} text="Search_Type" />
                  </View>
                }>
                <View
                  style={{
                    flexDirection: 'row',
                    marginBottom: scale(10),
                    marginLeft: scale(10),
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    // paddingHorizontal:"5%"
                  }}>
                  <View style={styles.PersonalInfoChoose}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        height: hp(6),
                        width: '100%',
                      }}>
                      <TouchableOpacity
                        onPress={() => {
                          this.setState(
                            {
                              ByDistance: !ByDistance,
                            },
                            () => this.props.navigation.navigate('ScreenMap'),
                          );
                        }}
                        style={{
                          borderColor: ByDistance ? themeColor : '#000',
                          backgroundColor: ByDistance ? themeColor : themeWhite,
                          width: '44%',
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: scale(30),
                          borderWidth: 1,
                          paddingHorizontal: scale(10),
                        }}>
                        <Texting
                          style={[
                            {color: ByDistance ? 'white' : '#000'},
                            styles.CheckBoxLabelFont,
                          ]}
                          text="ByDistance"
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          this.setState({
                            ByLocation: !ByLocation,
                          },() => {
                            if (!this.state.modalData.length){
                              this.props.navigation.navigate('ScreenMap')
                            }
                          });
                        }}
                        style={{
                          borderColor: ByLocation ? themeColor : '#000',
                          backgroundColor: ByLocation ? themeColor : themeWhite,
                          width: '44%',
                          borderWidth: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: scale(30),
                          paddingHorizontal: scale(10),
                          marginRight: '8%',
                        }}>
                        <Texting
                          style={[
                            {color: ByLocation ? 'white' : '#000'},
                            styles.CheckBoxLabelFont,
                          ]}
                          text="ByLocation"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </DropDownItem>
              <View
                style={{
                  height: 100,
                  width: '100%',
                  backgroundColor: 'transparent',
                }}
              />
            </ScrollView>
          </View>
          {this.state.keyboardShown == false && (
            <ApplyFilterButton
              reset="Reset"
              apply="Apply"
              onReset={() =>

                {
                  
                  Alert.alert("Reset", "Are you sure you want to clear the Search criteria", [{
                                text: "No",
                                onPress: () => console.log("Cancel Pressed"),
                                style: "cancel"
                            }, {
                                text: "Yes",
                                onPress: () => {
                                                  this.setState(
                                    JSON.parse(JSON.stringify(defaultState))
                                )
                                this.arrayholders.filter(item => item.right = false);
                                console.log('this',this.state)
                                    this.slider.current.setHighValue(150000);
                                    this.slider.current.setLowValue(0);
                                    // let temp ={}
                                    // let modalData = global.Job_Location.map(item => {
                                    //                                 temp={
                                    //                                 ...item,
                                    //                                 flag:false
                                    //                                 }
                                    //                           return temp
                                    //                               })
                                    //                               this.setState({modalData})
                                    global.Job_Location = []

                                    global.Job_Title = [];
                                    global.Company = [];
                                    // global.region = {}
                                    global.reset = true
                                    global.Anywhere = false
                                    global.FullTime = false
                                    global.Employed = false
                                    global.PartTime = false;
                                    global.Internship = false;
                                    global.StudentJobs = false;
                                    global.HelpingVacancies = false;
                                    global.Freelancer = false;
                                }
                            }], {
                                cancelable: false
                            });

                 
              // this.props.navigation.goBack();

              }}
              onApply={this.save}
            />
          )}
        </ImageBackground>
      </SafeAreaView>
    );
  }
}
export default withNavigationFocus(Filter);
