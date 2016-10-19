import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ActionCreator from '../../actions'


import NavBar from '../../components/NavBar';
import Common from '../../common/constants';
import Icon from 'react-native-vector-icons/FontAwesome';
import Swiper from '../../components/swiper.dist'
import MapPage from '../Other/MapPage'
import { getDataStr } from '../../common/utils/Date';
import DailyInfo from './DailyInfo';




import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  ListView,
  ActivityIndicator,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  InteractionManager,
  AlertIOS,
} from 'react-native';



class CasinoIntro extends Component {
  constructor(props) {
    super(props);

    this._onPressTodayBtn.bind(this);

  }


  _onPressTodayBtn(casino) {

    const showDate = getDataStr(0);
    const title = '今日赛事';

    this.props.navigator.push({

      component: DailyInfo,
      passProps: {
        casino,
        showDate,
        title

      }
    });
  }

  _onPressLbsBtn(address) {

    this.props.navigator.push({

      component: MapPage,
      passProps: {
        address,
      },
    });
  }

  _renderImages(images) {
    return (
      images.map((image,i) => {
        return (
          <View key={i} style={styles.slide}>
            <Image style={styles.image} source={{uri: image.url}} />
          </View>
        )
      })
    )
  }

  render() {
    const casino = this.props.casino;

    return (
      <View style={styles.container}>
        <NavBar name={casino.casino} navigator={this.props.navigator}/>
        <ScrollView style={styles.scrollContainer}>
          <Swiper  height={imageHeight} horizontal={true} autoplay={false}>
            {this._renderImages(casino.casinoImages)}
          </Swiper>
          <View style={styles.actions}>
            <View style={styles.actionRow}>
              <View>
                <TouchableOpacity onPress={() => this._onPressLbsBtn(casino.address)}>
                  <Image style={styles.actionImage} source={require('../../imgs/casinoIntro_lbs.png')}/>
                </TouchableOpacity>
              </View>
              <Text style={styles.actionText}>
                {casino.address.address}
              </Text>
            </View>
            <View style={styles.actionRow}>
              <Image style={styles.actionImage} source={require('../../imgs/casinoIntro_tel.png')}/>
              <Text style={styles.actionText}>
                {casino.contact_phone}
              </Text>
            </View>
            <View style={styles.actionRow}>
              <Image style={styles.actionImage} source={require('../../imgs/casinoIntro_time.png')}/>
              <Text style={styles.actionText}>
                {casino.open_time.substring(0,5) + '-' + casino.close_time.substring(0,5)}
              </Text>
            </View>
            <View style={styles.actionRow}>
              <Image style={styles.actionImage} source={require('../../imgs/casinoIntro_join.png')}/>
              <TouchableOpacity onPress={() => this._onPressTodayBtn(casino)}>
                <View style={styles.joinBtn}>
                  <Text style={styles.joinBtnText}>加入比赛</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.introArea}>
            <Text style={styles.introText}>{casino.intorduction}</Text>
          </View>
        </ScrollView>
      </View>

    );
  }
}


const listPadding = 20;
const imageWidth = Common.window.width-listPadding * 2;
const imageHeight = 179/328 * (Common.window.width-listPadding * 2 );


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  actions: {
    margin: 10,
    borderWidth: 2,
    borderColor: '#e0eaff',
    borderRadius: 8,
  },
  introArea: {
    margin: 10,
    borderWidth: 2,
    borderColor: '#e0eaff',
    borderRadius: 8,
    padding :14,
  },
  scrollContainer: {
    // paddingTop: 2,
    backgroundColor: '#ffffff',
  },
  wrapper: {
    alignItems: 'center',
  },
  slideArea: {
    height: imageHeight-100,
    width: imageWidth-100,
    marginRight: listPadding,
  },
  actionRow: {
    flexDirection: 'row',
    padding: 5,
    alignItems: 'center',
    flex: 1,
  },
  actionText: {
    fontSize: 15,
    color: '#444444',
  },
  image: {
    height: imageHeight,
    width: Common.window.width,
    resizeMode: Image.resizeMode.cover
  },
  introText: {
    fontSize: 14,
    color: '#444444',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  actionImage: {
    height: 35,
    width: 35,
    marginRight: 10,
  },
  joinBtn: {
    backgroundColor: '#ff7043',
    height: 35,
    width: Common.window.width / 4,
    borderRadius: 8,

    justifyContent: 'center',
    alignItems: 'center',
  },
  joinBtnText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#ffffff',
  }
});

export default CasinoIntro;
