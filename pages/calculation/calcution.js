// pages/calculation/calcution.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    arr: [
      {
        id: 0,
        text: '基础代谢率',
        introduction: '计算人体基础代谢',
        src:'../../assets/basal-metabolic-rate.png'
      },
      {
        id: 1,
        text: '卡路里摄入',
        introduction: '计算卡路里摄入',
        src:'../../assets/kaluli-in.png'
      },
      {
        id: 2,
        text: '身体脂肪',
        introduction: '计算身体脂肪含量',
        src:'../../assets/bodyfat.png'
      },
      {
        id: 3,
        text: '身体肥胖指数',
        introduction: '快速了解身体质量',
        src:'../../assets/bodyfatindex.png'
      },
      {
        id: 4,
        text: '身体骨架大小',
        introduction: '计算骨架大小',
        src:'../../assets/bonesize.png'
      },
      {
        id: 5,
        text: '身体质量指数',
        introduction: '质量指数计算',
        src:'../../assets/body-mass.png'
      },
      {
        id: 6,
        text: '燃烧卡路里',
        introduction: '燃烧卡路里计算',
        src:'../../assets/burnfat.png'
      },
      {
        id: 7,
        text: '每日水摄入量',
        introduction: '计算每日喝水数量',
        src:'../../assets/water.png'
      }
    ]
  },
  onChange(e) {
    this.setData({
      value: e.detail,
    });
  },
  onSearch() {
    console.log('搜索' + this.data.value);
    this.setData({
      value:''
    })
  },
  onClick() {
    console.log('搜索' + this.data.value);
    this.setData({
      value:''
    })
  },
  handleClick(event){
    const itemType = event.currentTarget.dataset.type;
    // console.dir(event.currentTarget);
    // console.log("当前点击的类型是：" + itemType);
    wx.navigateTo({
      url: '/pages/bodyCal/bodyCal?type='+itemType,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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