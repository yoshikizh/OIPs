<template>
  <div>
    <b-card-body class="text-center">
      <div>
        <b-card-text>
          <b-table striped hover :items="items" :fields="fields">
            <template v-slot:cell(voter_address)="data">
              <a :href="`/#/address/${data.item.voter_address}`">{{data.item.voter_address}}</a>
            </template>
          </b-table>
          <b-overlay :show="showOverlay" no-wrap></b-overlay>
        </b-card-text>
      </div>
    </b-card-body>
  </div>
</template>

<script>

import i18n from '../../i18n'

export default {
  name: 'ValidatorVotes',
  created () {
    Request.get('/staking/validators/' + this.$route.params.id + '/votes').then((resp) => {
      this.items = resp.data
      this.showOverlay = false
    })
  },
  props: ['list'],
  data () {
    return {
      showOverlay: true,
      items: []
    }
  },
  computed: {
    fields () {
      return [
        {
          key: 'voter_address',
          label: i18n.t('names.address')
        },
        {
          key: 'votes',
          label: i18n.t('validator.votes')
        }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
  table {
    td { font-size: 12px; }
  }
</style>
