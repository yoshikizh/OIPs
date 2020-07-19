<template>
  <WCartesian responsive :dataset="values">
    <WLine datakey="numTxs" curve>
    </WLine>
    <WXAxis datakey="height">
    </WXAxis>
    <WYAxis :label="$t('block.txNums')" labelAlign="middle" />
    <WTooltip />
  </WCartesian>
</template>

<script>
export default {
  name: 'HomeBlocksChart',
  updated () {
  },
  props: ['items'],
  computed: {
    values () {
      return this.items.slice(0, 15).map((obj) => {
        return {
          name: '交易数',
          height: parseInt(obj.height),
          numTxs: parseInt(obj.numTxs),
          totalFee: parseInt(obj.totalFee)
        }
      })
    }
  }
}
</script>
