/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
if (__DEV__) {
    console.log = () => {
    };
}

import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, AppState } from 'react-native';
import Routes from './Constant/Navigation'

global.Job_Title = ''
global.Company = ''
global.Branch = ''
global.Anywhere = false
global.FullTime = false
global.PartTime = false
global.Employed = false
global.Internship = false
global.StudentJobs = false
global.HelpingVacancies = false
global.Freelancer = false
global.Start_date = '',
global.End_date = '',
global.City = '',
global.Language = ''
global.Task_Description = ''
global.addSkill = []
global.Education = []
global.LanguageSkill = []
global.salary = 0
global.salaryrating = 1
global.Email = ''
global.Mobile = '',
global.Address = ''
global.CompanyImage = ''
global.uploadUri = ''
global.Video = ''
global.type = ''
global.Id = ''
global.WebSite = ''
global.Experience = [],
global.firstName = ''
global.lastName = ''
global.Place = ''
global.UserEmail = ''
global.UserMobile = ''
global.UserProfile = ''
global.UserSkill = ''
global.UserEducation = ''
global.UserLanguage = ''
global.Qualification = ''
global.CompanyExp = ''
global.ig = []

export default class App extends Component {

    constructor(props) {
        super(props);
        console.disableYellowBox = true;

        this.state = {
            // isLoaded: false
        };

    }
    ComponentDidMount() {}

    render() {
        return (<View style={{
                flex: 1,
            }}><Routes />
        </View>)

    }
}
;