<template>
   <div>
    <b-navbar toggleable="lg" type="dark" variant="dark" fixed>
      <b-navbar-brand href="#/"><img src="../../assets/logo-okchain.png" style="width: 100px;" /></b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="/#/txs">{{$t('names.transaction')}}</b-nav-item>
          <b-nav-item href="/#/validators">{{$t('names.validator')}}</b-nav-item>
          <b-nav-item href="/#/tokens">{{$t('names.token')}}</b-nav-item>
          <b-nav-item href="/#/tradePairs">{{$t('names.tradePair')}}</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form @submit.prevent="onSubmit">
            <b-form-input style="width: 300px;" v-model.lazy.trim="keyword" size="sm" class="mr-sm-2" :placeholder="`${$t('names.address')} / ${$t('names.transaction')} / ${$t('names.height')}`"></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">{{$t('names.search')}}</b-button>
          </b-nav-form>
          <div class="ml-3">
            <img v-if="$i18n.locale==='zh'" src="../../assets/flag-zh.png" style="width: 24px; height: 24px; line-height: 24px; margin-top: 8px; "/>
            <img v-if="$i18n.locale==='en'" src="../../assets/flag-en.png" style="width: 24px; height: 24px; line-height: 24px; margin-top: 8px; "/>
          </div>
          <b-nav-item-dropdown :text="$t('toggleLang')" right>
            <b-dropdown-item @click="onClickChangeLangEn" href="#">
              <img src="../../assets/flag-en.png" style="width: 20px; height: 20px; "/>
              EN
            </b-dropdown-item>
            <b-dropdown-item @click="onClickChangeLangZh" href="#">
              <img src="../../assets/flag-zh.png" style="width: 20px; height: 20px; "/>
              简体中文
            </b-dropdown-item>
          </b-nav-item-dropdown>

        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>

import Utils from '../../common/Utils.js'

export default {
  name: 'TopNav',
  data: function () {
    return {
      keyword: ''
    }
  },
  methods: {
    onSubmit: function () {
      Utils.onSubmitForSearch(this.keyword)
    },
    onClickChangeLangEn () {
      window.$i18n.locale = 'en'
    },
    onClickChangeLangZh () {
      window.$i18n.locale = 'zh'
    }
  }
}

</script>
