import i18n from '../i18n'

const Getters = {
  // 获取最新block
  latestBlock: (state, getters) => () => {
  },
  // 获取blocks
  blocks: (state, getters) => (page, perpage) => {
    const addressValidatorHash = getters.getOperatorAddressValidatorAddressPairs()
    const operatorMonikerHash = getters.getOperatorAddressMonikerPairOfvalidators()
    return state.blocks.map((block) => {
      const operatorAddress = addressValidatorHash[block.proposer_address]
      const moniker = operatorMonikerHash[operatorAddress] || '--'
      return {
        hash: block.block_hash.slice(0, 24) + '...',
        height: block.height,
        time: block.time,
        numTxs: block.num_txs,
        moniker: moniker,
        totalFee: block.totalFee + ' tokt',
        operatorAddress: operatorAddress
      }
    })
  },
  // 获取账号
  accounts: (state, getters) => () => {
  },
  // 通过 account address 获取账号资产余额
  getAccountCurrenciesByAccountAddress: (state, getters) => (accountAddress) => {
    const promise = new Promise((resolve, reject) => {
      Request.get('/accounts/' + accountAddress).then((resp) => {
        if (resp.data.code === -1) {
          reject(resp.data.detail_msg)
          // window.VueObject.makeToast(i18n.t('common.error'), resp.data.detail_msg, 'danger')
        } else {
          resolve(resp.data.data.currencies)
        }
      })
    })
    return promise
  },
  // 通过 account address 获取账号交易记录
  getAccountTransactionsByAccountAddress: (state, getters) => (accountAddress) => {
    const promise = new Promise((resolve, reject) => {
      Request.get('/transactions?address=' + accountAddress).then((resp) => {
        const promises = []
        if (resp.data.code === -1) {
          reject(resp.data.detail_msg)
          // window.VueObject.makeToast(i18n.t('common.error'), resp.data.detail_msg, 'danger')
        } else {
          const records = resp.data.data.data
          records.forEach((obj) => {
            const txhash = obj.txhash
            const p = new Promise((resolve, reject) => {
              Request.get('txs/' + txhash).then((_resp) => {
                resolve(_resp.data)
              })
            })
            promises.push(p)
          })
          Promise.all(promises).then((result) => {
            resolve({ accountAddress: accountAddress, info: result, records: records })
          })
        }
      })
    })
    return promise
  },
  // 通过 operator address 获取账号 id
  getAccountAddressByOperatorAddress: (state, getters) => (operatorAddress) => {
    const promise = new Promise((resolve, reject) => {
      Request.get(`/staking/address/${operatorAddress}/account_address`).then((resp) => {
        resolve(resp.data)
      })
    })
    return promise
  },
  // 获取市场(交易对)
  tradePairs: (state, getters) => () => {
    return state.tradePairs.slice(0, 10).map((tradePair) => {
      return {
        tradePair: `${tradePair.base_asset_symbol}/${tradePair.quote_asset_symbol}`,
        price: tradePair.price,
        star: ''
      }
    })
  },
  // 获取资产
  tokensTop21: (state, getters) => () => {
    return state.tokens.slice(0, 20).map((token) => {
      return {
        symbol: token.symbol,
        totalSupply: token.total_supply,
        star: ''
      }
    })
  },
  // 格式化交易 (显示用)
  formatTransaction: (state, getters) => (data) => {
    const tx = data.tx
    const msg = tx.value.msg[0]
    const value = msg.value
    let fee = 0
    tx.value.fee.amount.forEach((obj) => {
      if (obj.denom === 'tokt') {
        fee += parseFloat(obj.amount)
      }
    })
    let type
    let detail
    if (msg.type === 'okchain/order/MsgNew') {
      type = i18n.t('txType.create')
      detail = value.order_items.map((item) => {
        let str
        if (item.side === 'BUY') {
          str = `${i18n.t('common.buy')} ${item.product},${i18n.t('common.price')} ${item.price}, ${i18n.t('common.quantity')} ${item.quantity}`
        } else {
          str = `${i18n.t('common.sell')} ${item.product},${i18n.t('common.price')} ${item.price}, ${i18n.t('common.quantity')} ${item.quantity}`
        }
        return str
      }).join('<br/>')
    }
    if (msg.type === 'okchain/token/MsgTransfer') {
      type = i18n.t('common.transfer')
      const amount = value.amount.map((obj) => {
        return `${obj.amount}${obj.denom}`
      }).join(',')
      detail = `${i18n.t('transfer.from')}: ${value.from_address}<br />${i18n.t('transfer.to')}: ${value.to_address}<br />${i18n.t('common.amount')}: ${amount}`
    }
    if (msg.type === 'okchain/order/MsgCancel') {
      type = i18n.t('txType.cancel')
      detail = type + '<br/>' + value.order_ids.join('<br/>')
    }
    return {
      hash: data.txhash,
      height: data.height,
      type: type,
      sender: value.sender,
      time: data.timestamp,
      fee: fee,
      detail: detail
    }
  },
  // 获取最新交易
  transactions: (state, getters) => (page, perpage) => {
    return state.transactions.slice(page, perpage).map((data) => {
      return getters.formatTransaction(data)
    })
  },
  allValidatorsSorted: (state, getters) => () => {
    return state.validators.sort((a, b) => {
      return parseInt(b.delegator_shares) - parseInt(a.delegator_shares)
    })
  },
  // 获取超级多节点 (排序前21个活跃)
  validatorsTop21: (state, getters) => () => {
    return state.validators.sort((a, b) => {
      return parseInt(b.delegator_shares) - parseInt(a.delegator_shares)
    }).slice(0, 21).map((validator) => {
      return {
        moniker: validator.description.moniker,
        operatorAddress: validator.operator_address,
        delegatorShares: parseInt(validator.delegator_shares),
        status: validator.status,
        star: ''
      }
    })
  },
  // 获取所有超级节点的 operator_address => moniker 的 keyPair
  getOperatorAddressMonikerPairOfvalidators: (state, getters) => () => {
    const object = {}
    if (state.validators.length > 0) {
      state.validators.forEach((validator) => {
        object[validator.operator_address] = validator.description.moniker
      })
    }
    return object
  },
  getOperatorAddressValidatorAddressPairs: (state, getters) => () => {
    const object = {}
    if (state.operatorAddressValidatorAddressPairs.length > 0) {
      state.operatorAddressValidatorAddressPairs.forEach((obj) => {
        object[obj.validator_address] = obj.operator_address
      })
    }
    return object
  },
  // 获取 block info
  getBlockInfo: (state, getters) => (height) => {
    const promise = new Promise((resolve, reject) => {
      Request.get('/blocks/' + height).then((resp) => {
        console.log('blocks', resp)
        const data = resp.data
        const hash = {
          hash: data.block_meta.block_id.hash,
          height: data.block.header.height,
          num_txs: data.block.header.num_txs,
          time: data.block.header.time
        }
        resolve(hash)
      })
    })
    return promise
  },
  // 获取 /block 界面的 transactions
  getBlockTransactions: (state, getters) => (height) => {
    const promise = new Promise((resolve, reject) => {
      Request.get('/block_tx_hashes/' + height).then((resp) => {
        const promises = []
        // console.log('data', resp.data)
        resp.data.forEach((hash) => {
          const p = new Promise((resolve, reject) => {
            Request.get('/txs/' + hash).then((_resp) => {
              resolve(getters.formatTransaction(_resp.data))
            })
          })
          promises.push(p)
        })
        Promise.all(promises).then((result) => {
          resolve(result)
        })
      })
    })
    return promise
  },
  // 获取 /token 界面的 transactions
  getTokenTransactions: (state, getters) => () => {
    return state.currentToken.transactions
  },
  // 获取 /validator 界面的基本信息
  getValidatorInfo: (state, getters) => () => {
    return {}
  },
  // 获取 /validator 界面的 transactions
  getValidatorTransactions: (state, getters) => () => {
    return state.currentValidator.transactions
  },
  // 获取 /validator 界面的 balances
  getValidatorBalances: (state, getters) => () => {
    return state.currentValidator.balances
  },
  // 获取 /validator 界面的 blocks
  getValidatorBlocks: (state, getters) => () => {
    return state.currentValidator.blocks
  },
  _getTotalFeeForBlock: (state, getters) => (height) => {
    let totalFee = 0
    const promise = new Promise((resolve, reject) => {
      // 获取所有交易 hash
      Request.get('/block_tx_hashes/' + height).then((_resp) => {
        const promises = []
        _resp.data.forEach((txHash) => {
          const p = new Promise((resolve, reject) => {
            Request.get('/txs/' + txHash).then((__resp) => {
              resolve(__resp.data.tx.value)
            })
          })
          promises.push(p)
        })
        Promise.all(promises).then((result) => {
          result.forEach((obj) => {
            const amountArr = obj.fee.amount
            const amountObj = amountArr.filter((obj) => { return obj.denom === 'tokt' })[0]
            if (amountObj) {
              totalFee += parseFloat(amountObj.amount)
              resolve(totalFee)
            }
          })
        })
      })
    })
    return promise
  }
}

export default Getters
