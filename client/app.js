App({
  globalData: {
    getWindowSize() {
      try {
        var res = wx.getSystemInfoSync()
        return {
          width: res.windowWidth,
          height: res.windowHeight
        }
      } catch (e) {
        // Do something when catch error
      }
    }
  }
})