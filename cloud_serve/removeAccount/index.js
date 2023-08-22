// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db = cloud.database({
  env: 'cloud1-3g44uzuq95e1f08a'
})
// 云函数入口函数
exports.main = async (event, context) => {
  return await db.collection('sport_user')
    .where({
      openid: event.keyword
    })
    .remove()
    .then(res=>{
      return res.data
    })
    .catch(err => {
      console.log('云-失败', err)
      return []
    })
}