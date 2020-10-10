import React, { Component } from "react";
import {
  Dimensions,
  ImageBackground,
  PanResponder,
  StyleSheet,
  View,
} from "react-native";

import { boardHeight, boardWidth } from "../constants/board";
import Board from "../Board";

class Table extends Component {
  constructor(props) {
    super(props);

    const { height, width } = Dimensions.get("window");
    this._boundaries = {
      top: 0,
      right: -(boardWidth - width),
      bottom: -(boardHeight - height),
      left: 0,
    };
    this._centeredWindow = {
      top: -((boardHeight - height) / 2),
      left: -((boardWidth - width) / 2),
    };

    this._panResponder = {};
    this._previousLeft =
      (props.style && props.style.left) || this._centeredWindow.left || 0;
    this._previousTop =
      (props.style && props.style.top) || this._centeredWindow.top || 0;
    this._previousScale = 1;
    this._tableStyles = {};
  }

  UNSAFE_componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
      onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
      onPanResponderGrant: this._handlePanResponderGrant,
      onPanResponderMove: this._handlePanResponderMove,
      onPanResponderRelease: this._handlePanResponderEnd,
      onPanResponderTerminate: this._handlePanResponderEnd,
    });
    this._tableStyles = {
      style: {
        left: this._previousLeft,
        top: this._previousTop,
        transform: [{ scale: this._previousScale }],
      },
    };
  }

  componentDidMount() {
    this._updateNativeStyles();
  }

  scrollToCenter() {
    this._previousLeft = this._centeredWindow.left || 0;
    this._previousTop = this._centeredWindow.top || 0;

    this._tableStyles.style.left = this._previousLeft;
    this._tableStyles.style.top = this._previousTop;

    this._updateNativeStyles();
  }

  _setTableRef = (table) => {
    this._table = table;
  };

  _activeDrag(e, gestureState) {
    this._updateNativeStyles();
  }

  _updateNativeStyles() {
    this._table && this._table.setNativeProps(this._tableStyles);
  }

  _handleStartShouldSetPanResponder = (e, gestureState) => {
    // Should we become active when the user presses down on the table?
    return true;
  };

  _handleMoveShouldSetPanResponder = (e, gestureState) => {
    // Should we become active when the user touches the table?
    return false;
  };

  _handlePanResponderGrant = (e, gestureState) => {
    if (gestureState.numberActiveTouches === 2) {
      let dx = Math.abs(
        e.nativeEvent.touches[0].pageX - e.nativeEvent.touches[1].pageX
      );
      let dy = Math.abs(
        e.nativeEvent.touches[0].pageY - e.nativeEvent.touches[1].pageY
      );
      let distance = Math.sqrt(dx * dx + dy * dy);
      this.distance = distance;
    }

    this._activeDrag(e, gestureState);
  };

  _handlePanResponderMove = (e, gestureState) => {
    // Zoom
    // if (gestureState.numberActiveTouches === 2) {
    //   // WIP: Requires significant updates to the way we're handling card drop
    //   let dx = Math.abs(
    //     e.nativeEvent.touches[0].pageX - e.nativeEvent.touches[1].pageX
    //   );
    //   let dy = Math.abs(
    //     e.nativeEvent.touches[0].pageY - e.nativeEvent.touches[1].pageY
    //   );
    //   let distance = Math.sqrt(dx * dx + dy * dy);
    //   let scale = (distance / this.distance) * this._previousScale;

    //   // minScale to maxScale
    //   if (scale > 0.5 && scale < 2) {
    //     // this.setState({ scale, lastMovePinch: true });
    //     this._tableStyles.style.transform = [{ scale }];
    //   }
    // }

    // Pan
    if (gestureState.numberActiveTouches === 1) {
      // if (this.state.lastMovePinch) {
      //   gestureState.dx = 0;
      //   gestureState.dy = 0;
      // }
      // let offsetX = this.state.lastX + gestureState.dx / this.state.scale;
      // let offsetY = this.state.lastY + gestureState.dy / this.state.scale;
      // // if ( offsetX < 0  || offsetY <  0 )
      // this.setState({ offsetX, offsetY, lastMovePinch: false });

      this._activeDrag(e, gestureState);

      this._tableStyles.style.left = this._previousLeft + gestureState.dx;
      this._tableStyles.style.top = this._previousTop + gestureState.dy;

      // Block the viewport from panning outside table boundaries
      if (this._tableStyles.style.left > this._boundaries.left) {
        this._tableStyles.style.left = this._boundaries.left;
      } else if (this._tableStyles.style.left < this._boundaries.right) {
        this._tableStyles.style.left = this._boundaries.right;
      }
      if (this._tableStyles.style.top > this._boundaries.top) {
        this._tableStyles.style.top = this._boundaries.top;
      } else if (this._tableStyles.style.top < this._boundaries.bottom) {
        this._tableStyles.style.top = this._boundaries.bottom;
      }
    }

    this._updateNativeStyles();
  };

  _handlePanResponderEnd = (e, gestureState) => {
    this._activeDrag(e, gestureState);

    this._previousLeft += gestureState.dx;
    this._previousTop += gestureState.dy;
    this._previousScale = this._tableStyles.style.transform[0].scale;

    // Block the viewport from panning outside table boundaries
    if (this._previousLeft > this._boundaries.left) {
      this._previousLeft = this._boundaries.left;
    } else if (this._previousLeft < this._boundaries.right) {
      this._previousLeft = this._boundaries.right;
    }
    if (this._previousTop > this._boundaries.top) {
      this._previousTop = this._boundaries.top;
    } else if (this._previousTop < this._boundaries.bottom) {
      this._previousTop = this._boundaries.bottom;
    }

    this._tableStyles.style.left = this._previousLeft;
    this._tableStyles.style.top = this._previousTop;

    this._updateNativeStyles();

    // For Debugging:
    // this._table.measure((x, y, width, height, pageX, pageY) => {
    //   console.log(x, y, width, height, pageX, pageY);
    // });
  };

  render() {
    const { ...rest } = this.props;

    return (
      <View
        ref={this._setTableRef}
        style={styles.root}
        {...this._panResponder.panHandlers}
      >
        <ImageBackground
          resizeMode="repeat"
          source={require("./wood-background.jpg")}
          style={styles.root}
        >
          <Board {...rest} />
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    width: boardWidth,
    height: boardHeight,
  },
});

export default Table;
