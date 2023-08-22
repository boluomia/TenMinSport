// pages/bodyCal/bodyCal.js
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
import Toast from '@vant/weapp/toast/toast';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    currentType: '',
    ageValue: '',
    heightValue: '',
    weightValue: '',
    hipValue: '',
    wristValue: '',
    distanceValue: '',
    isnull: 0,
    result: '',
    option1: [
      { text: '男性', value: 1 },
      { text: '女性', value: 0 },
    ],
    option2: [
      { text: '步行', value: 1 },
      { text: '跑步', value: 0 },
    ],
    value1: 1,//性别
    value2: 1,//运动方式
    typeFormula: [
      {
        id: 0,
        type: '基础代谢率',
        formula: function (weight, height, age, S) {
          return (10 * weight + 6.25 * height - 5 * age + S).toFixed(2);
        },
      },
      {
        id: 1,
        type: '卡路里摄入',
        formula: function (weight, height, age, value) {
          if (value == 1) {
            return (13.734 * weight + 5 * height - 6.8 * age + 66).toFixed(2);
          }
          else {
            return (9.59 * weight + 1.85 * height - 4.7 * age + 655).toFixed(2);
          }
        },
      },
      {
        id: 2,
        type: '身体脂肪',
        formula: function (value1, age, BMI) {
          return ((1.20 * BMI) + (0.23 * age) - 10.8 * value1 - 5.4).toFixed(2);
        },
      },
      {
        id: 3,
        type: '身体肥胖指数',
        formula: function (height, hip) {
          return ((hip / Math.pow((height / 100), 1.5)) - 18).toFixed(2);
        },
      },
      {
        id: 4,
        type: '身体骨架大小',
        formula: function (height, wrist, value) {
          let FSI = (wrist / height) * 100;
          if (FSI > 11) {
            return '大骨架';
          }
          else if (FSI >= 10) {
            return '中等骨架';
          }
          else {
            return '小骨架';
          }
        },
      },
      {
        id: 5,
        type: '身体质量指数',
        formula: function (height, weight) {
          return (weight / Math.pow((height / 100), 2)).toFixed(2);
        },
      },
      {
        id: 6,
        type: '燃烧卡路里',
        formula: function (value, weight, distance) {
          if (value == 1) {
            return (weight * distance * 0.75).toFixed(2);
          }
          else {
            return (weight * distance * 1.036).toFixed(2);
          }

        },
      },
      {
        id: 7,
        type: '每日水摄入量',
        formula: function (weight) {
          return Math.floor(41.675 * weight);
        },
      },
    ],
  },
  onAgeChange(e) {
    this.setData({
      ageValue: e.detail,
    });
  },

  onHeightChange(e) {
    this.setData({
      heightValue: e.detail,
    });
  },

  onWeightChange(e) {
    this.setData({
      weightValue: e.detail,
    });
  },
  onHipChange(e) {
    this.setData({
      hipValue: e.detail,
    });
  },
  onWristChange(e) {
    this.setData({
      wristValue: e.detail,
    });
  },
  onDistanceChange(e) {
    this.setData({
      distanceValue: e.detail,
    });
  },
  onGenderChange(e) {
    const value = e.detail;
    this.setData({
      value1: value,
    });
    // console.log(this.data.value1);
  },
  onSportChange(e) {
    const value = e.detail;
    this.setData({
      value2: value,
    });
    // console.log(this.data.value2);
  },

  getResult() {
    // const currentType = this.data.currentType;
    // const value = this.data.value1;
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(() => {
      const typeFormula = this.data.typeFormula;
      const S = this.data.value1 === 1  ? 5 : -161;
      const BMI = this.data.weightValue / ((this.data.heightValue / 100) * (this.data.heightValue / 100));
      let result = null;
      if (this.data.currentType === '基础代谢率' || this.data.currentType === '卡路里摄入' || this.data.currentType === '身体脂肪') {
        if (this.data.weightValue.length != 0 && this.data.heightValue.length != 0 && this.data.ageValue.length != 0) {
          typeFormula.forEach((item) => {
            // console.log(this.data.currentType);
            if (this.data.currentType === '基础代谢率' && item.type === '基础代谢率') {
              // console.log(this.data.weightValue);
              result = item.formula(this.data.weightValue, this.data.heightValue, this.data.ageValue, S);
              // console.log('111111',result);
              // console.log('2222222',13.734 * this.data.weightValue + 5 * this.data.heightValue - 6.8 * this.data.ageValue + 66);
              wx.showLoading({
                title: '正在计算',
              });
              this.setData({
                result: result
              });
              wx.hideLoading();
              Dialog.alert({
                title: `您的${this.data.currentType}是：`,
                message: `${this.data.result}卡路里/天`,
              }).then(() => {
                this.setData({
                  value1: 1,
                  weightValue: '',
                  heightValue: '',
                  ageValue: ''
                })
              });
            }
            if (this.data.currentType === '卡路里摄入' && item.type === '卡路里摄入') {
              result = item.formula(this.data.weightValue, this.data.heightValue, this.data.ageValue, this.data.value1);
              // console.log(result);
              wx.showLoading({
                title: '正在计算',
              });
              this.setData({
                result: result
              });
              wx.hideLoading();
              Dialog.alert({
                title: `您每日${this.data.currentType}量是：${this.data.result}`,
                message: `这意味着您的身体会燃烧您每日摄入的卡路里量是：${this.data.result} 的卡路里，如果您一整天没有活动，则是每天消耗的卡路里数`,
              }).then(() => {
                this.setData({
                  value1: 1,
                  weightValue: '',
                  heightValue: '',
                  ageValue: ''
                })
              });
            }
            if (this.data.currentType === '身体脂肪' && item.type === '身体脂肪') {
              console.log(BMI);
              result = item.formula(this.data.value1, this.data.ageValue, BMI);
              console.log(result);
              wx.showLoading({
                title: '正在计算',
              });
              this.setData({
                result: result
              });
              wx.hideLoading();
              Dialog.alert({
                title: `您的体脂是：`,
                message: `${this.data.result}`,
              })
                .then(() => {
                  this.setData({
                    value1: 1,
                    weightValue: '',
                    heightValue: '',
                    ageValue: ''
                  })
                });
            }
            // console.log(this.data.result);
          });
        }
        else {
          this.setData({
            isnull: 1
          })
          Toast.fail('内容不能为空');
        }
      }
      if (this.data.currentType === '身体肥胖指数') {
        if (this.data.heightValue.length != 0 && this.data.hipValue.length != 0) {
          typeFormula.forEach((item) => {
            if (this.data.currentType === '身体肥胖指数' && item.type === '身体肥胖指数') {
              result = item.formula(this.data.heightValue, this.data.hipValue);
              console.log(result);
              wx.showLoading({
                title: '正在计算',
              });
              this.setData({
                result: result
              });
              wx.hideLoading();
              Dialog.alert({
                title: `您的${this.data.currentType}是：`,
                message: `${this.data.result}%`,
              }).then(() => {
                this.setData({
                  heightValue: '',
                  hipValue: ''
                })
              });
            }
          })
        }
        else {
          this.setData({
            isnull: 1
          })
          Toast.fail('内容不能为空');
        }
      }
      if (this.data.currentType === '身体骨架大小') {
        if (this.data.heightValue.length != 0 && this.data.wristValue.length != 0) {
          typeFormula.forEach((item) => {
            if (this.data.currentType === '身体骨架大小' && item.type === '身体骨架大小') {
              result = item.formula(this.data.heightValue, this.data.wristValue, this.data.value1);
              wx.showLoading({
                title: '正在计算',
              });
              this.setData({
                result: result
              });
              wx.hideLoading();
              Dialog.alert({
                title: `您的${this.data.currentType}是：`,
                message: `${this.data.result}`,
              }).then(() => {
                this.setData({
                  heightValue: '',
                  wristValue: ''
                })
              });
            }
          })
        }
        else {
          this.setData({
            isnull: 1
          })
          Toast.fail('内容不能为空');
        }
      }
      if (this.data.currentType === '身体质量指数') {
        if (this.data.heightValue.length != 0 && this.data.weightValue.length != 0) {
          typeFormula.forEach((item) => {
            if (this.data.currentType === '身体质量指数' && item.type === '身体质量指数') {
              result = item.formula(this.data.heightValue, this.data.weightValue);
              wx.showLoading({
                title: '正在计算',
              });
              this.setData({
                result: result
              });
              wx.hideLoading();
              Dialog.alert({
                title: `您的BMI是：`,
                message: `${this.data.result}`,
              }).then(() => {
                this.setData({
                  heightValue: '',
                  weightValue: ''
                })
              });
            }
          })
        }
        else {
          this.setData({
            isnull: 1
          })
          Toast.fail('内容不能为空');
        }
      }
      if (this.data.currentType === '燃烧卡路里') {
        if (this.data.weightValue.length != 0 && this.data.distanceValue.length != 0) {
          typeFormula.forEach((item) => {
            if (this.data.currentType === '燃烧卡路里' && item.type === '燃烧卡路里') {
              result = item.formula(this.data.value2, this.data.weightValue, this.data.distanceValue);
              wx.showLoading({
                title: '正在计算',
              });
              this.setData({
                result: result
              });
              wx.hideLoading();
              Dialog.alert({
                title: `燃烧的卡路里：`,
                message: `${this.data.result}`,
              }).then(() => {
                this.setData({
                  weightValue: '',
                  distanceValue: ''
                })
              });
            }
          })
        }
        else {
          this.setData({
            isnull: 1
          })
          Toast.fail('内容不能为空');
        }
      }
      if (this.data.currentType === '每日水摄入量') {
        if (this.data.weightValue.length != 0) {
          typeFormula.forEach((item) => {
            if (this.data.currentType === '每日水摄入量' && item.type === '每日水摄入量') {
              result = item.formula(this.data.weightValue);
              wx.showLoading({
                title: '正在计算',
              });
              this.setData({
                result: result
              });
              wx.hideLoading();
              Dialog.alert({
                title: `你的每日饮水量是：`,
                message: `${this.data.result}ml`,
              }).then(() => {
                this.setData({
                  weightValue: ''
                })
              });
            }
          })
        }
        else {
          this.setData({
            isnull: 1
          })
          Toast.fail('内容不能为空');
        }
      }
      return result;
    }, 500);

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      currentType: options.type,
    });
    wx.setNavigationBarTitle({
      title: this.data.currentType,
    });
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