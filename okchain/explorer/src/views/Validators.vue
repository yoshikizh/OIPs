<template>
  <div class="container" style="margin-top: 20px;">
    <b-breadcrumb :items="breadcrumbItems"></b-breadcrumb>
    <b-card style="margin-top: 20px; background-color: white; ">
      <WCartesian
        :dataset="chartData" :height="300" :bound="[0]" responsive >
          <WBar datakey="votes" :width="30" />
          <WXAxis datakey="index" :space="[0, 50, 50, 50]" />
          <WYAxis :space="[25, 0, 0, 50]" />
      </WCartesian>

      <b-table class="align-table" head-variant="light" responsive="true" :fields="this.fields" :items="this.items">
        <template v-slot:cell(moniker)="data">
          <a :href="`/#/address/${data.item.operatorAddress}`">{{data.item.moniker}}</a>
        </template>
        <template v-slot:cell(index)="data">
          <span v-if="parseInt(data.item.index) <= 21" style="color: #2ead65;">
            {{data.item.index}}
          </span>
          <span v-else>
            {{data.item.index}}
          </span>
        </template>
        <template v-slot:cell(delegatorShares)="data">
          {{parseInt(data.item.delegatorShares)}}
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
  created () {
    const existValidators = store.state.validators.length > 0
    if (existValidators) {
      this.getValidators()
      this.showOverlay = false
    } else {
      store.dispatch('apiGetValidators').then(() => {
        this.getValidators()
        this.showOverlay = false
      })
    }
  },
  name: 'Validator',
  computed: {
    chartData () {
      return this.items.slice(0, 21).map((obj, index) => {
        return {
          index: index + 1,
          votes: parseInt(obj.delegatorShares)
        }
      })
    },
    fields () {
      return [
        {
          key: 'index',
          label: i18n.t('validator.rank')
        },
        {
          key: 'operatorAddress',
          label: i18n.t('names.address')
        },
        {
          key: 'moniker',
          label: i18n.t('common.name')
        },
        {
          key: 'delegatorShares',
          label: i18n.t('validator.votes')
        }
      ]
    }
  },
  data () {
    return {
      showOverlay: true,
      items: [],
      breadcrumbItems: [
        {
          text: i18n.t('names.homepage'),
          href: '/#/'
        },
        {
          text: i18n.t('names.validator'),
          active: true
        }
      ]
    }
  },
  methods: {
    getValidators () {
      this.items = store.getters.allValidatorsSorted().map((validator, index) => {
        return {
          index: index + 1,
          moniker: validator.description.moniker,
          operatorAddress: validator.operator_address,
          delegatorShares: validator.delegator_shares
        }
      })
    }
  }
}
</script>
