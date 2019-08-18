<template>
    <div class="player">

        <transition class="faster" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in">
            <router-view :key="$route.fullPath"></router-view>
        </transition>

        <div>
            <br>
            <br>
            <br>
            <div class="nav-button">
                <sui-button basic color="teal" size="huge" class="btn" v-on:click="back" v-bind:disabled="!hasPrev" icon="step backward" />
                <sui-button basic color="teal" size="huge" class="btn" v-if="paused" v-on:click="play" icon="play" />
                <sui-button basic color="teal" size="huge" class="btn" v-if="!paused" v-on:click="pause" icon="pause" />
                <sui-button basic color="teal" size="huge" class="btn" v-on:click="next" v-bind:disabled="!hasNext" icon="step forward" />
            </div>
        </div>
        <sui-progress
            attached
            top
            size="mini"
            color="teal"
            :percent="((ttl || 0))/30*100"
            label="timeout"
        />
    </div>
</template>

<style lang="scss" scoped>
    .player {
        display: flex;
        flex: auto;
        width: 100%;
        height: 100%;
        flex-direction: column;
        justify-content: space-between;
    }
</style>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { AppState } from '../store';
import { Ticker } from '@/vuex/modules/words/Ticker';

@Component
export default class Player extends Vue {

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
    public ticker: Ticker = new Ticker(30);

    public created() {
        this.ticker.onTimeOut(() => {
            this.onTimeOut();
        });
    }

    public mounted() {
        this.reset();
        const slug = this.$route.params.tslug;
        this.$store.dispatch('topics/selectTopic',  { slug });
        this.play();
    }

        public destroyed() {
        this.ticker && this.ticker.stop();
    }

    public next() {
        this.reset();
        this.$store.dispatch('words/next');
        this.$router.push({
            name: 'word-detail',
            params: {
                wslug: this.nextIndex,
            },
        });
    }

    public back() {
        this.reset();
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


