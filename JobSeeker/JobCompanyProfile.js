import React, {
    Component
} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    StatusBar,
    ScrollView,
    FlatList,
    TouchableWithoutFeedback,
    TouchableOpacity,
    ImageBackground,
    Text,
    Image,
    ActivityIndicator,
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
    home,
    place,
    screen,
    edit,
    earth,
    url,
    dollor,
    user,
    bag,
    Background,
    sort,
    filter,
    TRANLINE,
    Companyavtar,
    FontBold,
    Listed,
    detailed
} from '../Constant/index';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from '../Component/responsive-ratio';
import {
    scale,
    snack
} from '../src/Util';
// import { Rating, AirbnbRating } from 'react-native-ratings';
import {
    Rating,
    NavigationHeader
} from '../Component/ViewManager.js';
import DoubleTap from '../Component/DoubleTap';
// import ItemMV from './ItemMV'
import Swipers from 'react-native-swiper';
import BasicInfoOfCompany from './BasicInfoOfCompany';
import JobDescription from './JobDescription';
import JobAboutCompany from './JobAboutCompany'
import Swiper from 'react-native-deck-swiper'
import http from '../api'
import Share from 'react-native-share';

class JobCompanyProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            changedindex: 0,
            data: '',
            id: '',
            blue: false,
            fleg: false

        }
    }

    checking = () => {
        console.log('hey')
        const {
            params
        } = this.props.navigation.state;
        const item = params ? params.item : null;
        console.log('other item', item);
        global.item = item;
        this.setState({
            data: global.all,
            id: params.index
        })
    }
    back = () => {
        console.log('hey back')
        global.item = global.all[this.state.id];

        if (this.state.changedindex > 0)
            this.refs.swiper.scrollBy(-1);
    }
    next = () => {
        console.log('global.all[this.state.id]', global.all[this.state.id]);
        global.item = global.all[this.state.id];
        if (this.state.changedindex < 4)
            this.refs.swiper.scrollBy(1);
    }
    Sharing = async () => {
        let path = url + 'images/company/';
        console.log("path", path);
        let pt = path + global.all[this.state.id].logo;
        const shareOptions = {
            title: 'Share via',
            subject: 'Spotjo',
            message: `Hey there \n I wish you are interesed in this job please check it \n Company name: -${global.all[this.state.id].name}\n Title: -${global.all[this.state.id].title}\n Email: -${global.all[this.state.id].email}\n Website: -${global.all[this.state.id].website}\n City: -${global.all[this.state.id].city}\n Mobile: -${global.all[this.state.id].mobile}\n Salary: -${global.all[this.state.id].salMin} - ${global.all[this.state.id].salMax},000k \n`,
            url: pt,
            failOnCancel: false,
        };
        try {
            await Share.open(shareOptions);
        } catch (err) {
            console.log(err)
        }
    }

    onSwiped = (type, index) => {
        console.log(`on swiped ${type}`, index)
        console.log('thanthan', global.all[index])
        this.setState({
            id: index
        })
        console.log('index', index);
        if (index >= global.all.length - 1) {
            console.log('hey');
            this.setState({
                fleg: !this.state.fleg
            })
        }

        if (type == 'left') {
            try {
                http.POST('api/jobseeker/add', {
                    userId: global.Id,
                    comId: global.all[index].comapyId,
                    jobId: global.all[index].id,
                    status: 'Not Interested'
                }).then(async (res) => {
                    if (res['data']['status']) {
                        console.log('rrrrrrrrr>>>>>><<<<<<<<<<', res['data']['result']);
                    } else {
                        snack(res['data']['message'])
                    }
                }, err => snack(err['message']));
            } catch (error) {
                snack(error)
            }
        } else if (type == 'bottom') {
            try {
                http.POST('api/jobseeker/add', {
                    userId: global.Id,
                    comId: global.all[index].comapyId,
                    jobId: global.all[index].id,
                    status: 'Save'
                }).then(async (res) => {
                    if (res['data']['status']) {
                        console.log('rrrrrrrrr>>>>>><<<<<<<<<<', res['data']['result']);
                    } else {
                        snack(res['data']['message'])
                    }
                }, err => snack(err['message']));
            } catch (error) {
                snack(error)
            }
        } else if (type == 'right') {
            try {
                http.POST('api/apply/job', {
                    userId: global.Id,
                    comId: global.all[index].comapyId,
                    jobId: global.all[index].id
                }).then(async (res) => {
                    if (res['data']['status']) {
                        console.log('rrrrrrrrr>>>>>><<<<<<<<<<', res['data']['result']);
                    } else {
                        snack(res['data']['message'])
                    }
                }, err => snack(err['message']));
            } catch (error) {
                snack(error)
            }
        } else if (type == 'top') {
            this.Sharing();
        }

    }

    Back = () => {
        this.props.navigation.navigate('JobSeekerlist');
    };


    renderCard = (data, index) => {
        // this.setState({
        //     id: index
        // })
        return (
            <ScrollView style={{
                alignSelf: "stretch",
            }}>
            <DoubleTap onDoubleTap={this.next}>
   <ImageBackground style={{
                width: wp('96%'),
                height: hp('100%') - (StatusBar.currentHeight + scale(100) + hp(5)),
                overflow:'hidden'
            }} source={require('../Img/ract.png')} resizeMode={'stretch'}>
  <View style={styles.CompanyProfileImageSize}>
    <Image
            source = {data.logo ? {
                uri: url + 'images/company/' + data.logo
            } :
                Companyavtar
            }
            style={styles.imageStyle}
            resizeMode={'stretch'}
            />
  </View>
  <View style={styles.CompanyProfileSecongImage}>
    <Image
            source = {data.logo ? {
                uri: url + 'images/company/' + data.logo
            } :
                Companyavtar
            }
            style={styles.imageStyle}
            resizeMode={'stretch'}
            />
  </View>
  <View style={styles.CompanyProfileDetail}>
    <View style={styles.CompanyDetailIcon}>
      <View style={styles.CompanyDetailProfileIcon}>
        <Image source={home} style={styles.imageStyle} resizeMode={'contain'}/>
      </View>
      <Text style={styles.ItemDetailLabel1}>
        {data.name}
      </Text>
    </View>
    <View style={styles.CompanyDetailIcon}>
      <View style={styles.CompanyDetailProfileIcon}>
        <Image source={user} style={styles.imageStyle} resizeMode={'contain'}/>
      </View>
      <Text style={styles.ItemDetailLabel1}>{data.isEmployed ? <Text>Employed</Text> : <Text>Fresher</Text>}</Text>
    </View>
    <View style={styles.CompanyDetailIcon}>
      <View style={styles.CompanyDetailProfileIcon}>
        <Image source={screen} style={styles.imageStyle} resizeMode={'contain'}/>
      </View>
      <Text style={styles.ItemDetailLabel1}>{data.title}</Text>
    </View>
    <View style={styles.CompanyDetailIcon}>
      <View style={styles.CompanyDetailProfileIcon}>
        <Image source={edit} style={styles.imageStyle} resizeMode={'contain'}/>
      </View>
      <Text
            style={{
                marginLeft: scale(10),
                marginTop:scale(-2)
            }}>
        {data != '' && data.skills.map((item, index) => {
                return (
                    <Text key={index}
                    style={styles.ItemDetailLabel1}>
              {item.name} /
            </Text>
                );
            })}
      </Text>
      <Text style={styles.CompanyProfileDetailLabel100}> 100%</Text>
    </View>
    <View style={styles.CompanyDetailIcon}>
      <View style={styles.CompanyDetailProfileIcon}>
         <Image source={bag} style={styles.imageStyle} resizeMode={'contain'}/>
      </View>
      <Text style={styles.ItemDetailLabel1}>
        {data.minExp} - {data.maxExp} Years / 
      </Text>
      <Text style={styles.CompanyProfileDetailLabel100}> 100%</Text>
    </View>
    <View style={styles.CompanyDetailIcon}>
      <View style={styles.CompanyDetailProfileIcon}>
        <Image source={place} style={styles.imageStyle} resizeMode={'contain'}/>
      </View>
      <Text style={styles.ItemDetailLabel1}>
        {data.city} /
      </Text>
      <Text style={styles.CompanyProfileDetailLabel100}> 100%</Text>
    </View>
    <View style={styles.CompanyDetailIcon}>
      <View style={styles.CompanyDetailProfileIcon}>
        <Image source={dollor} style={styles.imageStyle} resizeMode={'contain'}/>
      </View>
      <Text style={styles.ItemDetailLabel1}>{data.salMin}-{data.salMax},000$</Text>
    </View>
    <View style={styles.CompanyDetailIcon}>
      <View style={styles.CompanyDetailProfileIcon}>
        <Image source={earth} style={styles.imageStyle} resizeMode={'contain'}/>
      </View>
      <Text style={styles.ItemDetailLabel1}>{data.website}</Text>
    </View>
  </View>
</ImageBackground></DoubleTap>
        </ScrollView>)

    }
    render() {
        const {
            data,
            id,
            changedindex
        } = this.state
        return data != '' ? (
            <SafeAreaView style={styles.backGround}>
            <NavigationEvents onDidFocus={this.checking}/>
            <ImageBackground style={{overflow:"hidden"},[styles.ImageBlue]}
            source = {Background}
            resizeMode={'stretch'}>
            <NavigationHeader onPress={() => this.Back()} text={data.title}/>
            <Swipers
            scrollEnabled={changedindex == 0 ? false : true}
            onIndexChanged ={(index) => this.setState({
                changedindex: index == 0 ? 0 : 1
            })}
            ref={'swiper'}
            index={this.state.changedindex}

            dotColor={themeWhite}
            paginationStyle={{
                top: hp(-82),
                position: "absolute",
                opacity: this.state.changedindex
            }} >
            <View>
       <View style={styles.JoblistSecondViewHeading}>
            <View style={styles.JoblistSecondViewHeadingResult}>
            <Text style={styles.JoblistSecondViewHeadingText}>Results - {data.length}</Text>
           </View>
            <View style={styles.JobListUpperButtonView}><TouchableWithoutFeedback>
            <View style={[{
                marginRight: scale(15)
            }, styles.JobListUpperButtonIcon]}>
            <Image source ={sort} style={{
                height: scale(20),
                width: scale(16)
            }} resizeMode={'contain'}/>
            <Text style={styles.JoblistUpperButton}>Sort</Text>
            </View>
            </TouchableWithoutFeedback>
             <TouchableWithoutFeedback onPress={this.Filter}>
            <View style={styles.JobListUpperButtonIcon}>
            <Image source ={filter} style={{
                height: scale(19),
                width: scale(14),
                marginTop: scale(1)
            }} resizeMode={'contain'}/>
            <Text style={styles.JoblistUpperButton}>Filter</Text>
            </View>
            </TouchableWithoutFeedback>
            <View style={{marginLeft:scale(5),flexDirection:"row"}}>
            <TouchableWithoutFeedback onPress={this.Back}>
            <View style={styles.JobListUpperButtonIcon}>
            <Image source ={Listed} style={{
                height: scale(22),
                width: scale(22),
                marginTop: scale(2),
                marginHorizontal:scale(10)
            }} resizeMode={'contain'}/>
            </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
            <View style={styles.JobListUpperButtonIcon}>
            <Image source ={detailed} style={{
                height: scale(22),
                width: scale(22),
                marginTop: scale(2)
            }} resizeMode={'contain'}/>
            </View>
            </TouchableWithoutFeedback></View>
   </View></View><View style={styles.CompanyProfileMainImage1}>
             {!this.state.fleg ?(<Swiper
            ref={swiper => {
                this.swiper = swiper
            }}
            cardStyle={{
                width: wp('96%'),
                height: hp('100%') - (StatusBar.currentHeight + scale(100) + hp(5)),
            }}
            // overlayOpacityHorizontalThreshold={10}
            // overlayOpacityVerticalThreshold={10}
            backgroundColor={'transparent'}
            cardHorizontalMargin={0}
            cardVerticalMargin={0}
            onSwiped={() => this.onSwiped('general')}
            onSwipedLeft={(index) => this.onSwiped('left', index)}
            onSwipedRight={(index) => this.onSwiped('right', index)}
            onSwipedTop={(index) => this.onSwiped('top', index)}
            onSwipedBottom={(index) => this.onSwiped('bottom', index)}
            cards={global.all}
            cardIndex={id}
            stackSize={2}
            showSecondCard={true}
            renderCard={this.renderCard}
            animateOverlayLabelsOpacity
            animateCardOpacity
            swipeBackCard
            overlayLabels={{
                bottom: {
                    title: 'Save',
                    style: {
                        label: {
                            borderColor: themeColor, color: themeColor, borderWidth: 5,
                             fontSize: 32, borderRadius: 5, textAlign: 'center'
                        },
                        wrapper: {
                            flexDirection: 'column', alignItems: 'center',
                             justifyContent: 'center',
                        }
                    }
                },

                left: {
                    title: 'Not Interested',
                    style: {
                        label: {
                            borderColor: 'red', color: 'red', borderWidth: 5,
                             fontSize: 32, borderRadius: 5, textAlign: 'center'
                        },
                        wrapper: {
                            flexDirection: 'column', alignItems: 'center',
                             justifyContent: 'center',
                        }
                    }
                },
                right: {
                    title: 'Applied',
                    style: {
                        label: {
                            borderColor: 'green', color: 'green', borderWidth: 5,
                             fontSize: 32, borderRadius: 5, textAlign: 'center'
                        },
                        wrapper: {
                            flexDirection: 'column', alignItems: 'center',
                             justifyContent: 'center',
                        }
                    }
                },
                top: {
                    title: 'Share',
                    style: {
                        label: {
                            borderColor: '#fcba03', color: '#fcba03', borderWidth: 5,
                             fontSize: 32, borderRadius: 5, textAlign: 'center'
                        },
                        wrapper: {
                            flexDirection: 'column', alignItems: 'center',
                             justifyContent: 'center',
                             // marginTop: (hp('100%') - (StatusBar.currentHeight + scale(100) + hp(5)))/2,
                              // marginLeft: -48, 
                        }
                    }
                }
            }}
            /> ) :(<View  style = {{
                    justifyContent: "center",
                    alignItems: "center",
                    flex: 1
                }}>
            <Text style={{
                    textAlign: 'center',
                    fontFamily: FontBold,
                    color: themeWhite,
                    fontSize: scale(18),
                    width: wp(60)
                }}>No More Jobs...😞</Text><NavigationEvents onDidFocus={this.checking}/>
            </View>)}
            </View>

            </View>
         <View><BasicInfoOfCompany /></View>
            <View><JobDescription /></View>
            <View><JobAboutCompany /></View>
            
            </Swipers>
             
         <View style={styles.TranLingImage}>
             <Image
            source={TRANLINE}
            style={styles.imageStyle}
            resizeMode={'stretch'}
            /></View>
        </ImageBackground>
      </SafeAreaView>
        ) : <SafeAreaView style={styles.backGround}>
            <ImageBackground style={[styles.ImageBlue, {
                justifyContent: "center",
                alignItems: "center"
            }]}
            source = {Background}
            resizeMode={'stretch'}><ActivityIndicator size="large" color="#fff" /><NavigationEvents onDidFocus={this.checking}/>
            <View style={styles.TranLingImage}>
             <Image
            source={TRANLINE}
            style={styles.imageStyle}
            resizeMode={'stretch'}
            /></View></ImageBackground></SafeAreaView>;
    }
}

export default withNavigationFocus(JobCompanyProfile);