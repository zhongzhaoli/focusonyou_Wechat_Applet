const urls = "http://122.152.249.114/focusonyou/public";
const ajax = (obj) => {
  wx.request({
    url: urls + obj.url,
    method: obj.method,
    data: obj.data,
    success: function(mes){
      obj.succ_fun(mes);
    },
  })
}



module.exports = {
  ajax: ajax
}
