import React, { Component } from 'react';
import Toast from 'react-native-root-toast';

class ToastMsg extends Component{
  constructor(props) {
    super(props);

    this.state = {
      visible: false
    };
  }

  componentDidMount() {
    
    setTimeout(() => this.setState({
      visible: true
    }), 100); // show toast after 2s

    setTimeout(() => this.setState({
      visible: false
    }), 2000); // hide toast after 5s
  };
  componentWillReceiveProps() {

    setTimeout(() => this.setState({
      visible: true
    }), 100); // show toast after 2s

    setTimeout(() => this.setState({
      visible: false
    }), 2000); // hide toast after 5s
  };

  render() {

    return (<Toast
      visible={this.state.visible}
      position={50}
      shadow={true}
      animation={true}
      hideOnPress={true}
    >
    {this.props.msg}
    </Toast>);
  }
}

export default ToastMsg;
