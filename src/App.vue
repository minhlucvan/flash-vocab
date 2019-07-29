<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/topics">Topics</router-link>|
      <router-link to="/about">About</router-link>
    </div>
    <div class="main error" v-if="error">
      <error-view></error-view>
    </div>
    <div class="main data" v-else>
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import ErrorView from './components/ErrorView.vue';

@Component({
  components: {
    'error-view': ErrorView,
  },
})
export default class App extends Vue {
  get error() {
    return this.$store.state.config.error;
  }
}
</script>


<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  width: 100%;
  height: 100%;
  flex-flow: column;
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
  .main {
    display: flex;
    width: 100%;
    height: 100%;
  }
}
</style>
