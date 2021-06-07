import React, {
    PureComponent
} from 'react'
import {
    View,
    Image,
    Dimensions,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,TouchableOpacity
} from 'react-native'
import {
    scale
} from '../src/Util'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from '../Component/responsive-ratio';
import {
    StarRating
} from '../Component/ViewManager'
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
    place,
    edit,
    user,
    bag,
    url,
    Companyavtar,
    blanks,
    Fulls,FontRegular
} from '../Constant/index'
import styles from '../src/Style'
const {
    height,
    width
} = Dimensions.get('window')
import TimeAgo from '../Component/TimeAgo'
import Texting from '../Constant/Text'
import LinearGradient from 'react-native-linear-gradient'
import DoubleTap from '../Component/DoubleTap';


const CompanyProfileIcon = {
    height: hp(2.6),
    width: hp(2.6),
    justifyContent: 'center',
    alignItems: 'flex-start',
  }
const Items  = global.language == 'english' ? true : false;

class ItemMV extends PureComponent {
    // title, href, total_time, total_listen, image
    constructor(props) {
        super(props);
        // console.log('this',this.props)
    }
    dateDiffInDays(dt) {
        const a = Date.parse(new Date(Date.now()))
        const b = Date.parse(new Date(dt))
        // global.CompanyExp = Math.floor(b - a)
        return Math.floor(a - b)

    }

