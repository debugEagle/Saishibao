
import Util from '../common/utils';
import Header from '../components/Header';
import { fetchMatchSetting } from '../actions/matchSettingActions';
import Constants from '../common/constants';
import Icon from 'react-native-vector-icons/FontAwesome';
import Loading from '../components/Loading';




import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  ListView,
  ActivityIndicator,
  TouchableHighlight,
  ScrollView,
  StyleSheet,
  InteractionManager,
  AlertIOS,
} from 'react-native';


class MatchResult extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.ScrollView}>
          

        </ScrollView>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    backgroundColor: '#ffffff',
    padding: 3,
  },
});

export default MatchResult;
