<template>
  <div class="wrapper" v-if="topic" v-bind:style="topic.cover ? { backgroundImage: `url(${topic.cover})` } : {}">
    <router-link :to="{ name: 'topic-start', params: { tslug: topic.slug }}">
      <div class="content">
        <h3 class="title">{{ topic.name }}</h3>
        <div class="desc">
        </div>
      </div>
    </router-link>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  background-image: linear-gradient(203deg, #3EDFD7 0%, #29A49D 90%);
}
.title,
.desc {
  text-align: center;
}
a {
  color: white;
}
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  props: {
    topic: Object,
    default: {},
  },
})
export default class TopicItem extends Vue {}
</script>


