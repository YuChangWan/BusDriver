<template>
  <table class="table">
    <thead>
      <slot name="columns">
        <th v-for="column in columns">{{column}}</th>
      </slot>
    </thead>
    <tbody>
    <tr v-for="item in data">
      <slot :row="item">
        <td v-for="column in columns" v-if="hasValue(item, column)">{{itemValue(item, column)}}</td>
        <td>
          <td><button style="font-size:14px" type="submit" class="btn btn-primary btn-xs btn-fill float-right" @click.prevent="startContainer(item)">
            Start
          </button></td>
          <td><button style="font-size:14px" type="submit" class="btn btn-warning btn-xs btn-fill float-right" @click.prevent="stopContainer(item)">
            Stop
          </button></td>
          <td><button style="font-size:14px" type="submit" class="btn btn-danger btn-xs btn-fill float-right" @click.prevent="delContainer(item)">
            Delete
          </button></td>
        </td>

      </slot>
    </tr>
    </tbody>
  </table>
</template>
<script>
  export default {
    name: 'l-table2',
    props: {
      columns: Array,
      data: Array
    },
    data () {
      return {
        user_id: null,
        alertStartMessage: '',
        alertStopMessage: '',
        alertDeleteMessage: ''
      }
    },
    created () {
      var tempHttp = this.$http
      var tempPath = this.$cfg.path.api
      var hello = this.$helloGoogle
      var userId = null
      var data = null

      hello('google').api('me').then(
        function (json) {
          var body = {
            user_email: json.email,
            user_name: json.name
          }
          return tempHttp.post(tempPath + 'auth/sign/check', body)
            .then((res) => {
              userId = res.data
            })
        },
        function (e) {
          console.log('me error : ' + e.error.message)
        }
      )
      .then(() => {
        data = userId[0].id
        this.user_id = data
      })
    },
    methods: {
      swalSuccess (msg) {
        return this.$swal({
          icon: 'success',
          // button: false,
          title: '성공',
          text: msg,
          timer: 2000
        })
      },
      hasValue (item, column) {
        return item[column.toLowerCase()] !== 'undefined'
      },
      itemValue (item, column) {
        return item[column.toLowerCase()]
      },
      startContainer (item) {
        const body = {
          id: this.user_id,
          con_name: item['name'],
          con_uuid: item['uuid']
        }
        this.$http.post(this.$cfg.path.api + 'data/containers/start', body)
        .then((response) => {
          this.alertStartMessage = response.data
        })
        .then(() => {
          return this.swalSuccess(this.alertStartMessage)
        })
        .then(() => {
          window.location.reload()
        })
      },
      stopContainer (item) {
        const body = {
          id: this.user_id,
          con_name: item['name'],
          con_uuid: item['uuid']
        }
        this.$http.post(this.$cfg.path.api + 'data/containers/stop', body)
        .then((response) => {
          this.alertStopMessage = response.data
        })
        .then(() => {
          return this.swalSuccess(this.alertStopMessage)
        })
        .then(() => {
          window.location.reload()
        })
      },
      delContainer (item) {
        const body = {
          id: this.user_id,
          con_name: item['name'],
          con_id: item['id'],
          con_uuid: item['uuid']
        }
        this.$http.post(this.$cfg.path.api + 'data/containers/del', body)
        .then((response) => {
          this.alertDeleteMessage = response.data
        })
        .then(() => {
          return this.swalSuccess(this.alertDeleteMessage)
        })
        .then(() => {
          window.location.reload()
        })
      }
    }
  }
</script>
<style>
</style>
