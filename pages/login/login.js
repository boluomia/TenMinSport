// 获取应用实例
const app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: false,
    // canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
    // 获取缓存的openid
    let openid = wx.getStorageSync('openid')
    let avatarUrl = wx.getStorageSync('avatarUrl')
    let nickName = wx.getStorageSync('nickName')
    if (openid) {
      this.setData({
        hasUserInfo: true,
        userInfo: {
          avatarUrl,
          nickName
        }
      })
    }
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        // console.log(res)
        let userInfo = res.userInfo;
        // console.log(userInfo);
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        let {
          avatarUrl,
          nickName
        } = userInfo;
        // 新版本
        this.loginFn(avatarUrl, nickName)
          .then(content => {
            // console.log('1.0', content)
            let {
              code,
              msg,
              openid
            } = content.result;
            if (code == 200 || code == 1) {
              // 缓存信息
              wx.setStorageSync('openid', openid)
              wx.setStorageSync('avatarUrl', avatarUrl)
              wx.setStorageSync('nickName', nickName)
              // 跳转主页
              wx.switchTab({
                url: '/pages/home/home',
              })
            }

            // 登记用户信息的反馈
            wx.showToast({
              title: msg,
              icon: 'none'
            })


          })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    let userInfo = e.detail.userInfo
    let {
      avatarUrl,
      nickName
    } = userInfo;
    // 旧版本
    this.loginFn(avatarUrl, nickName)
      .then(content => {
        // console.log('1.0', content)
        let {
          code,
          msg,
          openid
        } = content.result;
        if (code == 200 || code == 1) {
          // 缓存信息
          wx.setStorageSync('openid', openid)
          wx.setStorageSync('avatarUrl', avatarUrl)
          wx.setStorageSync('nickName', nickName)
          // 跳转主页
          wx.switchTab({
            url: '/pages/home/home',
          })
        }

        // 登记用户信息的反馈
        wx.showToast({
          title: msg,
          icon: 'none'
        })


      })
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  // 登录
  loginFn(avatarUrl, nickName) {
    // 调用云函数
    return wx.cloud.callFunction({
      name: 'login',
      data: {
        avatarUrl,
        nickName
      }
    })
  },
})