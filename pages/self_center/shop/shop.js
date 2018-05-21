var app = getApp();Page({  
  /**
   * 页面的初始数据
   */
  data: {  
    keyword:'',//
 
    id:'',//方便存在本地的locakStorage  
    response:'' //存取返回数据  
  }, 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // app.checkLogin();

    if (options.id != null && options.id !=""){
      this.setData({
        id: options.id
      })
    }   
    //执行初始化
    this.dataRefresh("init");
  },
  

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
	//执行初始化
	this.dataRefresh("init");
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * ---------------------------------------
   */

  /**
* Img处理函数
*/
home_4_click:function(){

},

/**
* input处理函数
*/
keyword_input:function(e){
    this.setData({  
      keyword: e.detail.value
    })  
    console.log(e.detail.value)  
},

/**
* Img处理函数
*/
home_6_click:function(){

},

/**
* text处理函数
*/
home_9_click:function(e){

},

/**
* text处理函数
*/
home_10_click:function(e){

},

/**
* text处理函数
*/
home_11_click:function(e){

},

/**
* text处理函数
*/
home_13_click:function(e){

},

/**
* Img处理函数
*/
home_14_click:function(){

},

/**
* Img处理函数
*/
home_15_click:function(){

},

/**
* Img处理函数
*/
home_19_click:function(){

},

/**
* text处理函数
*/
home_21_click:function(e){

},

/**
* text处理函数
*/
home_22_click:function(e){

},

/**
* text处理函数
*/
home_24_click:function(e){

},

/**
* Img处理函数
*/
home_25_click:function(){

},

/**
* Img处理函数
*/
home_27_click:function(){

},

/**
* text处理函数
*/
home_29_click:function(e){

},

/**
* text处理函数
*/
home_30_click:function(e){

},

/**
* text处理函数
*/
home_32_click:function(e){

},

/**
* Img处理函数
*/
home_33_click:function(){

},

/**
* Img处理函数
*/
home_36_click:function(){

},

/**
* text处理函数
*/
home_38_click:function(e){

},

/**
* text处理函数
*/
home_39_click:function(e){

},

/**
* text处理函数
*/
home_41_click:function(e){

},

/**
* Img处理函数
*/
home_42_click:function(){

},

/**
* Img处理函数
*/
home_44_click:function(){

},

/**
* text处理函数
*/
home_46_click:function(e){

},

/**
* text处理函数
*/
home_47_click:function(e){

},

/**
* text处理函数
*/
home_49_click:function(e){

},

/**
* Img处理函数
*/
home_50_click:function(){

},

/**
* Img处理函数
*/
home_53_click:function(){

},

/**
* text处理函数
*/
home_55_click:function(e){

},

/**
* text处理函数
*/
home_56_click:function(e){

},

/**
* text处理函数
*/
home_58_click:function(e){

},

/**
* Img处理函数
*/
home_59_click:function(){

},

/**
* Img处理函数
*/
home_61_click:function(){

},

/**
* text处理函数
*/
home_63_click:function(e){

},

/**
* text处理函数
*/
home_64_click:function(e){

},

/**
* text处理函数
*/
home_66_click:function(e){

},

/**
* Img处理函数
*/
home_67_click:function(){

},

/**
* Img处理函数
*/
home_79_click:function(){

},

/**
* text处理函数
*/
home_81_click:function(e){

},

/**
* text处理函数
*/
home_82_click:function(e){

},

/**
* text处理函数
*/
home_84_click:function(e){

},

/**
* Img处理函数
*/
home_85_click:function(){

},

/**
* Img处理函数
*/
home_87_click:function(){

},

/**
* text处理函数
*/
home_89_click:function(e){

},

/**
* text处理函数
*/
home_90_click:function(e){

},

/**
* text处理函数
*/
home_92_click:function(e){

},

/**
* Img处理函数
*/
home_93_click:function(){

},


 
  /**
   * ---------------------------------------
   */

  //刷新数据
  dataRefresh:function(_action) {
    //提交到服务器
    
  },

   /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})  

