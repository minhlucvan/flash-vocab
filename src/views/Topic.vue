<template>
    <router-view></router-view>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { AppState } from '../store';
import { Ticker } from '@/vuex/modules/words/Ticker';

@Component
export default class Topic extends Vue {

    public mounted() {
        const slug = this.$route.params.tslug;
        this.$store.dispatch('topics/selectTopic',  { slug });
    }

}
</script>


