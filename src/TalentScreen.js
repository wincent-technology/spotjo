import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, TouchableWithoutFeedback, StatusBar, ImageBackground, Dimensions, Text, Image, View, TextInput, FlatList } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import { scale } from './Util';
import CustomInput from '../Component/Input'
import { widthPercentageToDP as wp, heightPercentageToDP as hp, vw, vh } from '../Component/responsive-ratio';
import { Background, themeColor } from '../Constant/index'
import http from '../api';
import styles from './Style'
import SnackBar from '../Component/SnackBar'



class TalentScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'Java Software',
            dataCheck: [],
        };
        this.arrayholder = [];
    }

    next = () => {
        global.Job_Title = this.state.name;
        this.props.navigation.navigate('FavoriteLocation')
    }
    DisplaySnackBar = (msg) => {
        this.refs.ReactNativeSnackBar.ShowSnackBarFunction(msg);
    };

    back = () => {
        this.props.navigation.goBack();
    }
    renderItem = (item, index) => {
        return (
            <View style={{
                width: wp(80),
                marginLeft: scale(34)
            }}><TouchableWithoutFeedback onPress={() => this.choose(item)}><Text style={{
                fontWeight: "bold",
                fontSize: scale(18),
                color: themeColor
            }}>{item}</Text></TouchableWithoutFeedback>
            </View>
        )
    }

    choose = (choose) => {
        this.setState({
            name: choose
        })
    }
    componentDidMount() {

        try {
            http.GET('api/apptaljson/get').then((res) => {
                if (res['data']['status']) {
                    this.setState({
                        dataCheck: res['data']['result'],
                    });

                    this.arrayholder = res['data']['result'];
                //            //will get data in this    res['data']['result']
                } else {
                    // console.log('res', res);
                    this.DisplaySnackBar(res['data']['message'])
                }
            }, err => alert(JSON.stringify(err)));
        } catch ( error ) {
            this.DisplaySnackBar(error)

        }
    }
    render() {
        return (
            <SafeAreaView style={styles.backGround}>
            <ImageBackground style={styles.ImageBlue}
            source = {Background}
            resizeMode = {'stretch'}>
        <StatusBar hidden ={true}/>
            <View style={{
                flex: 1
            }}>
            <SnackBar ref="ReactNativeSnackBar" />
        <View style={[{
                top: scale(30)
            }, styles.CenterLogo]}><View><Image source = {require('../Img/logo-spotjo.png')}
            resizeMode={'contain'}
            style={{
                height: scale(150),
                width: Dimensions.get('window').width / 2 + scale(80),
            }}/></View><View style={{
                top: scale(20)
            }}><Text style={[{
                fontSize: scale(24),
                fontFamily: 'Roboto-Bold'
            }, styles.FontSty]}>What's your Talent?</Text></View><View style={{
                top: scale(20)
            }}><CustomInput placeholder = {this.state.name} textChange = {
            (text) => {
                const newData = this.arrayholder.filter(item => {
                    const itemData = `${item.toUpperCase()}   
                    ${item.toUpperCase()} ${item.toUpperCase()}`;
                    const textData = text.toUpperCase();
                    return itemData.indexOf(textData) > -1;
                });
                this.setState({
                    dataCheck: newData
                })
            }}
            inputStyle={{
                fontWeight: "bold",
                fontSize: scale(18),
                color: themeColor
            }}
            iconStyle={{
                height: 25,
                width: 25
            }}
            />
            </View>
             <View style={{
                width: wp(87),
                borderRadius: scale(5),
                height: hp(12),
                backgroundColor: "#fff"
            }}><FlatList
            data = {this.state.dataCheck}
            showsHorizontalScrollIndicator = { false  }
            removeClippedSubviews={true}
            renderItem={({item, index}) => this.renderItem(item, index)}
            initialNumToRender={5}
            maxToRenderPerBatch={10}
            updateCellsBatchingPeriod={70}
            getItemLayout={(data, index) => (
            {
                length: hp('1%'),
                offset: hp('1%') * index,
                index
            }
            )}
            keyExtractor = {
            (item, index) => index + ''
            }
            /></View>
            </View>
            <View style={{
                flexDirection: "row",
                width: wp(100),
                top: hp(28)
            }}>
            <View style={{
                alignItems: "flex-start",
                width: wp(40),
                marginLeft: wp(7)
            }}>
            <TouchableWithoutFeedback style={styles.Size} onPress={this.back}><View  style={styles.Size}><Text style={[{
                fontSize: scale(20),
            }, styles.FontSty]}>Back</Text></View></TouchableWithoutFeedback>
            </View>
            <View style={{
                alignItems: 'flex-end',
                // right: wp(7),
                width: wp(47)
            }}><TouchableWithoutFeedback style={styles.Size} onPress={this.next}><View  style={[styles.Size, {
                alignItems: 'flex-end'
            }]}><Text style={[{
                fontSize: scale(20),
            }, styles.FontSty]}>Next</Text></View></TouchableWithoutFeedback></View>
            </View>
            </View>
        </ImageBackground></SafeAreaView>
        )
    }
}
;

export default withNavigationFocus(TalentScreen);