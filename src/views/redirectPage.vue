<template>
    <div class="container">
        redirect
    </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { onMounted } from 'vue';
onMounted(()=>{
    // 请求后端接口，判断进入哪个路由
    // axios.get('/xxx').then((res)=>{
    //     if(res.data == 'dashboard'){
    //         window.location.href = 'http://172.17.18.1:9998/authentication/auth/authorize?client_id=S0021&redirect_uri=http://172.19.19.48:5175/dashboard&response_type=code&state=STATE'
    //     }else if(res.data == 'dashboard'){
    //         window.location.href = 'http://172.17.18.1:9998/authentication/auth/authorize?client_id=S0021&redirect_uri=http://172.19.19.48:5175/provincePage&response_type=code&state=STATE'
    //     }else if(res.data == 'dashboard'){
    //         window.location.href = 'http://172.17.18.1:9998/authentication/auth/authorize?client_id=S0021&redirect_uri=http://172.19.19.48:5175/attackSearch&response_type=code&state=STATE'
    //     }
        
    // })
    
})
</script>

<style scoped>

</style>
