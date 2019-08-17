<template>
    <router-link to="/topics">
        <Button color="teal" size="massive" content="Let Start"></Button>
    </router-link>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Button } from 'semantic-ui-vue';

@Component({
    components: {
        Button,
    },
})
export default class EnterButton extends Vue {

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
