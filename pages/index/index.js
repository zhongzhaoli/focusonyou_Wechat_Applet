//index.js
//获取应用实例
const app = getApp()
//loading工具
const loading = require('../../utils/loading.js');

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    Userauthorization: false,
    loading: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    loading.loading_open(this);
    const that = this;
    //延迟授权
    setTimeout(function(){
      if (app.globalData.userInfo) {
        loading.loading_close(that);
        that.setData({
          userInfo: app.globalData.userInfo,
          hasUserInfo: true,
          
        })
      } else if (that.data.canIUse){
        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        // 所以此处加入 callback 以防止这种情况
        loading.loading_close(that);
        app.userInfoReadyCallback = res => {
          that.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      } else {
        loading.loading_close(that);
      }
    }, 500);
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
