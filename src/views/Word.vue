<template>
    <div class="word">
        <word-card :word="word"></word-card>
    </div>
</template>

<style lang="scss" scoped>
    .nav-button {
        .btn {
            margin: 10px;
        }
    }
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import WordCard from '@/components/WordCard.vue'; // @ is an alias to /src
import { Button, Progress } from 'semantic-ui-vue';
import { Ticker } from '@/vuex/modules/words/Ticker';

@Component({
  components: {
    'word-card': WordCard,
    'sui-button': Button,
    'sui-progress': Progress,
  },
})
export default class Word extends Vue {

    get word() {
        const word = this.$store.getters['words/currentWord'];
        return word;
    }

    public mounted() {

        const slug = this.$route.params.wslug;
        if ( !slug ) {
            return this.$router.replace({
                name: 'word-detail',
                params: {
                    wslug: this.$store.state.words.player.wordIndex,
                },
            });
        }
        this.$store.commit('words/setWordIndex', slug );
    }



}
</script>


