// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arr: [
      {
        id: 0,
        type: '腿部',
        url: 'https://636c-cloud1-3g44uzuq95e1f08a-1319632653.tcb.qcloud.la/sport/Legs.jpg?sign=f099af5150cc00e0c55984fd03303ebf&t=1690733999'
      },
      {
        id: 1,
        type: '腹部',
        url: 'https://636c-cloud1-3g44uzuq95e1f08a-1319632653.tcb.qcloud.la/sport/abdomen.png?sign=e8b2b53c105e51bb57dea0466fb66cc6&t=1690734756'
      },
      {
        id: 2,
        type: '全身',
        url: 'https://636c-cloud1-3g44uzuq95e1f08a-1319632653.tcb.qcloud.la/sport/wholebody.png?sign=9c27936c2e297ffeced0da4c5fe6ce09&t=1690734025'
      },
      {
        id: 3,
        type: '普拉提',
        url: 'https://636c-cloud1-3g44uzuq95e1f08a-1319632653.tcb.qcloud.la/sport/Pilates.jpg?sign=1a94554ca53a4a212873af0442267aae&t=1690733844'
      },
      {
        id: 4,
        type: '腿腱',
        url: 'https://636c-cloud1-3g44uzuq95e1f08a-1319632653.tcb.qcloud.la/sport/hamstring.jpg?sign=1d8d8cb4e16db4cdae08589ffc4a52e0&t=1690822075'
      },
      {
        id: 5,
        type: '脂肪燃烧',
        url: 'https://636c-cloud1-3g44uzuq95e1f08a-1319632653.tcb.qcloud.la/sport/fatburn.jpg?sign=fdedd40b4738a0f1203fafb9a0bd9558&t=1690820556'
      },
    ]
  },

  goToExercise(event){
    const itemType = event.currentTarget.dataset.type;
    // console.dir(event.currentTarget);
    // console.log("当前点击的类型是：" + itemType);
    wx.navigateTo({
      url: '/pages/exercise/exercise?type='+itemType,
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