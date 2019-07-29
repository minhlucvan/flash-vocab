<template>
    <div class="masthead error segment">
    <div class="container">
      <h1 class="ui dividing header">
        <Icon name="tripadvisor" size="small" class="error-icon"></Icon>
        <span>{{message}}</span>
      </h1>
      <p>Rewind and try another one</p>
    </div>
  </div>

</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Icon  } from 'semantic-ui-vue';

@Component({
  components: {
    Icon,
  },
})
export default class ErrorView extends Vue {

  public mounted() {
    this.$store.commit('clearError');
  }

  get error() {
    return this.$store.state.config.error;
  }

  get message() {
      return this.error ? this.error.message : '';
  }
}
</script>


<style lang="scss">
  .error-icon.icon {
    display: inline-block !important;
  }
</style>
