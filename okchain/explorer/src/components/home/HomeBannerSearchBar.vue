<template>
  <form class="row" @submit.prevent="onSubmit">
    <input v-model.lazy.trim="keyword" type="search" :placeholder="`${$t('names.address')} / ${$t('names.transaction')} / ${$t('names.height')}`" aria-label="Search" style="height: 50px; line-height: 50px; border-radius: 0;" class="form-control col-md-7 offset-md-2">
    <button type="submit" style="height: 50px; line-height: 50px; padding: 0 0px; border-radius: 0;" class="col-md-1 btn btn-outline-dark my-2 my-sm-0">{{$t('names.search')}}</button>
  </form>
</template>

<script>

import Utils from '../../common/Utils.js'

export default {
  name: 'HomeBannerSearchBar',
  data: function () {
    return {
      keyword: ''
    }
  },
  methods: {
    onSubmit: function () {
      Utils.onSubmitForSearch(this.keyword)
    }
  }
}

</script>
