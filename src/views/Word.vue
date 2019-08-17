<template>
    <div>
        <word-card :word="word" :ttl="ttl"></word-card>
        <br>
        <br>
        <br>
        <div>{{ttl}}</div>
        <div>
            <button v-on:click="back" v-bind:disabled="!hasPrev">
                <icon name="step backward"></icon>
            </button>
            <button v-if="paused" v-on:click="play">
                <icon name="play"></icon>
            </button>
            <button v-if="!paused" v-on:click="pause">
                <icon name="pause"></icon>
            </button>
            <button v-on:click="next" v-bind:disabled="!hasNext">
                <icon name="step forward"></icon>
            </button>
            </div>
    </div>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import WordCard from '@/components/WordCard.vue'; // @ is an alias to /src
import { Icon } from 'semantic-ui-vue';
import { Ticker } from '@/vuex/modules/words/Ticker';

@Component({
  components: {
    'word-card': WordCard,
    'icon': Icon,
  },
})
export default class Word extends Vue {
    public ticker: Ticker = new Ticker(30);

    get word() {
        const word = this.$store.getters['words/currentWord'];
        return word;
    }

    get ttl() {
        return this.ticker ? this.ticker.ttl : 0;
    }

    get paused() {
        return this.ticker ? this.ticker.paused : true;
    }

    get hasNext() {
        return this.$store.getters['words/hasNext'];
    }

    get hasPrev() {
        return this.$store.getters['words/hasPrev'];
    }

    get prevIndex() {
        return this.$store.getters['words/prevIndex'];
    }

    get nextIndex() {
        return this.$store.getters['words/nextIndex'];
    }

    get currentIndex() {
        return this.$store.getters['words/currentIndex'];
    }


    public created() {
        this.ticker.onTimeOut(() => {
            this.onTimeOut();
        });
    }

    public mounted() {
        this.reset();
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
        this.play();
    }

    public destroyed() {
        this.ticker && this.ticker.stop();
    }

    public next() {
        this.$store.dispatch('words/next');
        this.$router.push({
            name: 'word-detail',
            params: {
                wslug: this.nextIndex,
            },
        });
    }

    public back() {
        this.$store.dispatch('words/back');
        this.$router.push({
            name: 'word-detail',
            params: {
                wslug: this.prevIndex,
            },
        });
    }

    public reset() {
         this.ticker && this.ticker.reset();
    }

    public play() {
        this.ticker && this.ticker.play();
    }

    public pause() {
        this.ticker && this.ticker.pause();
    }

    public finish() {
        // TODO:
    }

    private onTimeOut() {
        if ( this.hasNext ) {
            return this.next();
        }
        this.finish();
    }
}
</script>


