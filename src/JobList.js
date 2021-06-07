import React, {
  PureComponent
} from 'react';
import {
  StatusBar,
  ImageBackground,
  View
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
import TopHeader from '../Component/TopHeader'
import List from '../Component/List'
import ModalSort from '../Component/ModalSort'

class JobList extends PureComponent {
  mounted = false

    state = {
      data: [],
      fil :false,
      srt : false,
      detailed:false,
      openModal:false,
      relevance:false,
      Date:false,
      message:'No_data',
      load:false
    };


    componentDidMount() {
    this.mounted = true ;
    this.checking();
  }
  checking = () => {
    // console.log('globalsdf',global.all)

    // if (this.state.fil)
    //   {
    //     global.addSkill.length != 0 && this.setState({message:"no data found please try with another skill"})
    //     global.Role.length != 0 && this.setState({message:"no data found please try with another Role"})
    //     global.CompanyGuest.length != 0 && this.setState({message:"no data found please try with another Company"})
    //   }
// console.log('global.addSkill',global.objective)



    //   if (Object.keys(global.objective).length === 0)
    //     {

    //     }
    //     else
    //   {
    //   let s = global.objective.skill.map(item => item.name).join(', ');
    //   let r = global.objective.Role.toString()
    //   let c = global.objective.Company.toString()

    //   let something = (global.objective.skill.length ? ' Skills: ' : '') +  s + (global.objective.Role.length ? ' Roles: ' :'') + r + (global.objective.Company.length ? ' Company: ' : '') + c + ' ' + 
    //   (global.objective.Employed ? ' Employed ' : '' )+ 
    //   (global.objective.Freelancer ? ' FreeLancer ' : '')+ 
    //   (global.objective.FullTime ? ' FullTime ' : '')+ 
    //   (global.objective.PartTime ? ' PartTime ' : '')+ 
    //   (global.objective.HelpingVacancies ? ' Helping Vacancies ' : '')+ 
    //   (global.objective.Internship ? ' Internship ' : '')+ 
    //   (global.objective.StudentJobs ? 'Student Jobs' : '')+ 
    //   (global.objective.Hourly ? ' Hourly ' : '')+ 
    //   (global.objective.Monthly ? 'Monthly' : '')+ 
    //   (global.objective.Yearly ? ' Yearly ' : '' )+ 
    //   ' Minimum salary : ' + global.objective.salary + ' Maximum salary : ' + global.objective.salaryMax 
    //   console.log('somethign',something)
    //   this.setState({
    //     something
    //   })
    // }
      // global.addSkill = []
      // global.Role = []
      // global.CompanyGuest = []

    this.mounted  && this.setState({ 
      data: JSON.parse(JSON.stringify(global.all)),
      fil:false,
      srt:false,
      load:false,
      detailed:false,
      
    });
  };

  componentWillUnmount(){
    this.mounted = false ;

  }

  Filter = () => {
    this.setState({
      fil:true
    })
    this.props.navigation.navigate('Filter')
  };

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
       let data = this.state.data;
    data = this.state.Date ? data.sort((a,b) => a.createdAt > b.createdAt ? 1 : -1) : data.sort((a,b) => a.createdAt < b.createdAt ? 1 : -1);
    
    this.setState({data,openModal:!this.state.openModal})
    
  }
  relevance = () => {

    this.setState({relevance:!this.state.relevance,Date:false})
    let data = this.state.data;
    if (global.addSkill.length === 0)
    {
    
      alert('please select some skills for relevance search')
      this.props.navigation.navigate('Filter')
      
    }
     else
     { 
    data = global.addSkill.map(skill => data.filter(item => item.skills.filter(item => item.english === skill.cell.english)))
    console.log('data',data[0]);
    data = data[0];
     }
    this.setState({data,openModal:false})
  }

  push = (item, index) => {
    //  global.all  = 
    console.log('item',item)
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
    this.props.navigation.navigate('JobLogin')
    }, 500);
  }

  pushy = () => {
    this.setState({detailed:true})
    setTimeout(() => {
      this.props.navigation.navigate('CompanyProfile', {
        item: global.all[0],
        length:this.state.data.length
      });
    }, 300);
    
  };
  Video = (item) => {
    // console.log('item',item)
    let m = url + 'images/company/' + item.video;
    if (item.video)
      this.props.navigation.navigate('VideoPlayer', {
        vid: m,
      });
    else alert('Video is not uploaded');
  };
  Back = () => {
    this.props.navigation.navigate('ChooseTalent');
  };
  render() {
    
    const {
      data
    } = this.state;
    // console.warn('>> false', DeviceInfo.getBrand());

    return (
      <View style={styles.backGround}>
        <StatusBar hidden={true} backgroundColor={themeWhite} />
        <NavigationEvents onDidFocus={this.checking} />
        <ModalSort isVisible={this.state.openModal} onBackdropPress={()=>this.setState({openModal:false})} 
          relevance={()=>this.relevance()} bydate={()=> this.date()} date={this.state.Date} rel={this.state.relevance}/>
        <ImageBackground
          style={styles.ImageBlue}
          source={Background}
          tintColor={'#fff'}
          resizeMode={'stretch'}>
          <NavigationHeader
            onPress={() => this.Back()}
            text={data && this.state.data.length + ' Jobs Found'}
            Search={this.Filter}
          />
          <TopHeader data={data && this.state.data.length} sort={this.Sort} srtTint={this.state.srt} filTint={this.state.fil} Filter={this.Filter} detailedTint={this.state.detailed} detailed={this.pushy}/>
          {this.state.data != '' ? (
            <List style={{marginTop: 3,
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
           <NoData text= {this.state.message}/>
          )}
        </ImageBackground>
      </View>
    );
  }
}
export default withNavigationFocus(JobList);