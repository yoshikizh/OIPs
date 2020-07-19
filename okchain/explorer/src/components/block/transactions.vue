<template>
  <b-card-body class="text-center">
    <div>
      <b-card-text>
        <SharedTransactions :existList="true" :list="this.items" :page="this.page" :perPage="this.perPage" />
      </b-card-text>
    </div>
    <b-overlay :show="showOverlay" no-wrap></b-overlay>
  </b-card-body>
</template>

<script>

import store from '../../store'
import SharedTransactions from '../shared/transactions.vue'

export default {
  name: 'Transactions',
  created () {
    store.getters.getBlockTransactions(this.$route.params.height).then((resp) => {
      this.items = resp
      this.showOverlay = false
    })
  },
  props: {
  },
  data () {
    return {
      showOverlay: true,
      page: 0,
      perPage: 20,
      items: []
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
