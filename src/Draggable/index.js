import React, { Component } from "react";
import { Animated } from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";

class Draggable extends Component {
  constructor(props) {
    super(props);
    this._translateX = new Animated.Value(0);
    this._translateY = new Animated.Value(0);
    this._lastOffset = { x: 0, y: 0 };
    this._onGestureEvent = Animated.event(
      [
        {
          nativeEvent: {
            translationX: this._translateX,
            translationY: this._translateY,
          },
        },
      ],
      { useNativeDriver: true }
    );
  }
  state = {
    zIndex: 0,
  };
  _onHandlerStateChange = (event) => {
    if (event.nativeEvent.oldState === State.BEGAN) {
      this.setState({
        zIndex: Date.now(),
      });
    }
    if (event.nativeEvent.oldState === State.ACTIVE) {
      this._lastOffset.x += event.nativeEvent.translationX;
      this._lastOffset.y += event.nativeEvent.translationY;
      this._translateX.setOffset(this._lastOffset.x);
      this._translateX.setValue(0);
      this._translateY.setOffset(this._lastOffset.y);
      this._translateY.setValue(0);
    }
  };
  render() {
    return (
      <PanGestureHandler
        {...this.props}
        onGestureEvent={this._onGestureEvent}
        onHandlerStateChange={this._onHandlerStateChange}
      >
        <Animated.View
          style={[
            {
              transform: [
                { translateX: this._translateX },
                { translateY: this._translateY },
              ],
              zIndex: this.state.zIndex,
            },
            this.props.style,
          ]}
        >
          {this.props.children}
        </Animated.View>
      </PanGestureHandler>
    );
  }
}

export default Draggable;
