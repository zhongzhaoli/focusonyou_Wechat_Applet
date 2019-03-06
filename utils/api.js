const urls = "http://10.1.53.149:7899/";
const ajax = (obj) => {
  wx.request({
    url: urls + obj.url,
    method: obj.method,
    data: obj.data,
    success: obj.succ_fun,
    fail: obj.err_fun
  })
}



module.exports = {
  ajax: ajax
}
