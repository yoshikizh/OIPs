<template>
  <div class="container" style="margin-top: 20px;">
    <b-breadcrumb :items="breadcrumbItems"></b-breadcrumb>
    <b-card style="margin-top: 20px; background-color: white; ">
      <b-table class="align-table" head-variant="light" :fields="fields" :items="items">
        <template v-slot:cell(detail)="data">
          <a :href="`/#/tradePair/${data.item.base_asset_symbol}_${data.item.quote_asset_symbol}`">{{$t('common.detail')}}</a>
        </template>
      </b-table>
      <b-overlay :show="showOverlay" no-wrap></b-overlay>
    </b-card>
  </div>
</template>

<script>

import i18n from '../i18n'
import store from '../store'

export default {
  name: 'Tokens',
  created () {
    const existTradePairs = store.state.tradePairs.length > 0
    if (existTradePairs) {
      this.getTradePairs()
      this.showOverlay = false
    } else {
      store.dispatch('apiGetTradePairs').then(() => {
        this.getTradePairs()
        this.showOverlay = false
      })
    }
  },
  computed: {
    breadcrumbItems () {
      return [
        {
          text: i18n.t('names.homepage'),
          href: '/#/'
        },
        {
          text: i18n.t('names.tradePair'),
          active: true
        }
      ]
    },
    fields () {
      return [
        {
          key: 'base_asset_symbol',
          label: i18n.t('tradePair.baseAsset')
        },
        {
          key: 'quote_asset_symbol',
          label: i18n.t('tradePair.quoteAsset')
        },
        {
          key: 'price',
          label: i18n.t('common.price')
        },
        {
          key: 'detail',
          label: i18n.t('common.detail')
        }
      ]
    }
  },
  data () {
    return {
      showOverlay: true,
      items: []
    }
  },
  methods: {
    getTradePairs () {
      this.items = store.state.tradePairs.map((obj) => {
        return { detail: '', ...obj }
      })
    }
  }
}
</script>
