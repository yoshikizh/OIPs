<template>
  <div class="row">
    <div class="col-md-6" style="padding-right: 0;">
      <b-table head-variant="light" responsive="true" :fields="fieldsBid" :items="bids" style="margin-bottom: 0; text-align: left;">
        <template v-slot:cell(price)="data">
          <span style="color: green;">{{data.item.price}}</span>
        </template>
      </b-table>
    </div>
    <div class="col-md-6" style="padding-left: 0;">
      <b-table head-variant="light" responsive="true" :fields="fieldsAsk" :items="asks" style="margin-bottom: 0; text-align: left;">
        <template v-slot:cell(price)="data">
          <span style="color: red;">{{data.item.price}}</span>
        </template>
      </b-table>
    </div>
    <b-overlay :show="showOverlay" no-wrap></b-overlay>
  </div>
</template>

<script>

import i18n from '../../i18n'

export default {
  created () {
    Request.get('/order/depthbook?product=' + this.$route.params.name).then((resp) => {
      const _asks = resp.data.data.asks
      const _bids = resp.data.data.bids
      const count = Math.min(_asks.length, _bids.length)
      this.bids = _bids.slice(0, count).map((obj, index) => {
        return { index: index + 1, ...obj }
      })
      this.asks = _asks.slice(0, count)
      this.showOverlay = false
    })
  },
  name: 'Transactions',
  data () {
    return {
      showOverlay: true,
      page: 0,
      perPage: 20,
      asks: [],
      bids: []
    }
  },
  computed: {
    fieldsBid () {
      return [
        {
          key: 'index',
          label: ''
        },
        {
          key: 'quantity',
          label: i18n.t('common.quantity') + '(' + i18n.t('common.buy') + ')'
        },
        {
          key: 'price',
          label: i18n.t('common.price') + '(' + i18n.t('common.buy') + ')'
        }
      ]
    },
    fieldsAsk () {
      return [
        {
          key: 'price',
          label: i18n.t('common.quantity') + '(' + i18n.t('common.sell') + ')'
        },
        {
          key: 'quantity',
          label: i18n.t('common.price') + '(' + i18n.t('common.sell') + ')'
        }
      ]
    }
  }
}
</script>
