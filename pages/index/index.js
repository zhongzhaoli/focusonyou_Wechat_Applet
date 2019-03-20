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
    date: "",
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function() {
    //获取当前时间
    this.setData({
      date: util.formatTime(new Date())
    })
    //授权
    this.openid = wx.getStorageSync('user');
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
        login_bg: false,
        loading: false
      })
      //获取自己的计划
      this.get_plan();
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        if (res === "error") {
          this.setData({
            loading: false
          })
        } else {
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true,
            login_bg: false,
            loading: false
          })
          this.get_plan();
        }
      }
    } else {
      this.setData({
        loading: false
      });
    }
  },
  onShow: function(){
    this.get_plan();
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
      login_bg: false,
      loading: false,
    })
    this.get_plan();
  },
  get_plan() {
    this.setData({
      loading: true
    })
    let that = this;
    //先获取openid
    if (!wx.getStorageSync("user")) {
      api.ajax({
        url: '/wechat',
        data: {
          'code': wx.getStorageSync("code"),
          'appid': wx.getStorageSync("appid"),
          'secret': wx.getStorageSync("secret")
        },
        method: 'POST',
        success: function(res) {
          var obj = {};
          obj.openid = res.data.openid;
          wx.setStorageSync('user', obj); //存储openid
          api.ajax({
            url: '/plan/' + wx.getStorageSync('user').openid,
            method: 'GET',
            data: {},
            success: function(mes) {
              that.setData({
                plan: mes.data,
                loading: false,
              });
            }
          })
        }
      })
    } else {
      api.ajax({
        url: '/plan/' + wx.getStorageSync('user').openid,
        method: 'GET',
        data: {},
        success: function(mes) {
          that.setData({
            plan: mes.data,
            loading: false,
          });
        }
      })
    }
  },
  redircts: function(e) {
    util.redirct(e.currentTarget.dataset.href);
  }
})