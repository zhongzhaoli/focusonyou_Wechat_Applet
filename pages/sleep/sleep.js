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
      '早睡早起，怡神爽气，贪房贪睡，添病减岁',
      '早睡早起身体好，晚睡晚起心情好',
      '我们之间的距离就是你喜欢晚睡晚起，而我习惯了早睡早起',
      '我会一直喜欢你，直到我每天可以早睡早起',
      '早睡早起身体好，晚婚晚育颜值高'
    ],
    text: '',
    time: '',
  },
  onLoad: function(){
    let sj = parseInt(Math.random() * 4);
    this.setData({
      text: this.data.text_arr[sj],
      time: util.formatTimes(new Date()).hour + " : " + util.formatTimes(new Date()).min
    })
  }
})