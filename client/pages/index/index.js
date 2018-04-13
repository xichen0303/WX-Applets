const app = getApp()

Page({
  onLoad() {
    this.mapCtx = wx.createMapContext('map', this)
    this.loadData()
  },

  loadData() {
    wx.request({
      url: 'https://ik9hkddr.qcloud.la/index.php/trade/get_list',
      success: this.handleLoadDataSucc.bind(this)
    })
  },

  handleLoadDataSucc(res) {
    this.setData({
      markers: res.data.data.map((item, index) => ({
        iconPath: `/resources/${item.type}.png`,
        id: item.id,
        latitude: item.latitude,
        longitude: item.longitude,
        width: 30,
        height: 30
      }))
    })
  },

  data: {
    longitude: '',
    latitude: '',
    controls: [{
      id: 1,
      iconPath: "/resources/center.png",
      position: {
        left: 10,
        top: app.globalData.getWindowSize().height - 44 - 50,
        width: 32,
        height: 32
      },
      clickable: true
    }, {
      id: 2,
      iconPath: "/resources/pin.png",
      position: {
        left: app.globalData.getWindowSize().width / 2 - 12,
        top: ( app.globalData.getWindowSize().height - 44 ) / 2 - 30,
        width: 22,
        height: 31
      }
    }],
    markers: []
  },

  onShow() {
    wx.getLocation({
      success: this.handleGetLocationSucc.bind(this)
    })
  },

  handleGetLocationSucc(res) {
    this.setData({
      longitude: res.longitude,
      latitude: res.latitude
    })
  },

  handleControlTap() {
    this.mapCtx.moveToLocation()
  },

  handleMarkerTap(e) {
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + e.markerId,
    })
  }
})