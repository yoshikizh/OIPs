const Mutations = {
  updateLastBlock (state, params) {
    state.latestBlock = params.data
    state.blocks.unshift(params.data)
    if (state.blocks.length > 20) {
      state.blocks.pop()
    }
  },
  updateTransactions (state, params) {
    params.data.forEach((data) => {
      state.transactions.unshift(data)
    })
    const n = state.transactions.length - 500
    if (n > 0) {
      for (let i = 0; i < n; i++) {
        state.transactions.pop()
      }
    }
  },
  updateBlocks (state, params) {
    state.blocks = params.data
  },
  updataValidators (state, params) {
    state.validators = params.data
  },
  updateTokens (state, params) {
    state.tokens = params.data
  },
  updateTradePairs (state, params) {
    state.tradePairs = params.data
  },
  updateOperatorAddressValidatorAddressPairs (state, params) {
    state.operatorAddressValidatorAddressPairs = params.data
  },
  setSessionTransaction (state, params) {
    state.sessions.transaction = params.data
  },
  updateInitializeFinished (state, params) {
    state.initializeFinished = true
  },
  updateInitializeTransactionsFinished (state, params) {
    state.initializeTransactionFinished = true
  },
  updateInitializeValidatorsFinished (state, params) {
    state.initializeValidatorsFinished = true
  },
  updateInitializeTokensFinished (state, params) {
    state.initializeTokensFinished = true
  }
}

export default Mutations
