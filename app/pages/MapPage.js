
import React, { Component } from 'react';
import MapView from '../components/MapView';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
  Text,
  View,
  Image,
  ListView,
  ActivityIndicator,
  TouchableHighlight,
  TouchableOpacity,
  StyleSheet,
  Navigator,
} from 'react-native';


class MapPage extends Component {
  constructor(props) {
    super(props);
  }

  _onPressBack() {
    this.props.navigator.pop();
  }
  render() {
    let {address, latitude, longitude} = this.props.address;

    return (


      <MapView style={styles.map}

        AMapKey="d66aa045c60deb8ab29e0a6e7a379a26"
        annotation={{
            title: address,
            latitude: latitude,
            longitude: longitude
        }}>
        <TouchableOpacity
          //activeOpacity={0.75}
          style={styles.leftIcon}
          onPress={() => this._onPressBack()}
        >
          <Icon color="black" size={30} name='angle-left'/>
        </TouchableOpacity>
      </MapView>

    );
  }
}


let styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  leftIcon: {
    position: 'absolute',
    top: 10,
    left: 15,
  }
})

export default MapPage;
