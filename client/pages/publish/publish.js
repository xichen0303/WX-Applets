Page({
  data: {
    address: '点击选择，要勾选哦~',
    success: false
  },

  staticData: {
    type: 'buy'
  },

  onLoad: function (options) {

  },

  handleAddressTap() {
    wx.chooseLocation({
      success: (res) => {
        this.setData({
          address: res.address
        })
        this.staticData.latitude = res.latitude
        this.staticData.longitude = res.longitude
      }
    })
  },

  handleTypeChange(e) {
    this.staticData.type = e.detail.value
  },

  handleMessageInput(e) {
    this.staticData.message = e.detail.value
  },

  handleContactInput(e) {
    this.staticData.contact = e.detail.value
  },

  showValidToast(msg) {
    wx.showToast({
      title: msg,
      icon: 'loading',
      duration: 2000
    })
  },

  handleSubmit() {
    if (this.data.address == '点击选择，要勾选哦~') {
      this.showValidToast('请选择地址')
      return;
    }

    if(!this.staticData.message) {
      this.showValidToast('请输入说明')
      return;
    }

    if (!this.staticData.contact) {
      this.showValidToast('请输入联系方式')
      return;
    }

    const data = Object.assign({}, {address: this.data.address, ...this.staticData})
    wx.request({
      url: 'https://ik9hkddr.qcloud.la/index.php/trade/add_item',
      data,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: (res) => {
        if (res.data.ret) {
          this.setData({
            success: true
          })
        }
      }
    })
  },

  handleBackTap() {
    wx.reLaunch({
      url: '/pages/index/index'
    })
  }
})