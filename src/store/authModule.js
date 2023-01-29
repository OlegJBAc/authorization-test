import { createStore } from "vuex"
import instance from "@/API/API"
import router from "@/router/router"
import checkStatusCode from "@/general/checkStatusCode"


const authModule = {
    state: {
        authData: {
            isAuth: false,
            login: '',
            userId: 0,
        },
        captchaURL: null,
    },
    mutations: {
        setAuthData(state, authData) {
            state.authData = {...authData}
        },
        setCaptchaURL(state, captchaURL) {
            state.captchaURL = captchaURL
        },
    },
    actions: {
        async meCheck(context) {
            const response = await instance.get('/auth/me')
            const resultCode = response.data.resultCode

            if(resultCode !== 0){
                return new Promise((resolve, reject) => {
                    resolve(checkStatusCode(response.status))
                })
            }else{
                context.commit('setAuthData', { isAuth: true, 
                                                login: response.data.data.login, 
                                                userId: response.data.data.id 
                                            })
                router.push('/main')
            }
        },
        async logIn(context, { email, password, rememberMe, captcha=null }) {
            const response = await instance.post('/auth/login', { email, password, rememberMe, captcha: captcha })
            if(response.data.resultCode === 0){
                context.dispatch('meCheck')
            }else{
                return new Promise((resolve, reject) => {
                    if(response.data.resultCode === 10){
                        resolve(10)
                    }else{
                        resolve(response.data.messages[0])
                    }
                })
            }
        },
        async logOut(context){
            const response = await instance.delete('/auth/login')

            if(response.data.resultCode !== 0){
                return new Promise((resolve, reject) => {
                    resolve(checkStatusCode(response.status))
                })
            }else{
                context.commit('setAuthData', { isAuth: false, login: '', userId: 0})
                router.push('/login')
            }
        },
        async getCaptchaURL(context){
            const response = await instance.get('/security/get-captcha-url')
            context.commit('setCaptchaURL', response.data)
            return new Promise((resolve, reject) => {
                resolve(response.data.url)
            })
        },
    },
    namespaced: true,
}

export default authModule