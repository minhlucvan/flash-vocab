<template>
  <SidebarPushable>
    <Sidebar animation="overlay" direction="right" class="inverted" :visible="showWordList">
      <h3 class="sidebar-title">Words</h3>
      <div class="sidebar-content">
        <WordList :words="words" v-on:selected="selectedWord"></WordList>
      </div>
    </Sidebar>
    <SidebarPusher :dimmed="showWordList" @click="closeWordList">
      <div class="player">
        <div class="player-view">
          <transition
            class="faster"
            enter-active-class="animated fadeIn"
            leave-active-class="animated fadeOut"
            mode="out-in"
          >
            <router-view :key="$route.fullPath"></router-view>
          </transition>
        </div>
        <div class="player-nav">
          <div class="nav-button">
            <sui-button
              basic
              color="teal"
              size="huge"
              class="btn"
              v-on:click="back"
              v-bind:disabled="!hasPrev"
              icon="step backward"
            />
            <transition
              class="faster"
              enter-active-class="animated fadeIn"
              leave-active-class="animated fadeOut"
              mode="out-in"
            >
              <sui-button
                basic
                color="teal"
                size="huge"
                class="btn"
                v-if="paused"
                v-on:click="play"
                icon="play"
              />
              <sui-button
                basic
                color="teal"
                size="huge"
                class="btn"
                v-if="!paused"
                v-on:click="pause"
                icon="pause"
              />
            </transition>
            <sui-button
              basic
              color="teal"
              size="huge"
              class="btn"
              v-on:click="next"
              v-bind:disabled="!hasNext"
              icon="step forward"
            />
          </div>
          <Button class="menu-btn" basic color="teal" size="huge" icon="bars" @click="openWordList"></Button>
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
    </SidebarPusher>
  </SidebarPushable>
</template>

<style lang="scss" scoped>
.player {
  position: absolute;
  display: flex;
  flex: auto;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
}
.sidebar-title {
  color: white;
}
.sidebar-content {
}
.menu-btn {
}
.nav-button {
  padding-bottom: 5px;
}
.player-nav {
    padding-bottom: 28px;
}
.player-view {
    flex-grow: 1;
}
</style>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { AppState } from '../store';
import { Ticker } from '@/vuex/modules/words/Ticker';
import {
  SidebarPushable,
  Sidebar,
  SidebarPusher,
  MenuHeader,
  Button,
} from 'semantic-ui-vue';
import WordList from '@/components/WordList.vue';
import { IWord } from '../models/Word';

@Component({
  components: {
    SidebarPushable,
    SidebarPusher,
    Sidebar,
    MenuHeader,
    WordList,
    Button,
  },
})
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

  get words() {
    return this.$store.getters['words/playingWords'];
  }

  public ticker: Ticker = new Ticker(30);
  private showWordList: boolean = false;

  public created() {
    this.ticker.onTimeOut(() => {
      this.onTimeOut();
    });
  }

  public mounted() {
    this.reset();
    const slug = this.$route.params.tslug;
    this.$store.dispatch('topics/selectTopic', { slug });
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
    this.$router.push({
      name: 'topic-end',
      append: true,
    });
  }

  public openWordList(event: MouseEvent) {
    if (this.showWordList) {
      return;
    }
    event.cancelBubble = true;
    this.showWordList = true;
    this.pause();
  }

  public closeWordList() {
    if (!this.showWordList) {
      return;
    }
    this.showWordList = false;
    this.play();
  }

  public selectedWord(index: number) {
    this.closeWordList();
    this.$router.push({ name: 'word-detail', params: { wslug: '' + index } });
  }

  private onTimeOut() {
    if (this.hasNext) {
      return this.next();
    }
    this.finish();
  }
}
</script>


