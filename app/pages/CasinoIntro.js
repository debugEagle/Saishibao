import Util from '../common/utils';
import Header from '../components/Header';
import Common from '../common/constants';
import Icon from 'react-native-vector-icons/FontAwesome';
import Swiper from '../components/swiper.dist'
import MapPage from './MapPage'


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


const listPadding = 20;
const imageWidth = Common.window.width-listPadding * 2;
const imageHeight = 179/328 * (Common.window.width-listPadding * 2 );

class CasinoIntro extends Component {
  constructor(props) {
    super(props);
  }

  _onPressLbsBtn() {
    let address = { address: "海淀区西四环八里庄中海商厦四层",
    longitude: 116.2798376,
    latitude: 39.928987 };

    this.props.navigator.push({
      title: '地图',
      component: MapPage,
      passProps: {
        address,
      },
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <Header
          leftIcon='angle-left'
          leftIconAction={()=>this.props.navigator.pop()}
          title='俱乐部介绍'

        />
        <ScrollView style={styles.scrollContainer}>

          <Swiper height={imageHeight} horizontal={true} autoplay={false}>
            {/*<View style={styles.slide} >
              <Image style={styles.image} source={{uri: 'http://c.hiphotos.baidu.com/image/w%3D310/sign=0dff10a81c30e924cfa49a307c096e66/7acb0a46f21fbe096194ceb468600c338644ad43.jpg'}} />
            </View>
            <View style={styles.slide} >
              <Image style={styles.image} source={{uri: 'http://c.hiphotos.baidu.com/image/w%3D310/sign=0dff10a81c30e924cfa49a307c096e66/7acb0a46f21fbe096194ceb468600c338644ad43.jpg'}} />
            </View>*/}
            <View style={styles.slide2}>
              <Text style={styles.text}>Beautiful</Text>
            </View>
            <View style={styles.slide3}>
              <Text style={styles.text}>And simple</Text>
            </View>

          </Swiper>

          <View style={styles.actions}>
            <View style={styles.actionRow}>

                <View>

                <TouchableOpacity onPress={() => this._onPressLbsBtn()}>
                  <Image style={styles.actionImage} source={require('../imgs/casinoIntro_lbs.png')}/>
                </TouchableOpacity>
                </View>


              <Text style={styles.actionText}>东城区新中街聚龙花园8号楼3层</Text>
            </View>
            <View style={styles.actionRow}>
              <Image style={styles.actionImage} source={require('../imgs/casinoIntro_tel.png')}/>
              <Text style={styles.actionText}>010-64030008</Text>
            </View>
            <View style={styles.actionRow}>
              <Image style={styles.actionImage} source={require('../imgs/casinoIntro_time.png')}/>
              <Text style={styles.actionText}>15：00-5：00</Text>
            </View>
            <View style={styles.actionRow}>
              <Image style={styles.actionImage} source={require('../imgs/casinoIntro_join.png')}/>
              <TouchableOpacity >
                <View style={styles.joinBtn}>
                  <Text style={styles.joinBtnText}>加入比赛</Text>
                </View>
              </TouchableOpacity>
            </View>

          </View>

          <View style={styles.introArea}>
            <Text style={styles.introText}>
            2015年3月，在北京东城区最繁华的工体边新开了一家致力于推广绿色竞技，发展国内竞技扑克的专业竞技扑克俱乐部，拒绝以任何形式的赌博行为。只为他的理念，便受到了国内众扑克迷的追捧和关注，来玩过的人呢大都会说：俱乐部不错，设施很齐全，团队非常专业。如果说这是赞美之词，空口无凭，那么俱乐部便会用荣誉去证明自己：凭着丰富的组织经验和一流的赛事管理团队，俱乐部获得了2015红牛中国扑克巡回赛指定选拔场地资格。这就从本质上说明了跑跑的专业性、绿色性、公平性。
此外，俱乐部所有赛事均由红牛集团赞助，选手光临跑跑即可免费参赛日常MTT，购买红牛指定饮品即可获得免费参赛券，选手凭免费参赛券即可参加俱乐部任何赛事。
俱乐部面积多达1000多平米，分为赛事区、休息区、餐饮区、以及VIP贵宾竞技室。还有两张大菠萝专业牌桌。俱乐部所有饮料均免费提供，他们家领导发过话，来跑跑就可以享受一条龙服务。要是感觉不满意直接找他们老板，听起来貌似很爽，去了才能深刻体会到是真的很爽。
            </Text>
          </View>

        </ScrollView>


      </View>

    );
  }
}


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
    paddingTop: 2,
    backgroundColor: '#ffffff',
  },
  wrapper: {
    // height: 300,
    // width:200,
    alignItems: 'center',
  },
  slideArea: {
    height: imageHeight-100,
    width: imageWidth-100,
    marginRight: listPadding,
    // flex: 1,
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
  introText: {
    fontSize: 14,
    color: '#444444',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },


  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },

  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9'
  },
  actionImage: {
    height: 35,
    width: 35,
    marginRight: 10,
  },
  joinBtn: {
    // margin :30,
    backgroundColor: '#ff7043',
    // borderTopLeftRadius: 8,
    // borderBottomRightRadius: 8,
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
