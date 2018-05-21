var moveStep;
const app = getApp()
Page({
  data: {
    animationData1: {},
    animationData2: {},
    viewWidth:375,
    viewHeight:667
  },
  onLoad:function(){
    this.readViewSize();
  },
  onShow: function () {
    var animation = this.createAnimation()
    var animation2 = this.createAnimation()
    moveStep = parseInt(this.data.viewHeight / 2);
    animation.translateY(0 - moveStep).step({ duration: 1000 })
    animation2.translateY(moveStep).step({ duration: 1000 })
    this.setData({
      animationData: animation.export(),
      animationData2: animation2.export()
    })
    // setTimeout(function () {
    //   animation.translate(30).step();
    //   this.setData({
    //     animationData: animation.export()
    //   })
    // }.bind(this), 1000)
  },
  createAnimation:function(){
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: "ease",
    })
    return animation
  },
  readViewSize:function(){
    var that = this
    //读取系统宽度和高度 
    that.setData({
      viewWidth: app.globalData.viewWidth,
      viewHeight: app.globalData.viewHeight,
    })  
  },
  clickimg:function(e){
    var animation = this.createAnimation()
    var animation2 = this.createAnimation()
    animation.translateY( moveStep).step({ duration: 1000 })
    animation2.translateY(0-moveStep).step({ duration: 1000 })
    this.setData({
      animationData: animation.export(),
      animationData2: animation2.export()
    })
    var imageid = parseInt(e.currentTarget.dataset.id);
    var url;
    if(1==imageid){
      url = "commute/commute"
    }else{
      url = "temporary/temporary"
    }
    setTimeout(function(){
      wx.navigateTo({
        url: url,
      })
    },1000)
  }
  // rotateAndScale: function () {
  //   // 旋转同时放大
  //   this.animation.rotate(45).scale(2, 2).step()
  //   this.setData({
  //     animationData: animation.export()
  //   })
  // },
  // rotateThenScale: function () {
  //   // 先旋转后放大
  //   this.animation.rotate(45).step()
  //   this.animation.scale(2, 2).step()
  //   this.setData({
  //     animationData: animation.export()
  //   })
  // },
  // rotateAndScaleThenTranslate: function () {
  //   // 先旋转同时放大，然后平移
  //   // this.animation.rotate(45).scale(2, 2).step()
  //   this.animation.translate(100, 100).step({ duration: 1000 })
  //   this.setData({
  //     animationData: animation.export()
  //   })
  // }
})