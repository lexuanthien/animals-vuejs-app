<template>
  <div>
    <p>home</p>
    <button v-on:click="destroyToken()">Logout</button>
    <div v-for="(item, index) in animals" :key="index">
        <div v-if="item.photos.length > 0">
            <img :src="item.photos != '' ? item.photos[0].large : `/images/user.png`" style="vertical-align: middle;">
        </div>
    </div>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                token: this.$store.getters.token,
                message: '',
                animals: []
            }
        },
        mounted() {
            this.axios
            .get('https://api.petfinder.com/v2/animals', {
                'headers' : {
                    'Accept' : 'application/json',
                    'Authorization' : 'Bearer ' + this.token,
                } 
            })
            .then((response) => {
                this.animals = response.data.animals
                this.pagination = response.data.pagination
                console.log(this.animals);
            })
            .catch(error => {
                return
            });
        },
        methods: {
            destroyToken() {
                this.$store.dispatch('destroyToken')
                .then(response => {
                    this.$router.push({ name: 'login' }).catch(()=>{});
                })
                .catch(error => {
                    return
                })
            }
        }
    } 
</script>
