<template>
  <div class="container" style="margin-top: 20px;">
    <b-breadcrumb :items="breadcrumbItems"></b-breadcrumb>
    <b-card-group deck>
      <b-card bg-variant="light" :header="`${$t('names.tradePair')}-${this.$route.params.name}  `" class="text-left">
        <b-card-text>
          <div class="row" style="color: #666;">
            <div class="col-md-3">
              <div>{{$t('tradePair.baseAsset')}}</div>
              <div>{{$t('tradePair.quoteAsset')}}</div>
              <div>{{$t('common.price')}}</div>
              <div>{{$t('tradePair.minTradeSize')}}</div>
            </div>
            <div class="col-md-3 text-right" style="border-right: 1px solid #ddd;">
              <div>
                <a v-if="this.tradePair" :href="`/#/token/${this.tradePair.base_asset_symbol}`">
                  {{this.tradePair.base_asset_symbol}}
                </a>
              </div>
              <div>
                <a v-if="this.tradePair" :href="`/#/token/${this.tradePair.quote_asset_symbol}`">
                  {{this.tradePair.quote_asset_symbol}}
                </a>
              </div>
              <div>{{this.tradePair ? this.tradePair.price : '--'}}</div>
              <div>{{this.tradePair ? this.tradePair.min_trade_size : '--'}}</div>
            </div>
            <div class="col-md-3">
              <div>{{$t('tradePair.onMarket')}}</div>
              <div>{{$t('tradePair.pricePrecision')}}</div>
              <div>{{$t('tradePair.quantityPrecision')}}</div>
            </div>
            <div class="col-md-3 text-right">
              <div>{{this.tradePair ? (this.tradePair.delisting ? $t('tradePair.delisting') : $t('tradePair.on')) : '--'}}</div>
              <div>{{this.tradePair ? this.tradePair.max_price_digit : '--'}}</div>
              <div>{{this.tradePair ? this.tradePair.max_size_digit : '--'}}</div>
            </div>
          </div>
        </b-card-text>
      </b-card>
    </b-card-group>

    <b-card no-body title="交易" style="margin-top: 10px;">
      <b-card-header header-tag="nav">
        <b-nav card-header tabs>
          <b-nav-item v-bind:active="currentTabComponent==='Transactions'" @click="currentTabComponent='Transactions'">{{$t('names.deal')}}</b-nav-item>
          <b-nav-item v-bind:active="currentTabComponent==='MarketDepth'" @click="currentTabComponent='MarketDepth'">{{$t('names.depth')}}</b-nav-item>
        </b-nav>
      </b-card-header>
      <component v-bind:is="currentTabComponent"></component>
    </b-card>

  </div>
</template>

<script>

import store from '../store'
import i18n from '../i18n'
import Transactions from '@/components/tradePair/transactions.vue'
import MarketDepth from '@/components/tradePair/marketDepth.vue'

export default {
  name: 'Validator',
  created () {
    store.dispatch('apiGetTradePairs')
  },
  props: {

  },
  computed: {
    tradePair () {
      const baseSymbol = this.$route.params.name.split('_')[0]
      const quoteSymbol = this.$route.params.name.split('_')[1]
      return store.state.tradePairs.filter((tradePair) => {
        return tradePair.base_asset_symbol === baseSymbol && tradePair.quote_asset_symbol === quoteSymbol
      })[0]
    }
  },
  data () {
    return {
      currentTabComponent: 'Transactions',
      breadcrumbItems: [
        {
          text: i18n.t('names.homepage'),
          href: '/#/'
        },
        {
          text: i18n.t('names.tradePair'),
          href: '/#/TradePairs'
        },
        {
          text: this.$route.params.name,
          active: true
        }
      ]
    }
  },
  components: {
    Transactions,
    MarketDepth
  }
}
</script>
