const urls = "https://api.yuntunwj.com/focusonyou/public";
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
