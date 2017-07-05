import React from 'react';
import {
  AppRegistry,
  asset,
  Pano,
  Text,
  View,
  Model,
  Animated,
  Box,
  texture,
  AmbientLight,
  Plane,
  Video,
  VideoControl,
  MediaPlayerState,
} from 'react-vr';

const AnimatedBox = Animated.createAnimatedComponent(Box);

export default class WelcomeToVR extends React.Component {
  constructor(props) {

    super(props);

    this.state = {
      rotation: new Animated.Value(0),
      playerState: new MediaPlayerState({ autoPlay: true, muted: false }),
      bounceValue: new Animated.Value(0),
    };

    this._rotateTo = 360;

  }

  componentDidMount() {
    this._rotateOnce();

    this.state.bounceValue.setValue(1.5);     // Start large
    Animated.spring(                          // Base: spring, decay, timing
      this.state.bounceValue,                 // Animate `bounceValue`
      {
        toValue: 0.8,                         // Animate to smaller size
        friction: 1,                          // Bouncier spring
      }
    ).start();                                // Start the animation

  }

  /**
   * Rotate the cube back and forth
   */
  _rotateOnce() {
    this.state.rotation.setValue(0);
    Animated.timing(this.state.rotation, {
      toValue: this._rotateTo,
      duration: 10000,
    }).start(() => this._rotateOnce());
    this._rotateTo = -this._rotateTo;
  }
  render() {
    return (
      <View>
        <AmbientLight intensity={2.6} />

        <Pano source={asset('store1.jpg')} />

        <View
          style={{
            alignItems: 'center',
            layoutOrigin: [0.5, 0.5, 0],
            transform: [{ translate: [0, 0, -4] }],
          }}>
          <Video
            style={{ height: 2.5, width: 5 }}
            source={[
              asset('video.mp4', { format: 'mp4' })
            ]}
            playerState={this.state.playerState}
          />
          <VideoControl style={{ height: 0.2, width: 4 }} playerState={this.state.playerState} />
        </View>

        {/*<View style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          layoutOrigin: [-0.5, 0.5, 0],
          transform: [{ translate: [0, 0, -3] }],
        }}>
          <View style={{ width: 2, height: 2, backgroundColor: 'blue' }}>
            <Animated.Image                         // Base: Image, Text, View
              source={{ uri: 'http://i.imgur.com/XMKOH81.jpg' }}
              style={{
                width: 0.3,
                height: 0.3,
                transform: [                        // `transform` is an ordered array
                  { scale: this.state.bounceValue },  // Map `bounceValue` to `scale`
                  {
                    translate: [-1, 0, 1]
                  }
                ]
              }}
            />
          </View>
          <Text style={{
            backgroundColor: 'green',
            fontSize: 0.3,
            fontWeight: '100',
            paddingLeft: 0.2,
            paddingRight: 0.2,
            textAlign: 'center',
            textAlignVertical: 'center',
          }}>Checkout!</Text>
        </View>*/}

        <View>
          <AnimatedBox
            style={{
              transform: [{ translate: [2, 4, -5] }, { rotateY: this.state.rotation }],
              color: 'black'
            }}
            dimWidth={0.5}
            dimHeight={0.5}
            dimDepth={0.5}
            texture={texture('fps')} // Use our custom texture
          >
          </AnimatedBox>
        </View>

      </View >
    );
  }
};

AppRegistry.registerComponent('WelcomeToVR', () => WelcomeToVR);
