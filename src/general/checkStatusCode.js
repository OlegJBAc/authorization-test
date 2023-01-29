

const checkStatusCode = (statusCode) => {
    if(statusCode >= 200 < 400){
        return null
    }
    if(statusCode >= 400 < 500){
        return 'ошибка клиента, проверьте правильность введённых данных'
    }if(statusCode >= 500){
        return 'ошибка сервера, попробуйте авторизоваться позднее'
    }
}

export default checkStatusCode