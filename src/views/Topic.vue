<template>
    <router-view></router-view>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';

@Component
export default class Topic extends Vue {

    public created() {
        this.$store.commit('clearWord');
        this.$store.commit('clearTopic');
    }

    get word() {
        return this.$store.state.words.word;
    }

    get topic() {
        return this.$store.state.topics.topic;
    }

    @Watch('word')
    @Watch('topic')
    public update() {
        if ( !this.topic ) {
            return;
        }

        if (!this.word ) {
            return this.$router.push({
                name: 'topic-shuffle',
                append: true,
            });
        }

        this.$router.push({
            name: 'topic-word-detail',
            append: true,
            params: {
                wslug: this.word.slug,
            },
        });
    }

    public mounted() {
        const slug = this.$route.params.tslug;
        this.$store.dispatch('bindTopicBySlug', { slug });
    }
}
</script>


