<template>
    <div class="container">
        <div v-if="word" class="card-module">
            <div class="title">
                <div class="cat">{{word.word}}</div>
                <!-- img size => 16:9-->
                <div class="cover" :style="word.img ? { backgroundImage: `url(${word.img})` }: {} "></div>
            </div>
            <div class="body">
                <h2 class="chapter">
                    {{word.word}}
                </h2>
                <p class="content">{{word.sentence}}</p>
            </div>
            <div class="footer">
                <div class="favor">
                    <!-- I use jQuery to prepend svg, because codePen can not save file.-->
                    <!-- You can just use img src to replace jQuery prepend function-->
                    <div class="icon read">
                        <div class="svg js-svg-read"></div>
                            <span>
                                <Speaker :text="word.word" :lang="word.langCode" :voice="word.voice"></Speaker>
                            </span>
                        </div>
                    <div class="icon love">
                        <div class="svg js-svg-love"></div><span></span></div>
                </div>
                <div class="link">
                    <sui-button v-on:click="changeImage" icon="random" :loading="pedding"></sui-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { IWord } from '../models/Word';
import { Button } from 'semantic-ui-vue';
import Speaker from '@/components/Speaker.vue';

@Component({
    props: {
        word: Object as () => IWord,
        pedding: Boolean,
    },
    components: {
        'sui-button': Button,
        Speaker,
    },
})
export default class WordCard extends Vue {
    @Watch('$props.word')
    public checkImg() {
        if ( this.$props.word && !this.$props.word.img ) {
            this.changeImage();
        }
    }

    public mounted() {
        this.checkImg();
    }

    public changeImage() {
        this.$emit('changeImage');
    }
}
</script>

<style lang="scss" scoped>
   $color_1: #00BAFF;
    $color_2: #008BBF;
    $color_3: #999;
    $color_4: rgba(0, 186, 255, 0.87);

    * {
        box-sizing: border-box;
        &::before {
            box-sizing: border-box;
        }
        &::after {
            box-sizing: border-box;
        }
    }

    .container {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 20px auto;
        max-width: 400px;
        letter-spacing: 0.5px;
    }
    footer {
        padding-top: 32px;
        padding-bottom: 32px;
        text-align: center;
        a {
            color: $color_1;
            &:hover {
                color: $color_2;
            }
        }
    }
    .card-module {
        border-radius: 6px;
        border-right: 1.5px solid rgba(0, 0, 0, 0.1);
        border-bottom: 1.5px solid rgba(0, 0, 0, 0.1);
        .title {
            position: relative;
            width: 100%;
            border-top-left-radius: 6px;
            border-top-right-radius: 6px;
        }
        .cat {
            position: absolute;
            top: 5%;
            left: 0;
            padding: 2% 12% 2% 2%;
            background: linear-gradient(to right, white 0%, rgba(255, 255, 255, 0) 100%);
            font-size: 14px;
        }
        .cover {
            width: 100%;
            height: 0;
            padding-bottom: 56.25%;
            background-position: center center;
            background-size: cover;
            background-repeat: no-repeat;
            border-top-left-radius: 6px;
            border-top-right-radius: 6px;
            background-color: #00000082;
        }
        .body {
            padding: 16px;
            background: #FFF;
            .chapter {
                margin-top: 0;
                margin-bottom: 16px;
                font-size: 24px;
            }
            .content {
                margin: 0 0 4px;
                line-height: 1.25;
                font-size: 16px;
                min-width: 300px;
                min-height: 20px;
                @media (min-width: 768px) {
                    min-width: 400px;
                    min-height: 50px;
                }

                @media (min-width: 960px) {
                    min-width: 480px;
                    min-height: 50px;
                }
            }
        }
        .footer {
            position: relative;
            display: flex;
            padding: 16px;
            background: #FFF;
            border-bottom-left-radius: 6px;
            border-bottom-right-radius: 6px;
            &::before {
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                width: 100%;
                height: 1px;
                background: linear-gradient(to right, rgba(204, 204, 204, 0) 0%, rgba(204, 204, 204, 0) 20%, #dddddd 50%, rgba(204, 204, 204, 0) 80%, rgba(204, 204, 204, 0) 100%);
            }
        }
        .favor {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            width: 75%;
        }
        .link {
            width: 25%;
            text-align: right;
            a {
                display: inline-block;
                padding: 8px 24px;
                border-radius: 6px;
                text-decoration: none;
                color: $color_4;
                transition: all ease 0.5s;
                &:hover {
                    background: rgba(0, 186, 255, 0.24);
                    color: $color_2;
                }
                &:active {
                    background: rgba(0, 186, 255, 0.24);
                    color: $color_2;
                }
            }
        }
        .icon {
            display: inline-block;
            font-size: 14px;
            .svg {
                margin-right: 4px;
                color: $color_3;
            }
            span {
                margin-right: 4px;
                color: $color_3;
                display: inline-block;
            }
            svg {
                width: 16px;
                height: 16px;
                path {
                    fill: #999;
                }
            }
        }
        .icon.read {
            margin-right: 8px;
        }
}


</style>
