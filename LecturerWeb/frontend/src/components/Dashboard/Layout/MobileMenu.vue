<template>
  <ul class="nav nav-mobile-menu">
    <li class="nav-item">
      <button type="submit" class="nav-link btn btn-fill" @click.prevent="doLogout">
          로그아웃
      </button>
    </li>
  </ul>
</template>
<script>
  import DropDown from 'src/components/UIComponents/Dropdown.vue'

  export default {
    components: {
      DropDown
    },
    methods: {
      doLogout () {
        var hello = this.$helloGoogle
        hello('google').logout().then(function () {
          alert('logout success')
          location.href = "#/auth/login"
        }, {force: true}, function (e) {
          alert('Signed out error: ' + e.error.message)
        })
      }
    }
  }
</script>
<style>
</style>
