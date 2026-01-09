import COS from 'cos-js-sdk-v5'

const cos = new COS({
  SecretId: process.env.VUE_APP_TENCENT_CLOUD_SECRET_ID, // sts服务下发的临时 secretId
  SecretKey: process.env.VUE_APP_TENCENT_CLOUD_SECRET_KEY // sts服务下发的临时secretKey
})

export default cos
