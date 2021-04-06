import React from 'react'
import {FlatList} from 'react-native'
import {
  heightPercentageToDP as hp,
} from '../Component/responsive-ratio';

const ListOfChoosed = ({...props}) => <>
<FlatList
                  nestedScrollEnabled
                  style={props.style}
                  data={props.data}
                  showsHorizontalScrollIndicator={false}
                  removeClippedSubviews={true}
                  renderItem={props.renderItem}
                  initialNumToRender={5}
                  maxToRenderPerBatch={10}
                  updateCellsBatchingPeriod={70}
                  getItemLayout={(data, index) => ({
                    length: hp('1%'),
                    offset: hp('1%') * index,
                    index,
                  })}
                  keyExtractor={(item, index) => index + ''}
                />
  </>

export default ListOfChoosed

