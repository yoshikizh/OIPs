<template>
  <div class="about container" style="width: 520px;">

    <div class="title">{{$t('footer.about')}}</div>

    <p>
      {{$t('about.content1')}}
    </p>

    <p>
      {{$t('about.content2')}}
    </p>

    <div style="color: rgba(39,54,78,0.8);">
      <div class="contact">{{$t('about.contact')}}</div>
      <p style="margin-bottom: 0;">{{$t('about.email')}}： <a href="mailto:contact@btsplusplus.com">contact@btsplusplus.com</a></p>
      <p>{{$t('about.telegram')}}： https://t.me/btsplusplus</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .about { margin-top: 48px; }
  .title { font-weight: 600; font-size: 32px; margin-bottom: 32px; }
  .contact {text-align: left; font-weight: 500; font-size: 23px;}
  h2 {}
  p { text-align: left; color: rgba(39,54,78,0.8); }
</style>

<script>
export default {
  name: 'About'
}
</script>
