import React from 'react';
import {View,Image} from 'react-native'
import CustomButton from '../Component/Button';
import {themeWhite,FontBold} from "../Constant";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from '../Component/responsive-ratio';

const AddExpSkillEdu = ({...props}) => <View style={{flexDirection:"row",
justifyContent:"space-between",width:wp(90),padding:10,marginHorizontal:wp(5),height:hp(25),alignItems:"center"}}>
          <View style={{width:wp(40),alignItems:"flex-start",justifyContent:"center",}}>
          <Image
                    source={props.source}
                    style={{
                      height: hp(15),
                      width: wp(25),
                    }}
                    resizeMode={'cover'}
                  />
          </View>
          <View
              style={{
                alignItems: 'center',
                justifyContent:"center",
              }}>
              <CustomButton
                title={props.title}
                onPress={props.onPress}
                containerStyle={{
                  color: 'black',
                }}
                buttonStyle={{
                  backgroundColor: '#333',
                  height:hp(4.5),
                  borderRadius: hp(1),
                  borderWidth: 0,
                }}
                titleStyle={{
                  color: themeWhite,
                  position: 'absolute',
                  fontFamily: FontBold,
                  fontSize: hp(2.3),
                }}
              />
            </View>
          </View>

export default AddExpSkillEdu;