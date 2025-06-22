<template>
  <div id="app">
    <AppHeader v-if="!$route.meta.hideHeaderFooter" />
    <router-view></router-view>
    <AppFooter v-if="!$route.meta.hideHeaderFooter" />
    <ScrollToTop />
  </div>
</template>

<script>
import AppHeader from './components/Header.vue'
import AppFooter from './components/Footer.vue'
import ScrollToTop from './components/ScrollToTop.vue'

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter,
    ScrollToTop
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

body {
  margin: 0;
  padding: 0;
}

/* Add padding to router-view to prevent content from being hidden under fixed header */
.router-view {
  padding-top: 80px; /* Adjust this value based on your header height */
  flex: 1;
}
</style>
