// pages/exercise/exercise.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentType: '',
    result: [],
    typeInfo:[]
  },
  goToDetail(e) {
    const itemType = e.currentTarget.dataset.type;
    // console.dir(e.currentTarget);
    // console.log("当前点击的类型是：" + itemType);
    wx.navigateTo({
      url: '/pages/exerciseDetail/exerciseDetail?type=' + itemType,
    })
  },
  getStep() {
    let p = wx.cloud.callFunction({ name: 'exerciseStep', data: { keyword: `${this.data.currentType}` } });
    // console.log('1.0', p);
    wx.showLoading({
      title: '正在加载',
    })
    p.then(res => {
      wx.hideLoading()
      // console.log(res);
      this.setData({
        result: res.result
      });
      // console.log(this.data.result);
    })
      .catch(err => {
        console.error("失败", err);
      })
  },
  getType(){
    let p = wx.cloud.callFunction({ name: 'exerciseType', data: { keyword: `${this.data.currentType}` } });
    // console.log('1.0', p);
    wx.showLoading({
      title: '正在加载',
    })
    p.then(res => {
      wx.hideLoading()
      this.setData({
        typeInfo: res.result
      });
      // console.log(this.data.typeInfo);
    })
      .catch(err => {
        console.error("失败", err);
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // console.log(options.type);
    this.setData({
      currentType: options.type
    })
    // console.log(this.data.currentType);
    this.getStep();
    this.getType();
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