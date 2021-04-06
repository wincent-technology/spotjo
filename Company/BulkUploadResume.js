import React, { Component } from 'react';
import { SafeAreaView, Dimensions, StyleSheet, Platform, View, Text, StatusBar, ImageBackground, Image, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { withNavigationFocus } from 'react-navigation';
import styles from '../src/Style';
import { scale, snack } from '../src/Util';
import { left, library, icon, play, leftVid } from '../src/IconManager';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../Component/responsive-ratio';
import { Background } from '../Constant/index'
import DocumentPicker from 'react-native-document-picker';
import { readFile } from 'react-native-fs';
import XLSX from 'xlsx';
import http from '../api'
const input = res => res;

var Month = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec',];

class BulkUploadResume extends Component {
    constructor(props) {
        super(props);

    // this.state = {};
    }

   
    Upload = async () => {
            try {
                const fileSelected = await DocumentPicker.pick({
                    type: [DocumentPicker.types.allFiles],
                });
                readFile(fileSelected.uri, 'ascii').then(fileSelected => {
    
                    const getFile = XLSX.read(input(fileSelected), {type:'binary',cellDates:true});
                    const Sheets0 = getFile.SheetNames[0];
                    const ws0 = getFile.Sheets[Sheets0];
                    const data = XLSX.utils.sheet_to_row_object_array(ws0, {raw:true});
                    data.filter(i => {
                    let eng = i.skillEnglish.split(',')
                    let ger = i.skillGermen.split(',')
                    let skillRet = i.skillRating.split(',')
                    let dE = i.degreeEnglish.split(',')
                    let dG = i.degreeGermen.split(',')
                    let eF = new Date(i.educationFrom).toLocaleDateString().split(',')
                    let eR = i.educationRating + ''.split(',')
                    let eT = new Date(i.educationTo).toLocaleDateString().split(',')
                    let uE = i.uniEnglish.split(',')
                    let uG = i.uniGermen.split(',')
                    let wC = i.wrkexpCompany.split(',')
                    let wF = new Date(i.wrkexpFrom).toLocaleDateString().split(',')
                    let wrat = i.wrkexpRating + ''.split(',')
                    let wR = i.wrkexpRole.split(',')
                    let wT = new Date(i.wrkexpTo).toLocaleDateString().split(',')

                    i['workExp']= [];
                    i['skill'] = [];
                    i['education'] = [];

                    for(let j in eng)
                        i.skill.push({english:eng[j],german:ger[j],rating:skillRet[j]})

                    for(let j in eF)
                            i.education.push({
                                Degree : {english:dE[j],german:dG[j]},
                                University:{english:uE[j],german:uG[j]},
                                rating:eR[j],
                                From: Month[new Date(eF[j]).getMonth()] + ' ' + new Date(eF[j]).getFullYear(),
                                To : Month[new Date(eT[j]).getMonth()] + ' ' + new Date(eT[j]).getFullYear(),
                            })

                     for(let j in wF)
                            i.workExp.push({
                                Role : wR[j],Company:wC[j],rating:wrat[j],
                                From: Month[new Date(wF[j]).getMonth()] + ' ' + new Date(wF[j]).getFullYear(),
                                To : Month[new Date(wT[j]).getMonth()] + ' ' + new Date(wT[j]).getFullYear(),
                            })

                                delete i.skillEnglish,
                                delete i.skillGermen
                                delete i.skillRating
                                delete i.degreeEnglish
                                delete i.degreeGermen
                                delete i.educationFrom
                                delete i.educationRating
                                delete i.educationTo
                                delete i.uniEnglish
                                delete i.uniGermen
                                delete i.wrkexpCompany
                                delete i.wrkexpFrom
                                delete i.wrkexpRating
                                delete i.wrkexpRole
                                delete i.wrkexpTo
                })
                http.POST('api/user/upload/resume', {
                    data: data,
                }).then((res) => {
                    if (res['data']['status'])
                    {
                        console.log('resource',res['data'])
                        snack(res['data']['message'])

                    }
                }).catch(e => console.log('e',e))
                })
                    .catch(err => {
                       console.log(err.message, err.code);
                    });
            } catch (err) {
                if (DocumentPicker.isCancel(err)) {
    
                } else {
                    throw err;
                }
                this.setState({loader : false})
        }
    }

    render() {
        return (
            <SafeAreaView style={{flex:1,justifyContent:"center",alignItems:"center"}}>
            <ImageBackground style={styles.ImageBlue}
            source = {Background}
            resizeMode = {
            'stretch'
            } >
        <StatusBar hidden ={true}/>
            <View style={{flex:1,justifyContent:"center",alignItems:'center'}}>
           <Text style={styles.LookingFor}>Upload Resume</Text>
            <View style={{
                marginTop: scale(45)
            }}>
        <TouchableWithoutFeedback style={styles.CompanyLoginOpportunityView} onPress={this.Upload}><View  style={[styles.CompanyLoginalentView, {
                borderRadius: scale(5),
                justifyContent: "center",
            }]}><View style={{
                // marginLeft: scale(-95),
            // marginRight: scale(10)
            }}><Text style={styles.CompanyOppoTalentText}>Select Excel File</Text></View></View></TouchableWithoutFeedback>
       
        </View>
        </View>
       </ImageBackground></SafeAreaView>

        );
    }
}
;
export default withNavigationFocus(BulkUploadResume);