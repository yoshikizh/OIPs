<template>
  <b-card-body class="text-center">
    <div>
      <b-card-text>
        <b-table striped hover :items="items" :fields="fields">
          <template v-slot:cell(locked)="data">
            <span>{{data.item.locked === '0' ? $t('common.no') : $t('common.yes')}}</span>
          </template>
        </b-table>
      </b-card-text>
    </div>
  </b-card-body>
</template>

<script>

import i18n from '../../i18n'

export default {
  name: 'Balance',
  created () {
  },
  props: ['list'],
  computed: {
    fields () {
      return [
        {
          key: 'symbol',
          label: i18n.t('token.symbol')
        },
        {
          key: 'available',
          label: i18n.t('token.position')
        },
        {
          key: 'locked',
          label: i18n.t('token.locked')
        }
      ]
    },
    items () {
      return this.list
    }
  }
}
</script>

<style scoped lang="scss">
  table {
    td { font-size: 12px; }
  }
</style>
