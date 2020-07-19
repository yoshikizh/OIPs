<template>
  <div class="history container" style="width: 520px;">

    <div class="title">{{$t('footer.updateHistory')}}</div>

    <div class="row wrapper">
      <div class="col-md-3">
        <div class="time">2020-07-20</div>
      </div>
      <div class="col-md-1">
        <div><b-spinner small label="Small Spinner" type="grow"></b-spinner></div>
        <div class="line" style="height: 130px;"></div>
      </div>
      <div class="col-md-8">
        <div class="content">
          <div>{{$t('updates.update20200720.item1')}} &nbsp; <b-badge>New</b-badge></div>
          <div>{{$t('updates.update20200720.item2')}} &nbsp;<b-badge>New</b-badge></div>
          <div>{{$t('updates.update20200720.item3')}} &nbsp;<b-badge>New</b-badge></div>
          <div>{{$t('updates.update20200720.item4')}} &nbsp;<b-badge>New</b-badge></div>
        </div>
      </div>
    </div>
    <div class="row wrapper">
      <div class="col-md-3">
        <div class="time">2020-06-25</div>
      </div>
      <div class="col-md-1">
        <div><div class="dot"></div></div>
        <div class="line" style="height: 40px;"></div>
      </div>
      <div class="col-md-8">
        <div class="content">
          <div>{{$t('updates.update20200625.item1')}}</div>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped lang="scss">
  .wrapper {margin-top: -12px; }
  .history { margin-top: 48px; }
  .line {width: 0px; border-left: 4px solid #3d4145; margin-top: -12px; margin-left: 6px;}
  .title { font-weight: 600; font-size: 32px; margin-bottom: 32px; }
  .dot {width: 16px; height: 16px; border-radius: 10px; background-color: #3c4145;}
  .time { margin-top: 20px; }
  .content { margin-top: 10px; text-align: left;}
</style>

<script>
export default {
  name: 'history'
}
</script>
