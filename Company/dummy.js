<ScrollView
          nestedScrollEnabled
            style={{
              width: wp(75),
              height:
                this.state.citys || suggesion != '' ? hp(20): scale(50),
              borderRadius: scale(5),
              backgroundColor: 'transparent',
              marginTop: hp(2),
              zIndex: 1,
            }}>
            <CustomInput
              placeholder={'City'}
              textChange={(text) => {
                this.setState({
                  citys: text != '' ? true : false,
                });
                this.cheks(text);
              }}
              value={this.state.name}
              inputContainerStyle={{
                height: hp(5),
                borderColor: '#eee',
                borderBottomWidth: scale(1),
                marginLeft:-10,
                borderRadius: scale(5),
              }}
              inputStyle={{
                color: '#333',
                fontSize: hp(2.7),
                fontFamily: 'Roboto-Bold',
                fontWeight: 'bold',
              }}
              containerStyle={{
                width: wp(75),
              }}
              placeholderTextColor={'#333'}
            />
            <View
              style={{
                alignItems: 'flex-start',
                flexDirection: 'row',
                flexWrap: 'wrap',
                marginTop: scale(-15),
                width: wp(75),
                height: suggesion != [] && scale(150),
              }}>
              <ScrollView
                contentContainerStyle={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                }}>
                {(!this.state.citys && suggesion) &&
                  suggesion.map((elements, index) => (
                    <SuggestionView onPress={() => this.suggestionTag(elements, index)} 
                    elements={elements} index={index} 
                    textColor={'#fff'}
                                backGroundC={themeColor}
                    />
                  ))}
              </ScrollView>
            </View>
            {this.state.citys && (
              <View
                style={{
                  width: wp(70),
                  borderRadius: scale(5),
                  height: this.state.city.length != 1 ? hp(12) : hp(6),
                  backgroundColor: '#fff',
                  position: 'absolute',
                  marginLeft: scale(10),
                  top: scale(55),
                  alignItems: 'center',
                }}>
                <ListOfChoosed style={{
                    marginTop: scale(2),
                  }} data={this.state.city}
                  nestedScrollEnabled
                  contentContainerStyle={{
                      flexGrow: 1,
                      justifyContent: 'flex-start',
                      paddingLeft: 30,
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                    }}
                  renderItem={({item, index}) => this.renderItem(item, index)} />
              </View>
            )}
          </ScrollView>