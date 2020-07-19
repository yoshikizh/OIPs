<template>
  <div class="col-md-6">
    <b-card style="margin-top: 20px;">
      <div class="title-bar row">
        <div class="col-md-6 title">{{$t('names.validator')}}</div>
        <div class="col-md-6 buttons">
          <a class="btn btn-primary" href="/#/validators">{{$t('common.detail')}}</a>
        </div>
      </div>
      <div class="table-wraps">
        <b-table sticky-header :busy="isBusy" :fields="fields" :items="items" style="margin-bottom: 0; max-height: 450px;" head-variant="light">
          <template v-slot:cell(moniker)="data">
            <a :href="`/#/address/${data.item.operatorAddress}`">{{data.item.moniker}}</a>
          </template>

          <template v-slot:table-busy>
            <div class="text-center text-danger my-2">
              <b-spinner class="align-middle"></b-spinner>
              &nbsp;&nbsp;
              <strong>Loading...</strong>
            </div>
          </template>
        </b-table>
      </div>
      <b-overlay :show="showOverlay" no-wrap></b-overlay>
    </b-card>
  </div>
</template>

<script>

import store from '../../store'
import i18n from '../../i18n'

export default {
  name: 'HomeAccounts',
  computed: {
    showOverlay () {
      return !store.state.initializeValidatorsFinished
    },
    fields () {
      return [
        {
          key: 'index',
          label: i18n.t('validator.rank')
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
    },
    items () {
      return store.getters.validatorsTop21().map((obj, index) => {
        return { index: index + 1, ...obj }
      })
    }
  },
  created: function () {
    store.dispatch('apiGetValidators')
  },
  data: function () {
    return {
      isBusy: false
    }
  },
  methods: {
    onStarClicked: function (data) {
      console.log(data)
    },
    toggleBusy: function () {
      this.isBusy = !this.isBusy
    }
  }
}
</script>

<style scoped lang="scss">
  .card { height: 528px; }
  .title-bar {
    margin-bottom: 15px;
    .title {
      text-align: left; font-weight: 600;
    }
    .buttons {
      text-align: right;
    }
  }
  .star { cursor: pointer;}
  .star:hover { color: #ffb33f; }
  // .table-wraps { overflow-y: auto; height: 442px; }
</style>
