<template>
    <div class="topic-start" v-if="topic">
        <div class="head">
            <h1>{{topic.name}}</h1>
        </div>
        <div class="content">
            <router-link :to="{ name: 'word-detail', params: { wslug: '0' } }">
                <sui-button size="massive"  color="teal" content="Play" icon="play" />
            </router-link>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .topic-start {
        padding: 0px;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }
    .head {
        padding: 40px;
    }
    .content {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }
</style>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import {Button} from 'semantic-ui-vue';

@Component({
    components: {
        'sui-button': Button,
    },
})
export default class TopicStart extends Vue {
    get topic() {
        return this.$store.getters['topics/current'];
    }
}
</script>


