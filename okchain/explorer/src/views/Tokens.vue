<template>
  <div class="container" style="margin-top: 20px;">
    <b-breadcrumb :items="breadcrumbItems"></b-breadcrumb>
    <b-card style="margin-top: 20px; background-color: white; ">
      <b-table class="align-table" head-variant="light" :fields="fields" :items="items">
        <template v-slot:cell(symble)="data">
          <a :href="`/#/token/${data.item.symble}`">{{data.item.symble}}</a>
        </template>
        <template v-slot:cell(total_supply)="data">
          {{parseInt(data.item.total_supply)}}
        </template>
        <template v-slot:cell(original_total_supply)="data">
          {{parseInt(data.item.original_total_supply)}}
        </template>
        <template v-slot:cell(owner)="data">
          <a :href="`/#/address/${data.item.owner}`">{{data.item.owner.slice(0,16) + '...'}}</a>
        </template>
      </b-table>
      <b-overlay :show="showOverlay" no-wrap></b-overlay>
    </b-card>
  </div>
</template>

<script>

import store from '../store'
import i18n from '../i18n'

export default {
  name: 'Tokens',
  created () {
    const existTokens = store.state.tokens.length > 0
    if (existTokens) {
      this.getTokens()
      this.showOverlay = false
    } else {
      store.dispatch('apiGetTokens').then(() => {
        this.getTokens()
        this.showOverlay = false
      })
    }
  },
  computed: {
    breadcrumbItems () {
      return [
        {
          text: i18n.t('names.homepage'),
          href: '/#/'
        },
        {
          text: i18n.t('names.token'),
          active: true
        }
      ]
    },
    fields () {
      return [
        {
          key: 'symbol',
          label: i18n.t('common.name')
        },
        {
          key: 'whole_name',
          label: i18n.t('token.fullName')
        },
        {
          key: 'total_supply',
          label: i18n.t('token.totalSupply')
        },
        {
          key: 'original_symbol',
          label: i18n.t('token.originName')
        },
        {
          key: 'original_total_supply',
          label: i18n.t('token.originSupply')
        },
        {
          key: 'owner',
          label: i18n.t('token.ownerAccount')
        },
        {
          key: 'description',
          label: i18n.t('common.description')
        }

      ]
    }
  },
  data () {
    return {
      showOverlay: true,
      items: []
    }
  },
  methods: {
    getTokens () {
      this.items = store.state.tokens
    }
  }
}
</script>
