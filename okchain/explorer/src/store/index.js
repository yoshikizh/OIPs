import Vue from 'vue'
import Vuex from 'vuex'

import Getters from './getters'
import Mutations from './mutations'
import Actions from './actions'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
  },
  state: {
    initializeFinished: false,
    initializeTransactionFinished: false,
    initializeValidatorsFinished: false,
    initializeTokensFinished: false,
    latestBlock: null,
    sessions: {
      transaction: null
    },
    blocks: [],
    accounts: [],
    tradePairs: [],
    tokens: [],
    transactions: [],
    validators: [],
    operatorAddressValidatorAddressPairs: [],
    currentBlock: {
      transactions: [
        {
          hash: 'xxxxxxxxx',
          time: '12天前',
          sender: 'okchainv...mph5rx',
          receiver: 'okchainv...mph5rx',
          type: '投票',
          num: '1000000tokt',
          fee: '0.00002tokt'
        },
        {
          hash: 'xxxxxxxxx',
          time: '12天前',
          sender: 'okchainv...mph5rx',
          receiver: 'okchainv...mph5rx',
          type: '投票',
          num: '1000000 tokt',
          fee: '0.00002 tokt'
        }
      ]
    },
    currentToken: {
      transactions: [
        {
          hash: 'xxxxxxxxx',
          time: '12天前',
          sender: 'okchainv...mph5rx',
          receiver: 'okchainv...mph5rx',
          type: '投票',
          num: '1000000tokt',
          fee: '0.00002tokt'
        },
        {
          hash: 'xxxxxxxxx',
          time: '12天前',
          sender: 'okchainv...mph5rx',
          receiver: 'okchainv...mph5rx',
          type: '投票',
          num: '1000000 tokt',
          fee: '0.00002 tokt'
        }
      ]
    },
    currentValidator: {
      addressType: 'normal',
      transactions: [
        {
          hash: 'xxxxxxxxx',
          time: '12天前',
          sender: 'okchainv...mph5rx',
          receiver: 'okchainv...mph5rx',
          type: '投票',
          num: '1000000tokt',
          fee: '0.00002tokt'
        },
        {
          hash: 'xxxxxxxxx',
          time: '12天前',
          sender: 'okchainv...mph5rx',
          receiver: 'okchainv...mph5rx',
          type: '投票',
          num: '1000000 tokt',
          fee: '0.00002 tokt'
        }
      ],
      balances: [
        {
          token: 'TOKT',
          positionNum: '10000',
          tokenValue: '1000000',
          valuePercent: '100%'
        },
        {
          token: 'TOKT',
          positionNum: '10000',
          tokenValue: '1000000',
          valuePercent: '100%'
        }
      ],
      blocks: [
        {
          height: '7627530',
          time: '1 小时 前',
          txNum: '16',
          fee: '0.0016 tokt'
        },
        {
          height: '7627530',
          time: '1 小时 前',
          txNum: '16',
          fee: '0.0016 tokt'
        }
      ]
    }
  },
  getters: Getters,
  mutations: Mutations,
  actions: Actions
})
