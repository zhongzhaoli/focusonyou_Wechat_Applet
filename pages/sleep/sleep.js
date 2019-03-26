//index.js
//获取应用实例
const app = getApp()
//util
const util = require('../../utils/util.js');
//api
const api = require('../../utils/api.js');

Page({
  data: {
    text_arr: [
      '早睡早起身体好，晚睡晚起心情好',
      '我们之间的距离就是你喜欢晚睡晚起，而我习惯了早睡早起',
      '我会一直喜欢你，直到我每天可以早睡早起',
    ],
    text: '',
    time: '',
    loading: false,
    btn_type: '',
    btn_text: '打卡',
    sj: {},
  },
  onLoad: function() {
    let sj = parseInt(Math.random() * 3);
    this.get_sj();
    this.setData({
      text: this.data.text_arr[sj],
      time: util.formatTimes(new Date()).hour + " : " + util.formatTimes(new Date()).min
    })
  },
  get_sj: function() {
    let that = this;
    api.ajax({
      url: '/sleep/' + wx.getStorageSync('user').openid,
      method: 'GET',
      data: {},
      success: function(e) {
        var btn_text = "打卡";
        var btn_type = "";
        if(!e.data.need_clock){
          btn_text = "今天已打卡",
          btn_type = "disabled"
        }
        that.setData({
          sj: e.data,
          btn_text: btn_text,
          btn_type: btn_type
        })
      }
    });
  },
  clock_fun: function() {
    let that = this;
    this.setData({
      loading: true
    })
    api.ajax({
      url: '/sleep',
      method: 'POST',
      data: {
        "user_id": wx.getStorageSync('user').openid,
      },
      success: function(e) {
        that.setData({
          loading: false
        })
        if (e.data.status == 200) {
          wx.showToast({
            title: e.data.message,
            icon: 'succes',
            duration: 1000,
            mask: true
          })
          that.setData({
            btn_type: 'disbaled',
            btn_text: '今天已打卡'
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
    })
  }
})