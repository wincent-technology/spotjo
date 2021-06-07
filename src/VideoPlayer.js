/*Example of React Native Video*/
import React, {Component} from 'react';
//Import React
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
//Import Basic React Native Component
import Video from 'react-native-video';
//Import React Native Video to play video
import MediaControls, {PLAYER_STATES} from 'react-native-media-controls';
//Media Controls to control Play/Pause/Seek and full screen
import {themeColor} from '../Constant/index';
import {scale} from './Util';
import Icon2 from 'react-native-vector-icons/dist/MaterialIcons';

class VideoPlayer extends Component {
  videoPlayer;

  constructor(props) {
    super(props);
    this.state = {
      currentTime: 0,
      duration: 0,
      isFullScreen: false,
      isLoading: true,
      paused: false,
      playerState: PLAYER_STATES.PLAYING,
      screenType: 'contain',
      data: '',
    };
  }

  onSeek = (seek) => {
    //Handler for change in seekbar
    this.videoPlayer.seek(seek);
  };

  componentDidMount() {
    const {params} = this.props.navigation.state;
    const vid = params ? params.vid : null;
    console.log('other', vid);
    this.setState({
      data: vid || '',
    });
  }

  onPaused = (playerState) => {
    //Handler for Video Pause
    this.setState({
      paused: !this.state.paused,
      playerState,
    });
  };

  onReplay = () => {
    //Handler for Replay
    this.setState({
      playerState: PLAYER_STATES.PLAYING,
    });
    this.videoPlayer.seek(0);
  };

  onProgress = (data) => {
    const {isLoading, playerState} = this.state;
    // Video Player will continue progress even if the video already ended
    if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
      this.setState({
        currentTime: data.currentTime,
      });
    }
  };

  onLoad = (data) =>
    this.setState({
      duration: data.duration,
      isLoading: false,
    });

  onLoadStart = (data) =>
    this.setState({
      isLoading: true,
    });

  onEnd = () =>
    this.setState({
      playerState: PLAYER_STATES.ENDED,
    });

  onError = () => alert('Oh! ', error);

  exitFullScreen = () => {
    alert('Exit full screen');
  };

  enterFullScreen = () => {};

  onFullScreen = () => {
    if (this.state.screenType == 'contain')
      this.setState({
        screenType: 'contain',
      });
    else
      this.setState({
        screenType: 'stretch',
      });
  };
  renderToolbar = () => (
    <View>
      <Text> toolbar </Text>
    </View>
  );
  onSeeking = (currentTime) =>
    this.setState({
      currentTime,
    });

  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            zIndex: 1,
            top: scale(15),
            right: scale(15),
            height: scale(25),
            width: scale(25),
            position: 'absolute',
          }}>
          <TouchableWithoutFeedback
            onPress={() => this.props.navigation.goBack()}>
            <View
              style={{
                height: scale(25),
                width: scale(25),
                zIndex: 1,
              }}
              hitSlop={{
                top: 15,
                bottom: 15,
                left: 15,
                right: 15,
              }}>
              <Icon2 name={'clear'} size={scale(20)} color={'#fff'} />
            </View>
          </TouchableWithoutFeedback>
        </View>
        <Video
          onEnd={this.onEnd}
          onLoad={this.onLoad}
          onLoadStart={this.onLoadStart}
          onProgress={this.onProgress}
          paused={this.state.paused}
          ref={(videoPlayer) => (this.videoPlayer = videoPlayer)}
          resizeMode={this.state.screenType}
          onFullScreen={this.state.isFullScreen}
          source={{
            uri:
              this.state.data || this.props.navigation.state.params.vid
          }}
          style={styles.mediaPlayer}
          volume={10}
        />
        <MediaControls
          duration={this.state.duration}
          isLoading={this.state.isLoading}
          mainColor={themeColor}
          onFullScreen={this.onFullScreen}
          onPaused={this.onPaused}
          onReplay={this.onReplay}
          onSeek={this.onSeek}
          onSeeking={this.onSeeking}
          playerState={this.state.playerState}
          progress={this.state.currentTime}
          toolbar={this.renderToolbar()}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toolbar: {
    marginTop: 30,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  mediaPlayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'black',
  },
});
export default VideoPlayer;
