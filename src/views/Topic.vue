<template>
  <transition class="faster" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in">
    <router-view></router-view>
  </transition>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';

@Component
export default class Topic extends Vue {

    get words() {
        return this.$store.state.words.words;
    }


    public mounted() {
        const slug = this.$route.params.tslug;
        this.$store.dispatch('bindWordsByTopic',  { slug });
        this.$store.watch((state) => state.words.words, (words) => {
            this.$router.push({
                name: 'word-detail',
                append: true,
                // params: {
                //     tslug: slug,
                // }
            });
        });
    }
}
</script>


