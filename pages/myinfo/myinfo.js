// pages/demo/demo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    picUrl: 'https://636c-cloud1-3g44uzuq95e1f08a-1319632653.tcb.qcloud.la/calimg/pakchoi.png?sign=7baa63d02ce27140f4c15b2d2cf4fa95&t=1691131226',
    photo: null,
    tempFilePath: '',
    fileID: '',
    pathUrl: '',
    userInfo: {},
    avatarUrl:''
  },

  // 选择图片
  chooseImageFn() {
    // console.log('1.0',this);// Page实例对象
    let that = this;
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      camera: 'back',
      success(res) {
        that.setData({
          photo: res.tempFiles[0],
          tempFilePath: res.tempFiles[0].tempFilePath,
          avatarUrl: res.tempFiles[0].tempFilePath
        })
      }
    })
  },
  // 上传图片（上传到微信云服务）
  upLoadCloudFn() {
    let that = this;
    let tempFilePath = this.data.tempFilePath;
    let photo_name = Math.random().toString().slice(3) + ".png";
    wx.showLoading({
      title: '正在保存...',
    })
    wx.cloud.uploadFile({
      cloudPath: photo_name, // 上传至云端的路径
      filePath: tempFilePath, // 小程序临时文件路径
      avatarUrl:photo_name,
      success: res => {
        wx.setStorageSync('avatarUrl',tempFilePath)
        // 返回文件 ID
        wx.showToast({
          title: '上传图片成功。',
        })
        wx.hideLoading()
        console.log(res)
        // let{avatarUrl}=userInfo
        that.setData({
          fileID: res.fileID,
          avatarUrl: res.fileID
        })
      },
      fail: () => {
        console.error('上传失败')
      }
    })
  },
  // 初始化个人中心
  init() {
    let openid = wx.getStorageSync('openid')
    let avatarUrl = wx.getStorageSync('avatarUrl')
    let nickName = wx.getStorageSync('nickName')
    if (openid) {
      this.setData({
        hasUserInfo: true,
        avatarUrl:avatarUrl,
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