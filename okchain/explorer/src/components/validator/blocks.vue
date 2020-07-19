<template>
  <div>
    <b-card-body class="text-center">
      <div>
        <b-card-text>
          <b-table striped hover :items="items" :fields="fields"></b-table>
        </b-card-text>
      </div>
    </b-card-body>
  </div>
</template>

<script>

export default {
  name: 'Blocks',
  created () {
  },
  props: ['list'],
  computed: {
    fields () {
      return [
        {
          key: 'height',
          label: '区块高度'
        },
        {
          key: 'time',
          label: '出块时间'
        },
        {
          key: 'txNum',
          label: '交易数量'
        },
        {
          key: 'fee',
          label: '手续费'
        }
      ]
    },
    items () {
      return []
    }
  }
}
</script>

<style scoped lang="scss">
  table {
    td { font-size: 12px; }
  }
</style>
