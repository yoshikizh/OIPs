<template>
  <div class="container" style="margin-top: 20px;">
    <b-breadcrumb :items="breadcrumbItems"></b-breadcrumb>
    <b-card style="margin-top: 20px; background-color: white; ">
      <BlocksChart :items="items"></BlocksChart>
      <SharedTransactions :page="this.page" :perPage="this.perPage" :height="this.height" style="margin-top: 10px;" />
    </b-card>
  </div>
</template>

<script>

import i18n from '../i18n'
import store from '../store'
import SharedTransactions from '../components/shared/transactions.vue'
import BlocksChart from '../components/home/HomeBlocksChart'

export default {
  created () {
    this.height = this.$route.query.height
  },
  name: 'Transactions',
  computed: {
    items () {
      const blocks = store.getters.blocks()
      if (blocks.length >= 20) {
        return store.getters.blocks()
      } else {
        return []
      }
    }
  },
  components: {
    SharedTransactions,
    BlocksChart
  },
  data () {
    return {
      height: null,
      page: 0,
      perPage: 100,
      breadcrumbItems: [
        {
          text: i18n.t('names.homepage'),
          href: '/#/'
        },
        {
          text: i18n.t('names.transaction'),
          active: true
        }
      ]
    }
  }
}
</script>
