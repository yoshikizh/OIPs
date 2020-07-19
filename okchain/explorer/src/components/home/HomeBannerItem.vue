<template>
  <a @click="onClick" class="col-md-3 last-info-block-wrap">
    <div class="row last-info-block">
      <div class="icon">
        <b-icon-wallet font-scale="1.3" style="transform: rotate(-45deg);"></b-icon-wallet>
      </div>
      <div class="info">
        <div class="top">{{data.number}}</div>
        <div class="bot">{{data.text}}&nbsp;&gt;</div>
      </div>
    </div>
  </a>
</template>

<script>

export default {
  name: 'HomeBannerItem',
  components: {
  },
  props: {
    data: Object
  },
  methods: {
    onClick () {
      window.location.href = this.data.href
    }
  }
}
</script>

<style lang="scss">
.last-info-block-wrap{
  display: block; height: 132px; cursor: pointer;
  .last-info-block {
    height: 80px;
    padding-left: 53px;
    .icon {
      background-color: #f7f7f7;
      width: 64px; height: 64px; line-height: 64px;
      text-align: center; transform: rotate(45deg);
      border-radius: 6px; margin-top: 32px;
    }
    .info {
      margin-left: 40px; margin-top: 38px;
      .top { font-size: 26px; text-align: left}
      .bot {}
    }
  }
}
.last-info-block-wrap:hover { border: 1px solid #aaa; border-radius: 4px; height: 130px; background-color: #cccccc; }
</style>
