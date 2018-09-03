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
					<button style='color: white; background-color: #008CBA' class="btn btn-default" @click="openMyPage()">구글인증하기</button> <br />
				</td>
			</tr>
		</table>
	</div>
</template>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script src="./hello.all.js"></script>

<script>
export default {
  methods: {
    openMyPage () {
      location.href = "#/admin/overview"
    }
  }
}
</script>

<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css">
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js"></script>

<style>
  #wrapper { position:relative; min-width:100%; min-height:100%; _height:100%; text-align:center; vertical-align:middle;}
</style>
