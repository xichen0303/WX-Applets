Page({
  data: {
    list: []
  },

  onLoad() {
    this.keywords = ''
    this.handleSubmitTap()
  },

  handleSeachInput(e) {
    this.keywords = e.detail.value
  },

  handleSubmitTap() {
    wx.request({
      url: 'https://ik9hkddr.qcloud.la/index.php/trade/get_search_list',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        keyword: this.keywords
      },
      success: (res) => {
        console.log(res)
        this.setData({
          list: res.data.data
        })
      }
    })
  },

  handleItemTap(e) {
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + e.currentTarget.dataset.id,
    })
  }
})