<template>
  <div class="container" style="margin-top: 20px;">
    <b-breadcrumb :items="breadcrumbItems"></b-breadcrumb>
    <b-card-group deck>
      <b-card bg-variant="light" :header="`区块-${this.$route.params.height}  `" class="text-left">
        <b-card-text>
          <div class="row" style="color: #666;">
            <div class="col-md-3">
              <div>{{$t('block.hash')}}</div>
              <div>{{$t('block.height')}}</div>
              <div>{{$t('block.time')}}</div>
              <div>{{$t('block.txNums')}}</div>
            </div>
            <div class="col-md-9 text-left">
              <div>{{this.info.hash || '--'}}</div>
              <div>{{this.info.height || '--'}}</div>
              <div>{{this.info.time || '--'}}</div>
              <div>{{this.info.num_txs || '--'}}</div>
            </div>
          </div>
        </b-card-text>
      </b-card>
    </b-card-group>
    <b-card no-body title="Card Title" style="margin-top: 10px;">
      <b-card-header header-tag="nav">
        <b-nav card-header tabs>
          <b-nav-item v-bind:active="currentTabComponent==='Transaction'" @click="currentTabComponent='Transaction'">交易</b-nav-item>
        </b-nav>
      </b-card-header>
      <component v-bind:is="currentTabComponent"></component>
    </b-card>
  </div>
</template>

<script>

import Transaction from '@/components/block/transactions.vue'
import store from '../store'
import i18n from '../i18n'

export default {
  name: 'Validator',
  created () {
    store.getters.getBlockInfo(this.$route.params.height).then((resp) => {
      this.info = resp
    })
  },
  props: {
    currentTabComponent: {
      type: String,
      default: 'Transaction'
    }
  },
  data () {
    return {
      info: {},
      breadcrumbItems: [
        {
          text: i18n.t('names.homepage'),
          href: '/#/'
        },
        {
          text: i18n.t('names.block') + ' - ' + this.$route.params.height,
          active: true
        }
      ]
    }
  },
  components: {
    Transaction
  }
}
</script>
