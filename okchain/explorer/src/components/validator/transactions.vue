<template>
  <b-card-body class="text-center">
    <div>
      <b-card-text>
        <SharedTransactions :existList="true" :list="this.transactions" :page="this.page" :perPage="this.perPage" />
        <div style="padding: 80px;" v-if="this.transactions.length === 0">{{$t('msg.noTxs')}}</div>
      </b-card-text>
    </div>
  </b-card-body>
</template>

<script>

import store from '../../store'
import SharedTransactions from '../shared/transactions.vue'

export default {
  name: 'Transactions',
  props: ['list'],
  created () {
  },
  data () {
    return {
      page: 0,
      perPage: 20
    }
  },
  computed: {
    transactions () {
      return (this.list.info || []).slice(0, 20).map((data) => {
        return store.getters.formatTransaction(data)
      })
    },
    fields () {
      return [
        {
          key: 'hash',
          label: '块哈希'
        },
        {
          key: 'time',
          label: '时间'
        },
        {
          key: 'sender',
          label: '发送方'
        },
        {
          key: 'receiver',
          label: '接受方'
        },
        {
          key: 'type',
          label: '交易类型'
        },
        {
          key: 'num',
          label: '数量'
        },
        {
          key: 'fee',
          label: '手续费'
        }
      ]
    },
    items () {
      return store.getters.getValidatorTransactions()
    }
  },
  components: {
    SharedTransactions
  }
}
</script>

<style scoped lang="scss">
  table {
    td { font-size: 12px; }
  }
</style>
