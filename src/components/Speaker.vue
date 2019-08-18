<template>
    <Button :disabled="!enabled" icon="headphones" :click="speak" ></Button>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Button } from 'semantic-ui-vue';

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

    @Watch('$props.text')
    public loadAudio() {
        if (!this.$props.text || !this.$props.lang) {
            return;
        }
        // tslint:disable-next-line
        this.audio = new Audio(`https://translate.google.com/translate_tts?ie=UTF-8&q=${this.$props.text}&tl=${this.$props.lang}&client=tw-ob`);
        this.audio.load();
        this.audio.autoplay = true;
    }

    public mounted() {
        // this.loadAudio();
    }

    public speak() {
        if ( !responsiveVoice ) {
            return;
        }
        responsiveVoice.speak(this.$props.text, this.$props.voice);
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
