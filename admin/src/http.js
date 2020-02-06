import axios from 'axios'
import Vue from 'vue'
import router from 'vue-router' // no-eslint-off

const http = axios.create({
  baseURL: process.env.VUE_APP_API_URL || '/api',
})

http.interceptors.request.use(function (config) { 
  if (localStorage.token) { 
    config.headers.Authorization = 'Bearer ' + localStorage.token
  }
  console.log('request config', config);
  return config;
}, function (err) { 
    return Promise.reject(err);
})

http.interceptors.response.use(res => { 
  return res;
}, err => { 
    Vue.prototype.$message({
      type: 'error',
      message: err
    })
    
    //router.push('/login');
})

export default http;