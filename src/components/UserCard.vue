<template>
    <div v-if="user">
        <div>
            <img class="avatar" v-bind:src="user.photoURL" />>
        </div>
        <div>
            <router-link to="/topics" class="continue" >Continue as {{user.displayName}}></router-link>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class UserCard extends Vue {
    public doLogin() {
      this.$store.dispatch('login');
    }

    get user() {
        return this.$store.state.auth.user;
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .avatar {
        width: 80px;
        height: 80px;
    }

    .continue {
        color: white;
        background: blue;
    }
</style>
