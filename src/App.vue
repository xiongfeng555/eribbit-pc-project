<template>
  <div class="container">
    {{$store.state.user.profile.nickname}}
  </div>
  <button @click="changeName">change</button>
</template>
<script>
import { useStore } from 'vuex'
export default {
  name: 'App',
  setup () {
    const store = useStore()
    function changeName () {
      store.commit('user/setUser', { nickname: 'xiaoli' })
    }
    return {
      changeName
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
