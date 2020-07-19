<template>
  <div>
    <b-table head-variant="light" responsive="true" :fields="fields" :items="items" style="margin-bottom: 0; text-align: left;">
      <template v-slot:cell(block_height)="data">
        <a :href="`/#/block/${data.item.block_height}`">{{data.item.block_height}}</a>
      </template>
    </b-table>
    <b-overlay :show="showOverlay" no-wrap></b-overlay>
  </div>
</template>

<script>

import i18n from '../../i18n'

export default {
  created () {
    Request.get('/matches?product=' + this.$route.params.name).then((resp) => {
      this.items = resp.data.data.data.map((obj) => {
        return { totalAmount: parseFloat(obj.price) * parseFloat(obj.volume), ...obj }
      })
      this.showOverlay = false
    })
  },
  name: 'Transactions',
  data () {
    return {
      showOverlay: true,
      page: 1,
      perPage: 20,
      items: []
    }
  },
  computed: {
    fields () {
      return [
        {
          key: 'totalAmount',
          label: i18n.t('market.totalAmount')
        },
        {
          key: 'price',
          label: i18n.t('market.price')
        },
        {
          key: 'volume',
          label: i18n.t('market.volume')
        },
        {
          key: 'timestamp',
          label: i18n.t('market.time')
        },
        {
          key: 'block_height',
          label: i18n.t('market.height')
        }
      ]
    }
  }
}
</script>
