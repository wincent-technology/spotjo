import React from 'react'
import {
  left
} from '../src/IconManager';
import {
  themeColor,
  themeWhite,
  FontBold
} from '../Constant/index'
import styles from '../src/Style'
import {
  TouchableOpacity,
  Text,
  View,
  Image
} from 'react-native'
import {
  scale
} from '../src/Util';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from '../Component/responsive-ratio';
import PlacesInput from './PlacesInput'

const MapInut = ({
  ...props
}) => (
  <View style={[{zIndex:999},styles.JoblistMainView]}>
            <View style={styles.HeaderLayer}><View style={styles.JoblistLogo}>
    <Image
    source = {require('../Img/search.png')}
    style={styles.JoblistLogoImageSize}
    resizeMode={'contain'}
    /></View>
            <View style={[styles.JoblistMainViewHeading], {
        width: wp(70),
        height:scale(40),
        marginLeft: scale(30),
        justifyContent: "center",
        alignItems: "center"
    }}><PlacesInput
                    googleApiKey={'AIzaSyD44YCFNIXiBB411geZjrcQ2v1_knq71Hg'}
                    placeHolder={"Some Place holder"}
                    language={"en-US"}
                    onSelect={place => {
                        this.props.goToPoint(get(place, 'result.geometry.location.lat'), get(place, 'result.geometry.location.lng'))
                    }}
                    iconResult={<Ionicons name="md-pin" size={25} style={styles.placeIcon}/>}
                />
    </View></View>
            </View>
)

export default MapInut