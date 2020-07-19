<template>
  <b-card style="margin-top: 20px; background-color: white; ">
    <div class="title-bar">
      {{$t("LatestTransactions")}}
    </div>
    <SharedTransactions :page="this.page" :perPage="this.perPage" >
    </SharedTransactions>
    <b-overlay :show="showOverlay" no-wrap></b-overlay>
  </b-card>
</template>

<script>

import store from '../../store'
import SharedTransactions from '../shared/transactions.vue'

export default {
  name: 'HomeTransactions',
  components: {
    SharedTransactions
  },
  computed: {
    showOverlay () {
      return !store.state.initializeTransactionFinished
    }
  },
  data () {
    return {
      page: 0,
      perPage: 10
    }
  }
}
</script>

<style scoped lang="scss">
  .title-bar {
    margin-bottom: 15px; text-align: left; font-weight: 600;
  }
</style>
