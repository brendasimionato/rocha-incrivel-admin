import axios from "axios";

axios.interceptors.request.use((request) => {
    if(window.location.href != 'http://localhost:3000/') {
        if(!localStorage.getItem("user_id")) {
            window.location.href = '/'
            return Promise.reject()
        }
    }
    return request

})