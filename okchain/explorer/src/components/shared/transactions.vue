<template>
  <div id="SharedTransactions">
    <b-table class="align-table" head-variant="light" responsive="true" :fields="fields" :items="items" style="margin-bottom: 0; text-align: left;">
      <template v-slot:cell(height)="data">
        <a @click="onClickTransactionHash(data.item)" :href="`/#/block/${data.item.height}`">
          {{data.item.height}}
        </a>
      </template>
      <template v-slot:cell(hash)="data">
        <a @click="onClickTransactionHash(data.item)" :href="`/#/transaction/${data.item.hash}`">
          {{data.item.hash.slice(0,15) + '...'}}
        </a>
      </template>
      <template v-slot:cell(sender)="data">
        <a v-if="data.item.sender" :href="`/#/address/${data.item.sender}`">{{data.item.sender ? data.item.sender.slice(0,15) + '...' : '--'}}</a>
      </template>
      <template v-slot:cell(detail)="data">
        <b-button @click="showModal(data.item)" variant="primary">{{$t('common.detail')}}</b-button>
      </template>
    </b-table>

    <b-modal
      v-model="show"
      title="详情"
      header-bg-variant="dark"
      header-text-variant="light"
      body-bg-variant="light"
      body-text-variant="dark"
      footer-bg-variant="light"
      footer-text-variant="dark"
    >
      <b-container fluid>
        <b-row class="mb-1 text-left">
          <b-col cols="3">哈希</b-col>
          <b-col style="word-break: break-all;" cols="9">{{modalHash}}</b-col>
        </b-row>
        <b-row class="mb-1 text-left">
          <b-col cols="3">详情</b-col>
          <b-col style="word-break: break-all;" cols="9" v-html="this.modalDetail"></b-col>
        </b-row>
      </b-container>

      <template v-slot:modal-footer>
        <div>
          <b-button variant="primary" size="sm" class="float-right" @click="show=false">关闭</b-button>
        </div>
      </template>
    </b-modal>

  </div>
</template>

<script>

import store from '../../store'
import i18n from '../../i18n'

export default {
  props: {
    page: { type: Number, default: 0 },
    perPage: { type: Number, default: 20 },
    existList: { type: Boolean, default: false },
    list: { type: Array, default: null },
    height: { type: Number, default: null }
  },
  created () {
  },
  name: 'SharedTransactions',
  computed: {
    fields () {
      return [
        {
          key: 'height',
          label: i18n.t('transaction.height')
        },
        {
          key: 'hash',
          label: i18n.t('transaction.hash')
        },
        {
          key: 'time',
          label: i18n.t('transaction.time')
        },
        {
          key: 'sender',
          label: i18n.t('transaction.sender')
        },
        {
          key: 'type',
          label: i18n.t('transaction.txType')
        },
        {
          key: 'fee',
          label: i18n.t('transaction.fee')
        },
        {
          key: 'detail'
        }
      ]
    },
    items () {
      if (this.existList) {
        if (!this.list) {
          return []
        } else {
          return this.list
        }
      } else {
        return store.getters.transactions(this.page, this.perPage)
      }
    }
  },
  data () {
    return {
      // modal
      show: false,
      modalHash: '',
      modalDetail: '',
      // other
      onClickTransactionHash: function (data) {
        const tx = store.state.transactions.filter((obj) => {
          return obj.txhash === data.hash
        })[0]
        store.commit('setSessionTransaction', { data: tx })
      }
    }
  },
  methods: {
    showModal (data) {
      this.show = true
      this.modalHash = data.hash
      this.modalDetail = data.detail
    }
  }
}
</script>
