<template>
    <div>
        <word-card :word="word" :ttl="ttl"></word-card>
        <br>
        <br>
        <br>
        <div>
            <button v-on:click="back">
                <icon name="step backward"></icon>
            </button>
            <button v-if="paused" v-on:click="play">
                <icon name="play"></icon>
            </button>
            <button v-if="!paused" v-on:click="pause">
                <icon name="pause"></icon>
            </button>
            <button v-on:click="next">
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

    get selectedWordId() {
        return this.$store.state.words.selectedId;
    }
  public paused: boolean = false;

   private intervalId: number = 0;
   private ttl: number = 0;

    public mounted() {
        this.ttl = 30;
        this.intervalId = setInterval(() => {
            if ( !this.paused ) {
                this.countdown();
            }
        }, 1000);
        this.play();
    }

    public destroyed() {
        clearInterval(this.intervalId);
    }

    public next() {
        this.$store.dispatch('nextWord');
    }

    public back() {
        this.$store.dispatch('prevWord');
    }

    public play() {
        this.paused = false;
    }

    public pause() {
        this.paused = false;
    }


    private countdown() {
        this.ttl--;
        if ( this.ttl <= 0) {
            this.next();
            this.ttl =  30;
        }
    }
}
</script>


