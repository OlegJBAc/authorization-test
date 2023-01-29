<template>

    <div class="main">
        <div class="main__title">
            <div class="main__header">Hi, {{ $store.state.auth.authData.login }} is test authorized page</div>
        </div>
        <div class="main__logout">
            <myButton id="btn__main" @click="$store.dispatch('auth/logOut')">
                <span>Logout</span>
            </myButton>
        </div>
    </div>

</template>

<script>
import { mapActions } from 'vuex';

export default{
    data() {
        
    }, 
    methods: {
			...mapActions({
				logOut: 'auth/logOut'
			})
		},
}


</script>


<style scoped>
.main{
    background: rgb(254, 254, 255);
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2em;
}
#btn__main{
    color: black;
    width: 200px;
    height: 40px;
}
#btn__main:hover{
    color: white;
}
.main__header{
    font-size: 4em;
    margin-bottom: 1em;
    word-break: break-all;
}

@media screen and (max-width: 992px) {
    h1{
        font-size: 2.5em;
    }
}
@media screen and (max-width: 768px) {
    h1{
        font-size: 2em;
    }
}
</style>