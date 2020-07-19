import i18n from '../i18n'

function Utils () {}

Utils.onSubmitForSearch = (keyword) => {
  if (/^\d+$/g.test(keyword)) {
    // 匹配全数字 -> 区块高度
    window.location.href = `/#/block/${keyword}`
  } else if (/\d+/g.test(keyword) && /[A-Z]+/g.test(keyword) && keyword.length === 64) {
    // 数字和大写字母 -> 交易 hash
    window.location.href = `/#/transaction/${keyword}`
  } else if (keyword.startsWith('okchain') && (keyword.length === 53 || keyword.length === 46)) {
    // okchain 开头 -> 地址
    window.location.href = `/#/address/${keyword}`
  } else {
    window.VueObject.makeToast(i18n.t('common.error'), i18n.t('error.invalidQuery'), 'danger')
  }
}

export default Utils
