//index.js
//获取应用实例
const app = getApp()
//util
const util = require('../../utils/util.js');
//api
const api = require('../../utils/api.js');

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    loading: true,
    login_bg: true,
    openid: "",
    plan: [],
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    this.openid = wx.getStorageSync('user');
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
        login_bg: false,
        loading: false
      })
      this.get_habit();
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      this.setData({
        loading: false
      })
      app.userInfoReadyCallback = res => {
        if(res === "error"){
          this.setData({
            loading: false
          })
        }
        else{
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true,
            login_bg: false,
            loading: false
          })
          this.get_habit();
        }
      }
    } else {
      this.setData({
        loading: false
      });      
    }
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
      login_bg: false,
      loading: false,
    })
    this.get_habit();
  },
  get_habit(){
    this.setData({
      loading: true
    })
    let that = this;
    api.ajax({
      url: '/plan/' + wx.getStorageSync('user').openid,
      method: 'GET',
      data: {},
      succ_fun: function(mes){
        that.setData({
          plan: mes.data,
          loading: false,
        });
      }
    })
  }
})
