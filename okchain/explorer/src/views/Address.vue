<template>
  <div class="container" style="margin-top: 20px;">
    <b-breadcrumb :items="breadcrumbItems"></b-breadcrumb>

    <b-card-group deck>
      <b-card bg-variant="light" :header="`${$t('names.address')}-${this.$route.params.id}  `" class="text-left">
        <b-card-text>
          <div class="row" style="color: #666;">
            <div class="col-md-3">
              <div>{{$t('account.type')}}</div>
              <div>{{$t('account.TokenNums')}}</div>
              <div></div>
              <div></div>
            </div>
            <div class="col-md-3 text-right" style="border-right: 1px solid #ddd;">
              <div>{{this.accountType === '超级节点' ? $t('names.validator') : $t('names.normalAccount')}}</div>
              <div>{{this.currenciesCount}}</div>
              <div></div>
              <div></div>
            </div>
            <div class="col-md-3">
              <div v-for="item in this.currencies" :key="item.symbol">
                {{item.symbol}}
              </div>
            </div>
            <div class="col-md-3 text-right">
              <div v-for="item in this.currencies" :key="item.symbol">
                {{item.available}}
              </div>
            </div>
          </div>
        </b-card-text>
      </b-card>
    </b-card-group>
    <div v-if="this.accountType === '超级节点' && this.validator !== null" style="margin-top: 10px;">
      <b-card bg-variant="light" :header="$t('names.validator')" class="text-left">
        <b-card-text>
          <div class="row" style="color: #666;">
            <div class="col-md-3">
              <div>{{$t('validator.name')}}</div>
              <div>{{$t('validator.website')}}</div>
              <div>{{$t('validator.votes')}}</div>
              <div>{{$t('validator.rank')}}</div>
              <div>{{$t('validator.account')}}</div>
            </div>
            <div class="col-md-3 text-right" style="border-right: 1px solid #ddd;">
              <div>
                {{this.validator.description.moniker}}
              </div>
              <div>{{this.validator.description.website || '--'}}</div>
              <div>{{this.validator ? this.validator.delegator_shares : '--'}}</div>
              <div>{{this.validatorIndex}}</div>
              <div>{{this.validatorAccountAddress}}</div>
            </div>
            <div class="col-md-6 text-right" v-if="this.validator.description.identity !== ''">
              <img :src="this.validator.description.identity.split('|||')[1]" />
            </div>
          </div>
          <hr />
          <div class="row" style="color: #666;">
            <div class="col-md-2">{{$t('validator.description')}}</div>
            <div class="col-md-10">{{this.validator.description.details || '--'}}</div>
          </div>
          <div class="row" style="margin-top: 20px;">
            <div class="col-md-2" style="color: #666;">{{$t('validator.data')}}</div>
            <div class="col-md-10" style="padding: 15px; border: 1px solid #ddd; background-color: #fbfcff; font-size: 12px;">
              {{this.validator}}
            </div>
          </div>
        </b-card-text>
      </b-card>
    </div>

    <b-card no-body title="Card Title" style="margin-top: 10px;">
      <b-card-header header-tag="nav">
        <b-nav card-header tabs>
          <b-nav-item v-bind:active="currentTabComponent==='Transaction'" @click="currentTabComponent='Transaction'">{{$t('names.transaction')}}</b-nav-item>
          <b-nav-item v-bind:active="currentTabComponent==='Balance'" @click="currentTabComponent='Balance'">{{$t('names.balance')}}</b-nav-item>
          <!-- <div > -->
<!--             <b-nav-item v-if="this.isValidator()" v-bind:active="currentTabComponent==='Block'" @click="currentTabComponent='Block'">出块</b-nav-item> -->
            <b-nav-item v-if="this.isValidator()" v-bind:active="currentTabComponent==='ValidatorVotes'" @click="currentTabComponent='ValidatorVotes'">{{$t('validator.voteDetail')}}</b-nav-item>
          <!-- </div> -->
        </b-nav>
      </b-card-header>
      <component :list="this.currentTabComponentData" v-bind:is="currentTabComponent"></component>
      <b-overlay :show="showOverlay" no-wrap>
      </b-overlay>
    </b-card>
  </div>
</template>

<script>

import store from '../store'
import Transaction from '@/components/validator/transactions.vue'
import Balance from '@/components/validator/balance.vue'
import Block from '@/components/validator/blocks.vue'
import ValidatorVotes from '@/components/validator/votes.vue'
import i18n from '../i18n'

export default {
  name: 'Address',
  created () {
    const _this = this
    const address = this.$route.params.id
    // const isFinishInitialize = store.state.initializeFinished

    // 未初始化则要初始化获取 validators
    // console.log(isFinishInitialize)
    store.dispatch('apiGetValidators').then(() => {
      const allValidators = store.state.validators
      const validator = allValidators.filter((validator) => {
        return validator.operator_address === address
      })[0]
      if (validator) {
        _this.accountType = '超级节点'
        _this.validator = validator
        store.getters.getAccountAddressByOperatorAddress(address).then((accountAddress) => {
          _this.validatorAccountAddress = accountAddress
          _this.getAccountTransactionsAndCurrencies(accountAddress)
        })
      } else {
        _this.accountType = '普通账号'
        _this.getAccountTransactionsAndCurrencies(address)
      }
      const sortedValidators = allValidators.sort((a, b) => {
        return b.operator_address - a.operator_address
      })
      _this.validatorIndex = sortedValidators.map((obj) => { return obj.operator_address }).indexOf(address)
    })
  },
  props: {
  },
  computed: {
    currentTabComponentData () {
      let data = []
      if (this.currentTabComponent === 'Transaction') {
        data = this.transactions
      }
      if (this.currentTabComponent === 'Balance') {
        data = this.currencies
      }
      if (this.currentTabComponent === 'Block') {
        data = []
      }
      return data
    }
  },
  data () {
    return {
      showOverlay: true,
      validator: null,
      transactions: {},
      currencies: [],
      currenciesCount: '--',
      accountType: '--',
      currentTabComponent: 'Transaction',
      validatorAccountAddress: '--',
      validatorIndex: '--',
      breadcrumbItems: [
        {
          text: i18n.t('names.homepage'),
          href: '/#/'
        },
        {
          text: i18n.t('names.validator'),
          href: '/#/validators'
        },
        {
          text: i18n.t('names.address') + '-' + this.$route.params.id,
          active: true
        }
      ]
    }
  },
  methods: {
    getAccountTransactionsAndCurrencies (accountAddress) {
      const p1 = new Promise((resolve, reject) => {
        store.getters.getAccountTransactionsByAccountAddress(accountAddress).then((resp) => {
          console.log('resp...', resp)
          this.transactions = resp
          resolve()
        }, (error) => {
          reject(error)
        })
      })
      const p2 = new Promise((resolve, reject) => {
        store.getters.getAccountCurrenciesByAccountAddress(accountAddress).then((resp) => {
          this.currencies = resp
          this.initCurrenciesProps()
          resolve()
        }, (error) => {
          reject(error)
        })
      })
      Promise.all([p1, p2]).then((resp) => {
        this.showOverlay = false
      }).catch((error) => {
        console.log('error', error)
        window.VueObject.makeToast(i18n.t('common.error'), error, 'danger')
        this.showOverlay = false
      })
    },
    initCurrenciesProps () {
      this.currenciesCount = this.currencies.length.toString()
    },
    isValidator () {
      return this.accountType === '超级节点'
    }
  },
  components: {
    Transaction,
    Balance,
    Block,
    ValidatorVotes
  }
}
</script>
