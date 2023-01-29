<template>
  	<div class="app">
		<router-view @logIn="logIn" @logOut="logOut"></router-view>
	</div>
</template>

<script>
import { mapActions } from 'vuex';

	export default {
		name: 'App',
		methods: {
			...mapActions({
				meCheck: 'auth/meCheck',
			})
		},
		beforeMount() {
			this.meCheck()
		},
	}

</script>

<style>

*{
	box-sizing: border-box;
}
body{
	margin: 0;
}
.app{
	background: rgb(240, 238, 238);
	display: flex;
	justify-content: center;
	align-items: center;
	min-height: 100vh;
}


</style>
