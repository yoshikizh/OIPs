<template>
  <div class="container" style="margin-top: 20px;">
    <b-breadcrumb :items="breadcrumbItems"></b-breadcrumb>
    <Tx />
  </div>
</template>

<script>

import Tx from '@/components/tx/detail.vue'
import i18n from '../i18n'

export default {
  name: 'Validator',
  data () {
    return {
      breadcrumbItems: [
        {
          text: i18n.t('names.homepage'),
          href: '/#/'
        },
        {
          text: i18n.t('names.transaction'),
          href: '/#/transaction'
        },
        {
          text: this.$route.params.hash,
          active: true
        }
      ]
    }
  },
  components: {
    Tx
  }
}
</script>
