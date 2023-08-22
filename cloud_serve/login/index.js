// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: 'cloud1-3g44uzuq95e1f08a'
}) // 使用当前云环境
const db = cloud.database({
  env: 'cloud1-3g44uzuq95e1f08a'
})
const User = db.collection('sport_user')
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const openid = wxContext.OPENID;
  let {
    avatarUrl,
    nickName
  } = event;
  // 查询用户是否已存在
  let content = await User.where({
      openid
    })
    .get()
  // 是否记录用户信息
  if (content) {
    let data = content.data;
    if (data.length == 0) {
      // 插入账号数据
      let rows = await User.add({
        data: {
          nickName,
          avatarUrl,
          openid,
          create_time: new Date(),
          sex: '',
          age: '',
          title: '',
          address: '',
          qq: ''
        }
      })
      console.log("2.0", rows);
      if (rows.errMsg == "collection.add:ok") {
        return {
          openid: wxContext.OPENID,
          code: 200,
          msg: '添加账号成功。',
          openid
        }
      } else {
        return {
          code: -1,
          msg: '添加账号失败。',
        }
      }
    } else {
      return {
        code: 1,
        openid,
        msg: '欢迎回来'
      }
    }
  }
}