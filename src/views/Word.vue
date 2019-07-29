<template>
    <div>
        <word-card :word="word"></word-card>
        <br>
        <br>
        <br>
        <button v-on:click="shuffle">
            <icon name="sync"></icon>
        </button>
    </div>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import WordCard from '@/components/WordCard.vue'; // @ is an alias to /src
import { Icon } from 'semantic-ui-vue';

@Component({
  components: {
    'word-card': WordCard,
    'icon': Icon,
  },
})
export default class Word extends Vue {

    get word(): any {
        return this.$store.state.words.word;
    }

    public mounted() {
        const slug = this.$route.params.wslug;
        this.$store.dispatch('bindWordBySlug', { slug });
    }

    public shuffle() {
        this.$router.replace({
            name: 'topic-shuffle',
            append: true,
        });
    }
}
</script>


