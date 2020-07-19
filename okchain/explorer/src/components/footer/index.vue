<template>
  <div class="template-body mt-4">
    <div class="container">
      <div class="row">
        <div class="col-md-3 logo">
          <img src="../../assets/logo-okchain.png" style="width: 160px;" />
        </div>
        <div class="col-md-3 block">
          <div class="title">{{$t('footer.about')}}</div>
          <div class="link"><a href='/#/about'>{{$t('footer.team')}}</a></div>
          <div class="link"><a href=/#/history>{{$t('footer.updateHistory')}}</a></div>
          <!-- <div class="link"><a href=/#/feedback>意见反馈</a></div> -->
        </div>
        <div class="col-md-3 block">
          <div class="title">{{$t('footer.development')}}</div>
          <div class="link"><a href="https://github.com/okex/okchain" target="_blank">OKChain {{$t('footer.coreCode')}}</a></div>
          <div class="link"><a href="https://okchain-docs.readthedocs.io/en/latest" target="_blank">OKChain {{$t('footer.document')}}</a></div>
        </div>
        <div class="col-md-3 block">
          <div class="title">{{$t('footer.links')}}</div>
          <div class="link"><a href="https://www.okex.com/okchain" target="_blank">OKChain {{$t('footer.website')}}</a></div>
          <!-- <div class="link"><a href="https://www.okex.com/okchain" target="_blank">OKChain 官方论坛</a></div> -->
        </div>
      </div>
    </div>

    <div class="copyright">
      2020 © okchain.ws Team. All rights reserved.
    </div>
  </div>
</template>

<script>

export default {
  name: 'Footer'
}

</script>

<style scoped lang="scss">
  .template-body {
    width: 100%; background: #333a41; padding-top: 40px;
    .logo { color: white; font-size: 28px; font-weight: 600; }
    .block { text-align: left;}
    .title {
      color: white; font-size: 18px; font-weight: 400;
    }
    .link {
      margin-top: 12px;
      a { color: #3bafda; font-size: 14px; }
    }
    .copyright { font-size: 14px; border-top: 1px solid #4a4a4a; margin-top: 40px; padding: 8px 0; color: white; }
  }
</style>
