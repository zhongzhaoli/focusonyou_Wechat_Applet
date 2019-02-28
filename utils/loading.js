const loading_open = that => {
    that.setData({
      loading: true
    })
  }
const loading_close = that => {
    that.setData({
      loading: false
    })
}

module.exports = {
  loading_open: loading_open,
  loading_close: loading_close
}