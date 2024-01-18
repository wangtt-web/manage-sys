import {request, type RequestOptions} from '@umijs/max'

const Request = (url:string, options:RequestOptions)=>{
    
    if(!url.includes('/login')){
        const token = JSON.parse(localStorage.getItem('userinfo') as string)?.jwt
        options.headers = {
            token,
            'Content-Type':"application/json", 
        }
    }
    return request(url, options)
}

export default Request