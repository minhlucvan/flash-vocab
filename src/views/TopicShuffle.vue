<template>
<div>...</div>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';

@Component
export default class TopicShuffle extends Vue {

    public mounted() {
        this.$store.dispatch('shuffleWordOfTopic');
    }
}
</script>


