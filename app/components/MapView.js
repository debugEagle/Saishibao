import { requireNativeComponent } from 'react-native';
import React, { Component } from 'react';

var AMap = requireNativeComponent('AMap', null)

class MapView extends React.Component {
  componentWillMount() {
    this.select = true
  }

  render() {
    return <AMap {...this.props}/>;
  }
}

export default MapView;
