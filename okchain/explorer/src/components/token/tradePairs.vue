<template>
  <b-card-body class="text-center">
    <div>
      <b-card-text>
        <b-table striped hover :items="items" :fields="fields"></b-table>
      </b-card-text>
    </div>
  </b-card-body>
</template>

<script>

import store from '../../store'

export default {
  name: 'Transactions',
  creared () {
  },
  props: ['address'],
  computed: {
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
      return store.getters.getTokenTransactions()
    }
  }
}
</script>

<style scoped lang="scss">
  table {
    td { font-size: 12px; }
  }
</style>
