<template>
  <div class="home">
    <UserCard v-if="isAuth"></UserCard>
    <LoginGoogle v-else></LoginGoogle>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import LoginGoogle from '@/components/LoginGoogle.vue';
import UserCard from '@/components/UserCard.vue';

@Component({
  components: {
    LoginGoogle,
    UserCard,
  },
})
export default class Home extends Vue {
  get isAuth() {
    return this.$store.state.auth.isAuth;
  }
}
</script>