    timeConversion = (a,b,c,d,e) => {
        let result = []
            if (a == 1) result.push('Employed')
            if (b == 1) result.push('FreeLancer')
            if (c == 1) result.push('Helping Vacancies')
            if (d == 1) result.push('Internship')
            if (e == 1) result.push('StudentJob')

 result = result.reduce((name,arr,index) => name + (result.length != 1 && index != 0 ? ' / ' + arr : arr),'')
  return result.length ? result : 'Fresher'
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={() => this.props.push(this.props.item,this.props.index)}>
            <LinearGradient colors={['#fff', '#f3f2f2']} style={styles.ItemMVMainView}>
            <View style={styles.ItemMVSecondView}>
            <View style={{
                width: wp(80),
                justifyContent: "center",
            }}>
            <Text style={styles.ItemMVHeader}>{this.props.item.title || 'Unknown'}</Text></View>
            <View style={{
                width: wp(18),
                justifyContent: "center",
            }}><TouchableWithoutFeedback onPress={() => this.props.Video(this.props.item)}>
            <View style={styles.ItemMVPlayNowView}>
            <View style={styles.ItemMVPlayIcon}>
            {play('videocam', hp(3), themeColor)}
            </View></View></TouchableWithoutFeedback></View></View>
            <View style={styles.ItemMVImage}><Image
            source = {this.props.item.logo ? {
                uri: url + 'images/company/' + this.props.item.logo
            } :
                Companyavtar
            }
            style={styles.imageStyle}
            resizeMode={this.props.item.logo ? 'contain' : 'cover'}
            /></View>
            <View style={styles.ItemMVDetail}>
            <View><Text style={{
                fontSize: hp(2),
                fontFamily: 'Roboto-Bold',
                fontWeight: "bold"
            }}>{this.props.item.name || 'Unknown'}</Text></View>
        
            <View style={styles.ItemMVDetailIcon}>
            <View style={CompanyProfileIcon}>
            <Image source ={user} style={styles.imageStyle} resizeMode={'contain'} /></View>
            <Text style={{marginLeft: scale(6),
    fontFamily: FontRegular,
    
    fontSize: hp(2),width:wp(35)}} numberOfLines={1}>
            {this.timeConversion(this.props.item.isEmployed,this.props.item.isFreelancer,this.props.item.isHelping,this.props.item.isInternship,
                this.props.item.isStudentJob)}
            </Text>
            </View>
            <View style={styles.ItemMVDetailIcon}><View style={CompanyProfileIcon}>
            <Image source ={place} style={styles.imageStyle} resizeMode={'contain'} /></View>
            <Text style={styles.ItemDetailLabel} numberOfLines={1}>
            {(this.props.item.city.length === 0 || this.props.item.city == null) && 'Unknown ' }
            {this.props.item.city && this.props.item.city.map((item, index) => {
                    console.log('item',item)
                return (
                    <Text  key={index} style={{
                        fontFamily: 'Roboto-Regular',
                        fontSize: hp(2)
                    }}>{item.place || item}{this.props.item.city && this.props.item.city.length > 1 && ' / '} </Text>
                )
            })}
            </Text>
            {/* <Text style={styles.ItemMVDetailColor}>{(this.props.item.city.length != 0 || !this.props.item.city)? ' 100%' : ' 0%'}</Text> */}
            </View>
            <View style={[styles.ItemMVDetailIcon,{maxWidth:wp(35)}]}><View style={CompanyProfileIcon}><Image source ={edit} style={styles.imageStyle} resizeMode={'contain'} /></View><Text style={{
                marginLeft: scale(5),
                fontFamily: 'Roboto-Regular',
                        fontSize: hp(2)
            }} numberOfLines={1} >
            {(!this.props.item.skills || this.props.item.skills.length == 0 ) && 'Unknown '}
            {this.props.item.skills && this.props.item.skills.map((item, index) => {
                return (
                    <Text  key={index} style={{
                        fontFamily: 'Roboto-Regular',
                        fontSize: hp(2)
                    }}>{global.language == 'english' ? item.english : item.german} {this.props.item.skills && this.props.item.skills.length > 1 && ' / '}</Text>
                )
            })}</Text>
            {/* <Text style={styles.ItemMVDetailColor}>
            {this.props.item.skills && this.props.item.skills.length > 1 && <Text style={{color:'rgba(0,0,0,0.6)'}}>/</Text>}
            </Text> */}
            </View>
            <View style={styles.ItemMVDetailIcon}>
                
                <View style={CompanyProfileIcon}><Image source ={bag} style={styles.imageStyle} resizeMode={'contain'} /></View>
                {(this.props.item.minExp && this.props.item.maxExp) ?     
                <><Text style={styles.ItemDetailLabel}>
                {this.props.item.minExp ? this.props.item.minExp : 0 }-{this.props.item.maxExp ?this.props.item.maxExp : 0} Years  
                </Text>
                {/* <Text style={styles.ItemMVDetailColor}> 100%</Text> */}
                </> :
                <><Texting style={styles.ItemDetailLabel} text='Years_Not_Defined'/>
              {/* <Text style={styles.ItemMVDetailColor}> 0%</Text> */}
              </>
                }
                </View>
      </View>
            <View style={styles.ItemMVTimeStamp}><View style={styles.ItemMVTimeStampView}>
            <TimeAgo style={{
                  fontFamily: 'Roboto-Regular',
                  fontSize: hp(2.1),
                }} time={this.props.item.createdAt}/>
            </View>
            <TouchableOpacity onPress={()=>this.props.Match()}><View style={{ height: hp(3.5),
    width: hp(3.5),
    justifyContent: 'center',
    flexDirection:"row"}}>
    <Image source ={require('../Img/icco1.png')} style={styles.imageStyle} resizeMode={'contain'} />
    </View></TouchableOpacity>
            <View style={styles.ItemMVRatingView}>
            <StarRating
            emptyStar={blanks}
            fullStar={Fulls}
            halfStar={'star-half'}
            iconSet={'MaterialIcons'}
            disabled={false}
            maxStars={5}
            starSize={hp(2.8)}
            rating={5}
            // selectedStar={(rating) => this.props.onStarRatingPress(rating)}
            fullStarColor={'orange'}
            />
            </View>
            </View>
            </LinearGradient>
            </TouchableWithoutFeedback>
        )
    }
}

export default ItemMV