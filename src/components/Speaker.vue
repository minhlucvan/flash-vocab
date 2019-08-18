<template>
    <Button :disabled="!enabled" icon="headphones" v-on:click="speak" ></Button>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Button } from 'semantic-ui-vue';
import { setTimeout } from 'timers';

declare const responsiveVoice: any;
if ( responsiveVoice ) {
    responsiveVoice.setDefaultVoice('US English Female');
}

@Component({
    components: {
        Button,
    },
    props: {
        text: String,
        lang: String,
        voice: String,
    },
})
export default class Speaker extends Vue {
    private audio?: HTMLAudioElement;

    get enabled(): boolean {
        return !!this.$props.text &&
               !!this.$props.lang &&
               responsiveVoice;
    }

    // @Watch('$props')
    public loadAudio() {
        // TODO:
    }

    public mounted() {
        setTimeout(() => {
            this.speak();
        }, 3000);
    }

    public speak() {
        if ( !this.enabled ) {
            return;
        }
        responsiveVoice.speak(this.$props.text, this.$props.voice);
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
