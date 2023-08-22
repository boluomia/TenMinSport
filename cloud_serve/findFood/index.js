// 云函数入口文件
const cloud = require('wx-server-sdk')
// cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
cloud.init({ env: 'cloud1-3g44uzuq95e1f08a' })
// const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()
  // const wxContext = cloud.getWXContext();
  return await db.collection('sport_food')
    .where(
      {
        food_name: db.RegExp({
          regexp: event.keyword
        })
      })
    .get()
    .then(res => {
      return res.data
    })
    .catch(err => {
      console.log('云-失败', err)
      return []
    })
  // return {
  //   event,
  //   openid: wxContext.OPENID,
  //   appid: wxContext.APPID,
  //   unionid: wxContext.UNIONID,
  // }
}