import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ActionCreator from '../../actions'

import Util from '../../common/utils';
import NavBar from '../../components/NavBar';

import Common from '../../common/constants';
import Icon from 'react-native-vector-icons/FontAwesome';
import Loading from '../../components/Loading';
import HotDayInfo from './HotDayInfo';


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




class HotIntro extends Component {

  constructor(props) {
    super(props);

  }

  _onPressHotDayInfo(hotIntro) {
    const {hotMatch} = this.props;
    this.props.navigator.push({
      title: '赛事详情',
      component: HotDayInfo,
      passProps: { hotIntro, hotMatch },
    });
  }

  componentWillMount() {

    const {hotMatch} = this.props;
    this.props.actions.fetchHotIntro(hotMatch.bigMatchSerie_id);
  }

  componentWillUnmount() {

    this.props.actions.resetHotIntro();

  }


  render() {
    const {hotMatch} = this.props;
    const { HotIntro } = this.props;
    let intro = HotIntro.intro;

    return (
      <View style={styles.container}>
        <NavBar name='赛事介绍' navigator={this.props.navigator}/>
        {HotIntro.isLoading ?
          <Loading />:
          <View style={styles.introArea}>
            <ScrollView>
              <Image style={styles.introImage} source={{url:intro.intro_image_url}}/>
              <Text style={styles.contentText}>{intro.intro_content}</Text>
            </ScrollView>

            <TouchableHighlight underlayColor="rgba(34, 26, 38, 0.1)"
              onPress={() => this._onPressHotDayInfo(intro)}>
              <View style={styles.bottomBtn}>
                <Text style={styles.titleText}>{intro.intro_title}</Text>
              <Text style={styles.detailText}>赛事详情</Text>
              <Icon color="white" size={30}  name='angle-right'/>
            </View>
          </TouchableHighlight>
        </View>

        }
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Common.colors.containerBgColor,
  },

  introArea: {
    flex: 1,
    marginTop: 30,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 70,
    borderWidth: 1,
    borderColor: '#d2d7d9',

    borderRadius: 8,

    backgroundColor: '#ffffff',
  },
  contentText: {
    color: '#4072c2',
    fontSize: 14,
    lineHeight: 20,
    margin: 22,


  },
  bottomBtn: {

    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    paddingLeft: 22,
    paddingRight: 22,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    backgroundColor: Common.colors.themeColor,

  },

  titleText: {

    fontSize: 17,
    color: '#ffffff',
    flex:1,

  },
  detailText: {
    flex:1,
    fontSize: 17,
    color: '#ffffff',

  },
  introImage: {
    height: 82,
    width: 232,
    alignSelf: 'center',
    marginTop: 15,
    resizeMode: Image.resizeMode.contain,
  },


});

const mapStateToProps = (state) => ({
  HotIntro: state.Hot.HotIntro,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ActionCreator, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(HotIntro);
