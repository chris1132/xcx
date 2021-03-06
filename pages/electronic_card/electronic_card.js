Page({
  data : {
    value : ['a','b','c','d'],
    height: 20,
    focus: false,
    hiddenmodalput: true,
    restaurants: "美食堂 五芳斋 四方缘"
  },
  openAlert: function () {

    var restaurantsAry = this.data.restaurants.split(" ");
    var index = Math.round(Math.random() * 2);
    var content = '今天吃' + restaurantsAry[index];
    this.showModal(content);
    // var time = this.getTime();
    // var storage = wx.getStorageSync(time); 
    // if (storage){
    //   this.showModal("已经决定了！ "+storage);
    // }else{
    //   var restaurantsAry = this.data.restaurants.split(" ");
    //   console.log(restaurantsAry.length);
    //   var index = Math.round(Math.random() * 2);
    //   var content = '今天吃' + restaurantsAry[index];
    //   this.showModal(content);
    //   wx.setStorageSync(time, content);
    // }
  },
  showModal:function(content){
    wx.showModal({
      content: content,
      showCancel: false,
      success: function (res) {
        if (res.confirm) {
        }
      }
    });
  },
  getTime:function(){
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    //获取当前时间  
    var n = timestamp * 1000;
    var date = new Date(n);
    //年  
    var Y = date.getFullYear();
    //月  
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    //日  
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    var time = Y + M + D;
    return Y + M + D;
  },
  onReady: function (e) {
    // 使用 wx.createMapContext 获取 map 上下文
    this.mapCtx = wx.createMapContext('myMap')
  },
  modalinput: function () {
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput
    })
  },
  //取消按钮  
  cancel: function () {
    this.setData({
      hiddenmodalput: true
    });
  },
  //确认  
  confirm: function () {
    this.setData({
      hiddenmodalput: true
    });
  },
  textInputEvent: function(e){
    this.setData({
      restaurants : e.detail.value
    })
  }  

});