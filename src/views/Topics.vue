<template>
<div class="container">
  <div class="head">
    <h1>Topics</h1>
  </div>
  <div class="categories">
    <topic-list :topics="topics"></topic-list>
  </div>
</div>
</template>

<style lang="scss" scoped>
.head {
  padding: 40px;
}
.container {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    overflow: auto;
}
.categories {
    display: flex;
    width: 100%;
    justify-content: space-around;
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


