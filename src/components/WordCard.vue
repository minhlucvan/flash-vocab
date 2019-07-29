<template>
    <div class="container">
        <div v-if="word" class="card">
            <div class="card--top">
                <img class="card-img" v-bind:src="word.image" alt="">
            </div>
            <div class="card--bottom">
                <div class="card--bottom-headline">
                    <h1 class="card--headline">{{word.word}}</h1>
                </div>
                    <div class="card--bottom-text">
                        <p class="card--text">{{word.sentence}}</p>
                    </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
    props: {
        word: Object,
    },
})
export default class WordCard extends Vue {}
</script>

<style lang="scss" scoped>
    .container{
        margin-top: 50px;
    }

    .card {
        position: relative;
        margin-left: auto;
        margin-right: auto;
        width: 500px;
        height: 425px;
    }

    .card--top{
        position: absolute;
        z-index: 1;
        width: 500px;
        height: 300px;
        //background-color: #3f3f3f;
        background-image: linear-gradient(270deg, #2af598 0%, #009efd 100%);
        border-radius: 8px;
        box-shadow: 0px 5px 25px #5b5b5b;
        overflow: hidden;
    }


    .card--bottom{
        position: absolute;
        z-index: 10;
        width: 400px;
        height: 200px;
        bottom: 0;
        background-color: #f3f3f3;
        border-radius: 8px;
        box-shadow: 0px 5px 25px #5b5b5b;
        margin-left:  50%;
        transform: translateX(-50%);
    }


    .card--bottom-headline{
        padding-top: 5px;
    }

    .card--headline{
        padding-left: 25px;
    }

    .card--text{
        padding-left: 25px;
    }
    .card-img {
        width: 100%;
        height: 100%;
    }
</style>
