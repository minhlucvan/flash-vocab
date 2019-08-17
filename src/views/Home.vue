<template>
    <div class="home">
        <div v-if="logo">
          <img :src="logo.url" alt="logo">
        </div>
        <div class="head">
            <h1>Welcome to Flash Vocab</h1>
            <p>
                Smarter way to learn <b>vocabulary.</b>
            </p>
        </div>
        <div class="content">
          <EnterButton></EnterButton>
        </div>
    </div>
</template>

<style scoped lang="scss">
   .home {
       padding: 10px;
       .head  {
          padding: 50px;
       }
       .content {
            padding: 50px;
       }
   }
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import EnterButton from '@/components/EnterButton.vue';

@Component({
  components: {
    EnterButton,
  },
})
export default class Home extends Vue {
  get logo() {
    return this.$store.getters.logo;
  }

}
</script>
