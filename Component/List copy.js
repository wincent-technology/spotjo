import React from 'react'
import {FlatList} from 'react-native'
import {
  heightPercentageToDP as hp,
} from '../Component/responsive-ratio';

const List = ({...props}) => <>
<FlatList
    style={props.style}
    data={props.data}
    showsHorizontalScrollIndicator={false}
    removeClippedSubviews={true}
    renderItem={props.renderItem}
    initialNumToRender={5}
    maxToRenderPerBatch={10}
    updateCellsBatchingPeriod={70}
    getItemLayout={(data, index) => ({
      length: hp('28%'),
      offset: hp('28%') * index,
      index,
    })}
    keyExtractor={(item, index) => index + ''}
  />
  </>

export default List