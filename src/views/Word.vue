<template>
    <div class="word">
        <word-card :word="word" v-on:changeImage="changeImage" :pedding="imagePedding"></word-card>
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
import { setTimeout } from 'timers';

@Component({
  components: {
    'word-card': WordCard,
    'sui-button': Button,
    'sui-progress': Progress,
  },
})
export default class Word extends Vue {
    private  imagePedding: boolean = false;

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

        setTimeout(() => {
            if ( !this.word ) {
                 return this.$router.replace({
                    name: 'topic-start',
                });
            }
        }, 3000);
    }

    public async changeImage() {
        const slug = this.$route.params.wslug;
        this.imagePedding = true;
        await this.$store.dispatch('words/changeImage', slug );
        this.$forceUpdate();
        this.imagePedding = false;

    }


}
</script>


