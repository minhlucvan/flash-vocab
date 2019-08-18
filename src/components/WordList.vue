<template>
    <Menu class="list" attached inverted vertical v-if="words">
        <MenuItem class="item" v-for="(word, index) in words" 
            :key="word.id" link 
            v-on:click="() => onSelected(index)">
            <span>{{index}}.   </span>
            <span>{{word.word}}</span>
        </MenuItem>
    </Menu>
</template>

<style lang="scss" scoped>
    .list {
        .item {
            text-align: left !important;
            padding-left: 44px;
        }
    }
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TopicItem from './TopicItem.vue';
import { Menu, MenuItem, MenuHeader, MenuMenu } from 'semantic-ui-vue';
import { IWord } from '../models/Word';

@Component({
  components: {
    Menu,
    MenuItem,
    MenuMenu,
    MenuHeader,
  },
  props: {
    words: {
      type: Array,
      default: [],
    },
  },
})
export default class WordList extends Vue {
    public onSelected(index: number) {
        this.$emit('selected', index);
    }
}
</script>


