// 获取全局应用程序实例对象
var app = getApp();

// 创建页面实例对象
Page({
  /**
   * 页面名称
   */
  name: "custommade",
  /**
   * 页面的初始数据
   */

  data: {
    tabs: ["一键约车"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    sliderWidth:90,
    resultHiddenStuts: true,
    initHiddenStatus:false,
    startAddress: "",
    endAddress: "",
    viewWidth: 375,
    viewHeight: 667,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(e) {
    this.readViewSize()
    
    this.setData({
      // sliderLeft: (this.data.viewWidth / this.data.tabs.length - sliderWidth) / 2,
      sliderOffset: this.data.viewWidth / this.data.tabs.length * this.data.activeIndex,
      sliderWidth : this.data.viewWidth / this.data.tabs.length
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    for (var i = 1; i < 3; i++) {
      var key = "search_line_2_1_" + i
      var mark = wx.getStorageSync(key)
      if (i == 1) {
        this.setData({
          startAddress: mark == "" ? "中电科36所" : mark.title
        })
      } else {
        this.setData({
          endAddress: mark == "" ? "嘉兴博物馆" : mark.title
        })
      }
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    wx.stopPullDownRefresh();
  },
  //以下为自定义点击事件
  startinput:function(e){
    var fromId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/custom_made/select_address/select_address?fromId=' + fromId + '&actId=2&tabId=1'
    })
  },
  searchResult:function(e){
    this.setData({
      resultHiddenStuts: false,
      initHiddenStatus: true
    });

  },
  cancelSearch:function(e){
    this.setData({
      resultHiddenStuts: true,
      initHiddenStatus: false
    });

  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
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

