import COS from 'cos-js-sdk-v5'

const cos = new COS({
  // SecretId: '', // sts服务下发的临时 secretId
  // SecretKey: '' // sts服务下发的临时secretKey
})

export default cos
