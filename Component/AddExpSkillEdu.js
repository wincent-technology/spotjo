import React from 'react';
import {View,Image} from 'react-native'
import CustomButton from '../Component/Button';
import {SearchFrame,themeWhite,FontBold} from "../Constant";
import {scale} from '../src/Util'
import {widthPercentageToDP as wp} from '../Component/responsive-ratio';

const AddExpSkillEdu = ({...props}) => <View style={{flexDirection:"row",justifyContent:"space-between",width:wp(90),padding:10,marginHorizontal:wp(5),height:150,alignItems:"center"}}>
          <View style={{width:wp(40),alignItems:"center",justifyContent:"center",}}>
          <Image
                    source={props.source}
                    style={{
                      height: scale(100),
                      width: scale(100),
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
                  height:30,
                  borderRadius: scale(2),
                  borderWidth: 0,
                }}
                titleStyle={{
                  color: themeWhite,
                  position: 'absolute',
                  fontFamily: FontBold,
                  fontSize: scale(14),
                }}
              />
            </View>
          </View>

export default AddExpSkillEdu;