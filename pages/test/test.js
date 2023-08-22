const db = wx.cloud.database({
  env: 'cloud1-3g44uzuq95e1f08a'
});
const Food = db.collection('sport_food');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    food_name: '',
    calorie: '',
    find_name: ''
  },
  // 获取食物名的值
  getInputValue(event) {
    //获取食物名的值
    let foodname = event.detail.value;
    console.log(foodname);
    // 记录输入框的值
    this.setData({
      food_name: foodname
    })
  },
  getkaluliValue(event) {
    //获取食物名的值
    let kaluli = event.detail.value;
    console.log(kaluli);
    // 记录输入框的值
    this.setData({
      calorie: kaluli
    })
  },
  //查找的食物名
  getCheckValue(event) {
    //获取食物名的值
    let findname = event.detail.value;
    console.log(findname);
    // 记录输入框的值
    this.setData({
      find_name: findname
    })
  },
  async addFn() {
    await Food.add({
      data: {
        food_name: this.data.food_name,
        type: '海鲜',
        calorie: this.data.calorie
      }
    })
      .then(
        content => {
          console.log('add:', content)
          // 清空输入框
          this.setData({
            food_name: '',
            calorie: ''
          })
        }
      )
  },
  findFn() {
    let p = wx.cloud.callFunction({ name: 'findFood', data: { keyword: `${this.data.find_name}`} })
    // console.log('1.0',p);
    p.then(res=>{
      console.log('成功',res.result)
    })
    .catch(err=>{
      console.error("失败",err)
    })
  },

  // async checkFn() {
  //   const keyword = this.data.find_name;
  //   const regExp = new RegExp('.*' + keyword + '.*');
  //   await Food.where({
  //     food_name: regExp
  //   })
  //     .get()
  //     .then(
  //       content => {
  //         console.log('check:', content.data)
  //         this.setData({
  //           find_name: ''
  //         })
  //       }
  //     )
  // },
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