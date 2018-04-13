Page({
  data: {
    d: {}
  },

  onLoad(options) {
    this.loadDataById.call(this, options.id)
  },

  loadDataById(id) {
    wx.request({
      url: 'https://ik9hkddr.qcloud.la/index.php/trade/get_item',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        id
      },
      success: (res) => {
        this.setData({
          d: res.data.data
        })
      }
    })
  }
})