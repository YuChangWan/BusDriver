<template>
  <card>
    <h4 slot="header" class="card-title">강의자 프로필</h4>
    <form>
      <div class="row">
        <div class="col-md-3">
          <fg-input type="text"
                    label="강의자 이름"
                    placeholder="강의자 이름"
                    :disabled="true"
                    v-model="userName">
          </fg-input>
        </div>
        <div class="col-md-4">
          <fg-input type="email"
                    label="강의자 Email"
                    placeholder="Email"
                    :disabled="true"
                    v-model="userEmail">
          </fg-input>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <fg-input type="text"
                    label="주소"
                    placeholder="강의자의 주소를 입력하세요"
                    v-model="userAddress">
          </fg-input>
        </div>
      </div>

      <div class="row">
        <div class="col-md-4">
          <fg-input type="text"
                    label="거주 도시"
                    placeholder="강의자의 도시 입력"
                    v-model="userCity">
          </fg-input>
        </div>
        <div class="col-md-4">
          <fg-input type="text"
                    label="거주 국가"
                    placeholder="강의자의 국가 입력"
                    v-model="userCountry">
          </fg-input>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <div class="form-group">
            <label>강의자 소개</label>
            <textarea rows="5" class="form-control border-input"
                      placeholder="강의자 소개문을 여기에 입력"
                      v-model="userAbout_me">
              </textarea>
          </div>
        </div>
      </div>
      <div class="text-center">
        <button type="submit" class="btn btn-info btn-fill float-right" @click.prevent="updateProfile">
          Profile 수정
        </button>
      </div>
      <div class="clearfix"></div>
    </form>
  </card>
</template>
<script>
  import Card from 'src/components/UIComponents/Cards/Card.vue'

  export default {
    components: {
      Card
    },
    created () {
      var tempHttp = this.$http
      var tempPath = this.$cfg.path.api
      var hello = this.hello
      var user_id = null
      var data = this.user_id
      hello('google').api('me').then(
        function (json) {
          var body = {
            user_email: json.email,
            user_name: json.name
          }
          return tempHttp.post(tempPath + 'auth/sign/check', body)
            .then((res) => {
              user_id = res.data
              console.log("find", user_id[0].id)
            })
        },
        function (e) {
          console.log('me error : ' + e.error.message)
        }
      )
      .then(() => {
        data = user_id[0].id
        console.log("find2", data)
      })

      var body = {
        id: this.user_id
      }

      this.$http.post(this.$cfg.path.api + 'data/lecturers', body)
      .then((response) => {
        this.user = response.data
        this.userName = this.user[0].name
        this.userEmail = this.user[0].email
        this.userAddress = this.user[0].address
        this.userCountry = this.user[0].country
        this.userCity = this.user[0].city
        this.userAbout_me = this.user[0].about_me
      })
    },
    data () {
      return {
        user_id: 1,
        userName: '',
        userEmail: '',
        userAddress: '',
        userCountry: '',
        userCity: '',
        userAbout_me: '',
        user: {}
      }
    },
    methods: {
      findId () {
        var tempHttp = this.$http
        var tempPath = this.$cfg.path.api
        var hello = this.hello
        var user_id = null

        return hello('google').api('me').then(
          function (json) {
            var body = {
              user_email: json.email,
              user_name: json.name
            }
            tempHttp.post(tempPath + 'auth/sign/check', body)
              .then((res) => {
                user_id = res.data
                console.log("find", user_id[0].id)
              })
          },
          function (e) {
            console.log('me error : ' + e.error.message)
          }
        )
      },
      updateProfile () {
        const body = {
          id: this.user_id,
          name: this.userName,
          email: this.userEmail,
          address: this.userAddress,
          city: this.userCity,
          country: this.userCountry,
          about_me: this.userAbout_me
        }
        this.$http.put(this.$cfg.path.api + 'data/lecturers', body)
        .then((response) => {
          this.user = response.data
          this.userName = this.user[0].name
          this.userEmail = this.user[0].email
          this.userAddress = this.user[0].address
          this.userCountry = this.user[0].country
          this.userCity = this.user[0].city
          this.userAbout_me = this.user[0].about_me
        })
        alert('Update success')
      }
    }
  }

</script>
<style>

</style>
