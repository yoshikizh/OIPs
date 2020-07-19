import MgrTimer from '../mgr/MgrTimer.js'

const Actions = {
  apiGetLatestBlock ({ getters, dispatch, commit, state }) {
    Request.get('/blocks/latest').then((resp) => {
      const blockmeta = resp.data.block_meta
      const block = resp.data.block
      const header = block.header

      getters._getTotalFeeForBlock(header.height).then((totalFee) => {
        const data = {
          height: header.height,
          block_hash: blockmeta.block_id.hash,
          time: header.time,
          num_txs: header.num_txs,
          proposer_address: header.proposer_address,
          totalFee: totalFee
        }
        if (state.blocks[0].height !== header.height) {
          commit('updateLastBlock', { data: data })

          // 查询最新交易
          Request.get('/block_tx_hashes/' + data.height).then((_resp) => {
            const txHashs = _resp.data
            const promises = []
            txHashs.forEach((txhash) => {
              const p = new Promise((resolve, reject) => {
                Request.get('/txs/' + txhash).then((__resp) => {
                  resolve(__resp.data)
                })
              })
              promises.push(p)
            })
            Promise.all(promises).then((result) => {
              commit('updateTransactions', { data: result })
              commit('updateInitializeTransactionsFinished')
            })
          })
        }
      })
    })
  },
  apiGetBlocksFirstLaunch ({ getters, dispatch, commit, state }, params) {
    dispatch('apiGetOperatorAddressValidatorAddressPairs')
    Request.get('/blocks/latest').then((resp) => {
      const blockmeta = resp.data.block_meta
      const block = resp.data.block
      const header = block.header
      const data = {
        height: header.height,
        block_hash: blockmeta.block_id.hash,
        time: header.time,
        num_txs: header.num_txs
      }
      commit('updateLastBlock', { data: data })
      const height = header.height

      const promises = []
      for (let i = height; i > height - 20; i--) {
        const p = new Promise((resolve, reject) => {
          // getters._getTotalFeeForBlock(i).then((totalFee) => {
          const totalFee = 0
          Request.get(`/blocks/${i}`).then((resp) => {
            const blockmeta = resp.data.block_meta
            const block = resp.data.block
            const header = block.header
            const data = {
              height: header.height,
              block_hash: blockmeta.block_id.hash,
              time: header.time,
              num_txs: header.num_txs,
              proposer_address: header.proposer_address,
              totalFee: totalFee
            }
            resolve(data)
          })
          // })
        })
        promises.push(p)
      }

      Promise.all(promises).then((result) => {
        commit('updateBlocks', { data: result })

        // 初始化完成标记
        commit('updateInitializeFinished')

        // 启动计时器 2 秒一次获取最新区块
        MgrTimer.startGetLatestBlockTimer(() => {
          dispatch('apiGetLatestBlock')
        })
      })
    })
  },
  apiGetValidators ({ commit, state }, params) {
    return Request.get('/staking/validators?status=all').then((resp) => {
      commit('updataValidators', { data: resp.data })
      commit('updateInitializeValidatorsFinished')
    })
  },
  apiGetAccounts ({ commit, state }, params) {
  },
  apiGetTradePairs ({ commit, state }, params) {
    return Request.get('/products').then((resp) => {
      console.log('products', resp)
      const data = resp.data.data
      commit('updateTradePairs', { data: data })
    })
  },
  apiGetTokens ({ commit, state }, params) {
    return Request.get('/tokens').then((resp) => {
      commit('updateTokens', { data: resp.data.data })
      commit('updateInitializeTokensFinished')
    })
  },
  apiGetTransactions ({ commit, state }, params) {
  },
  apiGetOperatorAddressValidatorAddressPairs ({ commit, state }, params) {
    return Request.get('/staking/address').then((resp) => {
      commit('updateOperatorAddressValidatorAddressPairs', { data: resp.data })
    })
  }
}

export default Actions
