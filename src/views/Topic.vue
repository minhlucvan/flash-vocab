<template>
  <transition class="faster" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in">
    <router-view :key="$route.fullPath"></router-view>
  </transition>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { AppState } from '../store';

@Component
export default class Topic extends Vue {

    public mounted() {
        const slug = this.$route.params.tslug;
        this.$store.dispatch('topics/selectTopic',  { slug });
    }
}
</script>


