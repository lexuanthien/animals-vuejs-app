<template>
    <div class="page-login" v-on:click="getAccessToken()">
        <img :src="'/images/logo.png'" alt="">
        <p>please connect</p>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                message: ''
            }
        },
        methods: {
            getAccessToken() {
                const params = new URLSearchParams();
                params.append("grant_type", "client_credentials");
                params.append("client_id", process.env.VUE_APP_CLIENT_ID);
                params.append("client_secret", process.env.VUE_APP_CLIENT_SECRET);
                var self = this;
                fetch("https://api.petfinder.com/v2/oauth2/token", {
                    method: "POST",
                    body: params,
                })
                .then(response => {
                    response.json().then(data => {
                        self.$store.dispatch('setToken', data.access_token);
                        self.$router.push({ name: 'home' }).catch(()=>{});
                    })
                })
                .catch(error => {
                    return
                })
            },
        }
    } 
</script>
