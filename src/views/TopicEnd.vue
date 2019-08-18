<template>
    <div class="topic-end" v-if="topic">
        <div class="head">
            <h1>{{topic.name}}</h1>
        </div>
        <div class="content">
            <div>
            <router-link :to="{ name: 'word-detail', params: { wslug: '0' } }">
                <sui-button size="massive"  color="teal" content="Restart" icon="undo" />
            </router-link>
            <div class="or">or</div>
            <router-link :to="{ name: 'topic-list' }">
                <sui-button size="massive"  color="teal" content="Back" icon="th" />
            </router-link>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .topic-end {
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
    .or {
        display: inline-block;
        padding: 9px;
        margin-left: -4px;
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


