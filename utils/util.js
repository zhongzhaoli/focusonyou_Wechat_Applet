const formatTime = date => {
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  const week = date.get

  return month + "月" + day + "日"
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
const redirct = n => {
  wx.navigateTo({
    url: "/pages/" + n + "/" + n,
  })
}

module.exports = {
  formatTime: formatTime,
  redirct: redirct
}