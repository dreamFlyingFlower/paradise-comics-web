export {
  validateEmail
}

/**
 * 验证邮箱格式是否正确
 * @param email 邮箱
 * @returns {boolean} true正确,false不正确
 */
function validateEmail(email) {
  const re = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,}/;
  return re.test(email);
}
