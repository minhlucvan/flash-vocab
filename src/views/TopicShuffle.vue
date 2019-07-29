<template>
<div>...</div>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';

@Component
export default class TopicShuffle extends Vue {


    @Watch('topic')
    public update() {
        if (!this.$store.state.topics.topic ) {
            return;
        }
        this.$store.dispatch('shuffleWordOfTopic');
    }

    public mounted() {
        this.update();
    }
}
</script>


