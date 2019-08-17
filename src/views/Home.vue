<template>
  <div class="home">
    <EnterButton></EnterButton>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import EnterButton from '@/components/EnterButton.vue';

@Component({
  components: {
    EnterButton,
  },
})
export default class Home extends Vue {
  get isAuth() {
    return this.$store.state.auth.isAuth;
  }
}
</script>
