import React, { PureComponent } from 'react'
import { View, Image, Dimensions, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { scale } from './Util'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../Component/responsive-ratio';
import { Rating } from '../Component/ViewManager.js'
import { left, library, icon, play, leftVid } from './IconManager';
import { themeColor, themeWhite, place, edit, user, bag } from '../Constant/index'
import styles from './Style'
const {height, width} = Dimensions.get('window')
import LinearGradient from 'react-native-linear-gradient'

class ItemMV extends PureComponent {
    // title, href, total_time, total_listen, image
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <TouchableWithoutFeedback onPress={() => this.props.push(this.props.item)}>
            <LinearGradient colors={['#fff', '#f3f2f2']} style={styles.ItemMVMainView}><View style={styles.ItemMVSecondView}><View>
            <Text style={styles.ItemMVHeader}>{this.props.item.Header}</Text></View><View style={styles.ItemMVPlayNowView}>
            <Text style={styles.ItemMVPlayNowText}>Play Now</Text><View style={styles.ItemMVPlayIcon}>
            <Image source={require('../Img/JoblistPlayNow.png')} style={{
                height: scale(19),
                width: scale(26),
            }}
            resizeMode={'contain'}/>
            </View></View></View>
            <View style={styles.ItemMVImage}><Image
            source = {{
                uri: this.props.item.image
            }}
            style={styles.imageStyle}
            resizeMode={'contain'}
            /></View>
            <View style={styles.ItemMVDetail}>
            <View><Text style={{
                fontSize: scale(13),
                fontFamily: 'Roboto-Bold',
                fontWeight: "bold"
            }}>{this.props.item.ComPany_Name}</Text></View>
        
            <View style={styles.ItemMVDetailIcon}><View style={styles.CompanyProfileIcon}><Image source ={user} style={styles.imageStyle} resizeMode={'contain'} /></View><Text style={styles.ItemDetailLabel}>{this.props.item.Working}</Text></View>
            <View style={styles.ItemMVDetailIcon}><View style={styles.CompanyProfileIcon}><Image source ={place} style={styles.imageStyle} resizeMode={'contain'} /></View><Text style={styles.ItemDetailLabel}>{this.props.item.Address} / </Text><Text style={styles.ItemMVDetailColor}> 100%</Text></View>
            <View style={styles.ItemMVDetailIcon}><View style={styles.CompanyProfileIcon}><Image source ={edit} style={styles.imageStyle} resizeMode={'contain'} /></View><Text style={{
                marginLeft: scale(5)
            }}>{this.props.item.skill.map((item, index) => {
                return (
                    <Text  key={index} style={{
                        fontFamily: 'Roboto-Regular',
                        fontSize: scale(12)
                    }}>{item} / </Text>
                )
            })}</Text><Text style={styles.ItemMVDetailColor}> 100%</Text></View>
            <View style={styles.ItemMVDetailIcon}>
                
                <View style={styles.CompanyProfileIcon}><Image source ={bag} style={styles.imageStyle} resizeMode={'contain'} /></View>
                
                <Text style={styles.ItemDetailLabel}>{this.props.item.work_Experience} / </Text><Text style={styles.ItemMVDetailColor}> 100%</Text></View>
   
      </View>
            <View style={styles.ItemMVTimeStamp}><View style={styles.ItemMVTimeStampView}><Text style={{
                fontFamily: 'Roboto-Regular',
                fontSize: scale(12)
            }}>1 hr ago</Text></View>
            <View style={styles.ItemMVRatingView}><Rating
            type='custom'
            imageSize={18}
            ratingCount={5}
            defaultRating={20}
            readonly={false}
            ratingBackgroundColor='transparent'
            startingValue={0}
            // ratingColor={"#f1ee40"}
            // tintColor={themeWhite}
            /></View>
            </View>
            </LinearGradient>
            </TouchableWithoutFeedback>
        )
    }
}

export default ItemMV