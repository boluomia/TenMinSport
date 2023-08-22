// pages/heatSearch/heatSearch.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    result: [],
    // null: 0
    // searchContent:'',
  },

  onChange(e) {
    this.setData({
      value: e.detail,
      // null:0
    });
  },
  onSearch() {
    let p = wx.cloud.callFunction({ name: 'findFood', data: { keyword: `${this.data.value}` } });
    // console.log('1.0',p);
    wx.showLoading({
      title: '正在加载',
    })
    p.then(res => {
      // console.log('成功', res.result);
      wx.hideLoading()
      this.setData({
        result: res.result
      });
      // console.log(this.data.result);
    })
      .catch(err => {
        console.error("失败", err);
      })
  },
  onClick() {
    console.log('搜索' + this.data.value);
    let p = wx.cloud.callFunction({ name: 'findFood', data: { keyword: `${this.data.value}` } });
    // console.log('1.0',p);value
    p.then(res => {
      // console.log('成功', res.result);
      this.setData({
        result: res.result
      })
      // console.log(this.data.result);
    })
      .catch(err => {
        console.error("失败", err);
      })
    // this.setData({
    //   value: ''
    // });
    // wx.navigateTo({
    //   url: '/pages/heatSearch/heatSearch?search=' + this.data.value,
    // });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options.search);
    if (options.search.length !== 0) {
      this.setData({
        value: options.search
      });
      this.onSearch();
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})