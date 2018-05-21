var QQMapWX = require('../../../libs/qqmap-wx-jssdk.js');
var qqmapsdk;
var suggestFail;
var suggestSuccess;
//获取应用实例
const app = getApp()
Page({
    data: {
        dataAry: [],
        latitude: 30.752272,
        longitude: 120.762075,
        markers: [],
        includePoints:[],
        addressName:"",
        fromId:0,
        actId:0,
        tabId:0,
        viewWidth: 375,
        viewHeight: 667,
        mapHeight:500
    },
    onReady:function(e){
     
    },
    onLoad: function (e){
      var that = this;
      that.mapCtx = wx.createMapContext('myMap')
      that.readViewSize()
      that.setData({
        fromId: e.fromId,
        actId: e.actId,
        tabId: e.tabId
      })
      qqmapsdk = new QQMapWX({
        key: 'VOQBZ-NCWKX-YGO4J-T6QIX-Z6LCV-WMFUD'
      });
      wx.getLocation({
        type:'wgs84',
        success: res=>{
          that.setData({
            latitude: res.latitude,
            longitude: res.longitude
          });
        },
        fail: res=>{console.log(res)}
      })
    },
    //input框输入监听事件
    bindKeyInput: function (e) {
      var that = this;
      if (e.detail.value === '') {
        that.setData({
          dataAry: []
        })
        return;
      }
      qqmapsdk.getSuggestion({
        keyword: e.detail.value,
        region: '嘉兴',
        policy: 1,
        success: res => {
          that.setData({
            dataAry: res.data
          });
        },
        fail: res => { console.log(res)}
      })
    },
    //地址提示栏选择
    selectIndex:function(e){
      var id = e.currentTarget.dataset.id;
      var addressName = this.data.dataAry[id].title;
      var lat = this.data.dataAry[id].location.lat;
      var lng = this.data.dataAry[id].location.lng;
      this.data.markers[0] = { latitude: lat, longitude: lng, id: 0, title: addressName };
      this.data.includePoints[0] = { latitude: lat, longitude: lng };
      this.setData({
        addressName: addressName,
        markers: this.data.markers,
        includePoints: this.data.includePoints,
        dataAry: []
      })
    },
    sureBtn:function(){
      // var addressName = this.data.addressName
      var fromId = this.data.fromId
      var pageName = this.data.actId==1?"commute":"temporary"
      // var lat = this.data.markers[0].latitude;
      // var lng = this.data.markers[0].longitude;
      var key = "search_line_"+this.data.actId + "_" + this.data.tabId + "_" + fromId
      wx.setStorageSync(key, this.data.markers[0])
      wx.navigateBack({
        delta:1
      })
      // wx.redirectTo({
      //   url: '../' + pageName+'/' + pageName+'?fromId=' + fromId+'&addressName=' + addressName + '&lat=' + lat + '&lng=' + lng,
      // })
    },
    readViewSize: function () {
      var that = this
      //读取系统宽度和高度
      that.setData({
        viewWidth: app.globalData.viewWidth,
        viewHeight: app.globalData.viewHeight,
        mapHeight: parseInt(0.9 * app.globalData.viewHeight)
      })  
    },
})