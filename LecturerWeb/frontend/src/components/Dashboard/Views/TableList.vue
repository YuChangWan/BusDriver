<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card>
            <h4 slot="header" class="card-title">컨테이너 등록하기</h4>
            <form>
              <div class="row">
                <div class="col-md-3">
                  <fg-input type="text"
                            label="컨테이너 이름"
                            placeholder="컨테이너 이름을 입력"
                            v-model="ContainerName">
                  </fg-input>
                </div>
                <div class="col-md-4">
                  <p> <label>사용할 언어 선택</label> </p>
                  <select name="selectBox" id="selectBox">
                    <option value="C/C++" selected>C/C++</option>
                    <option value="JAVA">JAVA</option>
                    <option value="Python">Python</option>
                  </select>
                </div>
              </div>

              <div class="row">
                <div class="col-md-12">
                  <p> <label>컨테이너에 수용할 최대 수강자 수</label> </p>
                  <input type="radio" name="radio_btn" value="5" checked>5명
                  <input type="radio" name="radio_btn" value="10">10명
                  <input type="radio" name="radio_btn" value="15">15명
                  <input type="radio" name="radio_btn" value="20">20명
                  <input type="radio" name="radio_btn" value="30">30명
                  <input type="radio" name="radio_btn" value="40">40명
                </div>
              </div>

              <div class="row">
                <div class="col-md-12">
                  <div class="form-group">
                    <label>컨테이너 설명</label>
                    <textarea rows="3" class="form-control border-input"
                              placeholder="해당 컨테이너의 설명을 입력하세요"
                              v-model="ContainerComment">
                      </textarea>
                  </div>
                </div>
              </div>
              <div class="text-center">
                <button type="submit" class="btn btn-info btn-fill float-right" @click.prevent="sendPost">
                  컨테이너 등록
                </button>
              </div>
              <div class="clearfix"></div>
            </form>
          </card>
        </div>

        <div class="col-12">
          <card>
            <template slot="header">
              <h4 class="card-title">컨테이너 목록</h4>
              <p class="card-category">여기에서 컨테이너 목록을 볼 수 있습니다.</p>
            </template>
            <div class="table-responsive">
              <l-table class="table-hover table-striped"
                       :columns="table1.columns"
                       :data="containers">
              </l-table>
            </div>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import LTable from 'src/components/UIComponents/Table2.vue'
  import Card from 'src/components/UIComponents/Cards/Card.vue'
  const tableColumns = ['Name', 'Language', 'Maximumstudents', 'Comment']
  export default {
    components: {
      LTable,
      Card
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
              console.log("find", userId[0].id)
            })
        },
        function (e) {
          console.log('me error : ' + e.error.message)
        }
      )
      .then(() => {
        data = userId[0].id
        this.user_id = data

        var body = {
          id: this.user_id
        }

        this.$http.post(this.$cfg.path.api + 'data/containers/list', body)
        .then((response) => {
          this.containers = response.data
        })
      })
    },
    data () {
      return {
        containers: [],
        con_id: null,
        user_id: null,
        txtPost: '',
        ContainerName: '', // add
        ContainerComment: '', // add
        table1: {
          columns: [...tableColumns]
        }
      }
    },
    methods: {
      sendPost () {
        var selectBoxDatas = document.getElementById("selectBox")
        var radioBtnDatas = document.getElementsByName("radio_btn")
        var radioBtnLoc
        for (var i = 0; i < radioBtnDatas.length; i++) {
          if (radioBtnDatas[i].checked === true) {
            radioBtnLoc = i
          }
        }
        const body = {
          id: this.user_id,
          name: this.ContainerName,
          language: selectBoxDatas.options[selectBoxDatas.selectedIndex].value,
          maximumstudents: radioBtnDatas[radioBtnLoc].value,
          comment: this.ContainerComment
        }
        this.$http.post(this.$cfg.path.api + 'data/containers', body)
          .then((res) => {
            this.containers = res.data
          })
      }
    }
  }
</script>
<style scoped>
.container {
  display: inline-block;
  padding: 10px;
  text-align: left;
}
</style>
