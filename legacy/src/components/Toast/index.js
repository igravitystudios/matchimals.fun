import React, { Component } from 'react';
import './index.css';

class Toast extends Component {
  state = {
    active: true,
  };

  componentDidMount() {
    this.timeout = setTimeout(() => {
      this.setState({
        active: false,
      });
    }, this.props.timeout);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  onDismiss = () => {
    clearTimeout(this.timeout);
    this.setState({
      active: false,
    });
  };

  render() {
    return (
      <div className={`toast ${this.state.active ? 'active' : 'inactive'}`}>
        <span className="toast-text">{this.props.children}</span>
        <button className="toast-button" onClick={this.onDismiss}>
          Dismiss
        </button>
      </div>
    );
  }
}

Toast.defaultProps = {
  timeout: 3000,
};

export default Toast;
