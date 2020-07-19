<template>
  <div class="template-body">
    <div class="container">
      <div id="page-content">
        <div id="banner" class="container mt-md-5">
          <HomeBannerTitle />
          <HomeBannerSearchBar />
        </div>
      </div>

      <div class="row mt-4">
        <HomeBannerItem :data="blocks[0]" />
        <HomeBannerItem :data="blocks[1]" />
        <HomeBannerItem :data="blocks[2]" />
        <HomeBannerItem :data="blocks[3]" />
      </div>
    </div>
  </div>
</template>

<script>
import store from '../../store'
import HomeBannerItem from './HomeBannerItem.vue'
import HomeBannerTitle from './HomeBannerTitle.vue'
import HomeBannerSearchBar from './HomeBannerSearchBar.vue'
import i18n from '../../i18n'
export default {
  name: 'HomeBanner',
  created () {
    store.dispatch('apiGetTradePairs')
  },
  mounted () {
  },
  components: {
    HomeBannerItem,
    HomeBannerSearchBar,
    HomeBannerTitle
  },
  props: {
  },
  computed: {
    blocks () {
      return [
        {
          icon: 'square',
          number: store.state.latestBlock ? store.state.latestBlock.height : '--',
          text: i18n.t('lastBlock'),
          href: '/#/block/' + (store.state.latestBlock ? store.state.latestBlock.height : '')
        },
        {
          icon: 'wallet',
          number: store.state.validators ? store.state.validators.length : '--',
          text: i18n.t('banner.ValidatorCount'),
          href: '/#/validators'
        },
        {
          icon: 'wallet',
          number: store.state.tokens ? store.state.tokens.length : '--',
          text: i18n.t('banner.TokenCount'),
          href: '/#/tokens'
        },
        {
          icon: 'wallet',
          number: store.state.tradePairs ? store.state.tradePairs.length : '--',
          text: i18n.t('banner.TradePairCount'),
          href: '/#/tradePairs'
        }
      ]
    }
  }
}

</script>

<style scoped lang="scss">
  .template-body {
    width: 100%;  padding: 40px 0px;
    background: url(../../assets/banner-back.jpg) no-repeat center center;
    background-color: #e7e7e7;
  }
</style>
