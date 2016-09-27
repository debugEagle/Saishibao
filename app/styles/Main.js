import {
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';

let {height, width} = Dimensions.get('window');
let matchListPadding_leftRight = 20;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#F5FCFF',
    // backgroundColor: '#aaaaaa',
    // paddingBottom: 30,
    // marginBottom: 50,


  },
  container_list: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#F5FCFF',
    // backgroundColor: '#aaaaaa',
    // paddingBottom: 30,
    marginBottom: 50,


  },
  matchImage: {
    // flex: 1,
    height:435/838*(width-matchListPadding_leftRight*2),
    width: width-matchListPadding_leftRight*2,
    // width: 355
    // height: height,
    // resizeMode: Image.resizeMode.stretch,
  },
  matchListItem :{
    paddingLeft: matchListPadding_leftRight,
    paddingRight: matchListPadding_leftRight,
    paddingTop: 10,
    paddingBottom: 10,
    // borderColor: 'red',
    // borderWidth: 1,
    width: width ,
    backgroundColor: '#ffffff',
    marginBottom: 10,

  },
  matchTitleRow: {
    backgroundColor: '#3f6cb2',
    flexDirection:'row',
    height:45,


  },
  matchTitleRow_style: {
    // width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection:'row',
    paddingLeft: 5,
    // flex:1 ,
    // borderColor: 'red',
    // borderWidth: 1
    // fontColor: 'white'
  },
  matchTitleRow_name: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    // borderColor: 'white',
    // borderWidth: 1
  },
  matchTitleRow_date: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection:'row',
    paddingRight: 5,
    // flex: 1,
    // borderColor: 'white',
    // borderWidth: 1
  },
  matchTitle_image: {
    width: 30,
    height: 30,
  },
  matchTitleRow_text: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 16,
    fontWeight: 'bold',

  },
  matchIntro: {
    marginTop: 30,
    marginLeft: 20,
    marginRight: 20,
    borderWidth: 1,
    borderColor: '#d2d7d9',
    flex: 1,
    borderRadius: 8,
    backgroundColor: '#ffffff',


  },
  matchIntro_text: {
    color: '#3f6cb2',
    fontSize: 14,
    lineHeight: 20,
    margin: 23,

  },
  matchIntro_btn: {
    margin: 20,
    marginTop: 10,
    marginBottom: 100,
    // borderWidth: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    height: 60,
    // alignItems: 'center',
    // justifyContent: 'center'
    // flex:1,
  },
  matchIntro_title_btn_view: {
    flex: 1,
    paddingTop: 20,
    alignSelf: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'red',
  },
  matchIntro_title_btn: {
    // height: 62,
    backgroundColor: '#3f6cb2',
    // marginBottom: 30,
    // borderWidth: 1,
    textAlign: 'center',
    paddingTop: 20,
    fontSize: 17,
    color: 'rgba(255, 255, 255, 0.8)',
    flex:1

  },
  matchIntro_detail_btn: {

    width: 100,
    // height: 60,
    backgroundColor: '#3f6cb2',
    marginLeft: 3,
    // borderWidth: 1,
    textAlign: 'center',
    paddingTop: 20,
    fontSize: 17,
    color: 'rgba(255, 255, 255, 0.8)',
    flex: 1,

  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

});


export {styles as default}
