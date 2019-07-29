<template>
  <div class="wrapper" v-if="topic" v-bind:style="{ backgroundImage: `url(${topic.cover})` }">
    <router-link :to="{ name: 'topic', params: { tslug: topic.slug }}">
      <div class="content">
        <h3 class="title">{{ topic.name }}</h3>
        <div class="desc">
          Handle rulebreakers with ease using
          <br />advanced moderation commands.
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
}
.title,
.desc {
  text-align: center;
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


