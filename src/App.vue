<template>
  <div id="app">
    <my-heading v-if="loggedIn"></my-heading>
    <div class="main" v-if="loggedIn">
      <router-view class="box-body"></router-view>
    </div>
    <router-view v-if="!loggedIn"></router-view>
  </div>
</template>

<script>
  export default {
    name: 'App',
    computed: {
      loggedIn() {
          return this.$store.getters.loggedIn
      }
    }
  }
</script>
