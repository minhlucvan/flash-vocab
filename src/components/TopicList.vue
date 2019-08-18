<template>
  <ul class="list">
    <li class="list__item" v-for="topic in topics" :key="topic.slug">
      <item :topic="topic"></item>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  max-width: 1400px;
}

.list__item {
  margin: 10px;
  padding: 0;
  flex: 1 0 25%;
  min-width: 300px;
  min-height: 16vh;
  max-width: 400px;
  outline: 1px solid #fff;
}
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TopicItem from './TopicItem.vue';

@Component({
  components: {
    item: TopicItem,
  },
  props: {
    topics: {
      type: Array,
      default: [],
    },
  },
})
export default class TopicList extends Vue {}
</script>


