var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
var qqmapsdk;
const app = getApp() 
Page({
    data: {
        latitude: 30.752272,
        longitude: 120.762075,
        markers: [
          {
            latitude: 30.741836, longitude: 120.728889, id: 1, iconPath: "../icon/ride_assistance/bus_log3.png", width: 40,
            height: 50, callout: { color: '#050505', fontSize: 15, borderRadius: 8, content: "马上到", padding: 4, bgColor: '#00FF7F', display:'ALWAYS'}
          }, {
            latitude: 30.741836, longitude: 120.728889, id: 2, iconPath: "../icon/ride_assistance/location.png", width: 40,
            height: 50, callout: { color: '#050505', fontSize: 15, borderRadius: 8, content: "上车点", padding: 4, bgColor: '#00FF7F', display: 'ALWAYS' }
          }
          ],
        buslat: 30.752272,
        buslng: 120.762075,
        onBuslat: 30.752272,
        onBuslng: 120.762075,
        viewWidth: 375,
        viewHeight: 667,
    },
    onReady: function (e) {

    },
    onLoad:function(e){
      var that = this;
      that.mapCtx = wx.createMapContext('myMap')
      that.readViewSize()
      qqmapsdk = new QQMapWX({
        key: 'VOQBZ-NCWKX-YGO4J-T6QIX-Z6LCV-WMFUD'
      });

      that.getUserLoction();
      
    },
    getUserLoction: function (e) {
      var that = this
      wx.getLocation({
        type: 'wgs84',
        success: res => {
          var lat = res.latitude
          var lng = res.longitude
          that.setData({
            latitude: lat,
            longitude: lng,
          });
          //??????
          that.getBusLocation();
          that.getOnBusLocation();
          that.calcuDistance(that.data.buslat, that.data.buslng, that.data.onBuslat, that.data.onBuslng, 0);
          that.calcuDistance(lat, lng, that.data.onBuslat, that.data.onBuslng, 1)
          that.includePointsHandle();
        },
        fail: res => { console.log(res) }
      })
    },
    //公交坐标先根据用户坐标写死
    getBusLocation:function(e){
      var lat = this.data.latitude
      var lng = this.data.longitude
      var buslat = (lat - 0.011).toFixed(6)
      var buslng = (lng - 0.011).toFixed(6)
      this.data.markers[0].latitude = buslat
      this.data.markers[0].longitude = buslng
      this.setData({
        buslat: buslat,
        buslng: buslng,
        markers: this.data.markers
      })
    }, 
    getOnBusLocation: function (e) {
      var lat = this.data.latitude
      var lng = this.data.longitude
      var onBuslat = (lat - 0.001).toFixed(6)
      var onBuslng = (lng - 0.001).toFixed(6)
      this.data.markers[1].latitude = onBuslat
      this.data.markers[1].longitude = onBuslng
      this.setData({
        onBuslat: onBuslat,
        onBuslng: onBuslng,
        markers: this.data.markers
      })
    },
    includePointsHandle:function() {
      var that = this
      this.mapCtx.includePoints({
        padding: [50,50,50,50],
        points: [{
          latitude: that.data.buslat,
          longitude: that.data.buslng,
        }, {
          latitude: that.data.latitude,
          longitude: that.data.longitude,
        }, {
          latitude: that.data.onBuslat,
          longitude: that.data.onBuslng,
        }]
      })
    }, 
    calcuDistance: function (fromlat, fromlng, tolat,tolng,id){
      var mode = id==0?"driving":"walking"
      var that = this;
      qqmapsdk.calculateDistance({
        mode: mode,
        from: {
          latitude: fromlat,
          longitude: fromlng
        },
        to: [{
          latitude: tolat,
          longitude: tolng,
        }],
        success: function (res) {
          if (res.status == 0) {
            that.refreshContent(res.result.elements[0], id)
          }
        },
        fail: function (res) {
          console.log(res)
        }
      });
    },
    refreshContent:function(element,id){
      var time = this.getTime(element.duration)
      var result = id == 0 ? "车辆行驶至上车点\n" + "时间:" + time.minute + "分" + time.second + "秒":"您当前距上车点"
      result = result+"\n距离:" + element.distance + "米\n" 
      this.data.markers[id].callout.content = result
      this.setData({
        markers: this.data.markers
      })
    },
    getTime:function(time){
      var second = time%60
      var minute = parseInt(time / 60)
      return { minute: minute, second: second}
    },
    readViewSize: function () {
      var that = this
      //读取系统宽度和高度
      that.setData({
        viewWidth: app.globalData.viewWidth,
        viewHeight: app.globalData.viewHeight
      })
    },
})