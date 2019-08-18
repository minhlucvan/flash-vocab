<template>
  <div id="app">
    <header class="header">
      <div class="logo-wrapper">
        <img src="/img/logo.png"/>
      </div>
      <sui-menu id="nav" secondary pointing>
      <sui-menu-item :active="$route.path == '/'" link name="Home">
        <router-link to="/">Home</router-link>
      </sui-menu-item>
      <sui-menu-item :active="$route.path.includes('topic')" name="Topics">
        <router-link to="/topics">Topics</router-link>
      </sui-menu-item>
      <sui-menu-item  :active="$route.path.includes('about')" name="About">
        <router-link to="/about">About</router-link>
      </sui-menu-item>
    </sui-menu>
    </header>
    <div class="main error" v-if="error">
      <error-view></error-view>
    </div>
    <div class="main data" v-else>
      <router-view />
    </div>
    <div class="copyright">
      <p>Made by <a href="https://github.com/minhlucvan">@minhlucvan</a> © 2019</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import ErrorView from './components/ErrorView.vue';
import { Menu, MenuItem } from 'semantic-ui-vue';

@Component({
  components: {
    'error-view': ErrorView,
    'sui-menu': Menu,
    'sui-menu-item': MenuItem,
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
.header {
  display: flex;
  .logo-wrapper {
    height: 44px;
    width: 44px;
    display: flex;
    justify-content: center;
    align-items: center;
    // border-bottom: 2px solid rgba(34, 36, 38, 0.15);
    img {
      width: 90%;
      height: 90%;
      border: none;
      outline: none;
    }
  }
}
#nav {
  margin-left: -44px;
  display: flex;
  justify-items: center;
  flex-grow: 1;
  justify-content: center;
  margin-top: 0;
  .item {
    a {
      font-weight: bold;
      color: #2c3e50;
    }
    &.active {
      a {
        color: #4DBA87;
      }
      border-color: #4DBA87;
    }
  }
}
.main {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}
.copyright {
  padding: 5px;
}
a {
  color: #4DBA87;
}
</style>
