<template>
  <div class="container" style="margin-top: 20px;">
    <b-breadcrumb :items="breadcrumbItems"></b-breadcrumb>
    <b-card-group deck>
      <b-card bg-variant="light" :header="`代币-${this.$route.params.name}  `" class="text-left">
        <b-card-text>
          <div class="row" style="color: #666;">
            <div class="col-md-3">
              <div>名称</div>
              <div>发行数量</div>
              <div>原始名称</div>
              <div>原始发行数量</div>
            </div>
            <div class="col-md-3 text-right" style="border-right: 1px solid #ddd;">
              <div>{{this.token ? this.token.symbol : '--'}}</div>
              <div>{{this.token ? this.token.total_supply : '--'}}</div>
              <div>{{this.token ? this.token.original_symbol : '--'}}</div>
              <div>{{this.token ? this.token.original_total_supply : '--'}}</div>
            </div>
            <div class="col-md-3">
              <div>全名</div>
              <div>发行地址</div>
              <div>是否可增发</div>
              <div>描述</div>
            </div>
            <div class="col-md-3 text-right">
              <div>{{this.token ? this.token.whole_name : '--'}}</div>
              <div v-if="this.token">
                <a :href="'/#/address/'+this.token.owner">{{this.token.owner.slice(0,16) + '...'}}</a>
              </div>
              <div>{{this.token ? (this.token.mintable ? '是' : '否') : '--'}}</div>
              <div>{{this.token ? this.token.description : '--'}}</div>
            </div>
          </div>
          <hr />
          <div class="row" style="color: #666;">
            <div class="col-md-3">相关交易对</div>
          </div>
          <div class="row" style="color: #666; margin-top: 10px;">
            <div class="col-md-12">
              <a class="btn btn-primary" style="margin-right: 10px;" v-for="item in this.tradePairs" :key="item.token_pair_id" :href="`/#/tradePair/${item.base_asset_symbol}_${item.quote_asset_symbol}`">
                {{item.base_asset_symbol}}/{{item.quote_asset_symbol}}
              </a>
            </div>
          </div>
        </b-card-text>
      </b-card>
    </b-card-group>

  </div>
</template>

<script>

import store from '../store'

export default {
  name: 'Validator',
  created () {
    store.dispatch('apiGetTokens')
    store.dispatch('apiGetTradePairs')
  },
  computed: {
    token () {
      return store.state.tokens.filter((token) => {
        return token.symbol === this.$route.params.name
      })[0]
    },
    tradePairs () {
      const currSymbol = this.$route.params.name
      return store.state.tradePairs.filter((tradePair) => {
        return tradePair.base_asset_symbol === currSymbol || tradePair.quote_asset_symbol === currSymbol
      })
    }
  },
  data () {
    return {
      breadcrumbItems: [
        {
          text: '首页',
          href: '/#/'
        },
        {
          text: '代币',
          href: '/#/tokens'
        },
        {
          text: this.$route.params.name,
          active: true
        }
      ]
    }
  },
  components: {
  }
}
</script>
