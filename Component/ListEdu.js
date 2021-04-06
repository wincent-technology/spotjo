import React from 'react'
import {FlatList} from 'react-native'
import {
  heightPercentageToDP as hp,
} from '../Component/responsive-ratio';

const ListEdu = ({...props}) => <>
<FlatList
                  nestedScrollEnabled={true}
                  style={props.style}
                  data={props.data}
                  extraData={props.data}
                  showsHorizontalScrollIndicator={false}
                  removeClippedSubviews={true}
                  renderItem={props.renderItem}
                  initialNumToRender={5}
                  maxToRenderPerBatch={10}
                  updateCellsBatchingPeriod={70}
                  getItemLayout={(data, index) => ({
                    length: hp('4%'),
                    offset: hp('4%') * index,
                    index,
                  })}
                  keyExtractor={(item, index) => index + ''}
                />
  </>

export default ListEdu