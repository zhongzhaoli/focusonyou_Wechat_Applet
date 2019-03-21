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
    content: "",
    encourage: "",
    time_hour: "",
    time_min: "",
    start_time: "",
    end_time: "23:59",
    input_num: 0
  },
  onLoad: function() {
    this.setData({
      start_time: util.formatTimes(new Date()).hour + ":" + util.formatTimes(new Date()).min,
      time: util.formatTimes(new Date()).hour + ":" + util.formatTimes(new Date()).min,
      time_hour: util.formatTimes(new Date()).hour,
      time_min: util.formatTimes(new Date()).min
    })
  },
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
        'content': this.data.content,
        'encourage': this.data.encourage,
        'start_time': this.data.time
      },
      success: function(e) {
        that.setData({
          loading: false,
          content: "",
          encourage: "",
          input_num: 0
        })
        if (e.data.status === 200) {
          wx.showToast({
            title: e.data.message,
            icon: 'succes',
            duration: 1000,
            mask: true
          })
        } else {
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
        input_num: e.detail.value.length
      })
    } else {
      that.setData({
        content: e.detail.value,
        input_num: e.detail.value.length
      })
    }
  },
  adtextareaChange: function(e){
    let that = this;
    if (e.detail.value.length < 1) {
      that.setData({
        encourage: '',
      })
    } else {
      that.setData({
        encourage: e.detail.value,
      })
    }
  },
  bindTimeChange: function(e){
    let time = e.detail.value;
    this.setData({
      time: time,
      time_hour: time.split(":")[0],
      time_min: time.split(":")[1]
    })
  }
});