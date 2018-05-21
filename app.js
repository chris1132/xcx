
//app.js
App({
  onLaunch: function () {
    // // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
   
   //读取系统宽度和高度 
    this.readViewSize()

    // 获取用户设置信息
    this.getuserInfo()
  },
  userInfoHandle:function(){
    var that = this;
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          that.checkSession()
        } else {
          wx.authorize({
            scope: 'scope.userInfo',
            success: function () {
              that.wxLogin()
              that.getuserInfo()
            }
          })
        }
      }
    })
  },
  checkSession:function(){
    var that = this;
    wx.checkSession({
      success: function () {
        var sessionId = wx.getStorageSync("thirdSessionId")
        wx.request({
          url: "http://www.dzgj.com/springboot/thirdSessionIdCheck?thirdSessionId=" + sessionId,
          method: "POST",
          header: { "Content-Type": "application/json" },
          success: res => {
              //第三方session未过期
              //TODO 
            if (res.data==1) {
              
            } else {
              //验证不通过
              that.wxLogin()
            }
          }
        })
      },
      fail: function () {
        that.wxLogin();
      }
    })
  },
  wxLogin:function(){
    wx.login({
      success: res => {
        wx.request({
          url: 'http://www.dzgj.com/springboot/codeCheck?code=' + res.code,
          method: 'POST',
          header: {
            "Content-Type": "application/json"
          },
          success: res => {
            wx.setStorageSync("thirdSessionId", res.data)
          }
        })
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  getuserInfo:function(){
    var that = this
    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    wx.getUserInfo({
      success: res => {
        // 可以将 res 发送给后台解码出 unionId
        that.globalData.userInfo = res.userInfo

        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        // 所以此处加入 callback 以防止这种情况
        if (that.userInfoReadyCallback) {
          that.userInfoReadyCallback(res)
        }
      }
    })
  },
  readViewSize: function () {
    var that = this
    //读取系统宽度和高度 
    wx.getSystemInfo({
      success: function (res) {
        that.globalData.viewWidth = res.windowWidth
        that.globalData.viewHeight = res.windowHeight
      }
    });
  },
  globalData: {
    userInfo: null,
    viewWidth: 375,
    viewHeight: 667
  }
})