/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
// if (__DEV__) {
//   console.log = () => {};
// }



import React, {Component} from 'react';
import {View} from 'react-native';
import Routes from './Constant/Navigation';
import LanguageProvider, {LanguageContext} from './Constant/LanguageContext';

global.Job_Title = [];
global.JobID= null
global.region = {};
global.Company = [];
global.Branch = '';
global.Anywhere = false;
global.FullTime = false;
global.PartTime = false;
global.Employed = false;
global.Internship = false;
global.StudentJobs = false;
global.HelpingVacancies = false;
global.Freelancer = false;
global.Start_date = '';
global.End_date = '';
global.City = [];
global.Language = '';
global.Task_Description = '';
global.Task_Description_Req = '';
global.addSkill = [];
global.Education = [];
global.LanguageSkill = [];
global.minSalary = 0;
global.maxSalary = 0;
global.salaryrating = 1;
global.Email = '';
global.Mobile = '';
global.Address = '';
global.CompanyImage = '';
global.uploadUri = '';
global.Video = '';
global.type = '';
global.Id = '';
global.WebSite = '';
global.Experience = [];
global.firstName = '';
global.lastName = '';
global.Place = '';
global.UserEmail = '';
global.UserMobile = '';
global.UserProfile = '';
global.UserSkill = '';
global.UserEducation = [];
global.UserLanguage = '';
global.Qualification = '';
global.CompanyExp = '';
global.ig = [];
global.let = 51.1657;
global.long = 10.4515;
global.all = [];
global.minYear;
global.maxYear;
global.Service;
global.role;
global.item;
global.Job_Location = [];
global.msgUnreadTotal = 0;
global.language = 'english';
global.Role = []
global.CompanyGuest = []
global.objective = {}
global.Favorite_Location = []
global.reset = false;

export default class App extends Component {
  constructor(props) {
    super(props);
    console.disableYellowBox = true;

    this.state = {
      // isLoaded: false
    };
  }

  changeLanguage = (language, data) => () => {
    /**
     * Confused? It is just a simple function which returns another function
     * I use this pattern to minimize the use of anonymous arrow functions.
     * Why? For better performance as they are made on every render.
     */
    data.changeLanguage(language);
    global.language = language;
  };

  render() {
    return (
      <LanguageProvider>
        <View
          style={{
            flex: 1,
          }}>
          <Routes />
        </View>
      </LanguageProvider>
    );
  }
}

// <LanguageContext.Consumer>
//             {/* The Language Consumer which recieves the providers ...state, and changeLanguage.  */}
//             {(data) => {
//               return (
//                 <Button
//                   title='Change to Spanish'
//                   onPress={this.changeLanguage('spanish', data)}
//                 />
//               );
//             }}
//           </LanguageContext.Consumer>
