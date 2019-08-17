<template>
<div class="container">
  <div class="categories">
    <topic-list :topics="topics"></topic-list>
  </div>
</div>
</template>

<style lang="scss" scoped>
.container {
    display: flex;
    width: 100%;
    height: 100%;
}
.categories {
    display: flex;
    width: 100%;
}
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TopicList from '@/components/TopicList.vue'; // @ is an alias to /src

@Component({
  components: {
    'topic-list': TopicList,
  },
})
export default class Topics extends Vue {
  get topics(): any {
    return this.$store.state.topics.topics || [];
  }

  public mounted() {
    this.$store.dispatch('topics/getTopics');
  }
}
</script>


