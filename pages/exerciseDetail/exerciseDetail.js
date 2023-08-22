// pages/exerciseDetail/exerciseDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentStep: '',
    result: [],
    content: []
  },
  getStep() {
    let p = wx.cloud.callFunction({ name: 'detailStep', data: { keyword: `${this.data.currentStep}` } });
    // console.log('1.0', p);
    wx.showLoading({
      title: '正在加载',
    })
    p.then(res => {
      wx.hideLoading()
      this.setData({
        result: res.result
      });
      // console.log(this.data.result);
      let allStep = this.data.result[0].content;
      // console.log(allStep.split(/\\n/));
      let detailStep = allStep.split(/\\n/);
      this.setData({
        content: detailStep
      })
      // console.log(this.data.content);
    })
      .catch(err => {
        console.error("失败", err);
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      currentStep: options.type
    });
    this.getStep();
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