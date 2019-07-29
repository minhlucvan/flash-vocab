<template>
<div>...</div>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';

@Component
export default class Topic extends Vue {

    get word() {
        return this.$store.state.words.word;
    }

    @Watch('word')
    public onWord(word: any) {
        if ( !word ) {
            return;
        }
        this.$router.push(`/word/${word.slug}`);
    }

    public created() {
        this.$store.commit('clearWord');
    }

    public mounted() {
        const slug = this.$route.params.slug;
        this.$store.dispatch('bindWordsByTopic', { slug });
    }
}
</script>


