//input.js
//获取应用实例
const app = getApp()
//util
const util = require('../../utils/util.js');
//api
const api = require('../../utils/api.js');
Page({
  data: {
    loading: false,
    content: ""
  },
  onLoad: function() {},
  save_plan: function() {
    let that = this;
    this.setData({
      loading: true
    })
    api.ajax({
      url: '/plan',
      method: 'POST',
      data: {
        "userid": wx.getStorageSync('user').openid,
        'content': this.data.content
      },
      success: function(e) {
        that.setData({
          loading: false,
          content: ""
        })
        if(e.data.status === 200){
          wx.showToast({
            title: e.data.message,
            icon: 'succes',
            duration: 1000,
            mask: true
          })
        }
        else{
          wx.showToast({
            title: e.data.message,
            image: '/images/error.png',
            duration: 1000,
            mask: true
          })
        }
      }
    });
  },
  adInputChange: function(e) {
    let that = this;
    if (e.detail.value.length < 1) {
      that.setData({
        content: '',
      })
    } else {
      that.setData({
        content: e.detail.value,
      })
    }
  }
});