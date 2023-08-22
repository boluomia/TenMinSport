const db = wx.cloud.database({
  env: 'cloud1-3g44uzuq95e1f08a'
});
const User = db.collection('sport_user');
// console.log(User);
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
  },
  // 初始化个人中心
  init() {
    let openid = wx.getStorageSync('openid')
    let avatarUrl = wx.getStorageSync('avatarUrl')
    let nickName = wx.getStorageSync('nickName')
    if (openid) {
      this.setData({
        hasUserInfo: true,
        userInfo: {
          avatarUrl,
          nickName,
          openid
        }
      })
    }
    else {
      // 该设备还没有缓存用户信息
      wx.redirectTo({
        url: '/pages/login/login',
      })
    }
  },
  // 注销(无效)
  removeFn() {
    let that = this;
    wx.showModal({
      title: '提示',
      content: '确定注销吗？',
      success(res) {
        if (res.confirm) {
          console.log(that.data.userInfo.openid);
          
          User.where({ openid: that.data.userInfo.openid }).remove()
            .then(res => {
              console.log(1);
              wx.hideLoading();
              console.log('删除成功', res);
              wx.navigateTo({
                url: '/pages/login/login',
              });
            })
            .then(() => {
              console.log(2);
              try {
                wx.removeStorageSync('openid');
                wx.removeStorageSync('avatarUrl');
                wx.removeStorageSync('nickName');
              } catch (e) {
                // Do something when catch error
              }
            }

            )
            .catch(err => {
              console.error('删除失败', err);
            });

        }
        else if (res.cancel) {
          return
        }
      }
    });
  },
  // 注销(有效)
  delete() {
    let that = this;
    wx.showModal({
      title: '提示',
      content: '确定注销吗？',
      success(res) {
        if (res.confirm) {
          let p = wx.cloud.callFunction({ name: 'removeAccount', data: { keyword: `${that.data.userInfo.openid}` } });
          console.log('1.0', p);
          wx.showLoading({
            title: '正在注销',
          })
          p.then(res => {
            wx.hideLoading()
            try {
              wx.removeStorageSync('openid');
              wx.removeStorageSync('avatarUrl');
              wx.removeStorageSync('nickName');
              wx.redirectTo({
                url: '/pages/login/login',
              })
            } catch (e) {
              // Do something when catch error
            }
          })
            .catch(err => {
              console.error("失败", err);
            })


        }
        else if (res.cancel) {
          return
        }
      }
    });


  },
  // 退出登录
  exitClick() {
    wx.showModal({
      title: '提示',
      content: '确定退出登录吗？',
      success(res) {
        if (res.confirm) {
          wx.showLoading({
            title: '正在退出',
          })
          try {
            wx.removeStorageSync('openid');
            wx.removeStorageSync('avatarUrl');
            wx.removeStorageSync('nickName');
            wx.hideLoading()
            wx.redirectTo({
              url: '/pages/login/login',
            })
          } catch (e) {
            // Do something when catch error
          }
        }
        else if (res.cancel) {
          return
        }
      }
    });
  },
  //注意事项
  goToTip() {
    wx.navigateTo({
      url: '/pages/tip/tip',
    })
  },
  goToInfo(){
    wx.navigateTo({
      url: '/pages/myinfo/myinfo',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.init();
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
    // 初始化
    this.init();

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