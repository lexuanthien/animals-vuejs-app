<template>
    <div class="menu">
        <div class="text-logo" v-on:click="home()" v-bind:class="[$route.name == 'home' ? 'active' : '']">doulber.Pet</div>
        <ul>
            <li v-on:click="dog()"><i class="fas fa-dog"></i></li>
            <li v-on:click="cat()"><i class="fas fa-cat"></i></li>
            <li v-on:click="destroyToken()" class="btn-disconnect">disconnect</li>
        </ul>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                
            }
        },
        created () {
            // detect tab close and browser close event
            window.addEventListener('beforeunload', this.destroyToken) 
        },
        methods: {
            home() {
                if(this.$route.name == 'home') {
                    this.$router.push({ name: 'home', query: { action: 'reload' }}).catch(()=>{});
                } else {
                    this.$router.push({ name: 'home'});
                }
            },
            dog() {
                this.$router.push({ name: 'home', query: { type: 'dog' }}).catch(()=>{});
            },
            cat() {
                this.$router.push({ name: 'home', query: { type: 'cat' }}).catch(()=>{});
            },
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
