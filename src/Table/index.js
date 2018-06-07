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
    this._tableStyles = {};
  }

  componentWillMount() {
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
    this.table = table;
  };

  _activeDrag(e, gestureState) {
    this._updateNativeStyles();
  }

  _updateNativeStyles() {
    this.table && this.table.setNativeProps(this._tableStyles);
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
    this._activeDrag(e, gestureState);
  };

  _handlePanResponderMove = (e, gestureState) => {
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

    this._updateNativeStyles();
  };

  _handlePanResponderEnd = (e, gestureState) => {
    this._activeDrag(e, gestureState);

    this._previousLeft += gestureState.dx;
    this._previousTop += gestureState.dy;

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

    this.table.measure((x, y, width, height, pageX, pageY) => {});

    this._updateNativeStyles();
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
          source={require("./matchimals-native-background.png")}
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
