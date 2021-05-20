<template>
  <div>
    <p>Xin chòa</p>
    <button v-on:click="getAccessToken()">Login</button>
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
                params.append("client_id", "v3YvEB7MQAmosLDjPHKa3LWyfEikMU5GVzZqNLF77lFP2hsKuQ");
                params.append("client_secret", "91BEGtP8Iv5UcmGpEljgKTzYCmNwUAvCwMSyFi1H");
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
