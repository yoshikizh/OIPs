<template>
  <div class="container">
    <b-card :title="$t('lastBlock')" :sub-title="totalBlocks" style="margin-top: 20px; background-color: white; ">

      <BlocksChart :items="items"></BlocksChart>

      <b-table class="align-table" striped hover responsive :fields="fields" :items="items" style="margin-top: 15px; margin-bottom: 0;">
        <template v-slot:cell(hash)="data">
          <a :href="`/#/block/${data.item.height}`">{{data.item.hash}}</a>
        </template>
        <template v-slot:cell(moniker)="data">
          <a :href="`/#/address/${data.item.operatorAddress}`">{{data.item.moniker}}</a>
        </template>
      </b-table>
      <b-overlay :show="showOverlay" no-wrap></b-overlay>
    </b-card>
  </div>
</template>

<script>

import store from '../../store'
import i18n from '../../i18n'
import BlocksChart from './HomeBlocksChart'

export default {
  name: 'HomeBlocks',
  components: {
    BlocksChart
  },
  props: {
  },
  computed: {
    showOverlay () {
      return !store.state.initializeFinished
    },
    fields () {
      return [
        {
          key: 'height',
          label: i18n.t('block.height')
        },
        {
          key: 'hash',
          label: i18n.t('block.hash')
        },
        {
          key: 'time',
          label: i18n.t('block.time')
        },
        {
          key: 'numTxs',
          label: i18n.t('block.txNums')
        },
        {
          key: 'moniker',
          label: i18n.t('block.validator')
        },
        {
          key: 'totalFee',
          label: i18n.t('block.fee')
        }
      ]
    },
    items () {
      const blocks = store.getters.blocks()
      if (blocks.length >= 20) {
        return store.getters.blocks()
      } else {
        return []
      }
    },
    totalBlocks () {
      const nums = store.state.latestBlock === null ? '--' : store.state.latestBlock.height

      return i18n.t('totalNumBlock', { nums: nums })
    }
  }
}
</script>

<style scoped lang="scss">
  table {
    td { font-size: 12px; }
  }
</style>
