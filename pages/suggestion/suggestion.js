var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
var qqmapsdk;
var suggestFail;
var suggestSuccess;
var inputid;
Page({
    data: {
        dataAry: [],
        latitude: 30.752272,
        longitude: 120.762075,
        markers: [],
        includePoints:[],
        startadd:"",
        endadd:""
    },
    onReady: function (e) {
      this.mapCtx = wx.createMapContext('myMap')
    },
    onLoad:function(e){
      var that = this;
      qqmapsdk = new QQMapWX({
        key: 'VOQBZ-NCWKX-YGO4J-T6QIX-Z6LCV-WMFUD'
      });
      suggestFail = function (res) {
        console.log(res)
      };
      //调用suggest接口成功函数
      suggestSuccess = function (res) {
        that.setData({
          dataAry: res.data
        });
      };
      var regeFail = function (res) {
        console.log(res)
      };
      var regeSuccess = function (res) {
        that.setData({
          latitude: res.latitude
        });
        that.setData({
          longitude: res.longitude
        });
      };
      wx.getLocation({
        type:'wgs84',
        success: regeSuccess,
        fail: regeFail
      })

    },
    //input框输入监听事件
    bindKeyInput: function (e) {
      inputid = e.target.dataset.id;
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
        success: suggestSuccess,
        fail: suggestFail
      })
    },
    //地址提示栏选择
    selectIndex:function(e){
      var id = e.currentTarget.dataset.id;
      var inputId = parseInt(inputid);
      var addressName = this.data.dataAry[id].title;
      var lat = this.data.dataAry[id].location.lat;
      var lng = this.data.dataAry[id].location.lng;
      this.data.markers[inputId] = { latitude: lat, longitude: lng, id: inputId, title: addressName };
      this.data.includePoints[inputId] = { latitude: lat, longitude: lng };
      if (0 == inputId){
        this.setData({
          startadd: addressName
        })
      }else{
        this.setData({
          endadd: addressName
        })
      }
      
      this.setData({
        markers: this.data.markers,
        includePoints: this.data.includePoints,
        dataAry: []
      })
      // console.log(this.data.markers[0].address);
    }
})