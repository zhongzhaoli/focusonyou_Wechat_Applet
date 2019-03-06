//app.js
App({
  appid: 'wxf1063209f22f240e',//appid需自己提供，此处的appid我随机编写
  secret: '7b9236efebf086c53a3c47ad5f449d80',//secret需自己提供，此处的secret我随机编写
  onLaunch: function () {
    // 展示本地存储能力
    var that = this;
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        if(res.code){
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + that.appid + '&secret=' + that.secret + '&js_code=' + res.code + '&grant_type=authorization_code',
            method: 'GET',
            success: function(res){
              var obj = {};
              obj.openid = res.data.openid;
              wx.setStorageSync('user', obj);//存储openid
            }
          })
        }
        else{
          console.log("获取用户信息失败");
        }
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
        else{
          if (this.userInfoReadyCallback) {
            this.userInfoReadyCallback("error")
          }
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})