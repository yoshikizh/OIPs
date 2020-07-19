<template>
  <div class="col-md-4">
    <b-card style="margin-top: 20px;">
      <div class="title-bar row">
        <div class="col-md-6 title">账户</div>
        <div class="col-md-6 buttons">
          <b-button variant="light" size="sm">推荐</b-button>
          &nbsp;
          <b-button variant="dark" size="sm">自选</b-button>
        </div>
      </div>
      <b-table :busy="isBusy" :fields="fields" :items="items" style="margin-bottom: 0;" head-variant="light">
        <template v-slot:cell(star)="data">
          <a class="star" @click="onStarClicked(data.item)" >
            <b-icon-star font-scale="1" variant="warning"></b-icon-star>
          </a>
        </template>
        <template v-slot:table-busy>
          <div class="text-center text-danger my-2">
            <b-spinner class="align-middle"></b-spinner>
            &nbsp;&nbsp;
            <strong>Loading...</strong>
          </div>
        </template>
      </b-table>
    </b-card>
  </div>
</template>

<script>
export default {
  name: 'HomeAccounts',
  data () {
    return {
      isBusy: true,
      fields: [
        {
          key: 'star',
          label: ''
        },
        '账户',
        'tokt持有量'
      ],
      items: [
        { star: '', 账户: 'btspp', tokt持有量: '212202', id: 0 },
        { star: '', 账户: 'btspp', tokt持有量: '212202', id: 1 },
        { star: '', 账户: 'btspp', tokt持有量: '212202', id: 2 },
        { star: '', 账户: 'btspp', tokt持有量: '212202', id: 3 },
        { star: '', 账户: 'btspp', tokt持有量: '212202', id: 4 },
        { star: '', 账户: 'btspp', tokt持有量: '212202', id: 5 },
        { star: '', 账户: 'btspp', tokt持有量: '212202', id: 6 },
        { star: '', 账户: 'btspp', tokt持有量: '212202', id: 7 }
      ]
    }
  },
  methods: {
    onStarClicked: function (data) {
      console.log(data.id)
    },
    toggleBusy: function () {
      this.isBusy = !this.isBusy
    }
  }
}
</script>

<style scoped lang="scss">
  .card { height: 528px; }
  .title {
    margin-bottom: 15px;
    .account {
      text-align: left; font-weight: 600;
    }
    .buttons {
      text-align: right;
    }
  }
  .star { cursor: pointer;}
  .star:hover { color: #ffb33f; }
</style>
