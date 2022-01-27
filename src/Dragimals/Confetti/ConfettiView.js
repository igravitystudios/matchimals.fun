import React, { Component } from "react";
import { StyleSheet, View } from "react-native";

import Confetti from "./Confetti";

class ConfettiView extends Component {
  constructor(props) {
    super(props);
    this.state = { confettis: [] };
    this.confettiIndex = 0;
    this.shouldStop = false;
  }

  componentDidMount() {
    if (this.props.startOnLoad) {
      this.startConfetti();
    }
  }

  startConfetti() {
    let { confettis } = this.state;
    let { confettiCount, timeout, untilStopped } = this.props;
    this.shouldStop = false;
    if (untilStopped || this.confettiIndex < confettiCount) {
      setTimeout(() => {
        if (this.shouldStop) {
          return;
        } else {
          confettis.push({ key: this.confettiIndex });
          this.confettiIndex++;
          this.setState({ confettis });
          this.startConfetti();
        }
      }, timeout);
    }
  }

  removeConfetti(key) {
    let { confettis } = this.state;
    let { confettiCount } = this.props;
    let index = confettis.findIndex((confetti) => {
      return confetti.key === key;
    });
    confettis.splice(index, 1);
    this.setState({ confettis });
    if (key === confettiCount - 1) {
      this.confettiIndex = 0;
    }
  }

  stopConfetti() {
    this.shouldStop = true;
  }

  render() {
    let { confettis } = this.state;
    let { ...rest } = this.props;
    return (
      <View style={styles.container}>
        {confettis.map((confetti) => {
          return (
            <Confetti
              key={confetti.key}
              index={confetti.key}
              onComplete={this.removeConfetti.bind(this, confetti.key)}
              colors={this.props.colors}
              {...rest}
            />
          );
        })}
      </View>
    );
  }
}

ConfettiView.defaultProps = {
  confettiCount: 120,
  timeout: 30,
  untilStopped: false,
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
});

export default ConfettiView;
