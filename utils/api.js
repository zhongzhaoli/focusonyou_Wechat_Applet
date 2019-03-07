<<<<<<< HEAD
const urls = "http://122.152.249.114/focusonyou/public";
=======
const urls = "https://api.yuntunwj.com/focusonyou/public";
>>>>>>> f78dfd78edaf1b69148018f7ff94e249fe5e8462
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
