<template>
    <word-card :word="word"></word-card>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import WordCard from '@/components/WordCard.vue'; // @ is an alias to /src

@Component({
  components: {
    'word-card': WordCard,
  },
})
export default class Word extends Vue {
    get word(): any {
        return this.$store.state.words.word;
    }

    public mounted() {
        const slug = this.$route.params.slug;
        this.$store.dispatch('bindWordBySlug', { slug });
    }
}
</script>


