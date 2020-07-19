<template>
  <div>
    <b-card-group deck>
      <b-card bg-variant="light" :header="`交易-${this.$route.params.hash}  `" class="text-left">
        <b-card-text>
          <div class="row" style="color: #666;">
            <div class="col-md-3">
              <div>{{$t('transaction.time')}}</div>
              <!-- <div>{{$t('transaction.status')}}</div> -->
              <div>{{$t('transaction.height')}}</div>
              <div>{{$t('transaction.sender')}}</div>
            </div>
            <div class="col-md-3 text-right" style="border-right: 1px solid #ddd;">
              <div>{{this.formatData.time}}</div>
              <!-- <div></div> -->
              <div>{{this.formatData.height}}</div>
              <div><a :href="`/#/address/${this.formatData.sender}`">{{this.formatData.sender}}</a></div>
            </div>
            <div class="col-md-3">
              <div>{{$t('transaction.amount')}}</div>
              <div>{{$t('transaction.fee')}}</div>
              <div>{{$t('transaction.txType')}}</div>
              <div>{{$t('transaction.confirmTxNums')}}</div>
            </div>
            <div class="col-md-3 text-right">
              <div>0.5854 TOKT</div>
              <div>{{this.formatData.fee}} TOKT</div>
              <div>{{this.formatData.type}}</div>
              <div>4722</div>
            </div>
          </div>
          <div class="row" style="margin-top: 20px;">
            <div class="col-md-2" style="color: #666;">{{$t('common.detail')}}</div>
            <div class="col-md-10" v-html="this.formatData.detail" style="padding: 15px; border: 1px solid #ddd; background-color: #fbfcff; font-size: 12px;">
            </div>
          </div>
          <div class="row" style="margin-top: 20px;">
            <div class="col-md-2" style="color: #666;">{{$t('transaction.data')}}</div>
            <div class="col-md-10" style="padding: 15px; border: 1px solid #ddd; background-color: #fbfcff; font-size: 12px;">
              {{this.originData}}
            </div>
          </div>
        </b-card-text>
      </b-card>
    </b-card-group>
  </div>

</template>

<script>
import store from '../../store'
export default {
  name: 'Tx',
  computed: {
    items () {
      return [{}]
    }
  },
  created () {
    Request.get('/txs/' + this.$route.params.hash).then((resp) => {
      this.originData = resp.data
      this.formatData = store.getters.formatTransaction(resp.data)
    })
  },
  data () {
    return {
      originData: {},
      formatData: {}
    }
  }
}

</script>
