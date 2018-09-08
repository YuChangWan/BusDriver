<template>
  <div id="wrapper">
		<!-- <img src="cloud.jpg" alt="cloud image" style="width: 30%; height: 100%;" align='left'/> -->

		<table style='width: 30%; border-style: solid; border-width: 1px; top: 50%; left: 50%; position: absolute; height: 80%; text-align: center; margin: -15% 0pt 0pt -15%; border-color:black' cellspacing="0" cellpadding="0">
			<tr>
	    	<td>
					<br /> <img src="static/img/openstack.png" alt="openstack Image" />
					<label style='color: gray'> ~Team BusDriver~ </label> <br /> <br />
	      </td>
	   	</tr>
			<tr>
	   	</tr>
			<tr>
				<td>
					<button style='color: white; background-color: #008CBA' class="btn btn-default" @click="auth()">구글인증하기</button> <br />
				</td>
			</tr>
		</table>
	</div>
</template>

<script>
export default {
  methods: {
    auth () {
      const hello = this.hello
      hello('google').login({scope: 'email'}).then(function (auth) {
        hello(auth.network).api('/me').then(function (r) {
          hello('google').api('me').then(
            function (json) {
              console.log("정보: ", json)
              console.log("이름: ", json.name)
              console.log("이메일: ", json.email)
              console.log("썸네일: ", json.thumbnail)
              console.log("고유id: ", json.id)
            },
            function (e) {
              console.log('me error : ' + e.error.message)
            }
          )
          location.href = "#/admin/overview"
        })
      })
    }
  }
}
</script>

<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css">
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js"></script>

<style>
  #wrapper { position:relative; min-width:100%; min-height:100%; _height:100%; text-align:center; vertical-align:middle;}
</style>
