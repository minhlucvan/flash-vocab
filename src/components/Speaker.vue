<template>
    <Button :disabled="!enabled" icon="headphones" :click="speak" ></Button>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Button } from 'semantic-ui-vue';

@Component({
    components: {
        Button,
    },
    props: {
        text: String,
        lang: String,
    },
})
export default class Speaker extends Vue {
    private audio?: HTMLAudioElement;

    get enabled(): boolean {
        return !!this.$props.text &&
               !!this.$props.lang &&
               !!this.audio &&
               this.audio.readyState !== 0;
    }

    @Watch('$props.text')
    public loadAudio() {
        if (!this.$props.text || !this.$props.lang) {
            return;
        }
        // tslint:disable-next-line
        this.audio = new Audio(`https://translate.google.com.vn/translate_tts?ie=UTF-8&q=${this.$props.text}&tl=${this.$props.lang}&client=tw-ob`);
        this.audio.load();
    }

    public mounted() {
        this.loadAudio();
    }

    public speak() {
        if ( !this.audio ) {
            return;
        }
        this.audio.play();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
