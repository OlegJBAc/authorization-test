<template>
    <form class="form">
        <div class="input__wrapper">
            <myInput 
                type="email"
                placeholder='Enter your email...'  
                required
                v-model='authData.email'
            />
        </div>
        <div class="input__wrapper">
            <myInput
                type="password"
                placeholder='Enter your password...'  
                required
                v-model='authData.password'
            />
        </div>
        <div class="input__wrapper">
            <myInput
                type="password"
                placeholder='Confirm your password'  
                required
                v-model='authData.passwordConfirmation'
            />
        </div>

        <div v-if="$store.state.auth.captchaURL">
            <img :src='captchaURL'/>
        </div>
        <div v-if="$store.state.auth.captchaURL" class="input__wrapper">
            <myInput
                placeholder='enter captcha'  
                v-model='captcha'
            />
        </div>
        <myButton class="btn" @click='logInFunc'>LogIn</myButton>
        <h3 v-if="authData.error !== null" class="auth__error">{{ authData.error }}</h3>
    </form>

</template>

<script>
import { mapActions } from 'vuex'

export default{
    data() {
        return {
            authData: {
                email: '',
			    password: '',
                passwordConfirmation: '',
                rememberMe: true,
                error: null,
            },
            captcha: null,
            captchaURL: null,
		}
    },
    methods: {
        ...mapActions({
            logIn: 'auth/logIn',
            getCaptchaURL: 'auth/getCaptchaURL',
        }),
        logInFunc() {
            if(this.authData.password === this.authData.passwordConfirmation){
                this.logIn({
                    email: this.authData.email, 
                    password: this.authData.password, 
                    rememberMe: this.authData.rememberMe,
                    captcha: this.captcha,
                }).then(res => {
                    if(res === 10){
                        this.getCaptchaURL().then(res => {
                            this.captchaURL = res
                            this.authData.error = ''
                        })
                    }if(res !== null && res !== 10){
                        this.authData.error = res
                    }
                })
            }else{
                this.authData.error = 'Invalid confirmation password'
            }
        }
    },
    
}


</script>


<style scoped>

.form{
    width: 40%;
	height: 300px;
	border-radius: 1em;
	background: white;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
    min-height: 500px;
    width: 50%;
}
.btn{
    width: 80%;
}
.input__wrapper{
    width: 80%;
    border-radius: 1px solid yellow;
}
.auth__error{
    justify-self: flex-end;
    color: red;
    font-size: 1.2em;
    margin-top: 2em;
    letter-spacing: 0.3ch;
}
img{
    min-width: 180px;
    height: 100px;
    margin-bottom: 10px;
    border-radius: 1em;
}

@media screen and (max-width: 992px) {
    .form{
        width: 65%;
    }
}
@media screen and (max-width: 768px) {
    .form{
        height: 100vh;
        width: 100%;
        border-radius: 0px;
    }
    .input__wrapper{
        width: 90%;
    }
    .btn{
        width: 90%;
    }
    input{
        border-radius: 2px;
    }
}
</style>