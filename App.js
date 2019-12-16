import React, {Component} from 'react';
import {View, StyleSheet, Text, Alert, Button, Platform} from 'react-native';
import RNBambuserPlayer from 'react-native-bambuser-player';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalViewer: 0,
      isLoading: false,
      isPlaying: false,
      uniqueValue: 1,
    };
  }

  componentDidMount = () => {
    this.myPlayerRef.play();
  };

  refresh = () => {
    if (!this.state.isPlaying) {
      this.setState({uniqueValue: this.state.uniqueValue + 1}, () => {
        this.myPlayerRef.play();
      });
    }
  };

  render() {
    return (
      <View style={{flex: 1}} key={this.state.uniqueValue}>
        <RNBambuserPlayer
          style={{flex: 1}}
          ref={ref => {
            this.myPlayerRef = ref;
          }}
          applicationId={
            Platform.OS === 'ios'
              ? 'BAMBUSER_IOS_APPLICATIONID'
              : 'BAMBUSER_ANDROID_APPLICATIONID'
          }
          requiredBroadcastState={
            RNBambuserPlayer.REQUIRED_BROADCAST_STATE.LIVE
          }
          videoScaleMode={RNBambuserPlayer.VIDEO_SCALE_MODE.ASPECT_FIT}
          resourceUri={'static virtual resource_uri from bambuserdashboard'}
          onCurrentViewerCountUpdate={viewer => {
            this.setState({totalViewer: viewer});
          }}
          onPlaying={() => {
            this.setState({isPlaying: true});
          }}
          onPlaybackError={error => {
            Alert.alert('Error', error.message);
          }}
          onPlaybackComplete={() => {
            this.setState({isPlaying: false});
          }}
          onStopped={() => {
            this.setState({isPlaying: false});
          }}
        />
        <View style={styles.myView}>
          <Text>MY VIEW</Text>
          <Text>Total Viewer : {this.state.totalViewer}</Text>
          <Text>isLive: {JSON.stringify(this.state.isPlaying)}</Text>
          <Button title="refresh" onPress={this.refresh} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  myView: {
    position: 'absolute',
    bottom: 10,
    right: 0,
    left: 0,
    width: '100%',
    backgroundColor: 'gray',
    padding: 5,
    margin: 10,
  },
});

export default App;
