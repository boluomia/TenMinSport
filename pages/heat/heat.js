// pages/heat/heat.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    arr: [
      {
        id: 0,
        type: '五谷',
        src: '../../assets/rice.png'
      },
      {
        id: 1,
        type: '肉类',
        src: '../../assets/meat.png'
      },
      {
        id: 2,
        type: '蔬菜',
        src: '../../assets/vegetable.png'
      },
      {
        id: 3,
        type: '水果',
        src: '../../assets/fruit.png'
      },
      {
        id: 4,
        type: '海鲜',
        src: '../../assets/fish.png'
      },
      {
        id: 5,
        type: '奶类',
        src: '../../assets/milk.png'
      },
      {
        id: 6,
        type: '菌藻',
        src: '../../assets/bacteria-algae.png'
      },
      {
        id: 7,
        type: '其他',
        src: '../../assets/cake.png'
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
      value: ''
    })
  },
  onClick() {
    console.log('搜索' + this.data.value);
    this.setData({
      value: ''
    })
  },
  goToSearch() {
    wx.navigateTo({
      url: '/pages/heatSearch/heatSearch?search=' + this.data.value,
    })
    this.setData({
      value: ''
    })
  },
  handleClick: function (event) {
    const itemType = event.currentTarget.dataset.type;
    // console.log("当前点击的类型是：" + itemType);
    wx.navigateTo({
      url: '/pages/foodtype/foodtype?type='+itemType,
    })
  },

  // testfoodFn() {
  //   let p = wx.cloud.callFunction({ name: 'food', data: { page: 1, pageSize: 99 } });
  //   p.then(
  //     content => {
  //       console.log('2.0', content.result);
  //     }
  //   )
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // this.testfoodFn();
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