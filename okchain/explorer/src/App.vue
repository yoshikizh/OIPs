<template>
  <div id="app">
    <TopNav />
    <router-view/>
    <Footer />
  </div>
</template>

<script>

import TopNav from '@/components/topnav/index.vue'
import Footer from '@/components/footer/index.vue'

export default {
  components: {
    TopNav,
    Footer
  }
}

</script>

<style lang="scss">
#app {
  text-align: center; background-color: #fafafa;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
