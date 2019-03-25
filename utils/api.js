// const urls = "https://api.yuntunwj.com/focusonyou/public";
const urls = "http://10.1.53.149:7888";
const ajax = (obj) => {
  wx.request({
    url: urls + obj.url,
    method: obj.method,
    data: obj.data,
    success: function(mes){
      obj.success(mes);
    }
  })
}



module.exports = {
  ajax: ajax
}
