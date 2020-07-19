<template>
  <div class="col-md-12">
    <b-card style="margin-top: 20px;">
      <div class="title-bar row">
        <div class="col-md-6 title">市场</div>
        <div class="col-md-6 buttons">
          <b-button variant="light" size="sm">推荐</b-button>
          &nbsp;
          <b-button variant="dark" size="sm">自选</b-button>
        </div>
      </div>
      <div class="table-wraps">
        <b-table sticky-header :busy="isBusy" :fields="fields" :items="items" style="margin-bottom: 0; max-height: 450px;" head-variant="light">
          <template v-slot:cell(star)="data">
            <a class="star" @click="onStarClicked(data.item)" >
              <b-icon-star font-scale="1" variant="warning"></b-icon-star>
            </a>
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
    </b-card>
  </div>
</template>

<script>

import store from '../../store'

export default {
  name: 'HomeAccounts',
  created: function () {
    store.dispatch('apiGetTradePairs')
  },
  computed: {
    fields () {
      return [
        {
          key: 'star',
          label: ''
        },
        {
          key: 'tradePair',
          label: '市场'
        },
        {
          key: 'price',
          label: '价格'
        }
      ]
    },
    items () {
      return store.getters.tradePairs()
    }
  },
  data: function () {
    return {
      isBusy: false
    }
  },
  methods: {
    onStarClicked: function (data) {
      console.log(data.id)
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
  .table-wraps { overflow-y: auto; height: 442px; }
</style>
