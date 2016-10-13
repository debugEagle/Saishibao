import Icon from 'react-native-vector-icons/FontAwesome';
import Common from '../common/constants';
import React, { Component } from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';


class RightButton extends Component {
  render() {
    return (
      <TouchableOpacity
        style={styles.button}
        onPress={this.props.onPress}>
        { this.props.text ? <Text style={styles.btnText}>{this.props.text}</Text> : null }
        { this.props.icon ? <Image source={this.props.icon} style={styles.rightButton} /> : null }
      </TouchableOpacity>
    );
  }
}

class NavBar extends Component {
  _leftButton() {
    if (this.props.navigator.getCurrentRoutes().length > 1)
    {
      return (
        <TouchableOpacity
          style={styles.button}
          onPress={()=> this.props.navigator.pop() }>
          <Icon color="white" size={30} name={'angle-left'} style={styles.leftButton}/>
        </TouchableOpacity>
      )
    }
  }

  _rightButton() {
    if (this.props.rightButton) return (
      <RightButton {...this.props.rightButton} />
    )
  }

  render() {
    return (
      <View style={styles.nav}>
        <View style={[styles.button]}>
          {this._leftButton()}
        </View>
        <View style={[styles.title]}>
          <Text style={styles.titleText}>{ this.props.name }</Text>
        </View>
        <View style={[styles.button]}>
          {this._rightButton()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  leftButton: {
    marginLeft: 5,
  },
  rightButton: {
    marginRight: 5,
  },
  button: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nav: {
    backgroundColor: Common.colors.themeColor,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 99
  },
  title: {
    flex: 1,
    height: 44,
    justifyContent: 'center',
  },
  btnText: {
    fontSize: 16,
    marginRight: 10,
    color: '#ffffff',
  },
  titleText: {
    fontSize: 20,
    textAlign: 'center',
    color: '#ffffff',
  }
});


export default NavBar
