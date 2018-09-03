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
        <td><button type="submit" class="btn btn-secondary btn-fill float-right" @click.prevent="sendDel(item)">
          Del This Container
        </button></td>
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
    methods: {
      hasValue (item, column) {
        return item[column.toLowerCase()] !== 'undefined'
      },
      itemValue (item, column) {
        return item[column.toLowerCase()]
      },
      sendDel (item) {
        const body = {
          con_id: item['id']
        }
        this.$http.post(this.$cfg.path.api + 'data/containers/del', body)
        .then((response) => {
          this.containers = response.data
        })
        window.location.reload()
        alert('delete success')
      }
    }
  }
</script>
<style>
</style>
